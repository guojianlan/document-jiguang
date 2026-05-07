---
type: source
source_type: article
source_path: raw/sources/articles/2026-03-25_wechat_huishe-ji_figma-official-mcp.md
source_url: https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488739&idx=1
source_title: Figma 终于出了官方 MCP！无缝接入 Cursor / Codex，一键还原设计稿
author: 萤柳
account: 会设计
publish_date: 2026-03-25
ingested_at: 2026-05-07
domains: [domain/ai-coding, domain/ai-agent]
mentions: [Figma, Figma MCP, Cursor, Codex, Claude Code, VS Code, Dev Mode, MCP]
status: ingested
---

# Figma 终于出了官方 MCP！无缝接入 Cursor / Codex

## 来源信息

- 链接：搜狗微信跳转链
- 出处：微信公众号「会设计」（作者萤柳）

## 一句话摘要

记录 Figma 官方 MCP server 在 2026-03 发布后的接入实操——Dev Mode 内开 MCP → Cursor 连接 → 设计稿链接粘贴到 chat → 一键转代码。证明 MCP 已成为"设计工具一线厂商"的标配集成方式。

## 关键事实（来自原文）

- Figma 官方 MCP server 在 2026-03-25 前后正式宣布
- 接入流程：Figma 内按 Shift+D 进 Dev Mode → 点击 MCP 区域 + 号 → 选 Cursor（或 VS Code 等）→ 浏览器授权 → Cursor 看到 Figma 绿点 → 重启 Cursor → 在 chat 粘 Figma 链接 → 弹出 Figma 选 Add for Myself → Add Plugin → Allowlist MCP Tool 加白名单（一次性，避免后续每次确认）
- 接入后 AI 看到 Figma 链接自动拉取数据
- 支持工具：Cursor / Codex / VS Code / Claude Code 等
- 之前作者已用过非官方接入（参考其早前文章「我用 Codex 免费打通 Figma」、「Claude Code 打通 Figma 实测」）

## 作者观点

- "都是可以一键设计稿转代码、自动提取设计规范、读取设计规范生成 UI 等操作"
- 文章本身是教程性质，没有强观点输出

## 我的判断

- **本篇是 [[mcp]] topic 的"重要厂商采用证据"**——Figma 是设计工具一线，它官方接入 MCP 意味着 MCP 已渗透到非 LLM 生态的工具厂商
- **跟 wiki 现有 mcp 时间线衔接**：mcp topic 里时间线最后一条是"2026 初 MCP.so 年访问 11M"，本篇可补"2026-03 Figma 官方 MCP 发布"作为新节点
- **Figma 走 official MCP** vs 之前的"开发者社区做的 MCP wrapper"——这是 MCP 生态成熟的标志：从"工具厂商被动被接入"到"工具厂商主动提供"
- **Figma → Code 这个流向**特别值得记：传统设计→开发链路是单向断点（设计师做完，工程师手翻），Figma MCP 让 AI 工具直接读设计稿生成代码，把这个断点接上了。**这是 [[design-md-pattern]] 候选 topic 的相邻角度**——DESIGN.md 走规范注入，Figma MCP 走运行时拉取，两条路解决同一问题
- 作者本身是设计师视角，文章实操偏多、观点偏少，但事实清晰可信

## 关联主题

- [[mcp]]：时间线补"2026-03 Figma 官方 MCP 发布"，重要厂商采用证据
- [[claude-code]]：补"Claude Code + Figma MCP"实战集成证据
- [[codex]]：同上
- 候选新 topic：[[design-md-pattern]]（侧面证据——MCP 是 DESIGN.md 的运行时同源 pattern）

## 下一步

- mcp topic 时间线补 2026-03 节点
- 跟 design-md-pattern 候选 topic 做对照（设计→AI 的两条路：规范注入 vs MCP 拉取）
