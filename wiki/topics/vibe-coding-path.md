---
type: topic
slug: vibe-coding-path
aliases: [AI Vibecoding, vibecoding, vibe coding]
domains: [domain/ai-coding, domain/indie-dev]
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
  - 2024-12-16_article_idoubi_use-ai-coding-copilot
  - 2026-01-24_article_idoubi_vibe-coding-workany
  - 2026-04-05_article_idoubi_my-vibe-coding-projects
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-03-13_article_huishe-ji_vibe-coding-claude-code-yolo-auto-test
  - 2026-05-02_article_shangyanai_gpt-image-2-ui-seo-agent
related_topics: [claude-code, codex, openspec, mcp, ai-agent, ai-workflow, autonomy, model-capability-shift]
status: active
created_at: 2026-03-23
updated_at: 2026-05-07
---

# AI Vibecoding（成长路径）

## 主题定义

这里讨论的不是"随便让 AI 写代码"，而是用户如何从 AI 辅助编码的初级阶段，逐步进入更稳定的工具使用、工作流设计、agent 协作、质量控制和安全意识。

## 为什么值得持续追踪

- 用户群体目前还处在 AI Vibecoding 的初始阶段，最需要的是一条可执行的成长路径
- 这个主题天然适合做系列化内容，因为它本身就有从入门到进阶再到治理的递进结构
- 市面上还没有特别统一的权威系列，适合做"帮用户理出一条主线"的内容

## 关键问题

- Vibecoding 到底是什么，什么又不算
- 初学者应该先学工具，还是先学工作流
- 从"会用 AI 写代码"到"会用 AI 做项目"之间差了什么
- 为什么 AGENTS.md、custom agents、skills 会成为进阶标志
- 为什么高手最后会回到测试、安全和治理

## 当前核心观点

- 不要一上来就讲复杂 agent 编排，初学者更需要认知建立和一个真实可用的工具入口
- 最好的入门路径是：建立认知 → 学会一个工具 → 形成工作流 → 进入 agent 协作 → 补质量和安全
- "从入门到精通"的关键不是知道更多功能，而是逐步把经验固化成流程、规则和边界
- AGENTS.md、skills、custom agents 这类项目级配置，是从个人提示词走向团队工作流的重要分水岭
- Vibecoding 的终点不是更快生成代码，而是更稳定地交付可维护、可验证、可治理的结果

## 建议的内容主线

### 第一阶段：认知建立

- 解释什么是 Vibecoding
- 帮用户区分普通 AI 编码、agent、workflow
- 让用户理解"描述问题"和"管理 agent"为什么重要

### 第二阶段：工具上手

- 只选一个主工具做上手路线
- 不要一开始做工具大全
- 让用户先跑通第一个真实任务
- **2026-04 补充**：[[codex|Codex]] 的官方入门把上手降到 4 步——装 → 登 → 选 Git 仓库 → 启动第一个任务（来源：[[2026-03-23_article_openai_get-started-with-codex]]）。这是"降低第一步门槛"的具体落地，可作为本阶段范例
- **2026-05 补充**：非程序员（设计师）入门样本——Claude Code "狂飙模式"（YOLO mode）+ Playwright 自动测试组合（[[2026-03-13_article_huishe-ji_vibe-coding-claude-code-yolo-auto-test]]）。**关键洞察**：vibe coding 第二阶段不止"会问"，还要"会让 AI 自己跑测试闭环"——这是 [[critique]] / OpenSpec "工件验证"思路在入门阶段的轻量化落地

### 第三阶段：工作流升级

