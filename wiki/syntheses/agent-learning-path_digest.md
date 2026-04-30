---
type: synthesis
form: digest
created_at: 2026-04-30
based_on_sources:
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-03-23_article_github_about-custom-agents
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_link_vibe-coders-guide
  - 2026-03-23_article_vibecontract
  - 2026-03-23_article_goodvibe
based_on_entities: [Claude Code, Codex, GitHub Copilot, OpenSpec, Anthropic, OpenAI]
based_on_concepts: [AI Agent, AI 工作流, autonomy, AI Vibecoding, 模型能力变化]
publishability: 1
triggered_by_query: "如何了解 agents，如何做 agents"
---

# 如何了解 agents，如何做 agents

把 wiki 里关于 agent 的所有判断按"先理解、再实践"两层组织成一条可执行路径。

## TL;DR

- **理解 agent 不是从定义开始**——从"agent 和 workflow 的边界"开始：在不确定情况下需要决策的才叫 agent
- **做 agent 不是从框架开始**——从一个真实小任务开始，跑通 [[Claude Code]] / [[Codex]] / [[GitHub Copilot]] 任意一个的"装→启动→给指令"流程
- **进阶不是堆 agent 数量**——把经验沉淀为可复用工件（skill / AGENTS.md / profile / OpenSpec change），任何一种都行
- **天花板不在 prompt 能力，在工件能力**——三条独立证据（[[2026-03-23_link_vibe-coders-guide|教学路线]]、[[2026-03-23_article_vibecontract|QA 学术]]、[[2026-03-23_article_goodvibe|安全学术]]）指向同一结论

## 第一部分：理解 agents

### 1. 边界先于定义

[[AI Agent]] 页面给出的判断："**agent 与 workflow 的边界 = 是否需要在不确定情况下做决策**"。能完全确定流程的就是 workflow，需要中途选路径的才是 agent。

具体到 coding agent，这意味着：

- 一次性脚本生成 → workflow（不必引入 agent 复杂度）
- 跨多个文件的功能开发、出错可能多种原因的调试 → agent（值得给它判断空间）

不是所有 chatbot + 工具调用都叫 agent。单步工具调用 ≠ agent（详见 [[AI Agent]] § 反例与边界）。

### 2. 三种主流落地路线

[[AI Agent]] 把当前业界落地分成三类，**正交不冲突**：

| 路线 | 代表 | 核心抽象 | 复用单元 |
|---|---|---|---|
| 工具型 agent | [[Claude Code]]、[[Codex]] | checkpoint + sandbox + AGENTS.md | 整套产品功能 |
| 框架型 agent | OpenAI Agents SDK、AGENTS.md 标准 | "如何搭建 agent" 的协议 | SDK / 标准文档 |
| Profile 型 agent | [[GitHub Copilot]] custom agents | 角色化 profile | agent 角色定义 |

理解这三条路线之后，你会发现"装哪个工具"不是关键问题——它们解决的是不同层的问题。

### 3. 商业化最先在 coding 跑通的原因

[[AI Agent]] § 我倾向的判断："**coding agent 是 agent 商业化最先跑通的领域**——因为代码任务有明确成功标准（测试通过/不通过），其他领域的 agent 缺这个反馈信号。"

这条对学习者重要——意味着：

- 想学 agent，先从 coding agent 入手是最稳的（反馈信号强）
- 客服 / 销售 / 数据分析等非 coding 领域 agent 当前案例少，不要拿它们做入门
- 多 agent 框架（CrewAI / LangGraph / AutoGen）现阶段更多是 marketing（[[AI Agent]] § 我倾向的判断），仓库内 0 一手来源

### 4. autonomy 是程度变量

[[autonomy]] 页面给的判断：autonomy 不是"自主或不自主"的二元开关，而是"程度变量"。

衡量 autonomy 的几条实务尺度：

- 决策步数（单步调用 vs 多步规划）
- 能否回退（[[Claude Code]] 的 checkpoint 路线）
- 是否托管（[[Codex]] 的 cloud sandbox 路线）
- 是否需要审批闸门

**autonomy 越高越需要 safety**——不是"用了 sandbox 就慢"，而是"sandbox 是敢自主的前提"（[[Claude Code]] § 核心机制）。

## 第二部分：做 agents（按 [[AI Vibecoding]] 5 阶段）

[[AI Vibecoding]] 已经把"如何做"拆成了 5 阶段。下面是每阶段的具体动作和工具映射。

### Phase 1：认知建立

**这一阶段做什么**：区分 prompt / agent / workflow，理解"描述问题"和"管理 agent"为什么重要。

**工具选择**：不要先选工具。先把 [[AI Agent]]、[[AI 工作流]]、[[AI Vibecoding]] 三个概念读通。

**反模式**：一上来就讲多 agent 编排——初学者会被劝退。

### Phase 2：工具上手

**这一阶段做什么**：跑通第一个真实任务。

**工具选择**：从 [[Claude Code]]、[[Codex]]、[[GitHub Copilot]] 任意一个开始。三家都把"第一步门槛"做到极致：

- Claude Code：装 → 进仓库 → 给指令
- Codex：装 → 登 → 选 Git 仓库 → 启动第一个任务（[[2026-03-23_article_openai_get-started-with-codex]] 4 步）
- Copilot：装插件 → 选 custom agent profile

