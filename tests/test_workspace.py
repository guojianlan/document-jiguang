from __future__ import annotations

import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from business_loop.prd import parse_prd
from business_loop.workspace import (
    initialize_project,
    list_registered_projects,
    load_project_profile,
    synthesize_prd_from_request,
    validate_prd_against_profile,
)


class WorkspaceTests(unittest.TestCase):
    def test_initialize_project_creates_profile_and_memory(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            root = Path(tmpdir)
            with patch.dict(os.environ, {"BUSINESS_LOOP_HOME": str(root / ".control")}):
                profile_path, memory_path = initialize_project(
                    project_root=root,
                    project_name="shop-app",
                    purpose="处理电商订单和售后流程",
                    business_domain="电商",
                    stack="Python",
                    allowed_write_roots=["app", "tests"],
                    default_test_commands=["python3 -m unittest discover -s tests"],
                    notes="退款逻辑必须人工确认",
                )

                self.assertTrue(profile_path.exists())
                self.assertTrue(memory_path.exists())
                payload = json.loads(profile_path.read_text(encoding="utf-8"))
                self.assertEqual(payload["project_name"], "shop-app")
                self.assertEqual(payload["allowed_write_roots"], ["app", "tests"])
                profile = load_project_profile(root)
                self.assertIsNotNone(profile)
                self.assertEqual(profile.project_name, "shop-app")
                projects = list_registered_projects()
                self.assertEqual(len(projects), 1)
                self.assertEqual(projects[0]["project_root"], str(root.resolve()))

    def test_request_synthesis_and_validation(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            root = Path(tmpdir)
            with patch.dict(os.environ, {"BUSINESS_LOOP_HOME": str(root / ".control")}):
                profile_path, _ = initialize_project(
                    project_root=root,
                    project_name="crm",
                    purpose="CRM 系统",
                    require_acceptance_criteria=True,
                )
                self.assertTrue(profile_path.exists())
                profile = load_project_profile(root)
                output_dir = root / ".business-loop" / "runs" / "run-001"
                prd_path = synthesize_prd_from_request("新增客户列表筛选功能", root, output_dir, profile)
                prd = parse_prd(prd_path)
                blockers = validate_prd_against_profile(prd, profile)

                self.assertTrue(prd_path.exists())
                self.assertIn("新增客户列表筛选功能", prd.raw_text)
                self.assertEqual(len(blockers), 1)


if __name__ == "__main__":
    unittest.main()
