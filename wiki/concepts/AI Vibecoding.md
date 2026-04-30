---
type: concept
aliases: [AI Vibecoding, vibecoding]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_link_vibe-coders-guide
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-03-23_article_github_about-custom-agents
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2026-03-23_article_vibecontract
  - 2026-03-23_article_goodvibe
related_entities: [Claude Code, Codex, GitHub Copilot, OpenSpec, Anthropic, OpenAI]
related_concepts: [AI Agent, AI 工作流, autonomy, 模型能力变化]
maturity: tracked
status: active
tags: [topic, topic/content, topic/workflow]
---

# AI Vibecoding

## 主题定义

这里讨论的不是“随便让 AI 写代码”，而是用户如何从 AI 辅助编码的初级阶段，逐步进入更稳定的工具使用、工作流设计、agent 协作、质量控制和安全意识。

## 为什么值得持续追踪

- 你的用户群体目前还处在 AI Vibecoding 的初始阶段，最需要的是一条可执行的成长路径
- 这个主题天然适合做系列化内容，因为它本身就有从入门到进阶再到治理的递进结构
- 市面上还没有特别统一的权威系列，适合你做“帮用户理出一条主线”的内容

## 关键问题

- Vibecoding 到底是什么，什么又不算
- 初学者应该先学工具，还是先学工作流
- 从“会用 AI 写代码”到“会用 AI 做项目”之间差了什么
- 为什么 AGENTS.md、custom agents、skills 会成为进阶标志
- 为什么高手最后会回到测试、安全和治理

## 当前核心观点

- 不要一上来就讲复杂 agent 编排，初学者更需要认知建立和一个真实可用的工具入口
- 最好的入门路径是：建立认知 -> 学会一个工具 -> 形成工作流 -> 进入 agent 协作 -> 补质量和安全
- “从入门到精通”的关键不是知道更多功能，而是逐步把经验固化成流程、规则和边界
- AGENTS.md、skills、custom agents 这类项目级配置，是从个人提示词走向团队工作流的重要分水岭
- Vibecoding 的终点不是更快生成代码，而是更稳定地交付可维护、可验证、可治理的结果

## 建议的内容主线

### 第一阶段：认知建立

- 解释什么是 Vibecoding
- 帮用户区分普通 AI 编码、agent、workflow
- 让用户理解“描述问题”和“管理 agent”为什么重要

### 第二阶段：工具上手

- 只选一个主工具做上手路线
- 不要一开始做工具大全
- 让用户先跑通第一个真实任务
- **2026-04 补充**：[[Codex]] 的官方入门把上手降到 4 步——装 → 登 → 选 Git 仓库 → 启动第一个任务（来源：[[2026-03-23_article_openai_get-started-with-codex]]）。这是"降低第一步门槛"的具体落地，可作为本阶段范例

### 第三阶段：工作流升级

- 让用户从“会问”升级为“会交付”
- 解释任务拆解、上下文、测试、回退、评审这些基本环节

### 第四阶段：agent 化与项目级协作

- 引入 AGENTS.md、skills、custom agents
- 说明为什么经验要沉淀成可复用资产
- **2026-04 补充**：[[Claude Code]] 引入的 [[Claude Code#核心机制|checkpoints / subagents / hooks / background tasks]] 是这一阶段的具体能力载体——hook 让"自动跑测试"变成默认行为，checkpoint 让"敢做大动作"变成可能。这些能力把 Vibecoding 从"会用提示词"推向"会管 agent"
- **2026-04 补充**：[[GitHub Copilot]] 的 custom agents profile（来源：[[2026-03-23_article_github_about-custom-agents]]）是"角色化复用"的标志——把"经验 prompt"升级为"agent profile"，跨 GitHub.com / IDE / CLI 复用。这一阶段的三种沉淀范式已经成形：Claude Code skill（项目级）、AGENTS.md（标准级）、custom agents profile（角色级），可叠加使用

### 第五阶段：质量与安全

- 让用户意识到工作代码不等于可靠代码
- 补足 QA、安全、权限边界和治理意识
- **2026-04 补充**：[[Claude Code]] 的 sandboxing（filesystem + network isolation）是这一阶段的标志性能力——它的核心命题是"[[autonomy|自主性]]越高越需要明确边界"，不是"用了 sandbox 就慢"。详见 [[2026-03-23_article_anthropic_claude-code-sandboxing]]

## 相关来源

- [[2026-03-23_link_vibe-coders-guide]]
- [[2026-03-23_article_openai_practical-guide-building-ai-agents]]
- [[2026-03-23_article_openai_get-started-with-codex]]
- [[2026-03-23_pdf_openai_how-openai-uses-codex]]
- [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]
- [[2026-03-23_article_github_about-custom-agents]]
- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2026-03-23_article_vibecontract]]
- [[2026-03-23_article_goodvibe]]

## 可输出方向

- “AI Vibecoding 从入门到精通” 系列文章
- 新手上手课程或训练营大纲
- 社群连续输出主题
- 内部分享文档

## 待补内容

- 国内中文语境下更适合新手的案例文章
- 不同工具路线的优缺点对比
- 更贴近真实业务交付的初学者案例
