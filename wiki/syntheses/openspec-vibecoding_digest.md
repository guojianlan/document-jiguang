---
type: synthesis
form: digest
created_at: 2026-04-30
based_on_sources:
  - 2026-03-23_link_openspec-practical-guide
  - 2026-03-23_link_openspec-e4-bd-bf-e7-94-a8-e6-89-8b-e5-86-8c
  - 2026-03-23_link_openspec-ai-workflow-analysis
  - 2026-03-23_link_vibe-coders-guide
  - 2026-03-23_article_vibecontract
  - 2026-03-23_article_goodvibe
based_on_entities: [OpenSpec, Claude Code, Codex]
based_on_concepts: [AI Vibecoding, AI 工作流, autonomy]
publishability: 1
triggered_by: ingest #3-5 in Phase 3 (vibecoding 三件套)
---

# OpenSpec × Vibecoding：把 spec-driven 接进 5 阶段成长路径

把 wiki 里两条主线串起来——[[AI Vibecoding]] 的 5 阶段成长路径和 [[OpenSpec]] 的 spec-driven 协作流程在哪一步咬合，又在哪一步互斥。

## TL;DR

- **[[AI Vibecoding]] 是用户视角**：从"会写"到"会管"再到"会治理"的 5 阶段成长路径
- **[[OpenSpec]] 是流程视角**：把意图、边界、场景、验证从聊天历史外置成工件
- 两者**正交**——OpenSpec 不是 Vibecoding 的替代，而是 Vibecoding **第 2-3 阶段的具体落地工具**
- 学术研究（[[2026-03-23_article_vibecontract|VibeContract]] / [[2026-03-23_article_goodvibe|GoodVibe]]）独立得出与 OpenSpec 一致的判断：**Vibecoding 的天花板不在生成质量，在 QA 与安全工件**

## 5 阶段 × OpenSpec 咬合点

按 [[AI Vibecoding]] 的成长阶段对照 OpenSpec 在每一步的角色：

| Vibecoding 阶段 | 用户在做什么 | OpenSpec 是否能切入 | 切入点 |
|---|---|---|---|
| **Phase 1 认知建立** | 区分 prompt / agent / workflow | ❌ 太早 | OpenSpec 是工具不是入门概念，硬推会劝退 |
| **Phase 2 工具上手** | 跑通第一个真实任务 | ⚠️ 选择性切入 | 第一次任务先用单一 agent（[[Claude Code]] / [[Codex]]）；OpenSpec 留给第二个项目 |
| **Phase 3 工作流升级** | 任务拆解、上下文、测试、回退、评审 | ✅ **OpenSpec 主战场** | proposal / design / spec / tasks 工件就是这一阶段需要的"会交付"基础设施 |
| **Phase 4 agent 化协作** | 沉淀 skill、AGENTS.md、profile | ✅ **互补** | OpenSpec 写 "做什么" change，Claude Code skill / AGENTS.md / Copilot profile 写 "怎么做" 行为 |
| **Phase 5 质量与安全** | QA、安全、权限边界 | ✅ **OpenSpec 提供工件载体** | spec 里的 scenarios + 验证段就是 QA 工件；契合 [[2026-03-23_article_vibecontract\|VibeContract]] 的判断 |

## 三条独立证据指向同一判断

不同来源、不同视角，**独立得出"vibecoding 缺的是工件而不是生成"**：

### 证据 1：vibe-coders-guide 的 5 步方法论

[[2026-03-23_link_vibe-coders-guide]] 给的 5 步是：**Ideation → Plan/Blueprint → Tools → Builders → Polish**。其中 Step 2 "Plan/Blueprint" 明确说：

> Vibe Coding 不是少做规划，而是更依赖规划。

对应动作词是 `Markdown Specs`、`User Stories`——这就是 OpenSpec 的 proposal + spec 工件，只是命名不同。

### 证据 2：VibeContract 论文（学术）

[[2026-03-23_article_vibecontract]]：

> Vibecoding 缺的不是更强的生成，而是一种能发现隐藏逻辑错误和不一致性的 QA 机制。

