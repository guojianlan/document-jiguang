from __future__ import annotations

import re
import subprocess
from pathlib import Path

from .models import PRDDocument, ResearchPacket, SearchHit
from .providers import LLMProvider


class LocalRepoSearcher:
    def __init__(self, project_root: str | Path, max_hits: int = 30) -> None:
        self.project_root = Path(project_root).resolve()
        self.max_hits = max_hits

    def collect(self, prd: PRDDocument, provider: LLMProvider | None = None) -> ResearchPacket:
        queries = build_queries(prd)
        hits: list[SearchHit] = []
        seen: set[tuple[str, int, str]] = set()

        for query in queries:
            command = ["rg", "-n", "--no-heading", query, str(self.project_root)]
            result = subprocess.run(command, capture_output=True, text=True, check=False)
            if result.returncode not in (0, 1):
                raise RuntimeError(f"rg failed for query {query!r}: {result.stderr.strip()}")
            for line in result.stdout.splitlines():
                parts = line.split(":", 2)
                if len(parts) != 3:
                    continue
                path, line_number, content = parts
                key = (path, int(line_number), content)
                if key in seen:
                    continue
                seen.add(key)
                hits.append(SearchHit(path=path, line_number=int(line_number), line=content))
                if len(hits) >= self.max_hits:
                    break
            if len(hits) >= self.max_hits:
                break

        summary = summarize_hits(prd, hits, provider)
        return ResearchPacket(queries=queries, hits=hits, summary=summary)


def build_queries(prd: PRDDocument) -> list[str]:
    seeds: list[str] = []
    seeds.extend(_keywords_from_text(prd.title))
    seeds.extend(_keywords_from_text(prd.summary))
    for item in prd.requirements[:5]:
        seeds.extend(_keywords_from_text(item))

    cleaned: list[str] = []
    seen: set[str] = set()
    for seed in seeds:
        if len(seed) < 3:
            continue
        lowered = seed.lower()
        if lowered in seen:
            continue
        seen.add(lowered)
        cleaned.append(seed)
        if len(cleaned) >= 8:
            break

    return cleaned or ["TODO", "FIXME"]


def summarize_hits(prd: PRDDocument, hits: list[SearchHit], provider: LLMProvider | None) -> str:
    if not hits:
        return "No local matches were found for the PRD keywords."

    compact = "\n".join(
        f"- {hit.path}:{hit.line_number}: {hit.line[:180]}"
        for hit in hits[:12]
    )
    fallback = (
        "Relevant local context was found in the repository. "
        "Prioritize these files before editing:\n"
        f"{compact}"
    )
    if provider is None:
        return fallback

    prompt = (
        "You are a compact repository researcher. Summarize the most relevant local code context "
        "for implementing the PRD below. Keep it under 180 words and highlight files or modules "
        "that should be read first.\n\n"
        f"PRD title: {prd.title}\n"
        f"PRD summary:\n{prd.summary}\n\n"
        f"Search hits:\n{compact}"
    )
    return provider.complete(prompt).strip() or fallback


def _keywords_from_text(text: str) -> list[str]:
    tokens = re.findall(r"[A-Za-z][A-Za-z0-9_-]{2,}", text)
    if not tokens and text.strip():
        tokens = [part for part in re.split(r"[\s,，。；;:/]+", text.strip()) if len(part) >= 2]
    return tokens
