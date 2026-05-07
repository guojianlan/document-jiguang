---
type: source
source_type: article
source_path: raw/sources/articles/idoubi/2025-04-11_idoubi_mcp-transport.md
source_url: https://idoubi.ai/blog/mcp-transport
source_title: 详解 MCP 传输机制
author: 艾逗笔（idoubi）
publish_date: 2025-04-11
ingested_at: 2026-05-06
domains: [domain/ai-agent]
mentions: [MCP, Anthropic, JSON-RPC, stdio, SSE, Streamable HTTP, REST]
status: ingested
---

# 详解 MCP 传输机制

## 一句话摘要

MCP 三件套之一——stdio / SSE / Streamable HTTP 三种官方传输 + 自定义 REST Transport 的实现细节，揭示协议与传输解耦的设计哲学。

## 关键事实

- **stdio**：本地进程通信，换行分隔，无依赖 / 快 / 安全，但单进程限制
- **SSE**（即将废弃）：HTTP 双通道（SSE + POST），多客户端但 serverless 环境有问题
- **Streamable HTTP**（2025-03-26 新增）：单通道 + 会话管理 + 断点恢复，云原生友好
- 自定义 REST Transport：无状态短连接，适合分布式 MCP 代理

## 作者观点

- MCP 协议与传输解耦——任何双向通信通道都能跑
- SSE 被替代反映云架构演进的需要

## 我的判断

- 这是 idoubi MCP 三件套（11/12/13 三天连发）里**最技术性的一篇**——值得直接当作 [[MCP]] entity 的"传输层"参考章节
- 时序证据：2025-03-26 Streamable HTTP 出现 → 2025-04-11 idoubi 已经写文 → **响应官方变化的速度极快**，这是 idoubi 作为"MCP 布道者"角色的早期表现

## 关联

- [[MCP]]、[[Anthropic]]
