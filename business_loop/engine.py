from __future__ import annotations

import json
from dataclasses import asdict
from pathlib import Path

from .executor import CommandRunner, FileSystemWriter
from .models import (
    ImplementationPlan,
    LoopLevel,
    LoopRun,
    ProjectProfile,
    RunStatus,
    StageRecord,
    StageStatus,
    utc_now,
)
from .prd import parse_prd
from .providers import LLMProvider
from .search import LocalRepoSearcher
from .storage import ArtifactStore
from .workspace import load_project_profile, validate_prd_against_profile


class BusinessLoopEngine:
    def __init__(
        self,
        project_root: str | Path,
        output_dir: str | Path,
        strategy_provider: LLMProvider,
        research_provider: LLMProvider | None = None,
        level: LoopLevel = LoopLevel.L2,
    ) -> None:
        self.project_root = Path(project_root).resolve()
        self.output_dir = Path(output_dir).resolve()
        self.strategy_provider = strategy_provider
        self.research_provider = research_provider
        self.level = level
        self.project_profile = load_project_profile(self.project_root)
        self.store = ArtifactStore(self.output_dir)
        self.searcher = LocalRepoSearcher(self.project_root)
        allowed_commands = self.project_profile.default_test_commands if self.project_profile else []
        self.command_runner = CommandRunner(self.project_root, allowed_commands=allowed_commands)
        allowed_roots = self.project_profile.allowed_write_roots if self.project_profile else ["."]
        self.file_writer = FileSystemWriter(
            self.project_root,
            self.output_dir / "backups",
            allowed_write_roots=allowed_roots,
        )

    def run(self, prd_path: str | Path, test_commands: list[str] | None = None) -> LoopRun:
        prd = parse_prd(prd_path)
        run = LoopRun(
            run_id=self.output_dir.name,
            prd_path=prd.path,
            project_root=self.project_root,
            output_dir=self.output_dir,
            level=self.level,
            status=RunStatus.PROCESSING,
            metadata={"prd_title": prd.title},
        )
        run.stages = [
            StageRecord(name="validate"),
            StageRecord(name="parse_prd"),
            StageRecord(name="research"),
            StageRecord(name="plan"),
            StageRecord(name="implement"),
            StageRecord(name="test"),
            StageRecord(name="finalize"),
        ]
        self.store.save_run(run)

        try:
            if self._complete_validate_stage(run, prd, self.project_profile):
                return run
            self._complete_parse_stage(run, prd)
            research = self._complete_research_stage(run, prd)
            plan = self._complete_plan_stage(run, prd, research.summary)
            if self._stop_for_human(run, plan):
                return run
            self._complete_implement_stage(run, plan)
            commands = self._select_test_commands(test_commands, plan)
            if self._complete_test_stage(run, commands):
                return run
            self._complete_finalize_stage(run, prd, plan)
        except Exception as exc:
            run.status = RunStatus.FAILED
            run.updated_at = utc_now()
            self.store.append_event({"type": "error", "message": str(exc)})
            self.store.save_run(run)
            raise

        run.status = RunStatus.DONE
        run.updated_at = utc_now()
        self.store.save_run(run)
        return run

    def _complete_validate_stage(
        self,
        run: LoopRun,
        prd,
        profile: ProjectProfile | None,
    ) -> bool:
        stage = self._start_stage(run, "validate")
        blockers = validate_prd_against_profile(prd, profile)
        if blockers:
            path = self.store.write_json("validate/blockers.json", {"blockers": blockers})
            stage.artifacts["blockers"] = str(path)
            stage.status = StageStatus.FAILED
            stage.finished_at = utc_now()
            stage.notes = "\n".join(blockers)
            run.status = RunStatus.BLOCKED
            run.updated_at = utc_now()
            self.store.append_event({"type": "blocked", "stage": "validate", "blockers": blockers})
            self.store.save_run(run)
            return True
        stage.notes = "Validation passed."
        self._finish_stage(run, stage)
        return False

    def _complete_parse_stage(self, run: LoopRun, prd) -> None:
        stage = self._start_stage(run, "parse_prd")
        payload = {
            "title": prd.title,
            "summary": prd.summary,
            "requirements": prd.requirements,
            "constraints": prd.constraints,
            "acceptance_criteria": prd.acceptance_criteria,
        }
        path = self.store.write_json("parse_prd/prd.json", payload)
        stage.artifacts["prd"] = str(path)
        stage.notes = "PRD parsed successfully."
        self._finish_stage(run, stage)

    def _complete_research_stage(self, run: LoopRun, prd):
        stage = self._start_stage(run, "research")
        packet = self.searcher.collect(prd, provider=self.research_provider)
        hits_text = "\n".join(
            f"- {hit.path}:{hit.line_number}: {hit.line}" for hit in packet.hits
        )
        path = self.store.write_stage_artifact("research", "context.md", f"# Queries\n\n{packet.queries}\n\n# Summary\n\n{packet.summary}\n\n# Hits\n\n{hits_text}\n")
        stage.artifacts["context"] = str(path)
        stage.notes = packet.summary
        self._finish_stage(run, stage)
        return packet

    def _complete_plan_stage(self, run: LoopRun, prd, research_summary: str) -> ImplementationPlan:
        stage = self._start_stage(run, "plan")
        project_context = self._project_context()
        prompt = (
            "You are an implementation planner for a Python business loop engine. "
            "Given the PRD and repository context, return JSON with keys "
            "`action`, `summary`, `files`, `test_commands`, `notes`, and `blockers`. "
            "Use `action` = `needs_human` when the business rule is inconsistent, missing, "
            "or cannot be decided safely from the provided context. "
            "Each item in `files` must contain `path`, `content`, and optional `reason`. "
            "Only include files that should be created or replaced in the target repository. "
            "When action is `needs_human`, leave `files` empty and put the unresolved questions in `blockers`. "
            "Return JSON only.\n\n"
            f"Project context:\n{project_context}\n\n"
            f"PRD title: {prd.title}\n"
            f"PRD summary:\n{prd.summary}\n\n"
            f"Requirements:\n{json.dumps(prd.requirements, ensure_ascii=False)}\n\n"
            f"Constraints:\n{json.dumps(prd.constraints, ensure_ascii=False)}\n\n"
            f"Acceptance criteria:\n{json.dumps(prd.acceptance_criteria, ensure_ascii=False)}\n\n"
            f"Repository research summary:\n{research_summary}\n"
        )
        plan = self.strategy_provider.create_implementation_plan(prompt)
        path = self.store.write_json(
            "plan/implementation_plan.json",
            {
                "action": plan.action,
                "summary": plan.summary,
                "files": [asdict(item) for item in plan.files],
                "test_commands": plan.test_commands,
                "notes": plan.notes,
                "blockers": plan.blockers,
            },
        )
        stage.artifacts["implementation_plan"] = str(path)
        stage.notes = plan.summary or "Implementation plan generated."
        self._finish_stage(run, stage)
        return plan

    def _complete_implement_stage(self, run: LoopRun, plan: ImplementationPlan) -> None:
        stage = self._start_stage(run, "implement")
        written_files: list[str] = []
        for file_write in plan.files:
            target = self.file_writer.apply(file_write)
            written_files.append(str(target))
        path = self.store.write_json("implement/written_files.json", {"files": written_files})
        stage.artifacts["written_files"] = str(path)
        stage.notes = plan.notes or f"Wrote {len(written_files)} files."
        self._finish_stage(run, stage)

    def _complete_test_stage(self, run: LoopRun, commands: list[str]) -> bool:
        stage = self._start_stage(run, "test")
        if not commands:
            if self.project_profile and self.project_profile.stop_on_ambiguity:
                path = self.store.write_json(
                    "test/blockers.json",
                    {"blockers": ["当前项目没有可执行的测试命令，系统按配置停止等待人工确认。"]},
                )
                stage.artifacts["blockers"] = str(path)
                stage.status = StageStatus.FAILED
                stage.finished_at = utc_now()
                stage.notes = "No test commands were provided."
                run.status = RunStatus.BLOCKED
                run.updated_at = utc_now()
                self.store.append_event({"type": "blocked", "stage": "test"})
                self.store.save_run(run)
                return True
            stage.status = StageStatus.SKIPPED
            stage.notes = "No test commands were provided."
            stage.finished_at = utc_now()
            run.updated_at = utc_now()
            self.store.save_run(run)
            return False

        results = []
        for command in commands:
            result = self.command_runner.run(command)
            results.append(asdict(result))
            if result.return_code != 0:
                self.store.write_json("test/results.json", {"results": results})
                stage.artifacts["results"] = str(self.output_dir / "test" / "results.json")
                stage.status = StageStatus.FAILED
                stage.finished_at = utc_now()
                stage.notes = f"Command failed: {command}"
                run.status = RunStatus.FAILED
                run.updated_at = utc_now()
                self.store.append_event({"type": "test_failed", "command": command})
                self.store.save_run(run)
                raise RuntimeError(f"Test command failed: {command}")

        path = self.store.write_json("test/results.json", {"results": results})
        stage.artifacts["results"] = str(path)
        stage.notes = "All test commands completed successfully."
        self._finish_stage(run, stage)
        return False

    def _complete_finalize_stage(self, run: LoopRun, prd, plan: ImplementationPlan) -> None:
        stage = self._start_stage(run, "finalize")
        summary = (
            f"# Run Summary\n\n"
            f"- PRD: {prd.title}\n"
            f"- Status: done\n"
            f"- Loop level: {run.level.value}\n"
            f"- Plan summary: {plan.summary or 'n/a'}\n"
            f"- Files written: {len(plan.files)}\n"
        )
        path = self.store.write_stage_artifact("finalize", "summary.md", summary)
        stage.artifacts["summary"] = str(path)
        stage.notes = "Run finalized."
        run.status = RunStatus.READY_FOR_REVIEW
        self._finish_stage(run, stage)

    def _start_stage(self, run: LoopRun, name: str) -> StageRecord:
        stage = next(item for item in run.stages if item.name == name)
        stage.status = StageStatus.RUNNING
        stage.started_at = utc_now()
        run.updated_at = utc_now()
        self.store.append_event({"type": "stage_started", "stage": name})
        self.store.save_run(run)
        return stage

    def _finish_stage(self, run: LoopRun, stage: StageRecord) -> None:
        stage.status = StageStatus.COMPLETED
        stage.finished_at = utc_now()
        run.updated_at = utc_now()
        self.store.append_event({"type": "stage_finished", "stage": stage.name})
        self.store.save_run(run)

    def _project_context(self) -> str:
        if not self.project_profile:
            return "Project profile not initialized."
        return (
            f"project_name: {self.project_profile.project_name}\n"
            f"purpose: {self.project_profile.purpose}\n"
            f"business_domain: {self.project_profile.business_domain}\n"
            f"stack: {self.project_profile.stack}\n"
            f"allowed_write_roots: {self.project_profile.allowed_write_roots}\n"
            f"default_test_commands: {self.project_profile.default_test_commands}\n"
            f"stop_on_ambiguity: {self.project_profile.stop_on_ambiguity}\n"
            f"notes: {self.project_profile.notes}\n"
        )

    def _stop_for_human(self, run: LoopRun, plan: ImplementationPlan) -> bool:
        if plan.action != "needs_human" and not plan.blockers:
            return False
        blockers = plan.blockers or ["规划阶段判断当前需求需要人工确认。"]
        path = self.store.write_json("plan/blockers.json", {"blockers": blockers})
        stage = next(item for item in run.stages if item.name == "plan")
        stage.artifacts["blockers"] = str(path)
        stage.status = StageStatus.FAILED
        stage.finished_at = utc_now()
        stage.notes = "\n".join(blockers)
        run.status = RunStatus.BLOCKED
        run.updated_at = utc_now()
        self.store.append_event({"type": "blocked", "stage": "plan", "blockers": blockers})
        self.store.save_run(run)
        return True

    def _select_test_commands(
        self,
        test_commands: list[str] | None,
        plan: ImplementationPlan,
    ) -> list[str]:
        if test_commands:
            return test_commands
        if self.project_profile and self.project_profile.default_test_commands:
            return self.project_profile.default_test_commands
        return plan.test_commands
