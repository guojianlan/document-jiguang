# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

本仓库的长期协作约定写在 `AGENTS.md`。每次进入项目，请先读 `AGENTS.md`，再开始工作。

@AGENTS.md

## Claude Code 专属约定

### 协作语言

默认使用中文与用户协作（包括解释、提问、报告）。文件命名、目录结构和正文中文已是仓库默认。

### 命令

- 测试：`npm test`（等价于 `python3 -m unittest discover -s tests -v`）
- SVG 布局校验：`node scripts/check_svg_layout.js <file.svg>`
- Markdown 预览：`npm run preview:md -- "<file.md>" --open`
- Satori 渲染：`npm run render:satori`
- 业务闭环面板：`npm run loop:panel`
- 自动入库：`python3 scripts/intake_source.py "<url-or-path>"`

仓库无 formatter 配置，不要假设有 prettier/biome/black 自动格式化。

### Skill 位置

- `skills/`：仓库长期沉淀的 skill（`article-publish-kit`、`article-visual-assets`、`markdown-publish-preview`、`source-auto-summary`），按 `AGENTS.md` 优先复用
- `.claude/skills/`：Claude Code 入口 skill，分三层：
  - **wiki 层**：`/ingest`、`/query`、`/lint`（详见 [llm-wiki约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md)）
  - **publishing 层**：`/publish-article`、`/critique`、`/render-svg`
  - **基础层**：`/verify`

两套并存，不要把 `skills/` 视为冗余删除。

### Wiki 模式（重要）

仓库按 Karpathy 的 LLM Wiki 模式运转。任何新来源进入仓库（`00_Inbox/` 或 `01_Sources/`）后默认跑 `/ingest`，触达 5-10 个 wiki 页（source 摘要 + entities + concepts + index + log）。fan-out 不到 3 页视为失败。详见 [99_System/llm-wiki约定.md](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md)。

发布时从 `publishability ≥ 1` 的 synthesis 页出发跑 `/publish-article`，不直接拿 source 摘要写发布稿。

### 写入边界

- 草稿与发布产物落到 `03_Outputs/Drafts/` 与 `03_Outputs/Published/`
- 视觉资产落到 `07_Attachments/` 或对应文章目录
- 来源原件保留在 `01_Sources/`，不要原地改写
- 自动化脚本属于 `scripts/`，业务闭环引擎属于 `business_loop/`

### 必读规则（来自 AGENTS.md）

新增功能后，必须按 `AGENTS.md` 第 4 节的规则 A/B/C 同步回写 `AGENTS.md`、`README.md`、对应 `99_System` 或 `05_Workflows` 文档、必要时更新 `08_Skills/Candidates/Skill候选池.md`。只写代码不回写说明，视为未完成。