- 让用户从"会问"升级为"会交付"
- 解释任务拆解、上下文、测试、回退、评审这些基本环节
- **2026-04 补充**：[[2026-03-23_link_vibe-coders-guide|Vibe Coder's Guide]] 把这一阶段独立成 5 步（Ideation → Plan/Blueprint → Tools → Builders → Polish），其中 Step 2 "Plan/Blueprint" 直接呼应 [[openspec|OpenSpec]] 的 spec-driven 思路——"Vibe Coding 不是少做规划，而是更依赖规划"。Phase 3 的工具落地优先选项：[[openspec|OpenSpec]] proposal/design/spec/tasks 工件

### 第四阶段：agent 化与项目级协作

- 引入 AGENTS.md、skills、custom agents
- 说明为什么经验要沉淀成可复用资产
- **2026-04 补充**：[[claude-code|Claude Code]] 引入的 [[claude-code#核心机制|checkpoints / subagents / hooks / background tasks]] 是这一阶段的具体能力载体——hook 让"自动跑测试"变成默认行为，checkpoint 让"敢做大动作"变成可能。这些能力把 Vibecoding 从"会用提示词"推向"会管 agent"
- **2026-04 补充**：GitHub Copilot 的 custom agents profile（来源：[[2026-03-23_article_github_about-custom-agents]]）是"角色化复用"的标志——把"经验 prompt"升级为"agent profile"，跨 GitHub.com / IDE / CLI 复用。这一阶段的三种沉淀范式已经成形：Claude Code skill（项目级）、AGENTS.md（标准级）、custom agents profile（角色级），可叠加使用

### 第五阶段：质量与安全

- 让用户意识到工作代码不等于可靠代码
- 补足 QA、安全、权限边界和治理意识
- **2026-04 补充**：[[claude-code|Claude Code]] 的 sandboxing（filesystem + network isolation）是这一阶段的标志性能力——它的核心命题是"[[autonomy|自主性]]越高越需要明确边界"，不是"用了 sandbox 就慢"。详见 [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- **2026-04 补充（学术背书）**：两篇 arXiv 论文独立得出与本阶段一致的判断——[[2026-03-23_article_vibecontract|VibeContract]] 指出 "Vibecoding 缺的不是更强的生成，而是 QA 机制"；[[2026-03-23_article_goodvibe|GoodVibe]] 指出 "安全性可以被显式优化，而不是默认寄希望于模型自然写对"。两条独立证据指向同一结论：**vibecoding 进阶的瓶颈不在 prompt 能力，在工件能力**——这给 [[openspec|OpenSpec]] 这类 spec-driven 工具提供了学术背书。详见 [[openspec-vibecoding_digest]]

**2026-05 补充（多模态拼装样本）**：[[2026-05-02_article_shangyanai_gpt-image-2-ui-seo-agent]] 实操样本——独立开发者用 GPT Image 2 + Codex + 自建 SEO Agent 框架完成"整站 UI + 自主决策 SEO"组合。这跟 idoubi 的全自动 vibe coding 是同方向不同领域的证据：**vibe coding 进阶方向是 LLM × Image × Agent 三件套拼装**，不只是"代码生成"。

### 第六阶段（候选）：全自动 Vibe Coding——人当架构师不当程序员

idoubi 在 2026 年的实战样本（[[2026-01-24_article_idoubi_vibe-coding-workany]] + [[2026-04-05_article_idoubi_my-vibe-coding-projects]]）揭示了一个新阶段——**人完全不写代码，只口述需求 + 测试，由 Claude Code 全权执行**。3 个月做出 9 个 Agent 产品矩阵。但作者本人也指出代价：

- **测试资源跟不上 AI 迭代速度**（人工验收成为瓶颈）
- **护城河模糊**（技术能力被 AI 抹平，流量 + 商业 + 架构变成稀缺竞争力）
- **意义焦虑**："做这些产品的意义在哪里"（[[2026-04-05_article_idoubi_my-vibe-coding-projects]] 原话）

与 1 年前 [[2024-12-16_article_idoubi_use-ai-coding-copilot]] 的"AI 辅助编程"相比，**1 年时间从助手升到执行者**。这是 wiki 应该追踪的核心范式跃迁——可作为本主题阶段 6 候选，但还需要更多独立样本验证

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
- [[2024-12-16_article_idoubi_use-ai-coding-copilot]]
- [[2026-01-24_article_idoubi_vibe-coding-workany]]
- [[2026-04-05_article_idoubi_my-vibe-coding-projects]]
- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]

## 可输出方向

- "AI Vibecoding 从入门到精通" 系列文章
- 新手上手课程或训练营大纲
- 社群连续输出主题
- 内部分享文档

## 待补内容

- 国内中文语境下更适合新手的案例文章
- 不同工具路线的优缺点对比
- 更贴近真实业务交付的初学者案例