**判断**：[[AI Vibecoding]] § 第二阶段——**"只选一个主工具做上手路线，不要一开始做工具大全"**。

### Phase 3：工作流升级

**这一阶段做什么**：从"会问"升级为"会交付"。任务拆解、上下文管理、测试、回退、评审。

**工具选择**：

- 个人工作流的最大杠杆是 hook——一个自动跑测试 / lint 的 hook 比 10 个 prompt 都改你的输出节奏（[[AI 工作流]] § 我倾向的判断）
- 团队工作流的最大杠杆是约定文件——`AGENTS.md` / OpenSpec change

**对应 [[2026-03-23_link_vibe-coders-guide|Vibe Coder's Guide]] 5 步方法论**：

1. Big Idea / Ideation——先定义问题、对象、价值
2. Plan / Blueprint——先写规格（呼应 [[OpenSpec]] proposal）
3. Tools / Architecture——先定栈，少折腾
4. Builders / Implementation——人调度 agent，循环 Generate→Test→Refine
5. Polish / Refinement——人最后兜底产品判断

**[[OpenSpec]] 在这一阶段切入**：proposal / design / spec / tasks 工件就是这一阶段需要的"会交付"基础设施（详见 [[openspec-vibecoding_digest]]）。

### Phase 4：agent 化与项目级协作

**这一阶段做什么**：把经验沉淀成可复用资产。

**工具选择（四种沉淀范式正交）**：

| 范式 | 工具 | 沉淀什么 |
|---|---|---|
| 项目级行为 | [[Claude Code]] `.claude/skills/` + hooks | 在这个项目里怎么做 |
| 标准级约定 | [[Codex]] `AGENTS.md`（跨工具） | 所有 agent 进项目读什么 |
| 角色级 prompt | [[GitHub Copilot]] custom agents profile | 扮演什么角色 |
| change 级意图 | [[OpenSpec]] proposal/design/spec/tasks | 这次要做什么 |

**判断**：[[AI 工作流]] § 我倾向的判断——**"四条路线不冲突，agent 自带能力 + spec 工件 + AGENTS.md 约定 + custom agents profile 可以叠加"**。

### Phase 5：质量与安全

**这一阶段做什么**：意识到工作代码不等于可靠代码。补 QA、安全、权限边界、治理。

**工具选择**：

- [[Claude Code]] 的 sandboxing（filesystem + network isolation）——边界让 autonomy 可放大
- [[OpenSpec]] 的 scenarios + 验证段——QA 工件
- [[OpenSpec]] 的 design 段——安全约束工件

**学术背书**：

- [[2026-03-23_article_vibecontract|VibeContract]]：vibecoding 缺的是 QA 机制
- [[2026-03-23_article_goodvibe|GoodVibe]]：安全性需显式优化

详见 [[openspec-vibecoding_digest]]。

## 五条关键判断

把上面的内容压缩成五条可记忆的判断：

1. **agent ≠ chatbot + 工具**——能在不确定情况下决策才叫 agent
2. **从 coding agent 入门最稳**——成功标准明确（测试通过/不通过），反馈信号强
3. **学习路径不是工具大全**——一个真实任务跑通比看 10 个产品介绍管用
4. **进阶的关键是工件而非 prompt**——skill / AGENTS.md / profile / spec 任一种都行，不能只有 prompt
5. **autonomy 是程度变量**——配合 checkpoint / sandbox 才能放大

## 反例与边界

- **不是所有任务都该上 agent**——确定流程用 workflow 更便宜
- **不是所有 agent 都要多 agent**——目前多 agent 框架价值未被仓库内任一来源验证
- **不是所有 vibecoding 都该上 OpenSpec**——一次性小任务用完整流程过重（[[OpenSpec]] § 当前稳定结论）
- **学术背书 ≠ 落地证据**——VibeContract / GoodVibe 是研究方向，落地仍要靠 OpenSpec / hook 这类工程实践

## 待补 / 待证伪

- # TODO 非 coding 领域 agent 真实采用案例（[[AI Agent]]、[[组织如何使用 AI]] 都标了）
- # TODO 多 agent 框架（CrewAI / LangGraph / AutoGen）一手来源
- # TODO agent 翻车事故合集（[[AI Agent]]、[[autonomy]] 共同 TODO）
- # TODO Cursor / Windsurf 等 IDE 类工具的归属
- # TODO 中文开发者社区的 agent 采用率分布

## publishability

`publishability: 1` — 本 digest 已具备发布所需的事实结构和判断主线，建议作为下一篇文章候选：

- **建议主题**："了解 AI agent 不必看完所有工具，只需要这四件事 + 一条 5 阶段路径"
- **可补充材料**：本仓库 `AGENTS.md` + `.claude/skills/` 的真实双轨实践
- **目标读者**：刚听说 agent 想学但不知从哪开始的开发者
- **与已有 synthesis 的关系**：
  - [[claude-code-vs-codex_comparison]] 讲"工具买哪个"
  - [[openspec-vibecoding_digest]] 讲"什么时候升级到 spec-driven"
  - 本 digest 讲"完整学习路径"，是入门篇

## 相关阅读

- [[AI Agent]]
- [[AI Vibecoding]]
- [[AI 工作流]]
- [[autonomy]]
- [[Claude Code]]
- [[Codex]]
- [[GitHub Copilot]]
- [[OpenSpec]]
- [[claude-code-vs-codex_comparison]]
- [[openspec-vibecoding_digest]]
