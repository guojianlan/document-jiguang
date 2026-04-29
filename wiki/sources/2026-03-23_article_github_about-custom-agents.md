---
type: source_note
source_type: article
status: processed
topic: AI Vibecoding
tags: [source/article, status/processed, topic/agent]
source_title: About custom agents
source_url: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents
author: GitHub Docs
publisher: GitHub
processed_at: 2026-03-23
---

# About custom agents

## 来源信息

- 原文链接：https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents
- 作者：GitHub Docs
- 发布平台：GitHub

## 一句话摘要

GitHub 把 custom agents 定义为可针对特定工作流、规范和上下文定制的 agent，这说明“把经验写成 agent profile”已经成为主流方向。

## 核心观点

- Custom agents 的价值是把重复说明变成可复用配置
- Agent profile 可以编码团队规范、工具和上下文
- 未来 agent 使用会越来越像“挑选角色”而不是“每次重新提示”

## 关键事实 / 数据 / 论据

- GitHub 用 Markdown + YAML frontmatter 定义 agent profile
- 这些 custom agents 可在 GitHub.com、IDE 和 Copilot CLI 中复用
- 配置内容包括 name、description、prompt、tools、MCP server 等

## 方法 / 框架 / 流程

- 定义 agent profile
- 指定行为、工具和上下文
- 在不同表面复用同一个 agent

## 我认为最值得保留的内容

- 可复用结论：进阶用户不再只用一个万能助手，而是把不同任务做成不同 agent
- 可引用表达：Custom agents are specialized versions of the Copilot agent
- 可延展讨论：可与 AGENTS.md、skill、profile 三者的关系一起写

## 与哪些主题相关

- [[AI Vibecoding]]
- [[AI Agent]]

## 下一步动作

- 作为系列第 4 篇和第 5 篇的补充来源
