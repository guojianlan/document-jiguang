---
type: concept
aliases: [autonomy, 自主性, agent autonomy, coding agent autonomy]
first_seen: 2026-03-23
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
related_entities: [Claude Code, Codex, Anthropic, OpenAI]
related_concepts: [AI Agent, AI 工作流, 模型能力变化]
maturity: tracked
status: active
---

# autonomy（agent 自主性）

## 定义

agent 在不需要人持续介入的前提下完成多步任务的能力。注意：autonomy 是**程度**，不是**有无**——从"每步都问一下"到"接到目标后独立交付"是连续谱。

## 当前的几种主流理解

### Anthropic 路线：autonomy = 边界 + 可回退

- **可回退**：[[Claude Code]] 在执行前自动 [[Claude Code#核心机制|checkpoint]]，让 agent 敢做大动作
- **明确边界**：filesystem isolation + network isolation 给"在哪里能动手"画线
- **核心命题**：autonomy 越高，越需要 safety；safety 不是负担而是前提

来源：[[2026-03-23_article_anthropic_claude-code-autonomy]] + [[2026-03-23_article_anthropic_claude-code-sandboxing]]

### OpenAI 路线：autonomy = 环境隔离 + 长任务托管

- **AGENTS.md**：把"agent 该怎么在这个仓库工作"写成约定文件
- **Cloud sandbox**：把任务放到隔离环境跑，可以跑很久
- **核心命题**：autonomy 通过"换个安全环境"实现，模型本身不需要改

来源：[[2026-03-23_pdf_openai_how-openai-uses-codex]] + [[2026-03-23_article_openai_get-started-with-codex]] + [[2026-03-23_article_openai_practical-guide-building-ai-agents]]

### 学术 / 民间路线：autonomy = 可观测 + 可契约

- **vibecontract** 类研究强调：要让 agent 的行为预期可契约化（[[2026-03-23_article_vibecontract]]）
- **goodvibe** 类研究关注 vibe coding 的边界与可治理（[[2026-03-23_article_goodvibe]]）

## 我倾向的判断

- **autonomy 增长必须配可回退机制**——没有 checkpoint / undo 的"自主"只会让用户更累，因为出错代价被放大
- **autonomy 不是越多越好**——简单任务的 autonomy 反而是噪音（你只想让它写一行 SQL，它非要 plan 三步）
- **下一阶段最值得追踪的是"信任传递"**：agent 之间互相托管时如何传递权限和回退能力——目前几条路线都还没明确答案

## 反例与边界

- **autonomy ≠ 智能**：你给一个不够强的模型更多 autonomy，结果是更快地犯错
- **autonomy ≠ 减少干预**：用户的"持续判断"在很多场景下是 agent 走对方向的必要条件（[[ingest]] skill 强制 1-3 轮对话就是这个原因）

## 与其他 concept 的对照

- vs [[AI Agent]]：autonomy 是 AI Agent 的一个维度（agent 的其它维度还包括工具调用、协作、记忆）
- vs [[AI 工作流]]：autonomy 决定工作流里"哪些环节交给 agent"，工作流决定"agent 在系统中的位置"

## 待补

- # TODO 找一篇专门反对"过度 autonomy"的来源——目前 wiki 里观点偏 pro-autonomy
- # TODO autonomy 度量标准（任务完成率？干预频率？回滚率？）
- # TODO 失败案例——已知的"agent 跑飞了"事故合集

## 相关阅读

- [[Claude Code]]
- [[Codex]] # TODO 待补
- [[Anthropic]]
- [[AI Agent]]
- [[模型能力变化]]
