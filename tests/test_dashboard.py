from __future__ import annotations

import json
import os
import tempfile
import time
import unittest
from pathlib import Path
from unittest.mock import patch

from business_loop.dashboard import DashboardApp


class DashboardTests(unittest.TestCase):
    def test_dashboard_can_init_and_run_project(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            root = Path(tmpdir)
            project = root / "demo-app"
            project.mkdir()
            (project / "app").mkdir()
            with patch.dict(os.environ, {"BUSINESS_LOOP_HOME": str(root / ".control")}):
                app = DashboardApp()
                app.init_project(
                    {
                        "project_root": str(project),
                        "name": "demo-app",
                        "purpose": "演示项目",
                        "allowed_write_roots": ["app"],
                        "default_test_commands": ["grep -qx 'hello dashboard' app/message.txt"],
                    }
                )
                mock_plan = project / "mock-plan.json"
                mock_plan.write_text(
                    json.dumps(
                        {
                            "summary": "write message file",
                            "action": "implement",
                            "files": [
                                {
                                    "path": "app/message.txt",
                                    "content": "hello dashboard\n",
                                    "reason": "demo",
                                }
                            ],
                            "test_commands": ["grep -qx 'hello dashboard' app/message.txt"],
                            "notes": "demo run",
                            "blockers": [],
                        },
                        ensure_ascii=False,
                        indent=2,
                    ),
                    encoding="utf-8",
                )
                result = app.start_run(
                    {
                        "project_root": str(project),
                        "request": "新增一个演示文本文件并验证内容",
                        "strategy_provider": "mock",
                        "research_provider": "mock",
                        "mock_plan": str(mock_plan),
                    }
                )
                run_dir = result["run_dir"]
                deadline = time.time() + 5
                status = {}
                while time.time() < deadline:
                    status = app.get_run_status(run_dir)
                    if status.get("status") != "processing":
                        break
                    time.sleep(0.1)

                self.assertEqual(status.get("status"), "done")
                self.assertTrue((project / "app" / "message.txt").exists())


if __name__ == "__main__":
    unittest.main()
