from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

from business_loop.engine import BusinessLoopEngine
from business_loop.models import FileWrite, ImplementationPlan, LoopLevel
from business_loop.providers import MockLLMProvider
from business_loop.workspace import initialize_project


class BusinessLoopEngineTests(unittest.TestCase):
    def test_engine_runs_end_to_end_with_mock_provider(self) -> None:
        prd_content = """# Demo PRD

This PRD adds a simple helper.

## 需求

- 生成一个 Python 模块
- 运行单元测试
"""
        with tempfile.TemporaryDirectory() as tmpdir:
            root = Path(tmpdir)
            (root / "app").mkdir()
            (root / "tests").mkdir()
            (root / "app" / "__init__.py").write_text("", encoding="utf-8")
            (root / "tests" / "__init__.py").write_text("", encoding="utf-8")
            (root / "README.md").write_text("demo project", encoding="utf-8")
            prd_path = root / "prd.md"
            prd_path.write_text(prd_content, encoding="utf-8")

            plan = ImplementationPlan(
                summary="Create helper module and tests.",
                files=[
                    FileWrite(
                        path="app/helper.py",
                        content="def add(a, b):\n    return a + b\n",
                        reason="Create helper function.",
                    ),
                    FileWrite(
                        path="tests/test_helper.py",
                        content=(
                            "import unittest\n"
                            "from app.helper import add\n\n"
                            "class HelperTests(unittest.TestCase):\n"
                            "    def test_add(self):\n"
                            "        self.assertEqual(add(2, 3), 5)\n\n"
                            "if __name__ == '__main__':\n"
                            "    unittest.main()\n"
                        ),
                        reason="Add a simple test.",
                    ),
                ],
                test_commands=[f"{sys.executable} -m unittest discover -s tests"],
                notes="Mock notes.",
            )
            provider = MockLLMProvider(
                canned_response="Focus on app/helper.py and tests/test_helper.py.",
                implementation_plan=plan,
            )
            output_dir = root / ".tmp" / "run-001"
            engine = BusinessLoopEngine(
                project_root=root,
                output_dir=output_dir,
                strategy_provider=provider,
                research_provider=provider,
                level=LoopLevel.L2,
            )

            run = engine.run(prd_path=prd_path)

            self.assertEqual(run.status.value, "done")
            self.assertTrue((root / "app" / "helper.py").exists())
            payload = json.loads((output_dir / "run.json").read_text(encoding="utf-8"))
            self.assertEqual(payload["status"], "done")
            self.assertTrue((output_dir / "test" / "results.json").exists())

    def test_engine_blocks_when_plan_needs_human_decision(self) -> None:
        prd_content = """# Demo PRD

## 需求

- 处理订单同步逻辑
"""
        with tempfile.TemporaryDirectory() as tmpdir:
            root = Path(tmpdir)
            prd_path = root / "prd.md"
            prd_path.write_text(prd_content, encoding="utf-8")
            initialize_project(
                project_root=root,
                project_name="demo",
                purpose="订单系统",
                notes="订单状态映射必须由人工确认",
            )
            plan = ImplementationPlan(
                summary="Need clarification before implementation.",
                action="needs_human",
                blockers=["订单状态映射规则未明确，无法安全决定同步逻辑。"],
                notes="Wait for human.",
            )
            provider = MockLLMProvider(
                canned_response="Focus on order sync domain rules.",
                implementation_plan=plan,
            )
            output_dir = root / ".business-loop" / "runs" / "run-001"
            engine = BusinessLoopEngine(
                project_root=root,
                output_dir=output_dir,
                strategy_provider=provider,
                research_provider=provider,
                level=LoopLevel.L2,
            )

            run = engine.run(prd_path=prd_path)

            self.assertEqual(run.status.value, "blocked")
            self.assertTrue((output_dir / "plan" / "blockers.json").exists())


if __name__ == "__main__":
    unittest.main()
