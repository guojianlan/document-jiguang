# Wiki Index

按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 维护。

每个 wiki 页都应在这里有一条记录。每次 `/ingest` 必更，`/lint` 周期校对。

## 类别速览

| 类别 | 数量 | 路径 |
|---|---|---|
| sources | 13 | `wiki/sources/` |
| entities | 3 | `wiki/entities/` |
| concepts | 8 | `wiki/concepts/` |
| syntheses | 0 | `wiki/syntheses/` |

> Phase 2 已完成：物理目录按 type 分隔（entities / concepts / sources / syntheses）。schema 层 `04_Templates`、`05_Workflows`、`99_System`、`08_Skills` 留在原位。

---

## Entities（具体物 / 工具 / 产品）

| 名称 | 类型 | 一句话 | 关键来源 | 状态 |
|---|---|---|---|---|
| [[OpenSpec]] | 工具/方法 | 把 AI 编程从依赖聊天历史升级为基于规格工件的可审查协作流程 | link_openspec-practical-guide、link_openspec-ai-workflow-analysis | active |
| [[Claude Code]] | 工具/产品 | Anthropic 的 coding agent，路线 = 可回退的自主 + 沙箱边界 | claude-code-autonomy、claude-code-sandboxing | active |
| [[Anthropic]] | 公司/出品方 | Claude / Claude Code 出品方，autonomy + safety 绑成一件事 | claude-code-autonomy、claude-code-sandboxing | active |

> 待补 entities：Codex、Cursor、OpenAI、GitHub Copilot、Satori、Obsidian。这些已在 sources 里反复出现但还没建独立页。

---

## Concepts（抽象概念 / 模式 / 方法）

| 名称 | 一句话 | 状态 |
|---|---|---|
| [[AI Agent]] | Agent 的角色分工、任务拆解、工具调用、协作机制与落地边界 | active |
| [[AI Vibecoding]] | 用户从 AI 辅助编码初级阶段进入工具使用、工作流、agent 协作、质量控制的成长路径 | active |
| [[AI 产品观察]] | AI 产品的定位、能力边界、交互设计、用户价值与商业方向 | active |
| [[AI 内容生产]] | 用 AI 完成内容收集、拆解、重组、成稿、分发，而非简单改写 | active |
| [[AI 工作流]] | AI 从单点助手到可复用、可审查、可沉淀的工作流系统 | active |
| [[模型能力变化]] | 主流模型在推理、工具调用、多模态、上下文长度、价格上的变化 | active |
| [[组织如何使用 AI]] | 团队、部门、公司如何把 AI 纳入日常流程而非停留在个人试用 | active |
| [[autonomy]] | agent 自主完成多步任务的能力——程度变量，不是有无 | active |

> 待补 concepts：spec-driven 开发、prompt caching、context engineering、change management、sandboxing（暂归在 [[Claude Code]] 与 [[autonomy]] 内）。这些在 sources 里出现但还没独立页。

---

## Sources（来源摘要）

按摘录日期倒序。每条对应 `wiki/sources/` 下一份摘要。

### 2026-03

| 文件 | 类型 | 作者/出处 | 涉及 entity / concept |
|---|---|---|---|
| `2026-03-23_article_anthropic_claude-code-autonomy.md` | article | Anthropic | Claude Code、AI Agent、autonomy |
| `2026-03-23_article_anthropic_claude-code-sandboxing.md` | article | Anthropic | Claude Code、sandboxing |
| `2026-03-23_article_github_about-custom-agents.md` | article | GitHub Docs | GitHub Copilot、AI Agent |
| `2026-03-23_article_goodvibe.md` | article | arXiv | AI Vibecoding |
| `2026-03-23_article_openai_agentic-ai-foundation-agents-md.md` | article | OpenAI | AGENTS.md、AI Agent |
| `2026-03-23_article_openai_get-started-with-codex.md` | article | OpenAI | Codex |
| `2026-03-23_article_openai_practical-guide-building-ai-agents.md` | article | OpenAI | AI Agent |
| `2026-03-23_article_vibecontract.md` | article | arXiv | AI Vibecoding、契约 |
| `2026-03-23_link_openspec-ai-workflow-analysis.md` | link | ForceInjection | OpenSpec、AI 工作流 |
| `2026-03-23_link_openspec-e4-bd-bf-e7-94-a8-e6-89-8b-e5-86-8c.md` | link | ForceInjection | OpenSpec（使用手册）|
| `2026-03-23_link_openspec-practical-guide.md` | link | ForceInjection | OpenSpec（实战指南）|
| `2026-03-23_link_vibe-coders-guide.md` | link | vibecoders.guide | AI Vibecoding |
| `2026-03-23_pdf_openai_how-openai-uses-codex.md` | pdf | OpenAI | Codex、组织如何使用 AI |

---

## Syntheses（对比 / 分析 / 时间线 / 复盘）

暂无。预期 syntheses 候选：

- **OpenSpec vs Vibecoding（comparison）** — 两种 AI 编程范式的对比，已有 ≥ 6 个相关来源
- **AGENTS.md / claude-code-autonomy / sandboxing 三件套（digest）** — Anthropic 在 2026-03 的协作文档族系
- **Codex 实战时间线（timeline）** — 从 OpenAI Codex GA 到组织内部使用的演进证据

> 这些是 `/lint` 应该主动建议的合成候选。Phase 1 阶段先记在这，Phase 2 迁移后落 `wiki/syntheses/`。

---

## 维护规则

1. **每次 `/ingest` 必更**：新 source 入 sources 表；新建的 entity/concept 入对应表
2. **每条 ≤ 一行**：详细内容在被引用的 wiki 页里，index 只做导航
3. **Obsidian wikilink 友好**：entity/concept 用 `[[name]]` 引，source 用文件名（不带 `.md`）
4. **每周 `/lint` 校对**：检查"待补"清单是否需要立即补、检查 status 是否有 deprecated 漏标

---

## 快速命令

```bash
# index 全部条目数
grep -c "^|" 06_Maps/index.md

# 找某个 entity 在 sources 里出现多少次
grep -ic "openspec" wiki/sources/*.md

# 找未在 index 的 wiki 页（孤儿）
diff <(ls wiki/concepts | sed 's/.md$//') <(grep -oE '\[\[[^]]+\]\]' 06_Maps/index.md | sort -u | tr -d '[]')
```
