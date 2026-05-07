---
type: topic
slug: model-capability-shift
aliases: [模型能力变化, model capability evolution]
domains: [domain/ai-coding, domain/ai-agent]
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_pdf_openai_how-openai-uses-codex
related_topics: [claude-code, codex, ai-agent, autonomy, ai-workflow]
status: active
created_at: 2026-03-20
updated_at: 2026-05-06
---

# 模型能力变化

## 定义

主流模型在推理、工具调用、多模态、上下文长度、价格、产品壳上的演进。**注意：能力变化 ≠ 模型升级**——很多"看起来是新能力"的发布其实是产品壳升级，而不是模型本身变强。

## 关键问题

- 能力变化到底影响了哪些真实工作流
- 哪些升级只是参数变化，哪些升级会改变使用方式
- 如何持续追踪，不被单次发布带节奏

## 当前的几种主流理解

### 模型层升级

- 推理 / 上下文长度 / 多模态——这些是真模型升级
- 通常带 benchmark 提升

### 产品壳升级（容易被混为模型升级）

- [[claude-code|Claude Code]] 在 2025-09 引入 [[claude-code#核心机制|checkpoints / subagents / hooks / background tasks]]——**这是产品壳升级，模型本身没变**（来源：[[2026-03-23_article_anthropic_claude-code-autonomy]]）
- [[claude-code|Claude Code]] 在 2025-10 引入 sandboxing——**还是产品壳升级**（[[2026-03-23_article_anthropic_claude-code-sandboxing]]）
- [[codex|Codex]] 的 AGENTS.md + cloud sandbox 路线同样是产品壳升级（[[2026-03-23_pdf_openai_how-openai-uses-codex]]）

### 价格 / 成本结构变化

- prompt caching / batch API / cheaper-tier model 这些是成本工具升级，对工作流影响巨大但常被忽视
- # TODO 仓库内尚无来源专门覆盖这一面

## 我倾向的判断

- **2025 下半年最值得追踪的不是模型升级，是 agent 产品壳升级**——这一年里 Claude 与 OpenAI 的 release notes 大半在讲"自主性 / 工作流 / 沙箱"，而不是"参数量 / 上下文窗口"
- **能力变化对工作流的影响 ≥ 对单次 prompt 的影响**——一个 hook 机制能改变你写代码的整个节奏，比模型多 3% benchmark 收益大得多
- **追新风险**：每次发布跟着改工作流是浪费——要有"发布观察期"再决定

## 反例与边界

- 不是所有"新能力"都值得跟——很多 release notes 是 marketing 包装
- 模型能力本身变化不大时，工作流变化反而更值得投入（[[ai-workflow|AI 工作流]]）

## 与其他 topic 的对照

- vs [[autonomy]]：autonomy 是模型能力变化的一个驱动方向
- vs [[ai-workflow|AI 工作流]]：工作流变化往往滞后于产品壳升级 1-2 个月
- vs [[ai-agent|AI Agent]]：模型能力变化是观察输入，AI Agent 路线观察是观察输出——同一份 release notes 一个看"模型变了什么"，一个看"产品壳怎么用这层变化"

## 待补

- # TODO prompt caching / batch / 廉价模型层的成本工具变化（缺一手来源）
- # TODO 多模态在真实生产里的采用率
- # TODO 上下文长度从 128k → 1M+ 实际影响工作流的证据

## 相关来源

- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2026-03-23_pdf_openai_how-openai-uses-codex]]
