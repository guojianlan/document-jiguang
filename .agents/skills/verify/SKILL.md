---
name: verify
description: Run the project's test suite and SVG layout check before declaring work done. Use after making code changes, before committing, or whenever the user asks to verify the repo is healthy.
---

# verify

## 何时使用

- 修改了 `scripts/`、`business_loop/`、`tests/` 或任何代码后
- 改动了 SVG 资产或 Satori 模板后
- 提交前的最终自检
- 用户要求"跑一下测试"、"检查仓库是否健康"

## 执行

按顺序跑两条命令，遇到失败立即停下报告：

```bash
npm test
```

```bash
npm run check:svg
```

`npm test` 等价于 `python3 -m unittest discover -s tests -v`，会跑 `tests/` 下全部用例。

`npm run check:svg` 默认对仓库内 SVG 资产做布局检查（文字越界、重叠等）。如果只想检查单个文件，可改用：

```bash
node scripts/check_svg_layout.js <file.svg>
```

## 输出

- 两条命令都通过：报告"测试与 SVG 校验全部通过"
- 任一失败：贴出失败摘要 + 关键 stderr，并提示用户是否需要修
- 不要在没跑完、没看到结果的情况下声称通过

## 边界

- 这是只读校验，不会修任何文件
- 如果仓库后续接入了 lint/format，应在此 skill 内补上对应命令，并同步 `AGENTS.md` 与 `CLAUDE.md`
