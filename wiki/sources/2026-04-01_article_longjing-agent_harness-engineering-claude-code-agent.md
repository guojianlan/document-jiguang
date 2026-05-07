---
type: source
source_type: article
source_path: raw/sources/articles/2026-04-01_wechat_longjing-agent_harness-engineering-claude-code-agent.md
source_url: https://mp.weixin.qq.com/s/WTD0TEKn0h_vjgNR1WGSxQ
source_title: 2小时速通 Harness 工程：如何从零搭一套Claude Code智能体系统
author: 龙井Agent
publish_date: 2026-04-01
ingested_at: 2026-05-07
domains: [domain/ai-agent, domain/ai-coding]
mentions: [Claude Code, Harness, Skill, MCP, Subagent, Hook, Todo Tool, learn-claude-code, shareAI-lab]
status: ingested
---

# 2小时速通 Harness 工程：如何从零搭一套 Claude Code 智能体系统

## 来源信息

- 链接：https://mp.weixin.qq.com/s/WTD0TEKn0h_vjgNR1WGSxQ
- 出处：微信公众号「龙井Agent」
- 实操材料：https://github.com/shareAI-lab/learn-claude-code（12 节课）

## 一句话摘要

罕见的 inside-out 视角——把 Coding Agent 内部 12 个组件（循环 / 工具箱 / Todo / 子 Agent / Skill / Hook / 上下文 / 权限）从零搭一遍，论证"Agent 不是 if-else 流程，是给模型搭的工作环境（Harness）"。

## 关键事实（来自原文）

- **Harness 工程定义**：Harness = 工具 + 知识 + 上下文管理 + 权限边界。"模型是司机，Harness 是车，你不需要教司机怎么开车，你只需要造一辆好车"
- **S01 最小智能体**：核心就是一个循环——让智能体不断调用工具直到它自己判断不再需要。**停止条件由模型决定，不需要任何 if-else**
- **S02 工具箱**：把允许用的工具注册进去，没注册的看不见也用不了；加新工具不改循环代码
- **S03 Todo 清单**：防止注意力漂移；连续 3 轮没更新 Todo，系统悄悄塞提醒（用户看不到，智能体看得到）
- **S04 子智能体**：父 Agent 通过 task 工具创建子 Agent，子 Agent 拥有干净上下文独立工作，最终只传回简短摘要——保持父 Agent 上下文整洁。子 Agent **没有** task 工具，避免无限套娃
- **S05 Skill 加载分两层**：第一层启动时只注入技能名称 + 简短描述（几十 token），第二层智能体决定调用时才加载完整 SKILL.md（几千 token）
- **后续课程涉及**：Hook、上下文压缩、权限边界、MCP 集成、记忆系统等

## 作者观点

- "智能体就是大模型本身，它天生会推理、会决策"——开发智能体不是写流程，是给它造好环境
- 加新能力的设计原则：**循环不动，只往工具箱/Skill 库添东西**——这是 Claude Code 能持续扩展的根本架构
- Skill 两级加载机制是 Claude 生态比 Function Calling 更省 token 的关键

## 我的判断

- **本篇最有沉淀价值的不是"如何用 Claude Code"，而是"Claude Code 内部由什么组成"**——wiki 当前所有 Claude Code 相关 source 都是从用户视角讲，唯独这篇从架构师视角讲，**填补 wiki 关键空白**
- **"循环不变 + 工具箱可插拔"** 这个判断比任何 release notes 都更说明 Claude Code 为什么能活——这是它能一直加新能力的内部前提
- 子 Agent 的"干净上下文 + 摘要回传"机制，是当前 multi-agent 范式（[[ai-agent]] topic 已记录的三种）之外的第四种——**上下文卫生型**：不是"分工"也不是"流水线"，是"保护主上下文"。建议补到 ai-agent topic
- Skill 两级加载机制对应了 [[mcp]] topic 提到的"按需加载 vs 全量注入"对比的另一面——值得在 mcp 与 skill 的对照段补充
- 可能新建 topic：`agent-internals`（agent 内部架构）——这是与 [[ai-agent]]（外部路线对照）正交的视角

## 关联主题

- [[claude-code]]：补"内部架构"段
- [[ai-agent]]：补"上下文卫生型 multi-agent"作为第四种范式
- [[mcp]]：呼应"按需加载"原则
- 候选新 topic：[[agent-internals]]（建议提议晋升）

## 下一步

- 配合 [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]（Superpowers skill 详解）形成"agent 内部 + skill 生态"对照
- 跟现有 [[Claude Code 核心机制]] 段对照，看是否需要补 Subagent 实现细节
