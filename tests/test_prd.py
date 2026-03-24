from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from business_loop.prd import parse_prd


class ParsePRDTests(unittest.TestCase):
    def test_parse_sections_and_bullets(self) -> None:
        content = """# 示例 PRD

简介段落。

## 需求

- 需要生成计划
- 需要执行测试

## 约束

- 只允许使用 Python 标准库

## 验收

1. 能写出文件
2. 能输出测试结果
"""
        with tempfile.TemporaryDirectory() as tmpdir:
            prd_path = Path(tmpdir) / "prd.md"
            prd_path.write_text(content, encoding="utf-8")
            prd = parse_prd(prd_path)

        self.assertEqual(prd.title, "示例 PRD")
        self.assertIn("需要生成计划", prd.requirements)
        self.assertIn("只允许使用 Python 标准库", prd.constraints)
        self.assertIn("能写出文件", prd.acceptance_criteria)


if __name__ == "__main__":
    unittest.main()
