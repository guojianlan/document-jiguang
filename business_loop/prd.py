from __future__ import annotations

import re
from pathlib import Path

from .models import PRDDocument


HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")


def parse_prd(path: str | Path) -> PRDDocument:
    prd_path = Path(path).resolve()
    raw_text = prd_path.read_text(encoding="utf-8")
    lines = raw_text.splitlines()

    title = prd_path.stem
    sections: dict[str, list[str]] = {}
    current_heading = "summary"
    sections[current_heading] = []

    for line in lines:
        match = HEADING_RE.match(line.strip())
        if match:
            heading = match.group(2).strip()
            if match.group(1) == "#":
                title = heading
            current_heading = heading
            sections.setdefault(current_heading, [])
            continue
        sections.setdefault(current_heading, []).append(line)

    normalized_sections = {
        heading: "\n".join(content).strip()
        for heading, content in sections.items()
        if "\n".join(content).strip()
    }

    summary = normalized_sections.get("summary", "").strip()
    requirements = _extract_bullets(normalized_sections, ["需求", "requirements", "功能需求"])
    constraints = _extract_bullets(normalized_sections, ["约束", "constraints", "非目标", "out of scope"])
    acceptance = _extract_bullets(normalized_sections, ["验收", "acceptance", "测试", "success metrics"])

    return PRDDocument(
        path=prd_path,
        title=title,
        summary=summary,
        sections=normalized_sections,
        raw_text=raw_text,
        requirements=requirements,
        constraints=constraints,
        acceptance_criteria=acceptance,
    )


def _extract_bullets(sections: dict[str, str], candidates: list[str]) -> list[str]:
    lowered = {key.lower(): value for key, value in sections.items()}
    output: list[str] = []
    for candidate in candidates:
        body = lowered.get(candidate.lower())
        if not body:
            continue
        for line in body.splitlines():
            stripped = line.strip()
            if stripped.startswith(("- ", "* ")):
                output.append(stripped[2:].strip())
            elif re.match(r"^\d+\.\s+", stripped):
                output.append(re.sub(r"^\d+\.\s+", "", stripped))
    return output
