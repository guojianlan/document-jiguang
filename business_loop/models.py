from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path
from typing import Any


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class LoopLevel(str, Enum):
    L0 = "L0"
    L1 = "L1"
    L2 = "L2"
    L3 = "L3"


class StageStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"


class RunStatus(str, Enum):
    NEW = "new"
    PROCESSING = "processing"
    BLOCKED = "blocked"
    READY_FOR_REVIEW = "ready_for_review"
    DONE = "done"
    FAILED = "failed"


@dataclass
class PRDDocument:
    path: Path
    title: str
    summary: str
    sections: dict[str, str]
    raw_text: str
    requirements: list[str] = field(default_factory=list)
    constraints: list[str] = field(default_factory=list)
    acceptance_criteria: list[str] = field(default_factory=list)


@dataclass
class SearchHit:
    path: str
    line_number: int
    line: str


@dataclass
class ResearchPacket:
    queries: list[str]
    hits: list[SearchHit]
    summary: str


@dataclass
class StageRecord:
    name: str
    status: StageStatus = StageStatus.PENDING
    started_at: str | None = None
    finished_at: str | None = None
    notes: str = ""
    artifacts: dict[str, Any] = field(default_factory=dict)


@dataclass
class FileWrite:
    path: str
    content: str
    reason: str = ""


@dataclass
class ImplementationPlan:
    summary: str
    action: str = "implement"
    files: list[FileWrite] = field(default_factory=list)
    test_commands: list[str] = field(default_factory=list)
    notes: str = ""
    blockers: list[str] = field(default_factory=list)


@dataclass
class ProjectProfile:
    project_name: str
    purpose: str
    business_domain: str = ""
    stack: str = ""
    allowed_write_roots: list[str] = field(default_factory=lambda: ["."])
    default_test_commands: list[str] = field(default_factory=list)
    stop_on_ambiguity: bool = True
    require_acceptance_criteria: bool = False
    notes: str = ""
    initialized_at: str = field(default_factory=utc_now)
    updated_at: str = field(default_factory=utc_now)


@dataclass
class CommandResult:
    command: str
    return_code: int
    stdout: str
    stderr: str


@dataclass
class LoopRun:
    run_id: str
    prd_path: Path
    project_root: Path
    output_dir: Path
    level: LoopLevel
    status: RunStatus = RunStatus.NEW
    created_at: str = field(default_factory=utc_now)
    updated_at: str = field(default_factory=utc_now)
    stages: list[StageRecord] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)
