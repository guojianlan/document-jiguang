from __future__ import annotations

import json
import os
from pathlib import Path

from .models import PRDDocument, ProjectProfile, utc_now


PROFILE_DIRNAME = ".business-loop"
PROFILE_FILENAME = "project.json"
MEMORY_FILENAME = "memory.md"
REGISTRY_DIRNAME = ".business-loop-control"
REGISTRY_FILENAME = "registry.json"


def project_profile_dir(project_root: str | Path) -> Path:
    return Path(project_root).resolve() / PROFILE_DIRNAME


def project_profile_path(project_root: str | Path) -> Path:
    return project_profile_dir(project_root) / PROFILE_FILENAME


def project_memory_path(project_root: str | Path) -> Path:
    return project_profile_dir(project_root) / MEMORY_FILENAME


def registry_dir() -> Path:
    custom_home = os.getenv("BUSINESS_LOOP_HOME")
    if custom_home:
        return Path(custom_home).resolve()
    return Path.home() / REGISTRY_DIRNAME


def registry_path() -> Path:
    return registry_dir() / REGISTRY_FILENAME


def save_project_profile(project_root: str | Path, profile: ProjectProfile) -> Path:
    target = project_profile_path(project_root)
    target.parent.mkdir(parents=True, exist_ok=True)
    profile.updated_at = utc_now()
    payload = {
        "project_name": profile.project_name,
        "purpose": profile.purpose,
        "business_domain": profile.business_domain,
        "stack": profile.stack,
        "allowed_write_roots": profile.allowed_write_roots,
        "default_test_commands": profile.default_test_commands,
        "stop_on_ambiguity": profile.stop_on_ambiguity,
        "require_acceptance_criteria": profile.require_acceptance_criteria,
        "notes": profile.notes,
        "initialized_at": profile.initialized_at,
        "updated_at": profile.updated_at,
    }
    target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return target


def update_project_profile(project_root: str | Path, **updates: object) -> Path:
    profile = load_project_profile(project_root)
    if profile is None:
        raise FileNotFoundError(f"Project is not initialized: {project_root}")
    for key, value in updates.items():
        if hasattr(profile, key) and value is not None:
            setattr(profile, key, value)
    return save_project_profile(project_root, profile)


def load_project_profile(project_root: str | Path) -> ProjectProfile | None:
    path = project_profile_path(project_root)
    if not path.exists():
        return None
    payload = json.loads(path.read_text(encoding="utf-8"))
    return ProjectProfile(
        project_name=payload["project_name"],
        purpose=payload["purpose"],
        business_domain=payload.get("business_domain", ""),
        stack=payload.get("stack", ""),
        allowed_write_roots=list(payload.get("allowed_write_roots", ["."])),
        default_test_commands=list(payload.get("default_test_commands", [])),
        stop_on_ambiguity=bool(payload.get("stop_on_ambiguity", True)),
        require_acceptance_criteria=bool(payload.get("require_acceptance_criteria", False)),
        notes=payload.get("notes", ""),
        initialized_at=payload.get("initialized_at", utc_now()),
        updated_at=payload.get("updated_at", utc_now()),
    )


def initialize_project(
    project_root: str | Path,
    project_name: str,
    purpose: str,
    business_domain: str = "",
    stack: str = "",
    allowed_write_roots: list[str] | None = None,
    default_test_commands: list[str] | None = None,
    stop_on_ambiguity: bool = True,
    require_acceptance_criteria: bool = False,
    notes: str = "",
) -> tuple[Path, Path]:
    profile = ProjectProfile(
        project_name=project_name,
        purpose=purpose,
        business_domain=business_domain,
        stack=stack,
        allowed_write_roots=allowed_write_roots or ["."],
        default_test_commands=default_test_commands or [],
        stop_on_ambiguity=stop_on_ambiguity,
        require_acceptance_criteria=require_acceptance_criteria,
        notes=notes,
    )
    profile_path = save_project_profile(project_root, profile)
    memory_path = project_memory_path(project_root)
    if not memory_path.exists():
        memory_path.write_text(
            (
                f"# {project_name} 项目记忆\n\n"
                f"## 项目用途\n\n{purpose}\n\n"
                f"## 业务域\n\n{business_domain or '待补充'}\n\n"
                f"## 技术栈\n\n{stack or '待补充'}\n\n"
                "## 长期约定\n\n"
                "- 在这里记录稳定业务规则、命名习惯、审核要求和不可越过的边界。\n"
                "- 当模型多次卡在同一业务判断上时，把规则补到这里，而不是只留在对话里。\n"
            ),
            encoding="utf-8",
        )
    register_project(project_root)
    return profile_path, memory_path


