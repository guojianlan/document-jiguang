---
type: source
source_type: link
status: ingested
ingested_at: 2026-04-29
domains: [domain/ai-coding, domain/ai-agent]
mentions: [Vibe Coders Guide, Markdown Specs, User Stories]
source_title: Vibe Coder's Guide
source_url: https://vibecoders.guide/
platform: website
processed_at: 2026-03-23
---

# Vibe Coder's Guide

## 链接信息

- 链接：https://vibecoders.guide/
- 平台：独立网站
- 类型：路线图 / 学习入口
- 本次重点读取：`Methodology` 标签页，对应首页中的 `The Idea-to-App Pipeline`

## 快速判断

- 这条链接在讲什么：给 AI-native 开发者提供一条从“会描述需求”到“会管理 agent 与系统”的学习路线图。
- 为什么值得存：适合作为你面向初学者用户的总入口，不需要一开始就进入复杂工具细节。
- 更像事实更新、观点表达，还是方法总结：方法总结 + 学习路径导航。

## 摘要

这是一个 2026 年仍在更新的开源学习站点，核心叙事是“不要只把注意力放在写语法上，而要转向描述需求、管理 agent、理解系统架构”。其中 `Methodology` 部分把 AI Vibecoding 的流程拆成 5 步：想法、规划、选型、代理执行、人工打磨。它的价值不在于某一篇单独文章，而在于它把学习顺序和实践动作拆成了适合新手理解的路径。

## 关键信息

- 首页明确把学习目标定义为 “become a Full-Stack Vibe Coder”
- 核心能力转向：描述问题、管理 agent、理解架构，而不是只记语法
- 提供了 Roadmap、Prompt Library、Tool Matrix 这类适合作为系列内容入口的结构
- `Methodology` 模块的 5 步为：
  - `The Big Idea / Ideation`：先定义问题、边界和价值
  - `The Plan / Blueprint`：先写规格，再让 AI 实现
  - `The Tools / Architecture`：优先走成熟技术栈，不让 AI 在基础选型上迷路
  - `The Builders / Implementation`：人负责调度 agent，循环执行 `Generate -> Test -> Refine`
  - `The Polish / Refinement`：最后由人补足体验、质感和产品判断

## Methodology 标签拆解

### Step 1. The Big Idea / Ideation

- 页面叙事：AI 降低了“写代码”的门槛，但没有降低“想清楚要做什么”的门槛。
- 对应动作：`Dream`、`Scope`、`Define Value`
- 可转成中文表达：先把问题、对象、价值说清楚，再动手。

### Step 2. The Plan / Blueprint

- 页面叙事：Vibe Coding 不是少做规划，而是更依赖规划。
- 对应动作：`SpecStory`、`Markdown Specs`、`User Stories`
- 可转成中文表达：AI 之前先写规格，避免一开始就生成大量偏题代码。

### Step 3. The Tools / Architecture

- 页面叙事：先定栈，少折腾。推荐走已经被大量实践过的组合。
- 对应动作：`Stack Selection`、`Database Schema`、`Auth Flow`
- 可转成中文表达：把选型、数据结构、认证链路先定好，AI 才能稳定输出。

### Step 4. The Builders / Implementation

- 页面叙事：人的角色从写代码转向调度和审查 agent。
- 对应动作：`Cursor Composer`、`v0 Generation`、`Agent Loops`
- 可转成中文表达：人不一定亲自写，但必须会拆任务、验收 diff、推进迭代。

### Step 5. The Polish / Refinement

- 页面叙事：最终质量依旧依赖人的审美、产品感和体验判断。
- 对应动作：`UX Review`、`Micro-interactions`、`Vibe Check`
- 可转成中文表达：AI 能把东西做出来，但“高级感”和“可用感”仍然要人兜底。

## 事实 / 观点 / 我的判断

### 事实

- `Methodology` 的正文数据不是写死在 HTML 里，而是由 `js/data.js` 注入。
- 站点把方法论明确拆成 5 个步骤，每个步骤都对应一个目标词和一组动作词。
- 页面把这部分命名为 `The Idea-to-App Pipeline`，定位是“2026 年如何做软件”。

### 来源观点

- 开发者应该从“语法书写者”转向“系统描述者”和“agent 管理者”。
- AI 时代不应减少规划，反而要强化规格先行。
- 最终产品品质依旧需要人类的品味和体验判断来把关。

### 我的判断

- 这套方法论很适合做你当前用户群体的入门认知框架，因为它不是从工具堆栈切入，而是从工作方式切入。
- 它的最大价值不是“技术正确性”，而是“教学结构清晰”，适合被改写成中文系列内容。
- 如果直接照搬英文原词，用户会觉得偏概念；如果转写成“想法 -> 规格 -> 选型 -> 调度 -> 打磨”，会更适合发布。

## 对我的价值

- 可作为 “AI Vibecoding 从入门到精通” 系列的总导航参考
- 适合放在第一篇内容里做认知建立
- 后续可以把它拆成学习阶段，而不是把它当单篇文章解读
- `Methodology` 这部分可以直接转成你自己的 5 步工作法，用在文章、分享图卡、课程大纲中

## 关联主题

- [[AI Vibecoding]]

## 下一步建议

- 并入 [[AI Vibecoding]] 主题笔记，作为“方法论框架”来源
- 后续如果继续做系列内容，可把这 5 步分别扩成 5 个子主题
- 发布时优先使用中文改写后的表达，不建议直接搬运英文标签
