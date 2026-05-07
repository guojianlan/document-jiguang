---
type: topic
slug: ai-agent
aliases: [AI Agent, agent, autonomous agent, coding agent]
domains: [domain/ai-agent, domain/ai-coding]
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_article_github_about-custom-agents
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2025-12-29_article_idoubi_ai-agents-work-together
  - 2025-12-31_article_idoubi_ai-agents-cowork
  - 2026-01-03_article_idoubi_my-ai-2025
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
  - 2026-05-02_article_shangyanai_gpt-image-2-ui-seo-agent
related_topics: [claude-code, codex, mcp, openspec, autonomy, ai-workflow, model-capability-shift]
status: active
created_at: 2026-03-20
updated_at: 2026-05-07
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

代表：[[claude-code|Claude Code]]、[[codex|Codex]]

- 把 agent 包成"在终端 / 仓库里持续工作"的产品
- 关键能力：[[autonomy|自主性]]、checkpoint、subagent、hook、background task、sandbox、AGENTS.md 约定
- 主要价值：把"对话式协作"提升到"任务式协作"

来源证据：
- Anthropic 把 [[claude-code|Claude Code]] 推到"可回退的自主"路线（[[2026-03-23_article_anthropic_claude-code-autonomy]]、[[2026-03-23_article_anthropic_claude-code-sandboxing]]）
- OpenAI 把 [[codex|Codex]] 推到"AGENTS.md + cloud sandbox"路线（[[2026-03-23_article_openai_get-started-with-codex]]、[[2026-03-23_pdf_openai_how-openai-uses-codex]]）
- 两条路线对比已落 [[claude-code-vs-codex_comparison]]

### 框架型 agent（"build your own agent"路线）

代表：OpenAI Agents SDK、AGENTS.md 标准

- 提供"如何搭建 agent"的 SDK / 协议
- 重心在 agent 定义、上下文管理、工具协议
- 来源：[[2026-03-23_article_openai_practical-guide-building-ai-agents]]、[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]

### Profile 型 agent（"角色化复用"路线）

代表：GitHub Copilot custom agents

- 把"agent 扮演什么角色"用 profile（Markdown + YAML frontmatter）显式编码（来源：[[2026-03-23_article_github_about-custom-agents]]）
- profile 含 name、description、prompt、tools、MCP server
- 同一 profile 可在 GitHub.com / IDE / Copilot CLI 三个表面复用
- **判断**：profile 是把"prompt 经验"沉淀为"角色资产"——和 [[claude-code|Claude Code]] 的 skill 异曲同工，但抽象在"角色"层而非"项目"层

## Agent 三大件框架（来自 idoubi 2025 年终）

[[2026-01-03_article_idoubi_my-ai-2025]] 提出的简洁认知模型——Agent 产品 = **Framework + Tools + Sandbox**：

- **Framework** 层：LangGraph / AutoGen / Claude Agent SDK / Open Agent SDK，定义 agent 怎么编排、记忆、规划。idoubi 评价"过底层"，独立开发者不需要自己写
- **Tools** 层：MCPRouter / 各类 [[mcp|MCP]] server，给 agent 提供原子能力。这是当前竞争最激烈的层
- **Sandbox** 层：e2b / Webcontainers / boxlite / codex-sandbox，让 agent 安全跑代码。idoubi 判断 2026 Agent 瓶颈在 Sandbox 接入

## Multi-agent 范式对照

来自三个独立来源的 multi-agent 实战，呈现三种正交编排：

| 范式 | 代表 | 性质 | 来源 |
|---|---|---|---|
| **时间维度串行 + 三级审查** | Superpowers subagent-driven-development | 实现 → spec reviewer → quality reviewer 流水线 | [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]] |
| **空间维度分工** | idoubi 总分总（Claude Code 架构 / Gemini 后端 / Codex 前端 / Crush 测试）| 不同 agent 各司其职 | [[2025-12-31_article_idoubi_ai-agents-cowork]] |
| **同步广播指挥** | idoubi tmux 多窗口 + Ctrl+B S | 一句指令同时下发给 6 个 agent | [[2025-12-29_article_idoubi_ai-agents-work-together]] |

**判断**：multi-agent 不是单一概念，而是至少 3 种正交编排——讨论"multi-agent 好不好"前必须先问"哪种 multi-agent"

**2026-04 补充——第四种范式：上下文卫生型**

[[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]] 揭示的 Claude Code Subagent 机制是第四种独立范式：

