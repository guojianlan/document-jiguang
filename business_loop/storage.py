from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .models import LoopRun, StageRecord, utc_now


class ArtifactStore:
    def __init__(self, output_dir: str | Path) -> None:
        self.output_dir = Path(output_dir).resolve()
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def write_stage_artifact(self, stage: str, name: str, content: str) -> Path:
        stage_dir = self.output_dir / stage
        stage_dir.mkdir(parents=True, exist_ok=True)
        target = stage_dir / name
        target.write_text(content, encoding="utf-8")
        return target

    def write_json(self, relative_path: str, payload: dict[str, Any]) -> Path:
        target = self.output_dir / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        return target

    def append_event(self, event: dict[str, Any]) -> None:
        target = self.output_dir / "events.jsonl"
        target.parent.mkdir(parents=True, exist_ok=True)
        line = json.dumps({"timestamp": utc_now(), **event}, ensure_ascii=False)
        with target.open("a", encoding="utf-8") as handle:
            handle.write(line + "\n")

    def save_run(self, run: LoopRun) -> Path:
        payload = {
            "run_id": run.run_id,
            "prd_path": str(run.prd_path),
            "project_root": str(run.project_root),
            "output_dir": str(run.output_dir),
            "level": run.level.value,
            "status": run.status.value,
            "created_at": run.created_at,
            "updated_at": run.updated_at,
            "metadata": run.metadata,
            "stages": [self._serialize_stage(stage) for stage in run.stages],
        }
        return self.write_json("run.json", payload)

    @staticmethod
    def _serialize_stage(stage: StageRecord) -> dict[str, Any]:
        return {
            "name": stage.name,
            "status": stage.status.value,
            "started_at": stage.started_at,
            "finished_at": stage.finished_at,
            "notes": stage.notes,
            "artifacts": stage.artifacts,
        }
