---
type: source
source_type: article
source_path: raw/sources/articles/idoubi/2025-04-12_idoubi_mcp-lifecycle.md
source_url: https://idoubi.ai/blog/mcp-lifecycle
source_title: 详解 MCP 连接生命周期
author: 艾逗笔（idoubi）
publish_date: 2025-04-12
ingested_at: 2026-05-06
domains: [domain/ai-agent]
mentions: [MCP, Anthropic, JSON-RPC, TCP]
status: ingested
---

# 详解 MCP 连接生命周期

## 一句话摘要

MCP 三件套之二——三阶段（初始化 / 操作 / 关闭）+ 版本协商 + 8 项能力协商 + 三大错误场景的完整握手流程，类比 TCP。

## 关键事实

- 初始化：版本协商 + 能力协商，client 发 initialize → server 响应 → client 发 initialized
- 8 项能力：roots / sampling / prompts / resources / tools / logging / experimental
- 操作：tools/list → tools/call 等流程
- 关闭：stdio 关 stdin → SIGTERM/SIGKILL；HTTP 关连接
- 三大错误：超时 / 版本不匹配 / 能力协商失败

## 作者观点

- MCP 生命周期保证可靠有序通信 + 灵活能力扩展
- 三大错误场景是必须处理的硬约束

## 我的判断

- 三件套中"流程化最强"的一篇——把 MCP 类比 TCP 是个好用的认知锚点
- 与 [[2025-04-13_article_idoubi_mcp-architecture]] 配合可作 [[MCP]] entity 的"协议骨架"双柱

## 关联

- [[MCP]]、[[Anthropic]]
