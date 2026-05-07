# Wiki Index

按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 维护。每次 `/ingest` 必更。

> **2026-05-06 起切到 v2 模型**：用户拥有 taxonomy（5 domain + 按需 topic + 自由 mentions）。详见 [`taxonomy.md`](taxonomy.md) 和 [`mentions.md`](mentions.md)。
>
> **2026-05-06 重构完成**：source frontmatter 已迁（38 个用 v2 domain+mentions），entity/concept 共 16 页已分流——9 页晋升 `wiki/topics/`，7 页降级 `wiki/_drafts/` 等候。

## 类别速览

| 类别 | 数量 | 路径 | 状态 |
|---|---|---|---|
| sources | 50 | `wiki/sources/` | v2 ✅ |
| topics | 15 | `wiki/topics/` | v2 ✅ |
| syntheses | 7 | `wiki/syntheses/` | +1 markdown-as-spec_digest |
| _drafts（草稿池）| 6 | `wiki/_drafts/` | Superpowers 已晋升离开 |

## 分类工具

- [`taxonomy.md`](taxonomy.md) — 5 个固定 domain + 当前 topic 候选清单（用户管理）
- [`mentions.md`](mentions.md) — 自动生成的 mention 索引（每次 ingest 后重新扫）

---

## Topics（v2 主层）

按 source 数 + 沉淀密度排序。每页结构：是什么 / 当前结论 / 待证伪 / 与其他对照 / 相关 source。

| topic | source 数 | domain | 一句话 |
|---|---|---|---|
| [[mcp\|MCP]] | 9 | ai-agent / infra | Anthropic 2024-11 发布的 LLM 工具调用协议，AI 时代的 LSP |
| [[vibe-coding-path\|AI Vibecoding]] | 14 | ai-coding / indie-dev | 从 AI 辅助编码初阶到全自动 6 阶段成长路径 |
| [[ai-agent\|AI Agent]] | 10 | ai-agent / ai-coding | agent 路线对照 + multi-agent 三范式 + 厂商路线观察 |
| [[ai-workflow\|AI 工作流]] | 8 | ai-coding / ai-agent | hooks / spec-driven / profile / AGENTS.md 四路线对照 |
| [[claude-code\|Claude Code]] | 7 | ai-coding / ai-agent | Anthropic 的 coding agent，路线 = 可回退自主 + 沙箱边界 |
| [[openspec\|OpenSpec]] | 5 | ai-coding | 把 AI 编程升级为基于规格工件的可审查协作流程 |
| [[autonomy]] | 4 | ai-agent / ai-coding | agent 自主完成多步任务的能力——程度变量，不是有无 |
| [[codex\|Codex]] | 4 | ai-coding / ai-agent | OpenAI 的 coding agent，路线 = AGENTS.md + cloud sandbox |
| [[model-capability-shift\|模型能力变化]] | 3 | ai-coding / ai-agent | 区分模型升级 vs 产品壳升级，避免被 release notes 带节奏 |
| [[design-md-pattern\|DESIGN.md Pattern]] | 4 | ai-coding / indie-dev | 视觉规范打包成 markdown 喂 AI；含 Figma MCP 互补路线对照 |
| [[agent-internals\|Agent Internals]] | 4 | ai-agent / ai-coding | Agent 内部 12 组件（循环 / 工具箱 / Todo / Subagent / Skill / Hook）—— inside-out 视角 |
| [[claude-skill-ecosystem\|Claude Skill Ecosystem]] | 6 | ai-coding / indie-dev | Q1 2026 skill 生态，公开 100+；动作 + 标准二维矩阵 |
| [[superpowers\|Superpowers]] | 2 | ai-coding | 14 项 skill 工程纪律框架，跨 6 工具支持，文件系统 handshake |
| [[indie-dev-sop\|独立开发 SOP]] | 16 | indie-dev / ai-coding | idoubi 3 年 9 产品方法论合集——5 步 SOP + 6 感悟 + 反神话集 |
| [[agents-md\|AGENTS.md]] | 4 | ai-agent / ai-coding / wiki-meta | Linux Foundation AAIF 跨厂商 agent 项目约定标准；本仓库自身实例

> **晋升候选（≥3 source 但未建页）**：见 [`taxonomy.md`](taxonomy.md) 候选列表（spec-driven / multi-agent-orchestration / indie-dev-sop / agents-md / role-shift-to-architect / ai-app-monetization-myth / gpts）。
>
> **草稿池（_drafts/）**：Anthropic、OpenAI、GitHub Copilot、AI 产品观察、AI 内容生产、组织如何使用 AI——按 v2 规则下线，等阈值或合并。Superpowers 已晋升 → topic（2026-05-07）。详见 [`wiki/_drafts/README.md`](/Users/apple/Desktop/project/document/wiki/_drafts/README.md)。

---

## Sources（来源摘要）