def load_project_memory(project_root: str | Path) -> str:
    path = project_memory_path(project_root)
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def save_project_memory(project_root: str | Path, content: str) -> Path:
    path = project_memory_path(project_root)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return path


def load_registry() -> list[dict[str, str]]:
    path = registry_path()
    if not path.exists():
        return []
    payload = json.loads(path.read_text(encoding="utf-8"))
    items = payload.get("projects", [])
    return [item for item in items if Path(item.get("project_root", "")).exists()]


def save_registry(items: list[dict[str, str]]) -> Path:
    path = registry_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = {"projects": items}
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


def register_project(project_root: str | Path) -> Path:
    root = str(Path(project_root).resolve())
    items = load_registry()
    filtered = [item for item in items if item.get("project_root") != root]
    filtered.append({"project_root": root})
    return save_registry(filtered)


def unregister_project(project_root: str | Path) -> Path:
    root = str(Path(project_root).resolve())
    items = [item for item in load_registry() if item.get("project_root") != root]
    return save_registry(items)


def list_registered_projects() -> list[dict[str, object]]:
    output: list[dict[str, object]] = []
    for item in load_registry():
        root = Path(item["project_root"]).resolve()
        profile = load_project_profile(root)
        output.append(
            {
                "project_root": str(root),
                "initialized": profile is not None,
                "profile": {
                    "project_name": profile.project_name,
                    "purpose": profile.purpose,
                    "business_domain": profile.business_domain,
                    "stack": profile.stack,
                    "allowed_write_roots": profile.allowed_write_roots,
                    "default_test_commands": profile.default_test_commands,
                    "stop_on_ambiguity": profile.stop_on_ambiguity,
                    "require_acceptance_criteria": profile.require_acceptance_criteria,
                    "notes": profile.notes,
                }
                if profile
                else None,
            }
        )
    return output


def synthesize_prd_from_request(
    request_text: str,
    project_root: str | Path,
    output_dir: str | Path,
    profile: ProjectProfile | None,
) -> Path:
    target = Path(output_dir).resolve() / "input" / "request_prd.md"
    target.parent.mkdir(parents=True, exist_ok=True)
    project_name = profile.project_name if profile else Path(project_root).resolve().name
    purpose = profile.purpose if profile else "未初始化项目"
    body = (
        f"# {project_name} 需求\n\n"
        "## 背景\n\n"
        f"- 项目：{project_name}\n"
        f"- 项目用途：{purpose}\n\n"
        "## 需求\n\n"
        f"- {request_text.strip()}\n\n"
        "## 约束\n\n"
        "- 保持现有仓库结构兼容\n"
        "- 遇到无法确定的业务规则时必须停止并等待人工确认\n"
    )
    target.write_text(body, encoding="utf-8")
    return target


def validate_prd_against_profile(prd: PRDDocument, profile: ProjectProfile | None) -> list[str]:
    blockers: list[str] = []
    if not prd.requirements:
        blockers.append("当前需求没有可执行的 `需求` 列表，系统无法稳定规划实现。")
    if profile and profile.require_acceptance_criteria and not prd.acceptance_criteria:
        blockers.append("项目要求必须提供验收条件，但当前 PRD 没有 `验收` 段落。")
    return blockers