QA 的载体是什么？**契约**——也就是 spec + scenarios + 验证。这正是 OpenSpec 的 spec/tasks 段所做的事。

### 证据 3：GoodVibe 论文（学术）

[[2026-03-23_article_goodvibe]]：

> 安全性可以被显式优化，而不是默认寄希望于模型"自然写对"。

显式优化的载体是什么？**约束工件**——OpenSpec 的 design 段就是放架构约束（含安全约束）的天然位置。

三条证据从教学路线、QA 研究、安全研究**独立指向同一结论**：vibecoding 进阶的瓶颈不是 prompt 能力，是工件能力。OpenSpec 的存在价值正是把这件事工具化。

## 关键判断

### 1. OpenSpec 不该卖给初学者

[[OpenSpec]] 自己也承认："对特别小的一次性任务，完整工作流可能会显得过重"。

结合 vibe-coders-guide：**前两个阶段不要硬推 OpenSpec**。让用户先在 Phase 2 跑通一个真实任务（单 agent + 直觉 prompt），再在 Phase 3 把第二个项目升级到 spec-driven。这一顺序避免"刚学会就被工具流程吓跑"。

### 2. 学术研究在为 OpenSpec 背书（但路径不同）

VibeContract 走的是"在生成端加 contract 验证层"的研究路径，OpenSpec 走的是"在工程端写 spec 工件"的工程路径。**目标一致：用结构化工件代替模糊 prompt**。

仓库内能采取的更轻路径是 OpenSpec——不需要等学术成果落地，今天就能用。

### 3. 三种沉淀范式 + OpenSpec 形成完整 Phase 4

[[AI Vibecoding]] Phase 4 现在已经能落到具体工具上：

- [[Claude Code]] skill —— **项目级行为**沉淀
- [[Codex]] AGENTS.md —— **跨工具约定**沉淀
- [[GitHub Copilot]] custom agents profile —— **角色级 prompt**沉淀
- [[OpenSpec]] proposal/design/spec/tasks —— **change 级意图**沉淀

四者**正交**，分别解决不同层次的"经验沉淀"。这是 wiki 当前对 Vibecoding Phase 4 最完整的判断。

## 反例与边界

- **OpenSpec 不能解决 Phase 1 认知问题**——用户分不清 agent 和 workflow 时，先看不懂 spec
- **学术论文不能直接替代工具**——VibeContract / GoodVibe 是研究方向，落地仍要靠 OpenSpec 这类工程实践
- **本 digest 仍未覆盖**：Spec Kit、Cursor SpecStory、其他 spec-driven 框架的横向对比（[[OpenSpec]] 自己也标了同样的待补）

## 待补 / 待证伪

- # TODO Spec Kit / SpecStory 等其他 spec-driven 工具的横向对比
- # TODO 把这套 5 阶段 × OpenSpec 对照在仓库内做一次真实验证（用 OpenSpec 跑一个本仓库任务）
- # TODO 中文团队接入 OpenSpec 的 brownfield 案例
- # TODO 学术 contract 研究是否会反过来影响 OpenSpec 的 spec schema 设计

## publishability

`publishability: 1` — 本 digest 已经具备发布所需的事实结构和判断主线，建议作为下一篇文章候选：

- **建议主题**："Vibecoding 进阶卡住的不是 prompt，是 spec——OpenSpec 在 5 阶段成长路径里的位置"
- **可补充材料**：本仓库 `AGENTS.md` + 任意一个 OpenSpec change 的真实工件
- **目标读者**：已经会用 Claude Code / Codex 但不知道何时该升 spec-driven 的开发者
- **与 [[claude-code-vs-codex_comparison]] 互补**：那篇讲"工具买哪个"，这篇讲"什么时候升级到 spec-driven"

## 相关阅读

- [[OpenSpec]]
- [[AI Vibecoding]]
- [[AI 工作流]]
- [[Claude Code]]
- [[Codex]]
- [[GitHub Copilot]]
- [[claude-code-vs-codex_comparison]]
