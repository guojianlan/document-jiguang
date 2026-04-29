---
type: concept
aliases: [AI 工作流, AI workflow, agentic workflow]
first_seen: 2026-03-20
updated_at: 2026-04-28
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_link_openspec-ai-workflow-analysis
  - 2026-03-23_link_openspec-practical-guide
  - 2026-03-23_pdf_openai_how-openai-uses-codex
related_entities: [Claude Code, OpenSpec, Codex]
related_concepts: [AI Agent, autonomy, AI Vibecoding, 模型能力变化]
maturity: tracked
status: active
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

代表：[[Claude Code]] 的 hooks + subagents + background tasks

- **hooks**：在 tool event 上挂 shell 命令，自动跑测试 / lint / 格式化（来源：[[2026-03-23_article_anthropic_claude-code-autonomy]]）
- **subagents**：把任务拆成并行子代理
- **background tasks**：长进程不阻塞当前对话
- **判断**：把 workflow 嵌入 agent 产品里——用户不用单独搭工作流，agent 自带

仓库内已经在用：`.claude/settings.json` 的 SVG 校验 hook 是 hook 机制的真实落地

### "spec-driven 工作流"路线

代表：[[OpenSpec]]

- 把"做什么"用 proposal / design / spec / tasks 工件化（来源：[[2026-03-23_link_openspec-ai-workflow-analysis]]、[[2026-03-23_link_openspec-practical-guide]]）
- agent 的工作 = 把 spec 翻译成代码 + 测试
- **判断**：工作流的稳定性来自 spec 工件，不来自 agent 本身

### "AGENTS.md 约定"路线

代表：[[Codex]]、本仓库的 AGENTS.md

- 把"agent 在这个仓库怎么工作"写成约定文件（来源：[[2026-03-23_pdf_openai_how-openai-uses-codex]]、[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]）
- 每次 agent 进项目先读约定，再行动
- **判断**：约定文件 = 工作流的"宪法"

## 我倾向的判断

- **三条路线不冲突**：agent 自带能力 + spec 工件 + AGENTS.md 约定可以叠加
- **个人工作流的最大杠杆是 hook**——一个 SVG 校验 hook 比 10 个 prompt 都改你的输出节奏
- **团队工作流的最大杠杆是约定文件**——AGENTS.md / OpenSpec change 让多人协作时 agent 行为一致
- **工作流不要追求完美再动手**——先用一两个 hook 起步，遇到问题再加规则

## 反例与边界

- **不是所有任务都要工作流化**——一次性的脚本写完即弃，加工作流是过度工程
- **工作流过早固化会限制探索**——研究 / 创意阶段反而需要更宽松的"反工作流"

## 与其他 concept 的对照

- vs [[AI Agent]]：agent 是执行实体，工作流是组织 agent 的骨架
- vs [[autonomy]]：工作流定义"agent 在哪些步骤可以自主"，autonomy 是工作流的一个变量
- vs [[AI 内容生产]]：本仓库就是用 AI 工作流做内容生产的实例

## 待补

- # TODO 团队级工作流的真实落地案例（仓库内 [[组织如何使用 AI]] 有部分）
- # TODO LangGraph / CrewAI 等工作流框架的对照
- # TODO 工作流监控 / observability 怎么做（关键缺口）

## 相关阅读

- [[Claude Code]]
- [[OpenSpec]]
- [[AI Agent]]
- [[autonomy]]
- 仓库内文档：[内容处理工作流](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)、[业务闭环设计流程](/Users/apple/Desktop/project/document/05_Workflows/业务闭环设计流程.md)
