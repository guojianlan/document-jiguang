---
type: entity
aliases: [OpenSpec, openspec]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_link_openspec-practical-guide
  - 2026-03-23_link_openspec-e4-bd-bf-e7-94-a8-e6-89-8b-e5-86-8c
  - 2026-03-23_link_openspec-ai-workflow-analysis
related_entities: [Claude Code, Codex]
related_concepts: [AI 工作流, AI Vibecoding, AI Agent, AI 内容生产]
status: active
tags: [topic, topic/workflow, topic/ai-coding]
---

# OpenSpec

## 主题定义

这里讨论的不是某个单独命令怎么用，而是 OpenSpec 如何把 AI 编程从“依赖聊天历史的即时生成”，升级成“基于规格工件的可审查协作流程”。

## 为什么值得持续追踪

- 它切中的是真实 AI 编程痛点：上下文漂移、需求跑偏、结果难验证
- 它兼顾方法论和工具落地，既有工件结构，也有 CLI 与 Slash Commands
- 它适合做长期主题，因为既可以写入门教程，也可以写团队实践、流程治理和跨语言复刻案例

## 关键问题

- OpenSpec 到底是工具、格式，还是一套工作方式
- 它和普通 prompt 编程、OpenAPI、Spec Kit 的差别是什么
- 什么样的任务值得走 OpenSpec，什么样的任务没必要
- 怎样写 proposal、design、spec、tasks 才能真正约束 AI
- OpenSpec 最适合个人，还是更适合团队

## 当前稳定结论

- OpenSpec 的核心价值不是“多写文档”，而是把意图、边界、场景和验证从聊天记录中外置出来
- 对 AI 来说，proposal、design、spec、tasks 共同构成了更稳定的上下文锚点
- 对人来说，最值得重视的不是命令记忆，而是工件质量，尤其是 spec 和 scenario 的表达质量
- 它最适合中等复杂度以上、需要跨会话推进、需要验证和长期维护的任务
- 它不应该被神化。对特别小的一次性任务，完整工作流可能会显得过重

## 与 Vibecoding 5 阶段的咬合

OpenSpec 不该作为 Vibecoding 入门工具——但它是 [[AI Vibecoding]] **第 3 阶段（工作流升级）和第 5 阶段（质量与安全）的具体落地**。三条独立证据：

- [[2026-03-23_link_vibe-coders-guide]] Step 2 "Plan/Blueprint" 直接说 "Vibe Coding 不是少做规划，而是更依赖规划"——动作词 `Markdown Specs` / `User Stories` 就是 OpenSpec 的 proposal + spec 工件
- [[2026-03-23_article_vibecontract]] 学术论文：Vibecoding 缺的是 QA 机制——OpenSpec 的 scenarios + 验证段就是 QA 工件
- [[2026-03-23_article_goodvibe]] 学术论文：安全性需显式优化——OpenSpec 的 design 段是天然约束工件位置

完整对照详见 [[openspec-vibecoding_digest]]。

## 相关来源

- [[2026-03-23_link_openspec-practical-guide]]
- [[2026-03-23_link_openspec-e4-bd-bf-e7-94-a8-e6-89-8b-e5-86-8c]]
- [[2026-03-23_link_openspec-ai-workflow-analysis]]
- [[2026-03-23_link_vibe-coders-guide]]（间接证据：5 步方法论 Step 2 等价于 OpenSpec 思路）
- [[2026-03-23_article_vibecontract]]（学术背书：QA 缺口）
- [[2026-03-23_article_goodvibe]]（学术背书：安全约束）

## 与其他 entity 的对照

- **vs [[Claude Code]]**：Claude Code 是 coding agent 工具产品，OpenSpec 是规格驱动的协作流程框架——叠加使用最佳：OpenSpec 写 change，Claude Code 跑实现（详见 [[Claude Code#与其他 entity 的对照]]）
- **vs [[Codex]]**：Codex 用 AGENTS.md + cloud sandbox 路线，OpenSpec 用 proposal/design/spec/tasks 工件路线；前者把约定写在仓库根，后者把约定写在每次 change

## 当前可输出方向

- 面向中文读者的 OpenSpec 入门教程
- OpenSpec 与 [[AI 工作流]] 的关系分析
- OpenSpec 最小实践案例
- 面向团队的落地建议与误区清单

## 待补内容

- 更多来自官方文档的命令细节与 profile 选择差异
- 一个真正贴近中文团队的 brownfield 接入案例
- 和其他 spec/workflow 框架的横向比较
- # TODO 用 OpenSpec 跑一个本仓库真实任务，验证 [[openspec-vibecoding_digest]] 的 5 阶段对照
