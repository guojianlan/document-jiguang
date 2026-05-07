---
type: source
source_type: article
source_path: raw/sources/articles/2026-04-19_wechat_shugex_openspec-superpowers-from-zero-to-one.md
source_url: https://mp.weixin.qq.com/s/7EpVsLbFznkngJbD7tFA9A
source_title: 从零到一：OpenSpec + Superpowers 新项目全流程实战指南
author: 术哥（术哥无界 ShugeX）
publish_date: 2026-04-19
ingested_at: 2026-05-06
domains: [domain/ai-coding]
mentions: [OpenSpec, Superpowers, Claude Code, Cursor, Fission AI, Jesse Vincent, Prime Radiant, 术哥无界]
status: ingested
---

# 从零到一：OpenSpec + Superpowers 新项目全流程实战指南

## 来源信息

- 链接：https://mp.weixin.qq.com/s/7EpVsLbFznkngJbD7tFA9A
- 出处：微信公众号「术哥无界 ShugeX」
- 抓取方式：`web-access` skill 通过 CDP 直连 Chrome 抓取（WebFetch 直连被反爬挡掉），与用户手动复制内容比对一致

## 一句话摘要

把 OpenSpec（规约）和 Superpowers（执行）配对成一条端到端流水线——前者管 "做什么"、后者管 "怎么做"，握手只通过文件系统的 Markdown 文件，用看板系统从零到一演示 4 个阶段的实战。

## 关键事实（来自原文）

- **Superpowers 的定位**：Jesse Vincent / Prime Radiant 出品，安装在 Claude Code / Cursor 内，**不是 CLI 工具**，是一套自动触发的 Skills 系统
- **三级审查子代理**：每个任务由实现子代理 → spec reviewer → code quality reviewer 三层串行审查，全过才算完成
- **worktree 创建时机**：在 brainstorming 阶段就创建（源码标注 "REQUIRED when design is approved"），不是写代码时才创建
- **`/opsx:apply` 的归属**：是 OpenSpec 自身命令，**不是** Superpowers 的——同时装 Superpowers 时会附带触发 TDD 等技能，但底层执行是 OpenSpec 的
- **审查参照物的两层 spec**：Superpowers 的 spec reviewer 检查的是**实现计划中的 spec 描述**，不直接读 OpenSpec 的 spec 文件——OpenSpec spec 定义 what，Superpowers 计划定义 how，两份独立文档
- **brainstorming 不会自动识别 OpenSpec 目录**：要在对话里明确指出 `openspec/changes/<name>/` 的路径
- **subagent-driven-development 单会话内串行**：前后端要并行开发就得开两个独立的 AI 助手会话

## 作者观点（明确归属于作者）

- "OpenSpec 是立法机构，Superpowers 是执法机构"
- 严格的前后端分工正在被 AI 工具消解；技术壁垒从"会不会写代码"变成了"会不会写规约"
- 三人组（前端 + 后端 + 架构师）会逐渐演变为两人组（架构师 + AI 工具操作者）
- AI 抹平的是**实现层的壁垒，不是设计层的判断力**——技能分工在坍缩，思维分工还在
- 这套工具链对"需求明确、技术方案清晰"的项目效果好，对早期模糊试错项目人的判断力仍不可替代

## 我的判断

- **本篇最有沉淀价值的不是工作流细节，而是"两个 spec 的区分"这个澄清**——OpenSpec 的 spec（业务行为，what）和 Superpowers 实现计划里的 spec（工程步骤，how）在很多教程里被混为一谈，作者明确拉开是难得的清晰度，应该写进 [[Superpowers]] entity 与 [[OpenSpec]] entity 的对照段
- **"文件系统 handshake"这个机制值得归纳成 pattern**——两个独立工具不依赖 API/插件而靠 Markdown 文件做契约衔接，是 spec-driven 工具链能松耦合扩展的关键设计。这同时印证了 [[openspec-vibecoding_digest]] 中"工件 > 聊天历史"的判断
- **三级审查子代理是子代理编排的具体范式**，可作为 [[AI Agent]] 落地经验的反例样本——一般人讨论 multi-agent 都在说"分工"，作者揭示真正落地的是"流水线串行 + 三道审查关卡"，这种把 multi-agent 退化成质量门禁的做法值得记录
- **角色坍缩论部分留观察**——作者本人也承认对模糊项目不适用。我倾向于：当下的真问题不是"前后端要不要分工"，而是"懂 spec 的人和只懂代码的人差距在拉大"，这个判断更窄但更准
- **该文与已有的 OpenSpec 三篇是不同视角的互补**——之前 3 篇都是 OpenSpec 单工具视角，这篇第一次提供"OpenSpec + 另一个工具协作"的实战，应该和它们组成对比

## 关联主题

- [[OpenSpec]]：本次新增"OpenSpec + Superpowers 协作机制"段
- [[Superpowers]]：**新建** entity 页（之前 wiki 里没有）
- [[Claude Code]]：补充"作为 Superpowers 宿主"的角色证据
- [[AI 工作流]]：补充"工具链通过文件系统握手"的 pattern 证据
- [[AI Vibecoding]]：补充 Phase 3-4 的实战样本

## 下一步

- 与已有 [[openspec-vibecoding_digest]] 不同——那是学术 + 5 阶段对照，这是工程实战流水线
- 创建新 synthesis [[openspec-superpowers_workflow_digest]]：OpenSpec × Superpowers 协作机制 + 两个 spec 的区分 + 三级审查 pattern
- # TODO 后续可补微信号上"术哥无界"系列其他几篇 AI 编程实战，看是否能形成 entity 页
