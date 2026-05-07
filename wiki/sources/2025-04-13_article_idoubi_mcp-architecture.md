---
type: source
source_type: article
source_path: raw/sources/articles/idoubi/2025-04-13_idoubi_mcp-architecture.md
source_url: https://idoubi.ai/blog/mcp-architecture
source_title: 详解 MCP 核心架构
author: 艾逗笔（idoubi）
publish_date: 2025-04-13
ingested_at: 2026-05-06
domains: [domain/ai-agent]
mentions: [MCP, Anthropic, Claude, Cursor, LSP, JSON-RPC, 高德地图, Flomo]
status: ingested
---

# 详解 MCP 核心架构

## 一句话摘要

MCP 三件套之三——主机/客户端/服务器三层架构 + 4 大设计原则 + 3 类功能（资源 / 提示词 / 工具）+ 4 类消息 + 安全框架。

## 关键事实

- 三层：主机（Claude / Cursor）→ 客户端进程 ↔ 服务器进程，1:1 独立连接
- 4 大原则：服务器易构建 / 高度可组合 / 服务器隐私 / 功能逐步添加
- 3 类功能：资源 / 提示词 / 工具
- 4 类消息：请求 / 响应 / 通知 / 批处理
- 安全机制：用户同意 + 数据隐私 + 工具安全 + LLM 采样控制

## 作者观点

- 安全是"伴随强大功能而来"的必然考虑
- 主机做复杂编排，服务器专注单一能力——关注点分离
- MCP 类似 LSP 对编辑器生态的规范作用

## 我的判断

- "MCP 类比 LSP" 这个比喻比 [[2025-06-16_article_idoubi_mcp-is-all-you-need]] 里的 "MCP 类比 HTTP" 更准——LSP 是协议解耦工具与编辑器，MCP 是协议解耦工具与 LLM，**结构同构**
- 三件套总评：技术细节 ★★★★★，但缺乏"哪些 MCP 服务器值得用 / 哪些是噱头"的批判性视角——这部分需要从更晚期的 [[2026-01-03_article_idoubi_my-ai-2025]] 补

## 关联

- [[MCP]]、[[Anthropic]]、[[AI Agent]]
