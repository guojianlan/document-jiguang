---
type: output
output_type: article_series
status: draft
topic: AI Vibecoding
audience: AI 编程初学者 / 刚开始尝试 Vibecoding 的内容用户
created_at: 2026-03-23
---

# AI Vibecoding 从入门到精通系列

## 开篇摘要

这套系列不是要把用户一下子训练成“资深 AI 工程师”，而是帮助还处在 AI Vibecoding 初级阶段的用户，建立一条真正可走通的成长路径。

整体主线是：

- 先建立认知
- 再学会一个工具
- 再形成工作流
- 再进入 agent 化协作
- 最后补上质量和安全

## 系列定位

- 目标读者：刚开始使用 AI 编程工具、容易被工具海和概念海淹没的人
- 目标结果：不是知道更多名词，而是建立稳定可执行的工作方式
- 写作原则：少讲空泛趋势，多讲用户今天能怎么做

## 第 1 篇

### 标题建议

AI Vibecoding 到底是什么：为什么它很火，但很多人一开始就用错了

### 当前草稿

- [[2026-03-23_article_AI Vibecoding到底是什么]]

### 本篇目标

帮初学者先建立认知，不让他们把“让 AI 写点代码”和“真正进入 AI-native 开发方式”混为一谈。

### 核心观点

- Vibecoding 不是完全放弃理解，而是把重心从写语法转向描述需求、判断结果、管理过程
- Agent、workflow、普通 AI 辅助编码是三件相关但不同的事
- 新手最容易犯的错不是不会写 prompt，而是没有工作流

### 适合展开的结构

1. 什么是 Vibecoding
2. 它为什么让人兴奋
3. 为什么很多人会在第一周就走偏
4. 新手最需要补的不是技巧，而是认知

### 可用来源

- [[2026-03-23_link_vibe-coders-guide]]
- [[2026-03-23_article_openai_practical-guide-building-ai-agents]]

## 第 2 篇

### 标题建议

AI 编程新手第一次上手：先选一个工具，不要一上来什么都学

### 本篇目标

帮助用户跑通第一个真实任务，降低工具上手焦虑。

### 核心观点

- 初学者不要同时学太多工具
- 第一目标不是“看懂所有功能”，而是完成一个真实任务
- 工具只是入口，关键是建立正反馈

### 适合展开的结构

1. 为什么不要一开始就做工具对比大全
2. 只选一个主工具的理由
3. 第一次上手应该完成什么
4. 从第一天就应该养成哪些好习惯

### 可用来源

- [[2026-03-23_article_openai_get-started-with-codex]]
- [[2026-03-23_article_openai_practical-guide-building-ai-agents]]

### 写作建议

你可以主写 Codex 路线，同时在文末补一段 Claude Code 作为备选路线，不要让正文分裂。

## 第 3 篇

### 标题建议

从会提问到会交付：AI Vibecoding 真正有用的不是生成代码，而是工作流

### 本篇目标

让用户从“偶尔让 AI 帮我写点东西”升级到“我知道该怎样和 AI 一起完成任务”。

### 核心观点

- 工具价值不在生成，而在完整开发闭环
- 高质量使用方式一定包含理解、实现、测试、评审和迭代
- 从今天开始就应该学会把任务拆成更稳定的流程

### 适合展开的结构

1. 为什么很多人用了很久 AI 还是不稳定
2. 工作流视角和 Prompt 视角的差别
3. OpenAI 内部怎么把 Codex 用进真实研发
4. 初学者可以先建立哪条最小闭环

### 可用来源

- [[2026-03-23_pdf_openai_how-openai-uses-codex]]
- [[2026-03-23_article_openai_practical-guide-building-ai-agents]]

## 第 4 篇

### 标题建议

为什么 AGENTS.md 很重要：AI 编程从个人玩具走向项目级协作的分水岭

### 本篇目标

帮助用户理解：真正进阶之后，经验不能只放在脑子里和 prompt 里，而是要写进项目。

### 核心观点

- 项目级 agent 协作需要可移植、可复用的上下文格式
- AGENTS.md、skills、custom agents 本质上都在做“经验固化”
- 这是从个人使用走向团队或长期项目的关键一步

### 适合展开的结构

1. 为什么单次 prompt 不够
2. AGENTS.md 在解决什么问题
3. GitHub custom agents 和 skills 在补什么
4. 个人用户也能从这里学到什么

### 可用来源

- [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]
- [[2026-03-23_article_github_about-custom-agents]]

## 第 5 篇

### 标题建议

从“AI 帮我写”到“AI 帮我跑流程”：subagents、hooks、checkpoint 到底意味着什么

### 本篇目标

解释什么叫真正的进阶使用方式，以及高手和新手的分水岭到底在哪里。

### 核心观点

- 自主性增强必须配合回退和边界
- 并行化、自动触发和后台任务，是工作流升级的关键能力
- 不是模型更强了，而是“你开始有一套系统”

### 适合展开的结构

1. 为什么多数人一直停留在“问答式”使用
2. checkpoint 为什么重要
3. subagents、hooks、background tasks 各解决什么问题
4. 怎样从今天开始为更自主的工作流做准备

### 可用来源

- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_github_about-custom-agents]]

## 第 6 篇

### 标题建议

AI Vibecoding 的天花板：为什么高手最后都会回到测试、安全和治理

### 本篇目标

给系列收口，让用户知道“更快生成”不是终点，真正的进阶一定会碰到质量和安全问题。

### 核心观点

- 能跑不等于可靠
- 代码质量、安全性、权限边界和 QA 会成为 Vibecoding 的真正分水岭
- 越想让 agent 更自主，越需要更清晰的边界和验证

### 适合展开的结构

1. 为什么初学者容易误以为“能运行就行”
2. Vibecoding 在 QA 上真正缺什么
3. 安全问题为什么不是可选项
4. 怎样建立最小可行的质量和安全意识

### 可用来源

- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2026-03-23_article_vibecontract]]
- [[2026-03-23_article_goodvibe]]

## 这套系列的写作建议

- 用“成长路径”写，不用“概念堆叠”写
- 每篇只解决一个阶段的问题
- 初级用户最需要的是路径感，不是名词密度
- 每篇结尾都给一个可以马上执行的小动作

## 参考来源

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
