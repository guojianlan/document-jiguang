---
type: concept
aliases: [AI 内容生产, AI content production]
first_seen: 2026-03-20
updated_at: 2026-04-29
sources: []
related_entities: [Claude Code, Anthropic]
related_concepts: [AI 工作流, AI Vibecoding, AI Agent]
maturity: tracked
status: active
tags: [topic, topic/content]
---

# AI 内容生产

## 定义

用 AI 完成内容收集、拆解、重组、成稿、分发——而不是只做简单改写。本仓库就是 AI 内容生产的实例：从 [[AI 工作流]] 角度看是流程，从读者角度看是输出。

## 关键问题

- 外部来源如何转成自己的知识资产
- 什么样的结构化拆解最适合复用
- 怎样避免内容只有摘要、没有观点

## 当前实践证据（仓库自身）

本仓库按 [LLM Wiki 模式](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 把 AI 内容生产拆成三层：

1. **来源层**：raw sources 进 `01_Sources/`，由 [[Claude Code]] 跑 `/ingest` 写 SourceNote 摘要
2. **wiki 层**：摘要 fan-out 触达 entities / concepts / syntheses，知识在 `02_Notes/` 累积
3. **发布层**：从 syntheses 派生发布稿到 `03_Outputs/`，跑 `/publish-article` + `/critique` 去 AI 味

**判断**：AI 内容生产的真正杠杆**不在写**，**在累积**。每篇文章只是一次发布，但 wiki 越用越富，下次写就更省力。

## 我倾向的判断

- **不要从 source 直接写发布稿**——必须经过 wiki 层沉淀，否则每篇都从零开始
- **观点比摘要值钱**——SourceNote 里"事实/观点/判断"分离的训练就是为这个
- **可发布形态不止文章**——syntheses 页本身可发布；图卡、对照表也是合法产物

## 反例与边界

- 单条素材整理 ≠ AI 内容生产——前者是 ingest，后者是从素材到对外发布的全链路
- 对极小规模任务（一次性短文）整套流程过重，直接 prompt 即可

## 与其他 concept 的对照

- vs [[AI 工作流]]：AI 工作流是骨架，AI 内容生产是它在内容领域的实例
- vs [[AI Vibecoding]]：Vibecoding 关注用 AI 写代码；本概念关注用 AI 写内容；相邻领域，工具链常重叠（[[Claude Code]] 既做 coding 也做内容）

## 待补

- # TODO 跨平台分发的真实数据回流（飞书、公众号、社群的实际表现）
- # TODO 视频 / 音频 / PDF 来源的统一拆解框架（仓库已有模板，缺实战验证）
- # TODO 用户群体反馈如何回写到 wiki

## 相关阅读

- [[AI 工作流]]
- [[AI Vibecoding]]
- [[Claude Code]]
- 仓库实际产出：`03_Outputs/Drafts/`
