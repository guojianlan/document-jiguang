from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any

from .models import FileWrite, ImplementationPlan


class LLMProvider(ABC):
    @abstractmethod
    def complete(self, prompt: str) -> str:
        raise NotImplementedError

    def create_implementation_plan(self, prompt: str) -> ImplementationPlan:
        raw = self.complete(prompt)
        data = _extract_json(raw)
        files = [
            FileWrite(
                path=item["path"],
                content=item["content"],
                reason=item.get("reason", ""),
            )
            for item in data.get("files", [])
        ]
        return ImplementationPlan(
            summary=data.get("summary", ""),
            action=data.get("action", "implement"),
            files=files,
            test_commands=list(data.get("test_commands", [])),
            notes=data.get("notes", ""),
            blockers=list(data.get("blockers", [])),
        )


class MockLLMProvider(LLMProvider):
    def __init__(self, canned_response: str | None = None, implementation_plan: ImplementationPlan | None = None) -> None:
        self.canned_response = canned_response or "Mock response"
        self.implementation_plan = implementation_plan

    def complete(self, prompt: str) -> str:
        if self.implementation_plan is not None and "Return JSON" in prompt:
            return json.dumps(
                {
                    "summary": self.implementation_plan.summary,
                    "action": self.implementation_plan.action,
                    "files": [
                        {"path": item.path, "content": item.content, "reason": item.reason}
                        for item in self.implementation_plan.files
                    ],
                    "test_commands": self.implementation_plan.test_commands,
                    "notes": self.implementation_plan.notes,
                    "blockers": self.implementation_plan.blockers,
                },
                ensure_ascii=False,
                indent=2,
            )
        return self.canned_response


class OpenAIResponsesProvider(LLMProvider):
    def __init__(
        self,
        model: str,
        api_key: str | None = None,
        base_url: str = "https://api.openai.com/v1/responses",
    ) -> None:
        self.model = model
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.base_url = base_url
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY is required for OpenAIResponsesProvider")

    def complete(self, prompt: str) -> str:
        payload = {
            "model": self.model,
            "input": prompt,
        }
        data = json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(
            self.base_url,
            data=data,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                body = json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"OpenAI API request failed: {detail}") from exc

        text_parts: list[str] = []
        for item in body.get("output", []):
            for content in item.get("content", []):
                if content.get("type") == "output_text":
                    text_parts.append(content.get("text", ""))
        return "".join(text_parts).strip()


def _extract_json(text: str) -> dict[str, Any]:
    stripped = text.strip()
    if stripped.startswith("{") and stripped.endswith("}"):
        return json.loads(stripped)

    start = stripped.find("{")
    end = stripped.rfind("}")
    if start == -1 or end == -1 or start >= end:
        raise ValueError("Provider did not return a valid JSON object")
    return json.loads(stripped[start : end + 1])


def build_provider(
    kind: str,
    model: str,
    mock_plan_path: str | None = None,
) -> MockLLMProvider | OpenAIResponsesProvider:
    if kind == "mock":
        plan = None
        if mock_plan_path:
            payload = json.loads(Path(mock_plan_path).read_text(encoding="utf-8"))
            plan = ImplementationPlan(
                summary=payload.get("summary", ""),
                action=payload.get("action", "implement"),
                files=[
                    FileWrite(
                        path=item["path"],
                        content=item["content"],
                        reason=item.get("reason", ""),
                    )
                    for item in payload.get("files", [])
                ],
                test_commands=payload.get("test_commands", []),
                notes=payload.get("notes", ""),
                blockers=payload.get("blockers", []),
            )
        return MockLLMProvider(
            canned_response="Mock research summary.",
            implementation_plan=plan,
        )
    return OpenAIResponsesProvider(model=model)
