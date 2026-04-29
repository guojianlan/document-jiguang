---
type: concept
aliases: [AI Agent, agent, autonomous agent, coding agent]
first_seen: 2026-03-20
updated_at: 2026-04-28
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_article_github_about-custom-agents
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
  - 2026-03-23_pdf_openai_how-openai-uses-codex
related_entities: [Claude Code, Codex, Anthropic, OpenAI]
related_concepts: [autonomy, AI 工作流, 模型能力变化, AI Vibecoding]
maturity: tracked
status: active
---

# AI Agent

## 定义

把"模型 + 工具调用 + 多步规划"包装成可独立执行任务的实体。在仓库当前观察范围里，**coding agent** 是最成熟的子类。

## 关键问题

- Agent 和 Workflow 的边界是什么
- 单 Agent 与多 Agent 的真实差异是什么
- 什么场景适合 Agent，什么场景只是包装

## 当前的几种主流理解

### 工具型 agent（coding agent 路线）

代表：[[Claude Code]]、[[Codex]] # TODO 待建页

- 把 agent 包成"在终端 / 仓库里持续工作"的产品
- 关键能力：[[autonomy|自主性]]、checkpoint、subagent、hook、background task、sandbox
- 主要价值：把"对话式协作"提升到"任务式协作"

来源证据：
- Anthropic 把 Claude Code 推到"可回退的自主"路线（[[2026-03-23_article_anthropic_claude-code-autonomy]]、[[2026-03-23_article_anthropic_claude-code-sandboxing]]）
- OpenAI 把 Codex 推到"AGENTS.md + cloud sandbox"路线（[[2026-03-23_article_openai_get-started-with-codex]]、[[2026-03-23_pdf_openai_how-openai-uses-codex]]）

### 框架型 agent（"build your own agent"路线）

代表：OpenAI Agents SDK、GitHub 自定义 agent

- 提供"如何搭建 agent"的 SDK / 协议
- 重心在 agent 定义、上下文管理、工具协议
- 来源：[[2026-03-23_article_openai_practical-guide-building-ai-agents]]、[[2026-03-23_article_github_about-custom-agents]]、[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]

## 我倾向的判断

- **agent 与 workflow 的边界 = 是否需要在不确定情况下做决策**：能完全确定流程的就是 workflow，需要中途选路径的才是 agent
- **多 agent 协作目前更多是 marketing**：仓库内已采集的来源里，subagent 真正展现出价值的场景是"并行处理独立子任务"，不是"几个 AI 互相讨论"
- **coding agent 是 agent 商业化最先跑通的领域**——因为代码任务有明确成功标准（测试通过 / 不通过），其它领域的 agent 缺这个反馈信号

## 反例与边界

- **不是所有 chatbot + 工具都叫 agent**——单步工具调用 ≠ agent
- **agent 越自主越需要可回退**——没有 [[autonomy#Anthropic 路线|checkpoint]] / undo 的"agent" 只是"自动化的失误放大器"
- **agent 不天然适合所有任务**——确定性流程用 workflow 更便宜更可控

## 待补

- # TODO 客服 / 销售 / 数据分析等非 coding 领域 agent 的真实采用案例
- # TODO 多 agent 框架（CrewAI、LangGraph、AutoGen）的对照——目前 wiki 内 0 来源
- # TODO 已知的 agent 翻车事故合集

## 相关阅读

- [[autonomy]]
- [[Claude Code]]
- [[Anthropic]]
- [[AI 工作流]]
- [[模型能力变化]]