按摘录日期倒序。每条对应 `wiki/sources/` 下一份摘要。

### 2026-05

| 文件 | 类型 | 作者/出处 | 主题 |
|---|---|---|---|
| `2026-05-03_article_huishe-ji_global-2000-design-md.md` | article | 萤柳（会设计）| refero.design 2000+ DESIGN.md（thin）|
| `2026-05-02_article_shangyanai_gpt-image-2-ui-seo-agent.md` | article | 熵衍 AI | GPT Image 2 整站 UI + 自主 SEO Agent 框架 |

### 2026-04

| 文件 | 类型 | 作者/出处 | 主题 |
|---|---|---|---|
| `2026-04-30_article_huishe-ji_claude-design-alternative-30-skills.md` | article | 萤柳（会设计）| Open Design：Claude Design 平替，19 skill + 71 设计系统 |
| `2026-04-30_article_ai-zhudaimatang_gpt-image-2-codex-taste-skill.md` | article | AI煮代码汤 | Taste-Skill：GPT Image 2 + Codex 一键建站（thin）|
| `2026-04-30_article_bazijichanpinhua_codex-fighter-game.md` | article | 八字鸡产品话 | Codex 一句 prompt 生成横版格斗游戏（thin）|
| `2026-04-29_article_huishe-ji_27-global-ai-uiux-tools-q1-2026.md` | article | 萤柳（会设计）| Q1 2026 全球 27 款 AI UI/UX 工具盘点（thin）|
| `2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one.md` | article | 术哥无界 | OpenSpec × Superpowers 协作实战 |
| `2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering.md` | article | 智慧问数 | Superpowers 14 项 skill 全解 + ECC 框架对比 |
| `2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems.md` | article | AI充电官 | awesome-design-md：DESIGN.md 协作契约命名 |
| `2026-04-05_article_idoubi_my-vibe-coding-projects.md` | article | 艾逗笔 | 全自动 vibe coding，9 产品矩阵 |
| `2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent.md` | article | 龙井Agent | Harness 工程：Coding Agent 内部 12 组件拆解 |

### 2026-03

| 文件 | 类型 | 作者/出处 | 主题 |
|---|---|---|---|
| `2026-03-25_article_huishe-ji_figma-official-mcp.md` | article | 萤柳（会设计）| Figma 官方 MCP 接入 Cursor / Codex |
| `2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills.md` | article | 萤柳（会设计）| Impeccable + 6 设计 skill 横向 snapshot |
| `2026-03-13_article_huishe-ji_vibe-coding-claude-code-yolo-auto-test.md` | article | 萤柳（会设计）| 设计师视角 Vibe Coding：Claude Code YOLO + Playwright |

### 2026-01 ~ 02

| 文件 | 类型 | 作者/出处 | 主题 |
|---|---|---|---|
| `2026-01-24_article_idoubi_vibe-coding-workany.md` | article | 艾逗笔 | WorkAny 桌面 Agent，全自动 vibe coding |
| `2026-01-03_article_idoubi_my-ai-2025.md` | article | 艾逗笔 | MCP、Agent 三大件、年终复盘 |

### 2025（idoubi 全年）

| 文件 | 类型 | 作者/出处 | 涉及 entity / concept |
|---|---|---|---|
| `2025-12-31_article_idoubi_ai-agents-cowork.md` | article | 艾逗笔 | Claude Code、Codex、MCP、multi-agent 横评 |
| `2025-12-29_article_idoubi_ai-agents-work-together.md` | article | 艾逗笔 | Claude Code、Codex、tmux multi-agent |
| `2025-07-17_article_idoubi_my-mcp-book.md` | article | 艾逗笔 | MCP、《这就是 MCP》出版 |
| `2025-07-03_article_idoubi_ai-solo-dev.md` | article | 艾逗笔 | 独立开发方法论、6 感悟 + 5 步 SOP |
| `2025-06-16_article_idoubi_mcp-is-all-you-need.md` | article | 艾逗笔 | MCP 本质论、双边网络效应 |
| `2025-04-13_article_idoubi_mcp-architecture.md` | article | 艾逗笔 | MCP 架构（三件套之三）|
| `2025-04-12_article_idoubi_mcp-lifecycle.md` | article | 艾逗笔 | MCP 生命周期（三件套之二）|
| `2025-04-11_article_idoubi_mcp-transport.md` | article | 艾逗笔 | MCP 传输（三件套之一）|
| `2025-01-01_article_idoubi_my-ai-2024.md` | article | 艾逗笔 | 2024 年终、ShipAny、MCP.so 起点 |

### 2024（idoubi 全年）

