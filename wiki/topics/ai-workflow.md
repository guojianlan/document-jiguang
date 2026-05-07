---
type: topic
slug: ai-workflow
aliases: [AI 工作流, AI workflow, agentic workflow]
domains: [domain/ai-coding, domain/ai-agent]
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_link_openspec-ai-workflow-analysis
  - 2026-03-23_link_openspec-practical-guide
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
  - 2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent
related_topics: [claude-code, openspec, codex, ai-agent, autonomy, vibe-coding-path, model-capability-shift]
status: active
created_at: 2026-03-20
updated_at: 2026-05-07
---

# AI 工作流

## 定义

把 AI 从"单点助手"组织成"可复用、可审查、可沉淀的系统"——既包括个人工作链路，也包括团队协作流程。

## 关键问题

- AI 工作流和单次 Prompt 的差别是什么
- 工作流里哪些环节最值得固定下来
- 个人和团队分别该怎样落地

## 当前的几种主流理解

### "agent 自带工作流"路线

代表：[[claude-code|Claude Code]] 的 hooks + subagents + background tasks

- **hooks**：在 tool event 上挂 shell 命令，自动跑测试 / lint / 格式化（来源：[[2026-03-23_article_anthropic_claude-code-autonomy]]）
- **subagents**：把任务拆成并行子代理
- **background tasks**：长进程不阻塞当前对话
- **判断**：把 workflow 嵌入 agent 产品里——用户不用单独搭工作流，agent 自带

仓库内已经在用：`.claude/settings.json` 的 SVG 校验 hook 是 hook 机制的真实落地

### "spec-driven 工作流"路线

代表：[[openspec|OpenSpec]]、[[openspec|OpenSpec]] × Superpowers 组合

- 把"做什么"用 proposal / design / spec / tasks 工件化（来源：[[2026-03-23_link_openspec-ai-workflow-analysis]]、[[2026-03-23_link_openspec-practical-guide]]）
- agent 的工作 = 把 spec 翻译成代码 + 测试
- **判断**：工作流的稳定性来自 spec 工件，不来自 agent 本身

**子分支：文件系统 handshake 模式**——[[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]] 揭示的工程范式：两个独立工具（OpenSpec 管 what，Superpowers 管 how）通过 Markdown 文件做契约交接，**不依赖 API/插件 SDK**。这种松耦合让工具链可以独立演进——任一方升级不会破坏另一方。详见 [[openspec-superpowers_workflow_digest]]。

**2026-04 补充——Superpowers 跨工具支持**：[[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]] 明确 Superpowers 同时支持 Claude Code、Codex CLI/App、Cursor、GitHub Copilot CLI、Gemini CLI、OpenCode——这意味着**spec-driven 工作流的工件层是跨工具中间件**，不绑某一家。Superpowers 14 项核心 skill（test-driven-development / systematic-debugging 4 阶段 / brainstorming / writing-plans / subagent-driven-development / requesting-code-review 等）相当于 OpenSpec 在执行端的对应物。

**2026-04 补充——agent 内部"循环 + 工具箱 + Todo + Skill"是 workflow 在 agent 层的内化**：[[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]] 揭示 Claude Code 自身的内部 Harness 工程就是一种 workflow——Todo 工具防漂移、Skill 两级加载、Subagent 上下文隔离——这些不是用户搭的工作流，而是 agent **内置的工作流**。

### "Profile / 角色化复用"路线

代表：GitHub Copilot custom agents

- 把 agent 角色（行为、工具、上下文）写成 profile，跨 GitHub.com / IDE / Copilot CLI 三表面复用（来源：[[2026-03-23_article_github_about-custom-agents]]）
- **判断**：从"调一个万能 agent"走向"挑角色 agent"——工作流颗粒度从"项目级"细化到"任务/角色级"

### "AGENTS.md 约定"路线

代表：[[codex|Codex]]、本仓库的 AGENTS.md

- 把"agent 在这个仓库怎么工作"写成约定文件（来源：[[2026-03-23_pdf_openai_how-openai-uses-codex]]、[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]、[[2026-03-23_article_openai_get-started-with-codex]]）
- 每次 agent 进项目先读约定，再行动
- 自 2025-08 起 **60,000+ 项目** 采用 AGENTS.md，OpenAI 牵头与 Anthropic、Google、Microsoft、AWS 共建 [Linux Foundation 旗下的 Agentic AI Foundation](https://openai.com/index/agentic-ai-foundation/) 把它推为开放标准
- **判断**：约定文件 = 工作流的"宪法"

## 我倾向的判断

- **四条路线不冲突**：agent 自带能力 + spec 工件 + AGENTS.md 约定 + custom agents profile 可以叠加
- **个人工作流的最大杠杆是 hook**——一个 SVG 校验 hook 比 10 个 prompt 都改你的输出节奏
- **团队工作流的最大杠杆是约定文件**——AGENTS.md / OpenSpec change 让多人协作时 agent 行为一致
- **工作流不要追求完美再动手**——先用一两个 hook 起步，遇到问题再加规则

## 反例与边界

- **不是所有任务都要工作流化**——一次性的脚本写完即弃，加工作流是过度工程
- **工作流过早固化会限制探索**——研究 / 创意阶段反而需要更宽松的"反工作流"

## 与其他 topic 的对照

- vs [[ai-agent|AI Agent]]：agent 是执行实体，工作流是组织 agent 的骨架
- vs [[autonomy]]：工作流定义"agent 在哪些步骤可以自主"，autonomy 是工作流的一个变量
- vs [[vibe-coding-path|AI Vibecoding]]：vibecoding 第三阶段就是工作流升级

## 待补

- # TODO 团队级工作流的真实落地案例
- # TODO LangGraph / CrewAI 等工作流框架的对照
- # TODO 工作流监控 / observability 怎么做（关键缺口）

## 相关来源

- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2026-03-23_link_openspec-ai-workflow-analysis]]
- [[2026-03-23_link_openspec-practical-guide]]
- [[2026-03-23_pdf_openai_how-openai-uses-codex]]
- [[2026-03-23_article_openai_get-started-with-codex]]
- [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]
- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]
- 仓库内文档：[内容处理工作流](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)、[业务闭环设计流程](/Users/apple/Desktop/project/document/05_Workflows/业务闭环设计流程.md)