| 范式 | 核心目的 |
|---|---|
| 时间维度串行 + 三级审查（[[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]、[[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]）| 质量门禁 |
| 空间维度分工（idoubi 总分总）| 角色专长 |
| 同步广播指挥（idoubi tmux）| 复用一份指令 |
| **上下文卫生型（Claude Code Subagent）** | **保护主 Agent 上下文，不让中间过程污染** |

第四种是 Claude Code 内置的、对用户透明的——你可能用了都没意识到这是 multi-agent。

**Superpowers 范式深化补充**（[[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]）：14 项核心 skill 中的 systematic-debugging 走 4 阶段根因定位（复现 → 收集证据 → 定位根因 → 修复验证），作者明确指出"AI 证据收集受限于上下文窗口，要配合 Sentry 等可观测性工具"——少有的诚实，承认 LLM 单点局限，应补到反例段。

## 厂商路线观察（合并自原 AI 产品观察）

同样的模型能力，三家公司选了不同路径——值得抄的是**路线**，不是功能列表。

### Anthropic 路线（[[claude-code|Claude Code]]）

- "可回退的自主"——checkpoints + sandbox 让 agent 敢做大动作
- 产品哲学：autonomy 与 safety 绑成一件事
- 动作密度：2025-09 → 2025-10 一个月内连发 autonomy + sandboxing 两篇，方向极一致
- 来源：[[2026-03-23_article_anthropic_claude-code-autonomy]]、[[2026-03-23_article_anthropic_claude-code-sandboxing]]

### OpenAI 路线（[[codex|Codex]]）

- "AGENTS.md + cloud sandbox"——把任务推到隔离环境跑长任务
- 产品哲学：autonomy 通过环境隔离实现，模型本身不动
- 生态策略：拉同盟做开放标准（[Linux Foundation 旗下 AAIF](https://openai.com/index/agentic-ai-foundation/)）让多工具共享 AGENTS.md
- 来源：[[2026-03-23_article_openai_get-started-with-codex]]、[[2026-03-23_pdf_openai_how-openai-uses-codex]]、[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]

### GitHub / Microsoft 路线（Copilot）

- "Custom agents + 多表面复用"——profile 编码 agent 角色，跨 GitHub.com / IDE / CLI 三个表面共享
- 产品哲学：把进阶 agent 使用从"挑工具"推到"挑角色"
- 路线判断：颗粒度落在"角色"——和 Anthropic 的"项目级 skill"、OpenAI 的"项目级 AGENTS.md"形成三重正交
- 来源：[[2026-03-23_article_github_about-custom-agents]]

## 路线观察方法论（合并自原 AI 产品观察）

- **看产品别只看 release notes**——很多"新能力"是产品壳升级而非模型升级（详见 [[model-capability-shift|模型能力变化]]）
- **路线选择比功能完备更值得抄**——Anthropic 的"可回退自主"和 OpenAI 的"环境隔离自主"都解决同一问题，但用不同机制；选哪条路决定了你之后所有功能怎么长
- **观察的最大杠杆是看 1-2 个月一次的"动作密度"**——一家公司一个月连发两篇相关 release，方向就明确了；只发一次的多半是探索
- **路线判断需要 ≥ 3 次 release 才稳定**；只看一次会被带节奏

## 我倾向的判断

- **agent 与 workflow 的边界 = 是否需要在不确定情况下做决策**：能完全确定流程的就是 workflow，需要中途选路径的才是 agent
- **多 agent 协作目前更多是 marketing**——但 Superpowers 三级审查 + idoubi 总分总这两个独立样本表明：**当 multi-agent 退化为"流水线 + 质量门禁"或"角色化分工"时，工程价值是真的**；只有那种"几个 AI 互相讨论"的范式仍在 marketing 阶段
- **coding agent 是 agent 商业化最先跑通的领域**——因为代码任务有明确成功标准（测试通过 / 不通过），其它领域的 agent 缺这个反馈信号

## 反例与边界

- **不是所有 chatbot + 工具都叫 agent**——单步工具调用 ≠ agent
- **agent 越自主越需要可回退**——没有 [[autonomy#Anthropic 路线|checkpoint]] / undo 的"agent" 只是"自动化的失误放大器"
- **agent 不天然适合所有任务**——确定性流程用 workflow 更便宜更可控
- 不是所有 AI 产品都值得追——很多只是把 LLM 接入 SaaS 后包装重发

## 待补

- 非 coding 领域 agent 案例——已有 1 个早期样本：[[2026-05-02_article_shangyanai_gpt-image-2-ui-seo-agent]]（SEO Agent 框架，独立开发者实操）；继续追踪
- # TODO 客服 / 销售 / 数据分析等其他非 coding 领域 agent 的真实采用案例
- # TODO 多 agent 框架（CrewAI、LangGraph、AutoGen）的对照——目前 wiki 内 0 来源
- # TODO 已知的 agent 翻车事故合集
- # TODO Cursor、Windsurf 等 IDE 类产品的路线观察
- # TODO 中文 AI 产品（豆包、Kimi、文心、通义）的对照

## 相关来源

- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2026-03-23_article_github_about-custom-agents]]
- [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]
- [[2026-03-23_article_openai_practical-guide-building-ai-agents]]
- [[2026-03-23_pdf_openai_how-openai-uses-codex]]
- [[2025-12-29_article_idoubi_ai-agents-work-together]]
- [[2025-12-31_article_idoubi_ai-agents-cowork]]
- [[2026-01-03_article_idoubi_my-ai-2025]]
- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]
