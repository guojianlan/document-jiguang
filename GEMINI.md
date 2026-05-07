# GEMINI.md

This is the Gemini CLI context file for this repository.

> **Note for cross-tool compatibility**: This file mirrors the structure of `AGENTS.md` (read by Codex / OpenCode) and `CLAUDE.md` (read by Claude Code). Gemini CLI does not auto-discover skill directories — it only reads context files like this one. So this file enumerates available skills and key conventions, but cannot auto-invoke them.

For full conventions, also read: [AGENTS.md](./AGENTS.md)

---

## Repository purpose

A long-term AI knowledge base + content production repo. Three layers:

1. **`raw/`** — source materials (user-owned, agent read-only)
2. **`wiki/`** — knowledge layer (agent writes, user reviews)
3. **`outputs/`** — publishing artifacts

Schema lives in `AGENTS.md` + `CLAUDE.md` + `99_System/` + `06_Maps/taxonomy.md`.

## Skills available (in `.agents/skills/`)

Gemini CLI cannot auto-discover these as slash commands, but you can read each `SKILL.md` and follow its workflow when the user describes a matching task.

| Skill | When user says... | Read |
|---|---|---|
| `ingest` | "把这个链接/文件入库" / "处理这个 source" | [.agents/skills/ingest/SKILL.md](./.agents/skills/ingest/SKILL.md) |
| `query` | "wiki 里有什么 X？" / "对比 A vs B" | [.agents/skills/query/SKILL.md](./.agents/skills/query/SKILL.md) |
| `lint` | "扫一下 wiki 健康度" / "找矛盾页" | [.agents/skills/lint/SKILL.md](./.agents/skills/lint/SKILL.md) |
| `critique` | "审一下这篇文章" / "去 AI 味" | [.agents/skills/critique/SKILL.md](./.agents/skills/critique/SKILL.md) |
| `publish-article` | "把这个变成可发版" / "出发布包" | [.agents/skills/publish-article/SKILL.md](./.agents/skills/publish-article/SKILL.md) |
| `render-svg` | "做封面图 / 图卡 / 结构图" | [.agents/skills/render-svg/SKILL.md](./.agents/skills/render-svg/SKILL.md) |
| `verify` | "跑一下测试" / "检查 SVG 布局" | [.agents/skills/verify/SKILL.md](./.agents/skills/verify/SKILL.md) |
| `web-access` | "抓微信文章 / 小红书 / 登录后页面" | [.agents/skills/web-access/SKILL.md](./.agents/skills/web-access/SKILL.md) |
| `markdown-publish-preview` | "本地预览这个 markdown" | [.agents/skills/markdown-publish-preview/SKILL.md](./.agents/skills/markdown-publish-preview/SKILL.md) |
| `source-auto-summary` | "自动摘要这个来源" | [.agents/skills/source-auto-summary/SKILL.md](./.agents/skills/source-auto-summary/SKILL.md) |

## Key conventions (short version)

- **Default language**: Chinese (中文)
- **Wiki模式**: New raw source → run ingest → fan-out to wiki/topics + wiki/sources, update 06_Maps/index.md + log.md
- **Publishing**: Only from `wiki/syntheses/` pages with `publishability ≥ 1`, never directly from raw source summaries
- **Visual assets**: SVG first → PNG preview validation → only export PNG when distributing
- **Critique gate**: Any publish version must pass `/critique` before落盘 (4 dimensions, hard rules in [.agents/skills/critique/references/](./.agents/skills/critique/references/))
- **Write boundaries**: drafts → `outputs/drafts/`, published → `outputs/published/`, attachments → `raw/attachments/`, never edit `raw/sources/` in place

## Key files for orientation

- [06_Maps/index.md](./06_Maps/index.md) — wiki catalog (9 topics, 38 sources, 6 syntheses)
- [06_Maps/taxonomy.md](./06_Maps/taxonomy.md) — domain + topic + mentions taxonomy rules
- [99_System/llm-wiki约定.md](./99_System/llm-wiki约定.md) — Karpathy LLM Wiki pattern adaptation
- [log.md](./log.md) — append-only audit log