| 文件 | 类型 | 作者/出处 | 涉及 entity / concept |
|---|---|---|---|
| `2024-12-16_article_idoubi_use-ai-coding-copilot.md` | article | 艾逗笔 | Claude、Cursor、AI Vibecoding 辅助阶段 |
| `2024-11-09_article_idoubi_get-paied-all-over-the-world.md` | article | 艾逗笔 | 出海收付款、Stripe、Wise |
| `2024-08-12_article_idoubi_migrate-to-cloudflare.md` | article | 艾逗笔 | Cloudflare、独立开发基础设施 |
| `2024-05-22_article_idoubi_ai-search-engine.md` | article | 艾逗笔 | ThinkAny、AI 搜索、支付率 0.03% |
| `2024-02-23_article_idoubi_sora-ai-video-generator.md` | article | 艾逗笔 | sora.fm、套壳、诚信底线 |
| `2024-01-30_article_idoubi_ai-cover-generator.md` | article | 艾逗笔 | 红包封面、模板复用 |
| `2024-01-09_article_idoubi_my-ai-course-in-2024.md` | article | 艾逗笔 | 知识付费、陪伴型课程 |
| `2024-01-04_article_idoubi_my-ai-projects-in-2023.md` | article | 艾逗笔 | 2023 年终、模型能力跃迁论 |

### 2023（idoubi 起点）

| 文件 | 类型 | 作者/出处 | 涉及 entity / concept |
|---|---|---|---|
| `2023-12-20_article_idoubi_an-ai-native-product.md` | article | 艾逗笔 | 知了 zKnown、AI-Native 概念 |
| `2023-11-24_article_idoubi_I-quit-from-tencent.md` | article | 艾逗笔 | 腾讯裸辞、独立开发起点 |
| `2023-11-19_article_idoubi_my-gpts-works-project.md` | article | 艾逗笔 | GPTs Works、出海冷启动 |
| `2023-11-10_article_idoubi_how-to-create-gpts.md` | article | 艾逗笔 | GPTs 教程、Actions API |

### 2026-03（Anthropic / OpenAI / GitHub / arXiv 一手来源）

| 文件 | 类型 | 作者/出处 | 涉及 entity / concept |
|---|---|---|---|
| `2026-03-23_article_anthropic_claude-code-autonomy.md` | article | Anthropic | Claude Code、AI Agent、autonomy |
| `2026-03-23_article_anthropic_claude-code-sandboxing.md` | article | Anthropic | Claude Code、sandboxing |
| `2026-03-23_article_github_about-custom-agents.md` | article | GitHub Docs | GitHub Copilot、AI Agent、AI 工作流 |
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

| 名称 | 类型 | 一句话 | publishability | 状态 |
|---|---|---|---|---|
| [[claude-code-vs-codex_comparison]] | comparison | Claude Code 与 Codex 两条 autonomy 路线对照、生态策略差异、组合使用建议 | 1 | active |
| [[openspec-vibecoding_digest]] | digest | OpenSpec 在 Vibecoding 5 阶段成长路径里的咬合点 + 学术背书 | 1 | active |
| [[agent-learning-path_digest]] | digest | 如何了解 agents、如何做 agents——四件事理解 + 5 阶段实践路径 | 1 | active |
| [[openspec-superpowers_workflow_digest]] | digest | OpenSpec × Superpowers 文件系统 handshake + 两层 spec 区分 + 三级审查 pattern | 1 | active |
| [[idoubi-vibecoding-journey_timeline]] | timeline | 艾逗笔 3 年 24 篇看 4 次范式跃迁（GPTs → 套壳 → MCP → Vibe Coding）+ 反神话数字集 | 1 | active |
| [[mcp-foundations_digest]] | digest | MCP 三件套技术骨架 + 四件套关系矩阵（OpenSpec / Superpowers / Skills / MCP） | 1 | active |
| [[markdown-as-spec_digest]] | digest | 4 个独立工具走到同一答案——OpenSpec / DESIGN.md / AGENTS.md / SKILL.md 都把人类规则写成 markdown 喂 AI | 1 | active |

待落地的 syntheses 候选：

- **AGENTS.md / claude-code-autonomy / sandboxing 三件套（digest）** — Anthropic 在 2025-09 / 2025-10 的协作文档族系
- **Codex 实战时间线（timeline）** — 从 OpenAI Codex GA 到 AAIF 成立的演进证据
- **三大 coding agent 经验沉淀范式对照（comparison）** — Claude skill / Codex AGENTS.md / Copilot profile，三方正交

> 这些是 `/lint` 应该主动建议的合成候选，落 `wiki/syntheses/`。

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

# 找未在 index 的 wiki 页（孤儿）— v2 扫 topics
ls wiki/topics | sed 's/.md$//' | sort -u > /tmp/wiki-pages.txt
grep -oE '\[\[[^]]+\]\]' 06_Maps/index.md | tr -d '[]' | sed 's/|.*//' | sort -u > /tmp/index-refs.txt
comm -23 /tmp/wiki-pages.txt /tmp/index-refs.txt
```
