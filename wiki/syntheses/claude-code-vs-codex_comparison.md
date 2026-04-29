---
type: synthesis
form: comparison
created_at: 2026-04-29
based_on_sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
based_on_entities: [Claude Code, Codex, Anthropic, OpenAI]
based_on_concepts: [autonomy, AI Agent, AI 工作流, AI 产品观察]
publishability: 1
triggered_by: ingest #1 in Phase 3 (Codex)
---

# Claude Code vs Codex：路线对比

两款最成熟的 coding agent 产品，背后是两条不同的 [[autonomy]] 实现路线。本页把仓库已采集的来源整合到一张对照表里，方便后续查询与发布。

## TL;DR

- **[[Claude Code]]（[[Anthropic]]）**：autonomy = 局部边界 + 可回退（checkpoint + sandbox）
- **[[Codex]]（[[OpenAI]]）**：autonomy = 环境隔离 + 跨工具标准（AGENTS.md + cloud sandbox）
- 两条路线**不冲突**——本仓库就在叠加使用：写 `AGENTS.md` 给 Codex 风格的项目级约定，同时用 Claude Code 的 hooks 跑自动校验

## 维度对照表

| 维度 | [[Claude Code]] | [[Codex]] |
|---|---|---|
| 出品方 | [[Anthropic]] | [[OpenAI]] |
| autonomy 实现 | checkpoint + sandbox（先给边界、可回退） | AGENTS.md + cloud sandbox（环境隔离、长任务托管） |
| 关键能力 | hooks、subagents、background tasks、checkpoints、sandboxing | AGENTS.md 约定、cloud sandbox、CLI/web app |
| 入门门槛 | 装 CLI + 在仓库内启动 | 装 → 登 → 选 Git 仓库 → 启动第一个任务 |
| 项目级约定 | `.claude/skills/`、`.claude/settings.json` hooks | 仓库根目录的 `AGENTS.md`（跨工具共享） |
| 生态策略 | 自家产品深度（产品壳频繁迭代） | 拉同盟做开放标准（[Linux Foundation 旗下 AAIF](https://openai.com/index/agentic-ai-foundation/)） |
| 标志性命题 | "autonomy 越高，越需要 safety——sandbox 不是束缚是前提" | "Agent 进生产需要共享、可移植的项目级指令标准" |
| 主要里程碑 | 2025-09 autonomy 增强 / 2025-10 sandboxing | 2025-08 AGENTS.md 标准 / 2025-12-09 AAIF 成立 |

## 关键判断

### 1. 路线不是替代，是组合

两边解决不同层的问题：

- **Anthropic 解决"agent 敢不敢做大动作"**：靠 checkpoint 让出错代价可回退
- **OpenAI 解决"多人协作 agent 行为一致"**：靠 AGENTS.md 让多工具读同一份约定

实际工程实践经常**叠加**：项目根放 `AGENTS.md`（OpenAI 路线），同时 `.claude/settings.json` 配 hooks（Anthropic 路线）。本仓库就是这样——`AGENTS.md` 与 `.claude/skills/` + hook 同时存在。

### 2. 生态策略反映商业判断不同

- **OpenAI 选开放标准**：让 [[Codex]]、Cursor、GitHub Copilot 都用 AGENTS.md，赌生态规模 → 60,000+ 项目采用，速度快
- **Anthropic 选产品深度**：Claude Code 的 hooks / subagents / background tasks 都是自家专有能力，赌产品体验 → 用户粘性高但生态分散

未来 12 个月值得追踪：**Anthropic 会不会加入 AAIF？** 加入会让 AGENTS.md 在 Anthropic 工具链原生支持；不加入则两条生态会越走越远。

### 3. 入门体验本质相同

虽然底层路线差异大，**新手第一次上手的步骤几乎一样**：

- Claude Code：装 → 在仓库启动 → 给指令
- Codex：装 → 登 → 选 Git 仓库 → 启动第一个任务

两边都把"第一步门槛"作为产品设计核心。这呼应 [[AI Vibecoding]] 第二阶段（工具上手）的判断：**用户最需要的是降低第一步门槛**。

## 反例与边界

- **不要把对照当替代选择**：很多团队同时用两个工具（不同任务、不同 IDE 偏好）
- **路线判断需要 ≥ 3 次 release 才稳定**——本对照基于 2025 Q3-Q4 公开材料，2026 后路线可能继续分化或合流
- **缺角度**：仓库内**没有第三方独立测评**，全部观察来自厂商一手材料 → [[/lint]] 应该把这条作为系统性偏差记下来

## 待补 / 待证伪

- # TODO Cursor、Windsurf 这种 IDE 类的路线归属——是 Claude 风格 hook 还是 Codex 风格约定文件？（[[2026-03-23_article_github_about-custom-agents]] 已采集，但 Cursor / Windsurf 缺一手来源）
- # TODO 两条路线在大型 monorepo 的真实表现差异
- # TODO 价格 / API tier 对比
- # TODO 中文开发者社区采用率分布

## publishability

`publishability: 1` — 本对照已具备发布所需的事实结构和判断主线，建议作为下一篇文章候选：

- **建议主题**："为什么 AI 编程工具买一个就够，但你最好两个都装"
- **可补充材料**：本仓库 `AGENTS.md` + `.claude/skills/` 的真实双轨实践
- **目标读者**：已经在用 Claude Code 但不了解 AGENTS.md 价值的开发者，反之亦然

## 相关阅读

- [[Claude Code]]
- [[Codex]]
- [[Anthropic]]
- [[OpenAI]]
- [[autonomy]]
- [[AI 工作流]]
- [[AI 产品观察]]
