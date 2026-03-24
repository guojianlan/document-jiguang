from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

from .models import CommandResult, FileWrite


class FileSystemWriter:
    def __init__(
        self,
        project_root: str | Path,
        backup_root: str | Path,
        allowed_write_roots: list[str] | None = None,
    ) -> None:
        self.project_root = Path(project_root).resolve()
        self.backup_root = Path(backup_root).resolve()
        self.backup_root.mkdir(parents=True, exist_ok=True)
        roots = allowed_write_roots or ["."]
        self.allowed_write_roots = [(self.project_root / root).resolve() for root in roots]

    def apply(self, file_write: FileWrite) -> Path:
        target = (self.project_root / file_write.path).resolve()
        if not str(target).startswith(str(self.project_root)):
            raise ValueError(f"Refusing to write outside project root: {file_write.path}")
        if not any(str(target).startswith(str(root)) for root in self.allowed_write_roots):
            raise ValueError(f"Refusing to write outside allowed roots: {file_write.path}")

        if target.exists():
            backup_path = self.backup_root / file_write.path
            backup_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(target, backup_path)

        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(file_write.content, encoding="utf-8")
        return target


class CommandRunner:
    def __init__(self, project_root: str | Path, allowed_commands: list[str] | None = None) -> None:
        self.project_root = Path(project_root).resolve()
        self.allowed_commands = allowed_commands or []

    def run(self, command: str) -> CommandResult:
        if self.allowed_commands and command not in self.allowed_commands:
            raise ValueError(f"Command is not in the allowed command list: {command}")
        completed = subprocess.run(
            command,
            shell=True,
            cwd=self.project_root,
            capture_output=True,
            text=True,
            check=False,
        )
        return CommandResult(
            command=command,
            return_code=completed.returncode,
            stdout=completed.stdout,
            stderr=completed.stderr,
        )
