---
type: source
source_type: article
source_path: raw/sources/articles/idoubi/2025-12-29_idoubi_ai-agents-work-together.md
source_url: https://idoubi.ai/blog/ai-agents-work-together
source_title: 我招了 6 个 AI 员工一起干活
author: 艾逗笔（idoubi）
publish_date: 2025-12-29
ingested_at: 2026-05-06
domains: [domain/ai-agent, domain/ai-coding]
mentions: [Claude Code, Codex, Gemini CLI, OpenCode, Crush, KiloCode, Anthropic, OpenAI, Google, Opus 4.5, GPT-5.2, Gemini 3, tmux, aicoding.sh]
status: ingested
---

# 我招了 6 个 AI 员工一起干活

## 一句话摘要

tmux 多窗口同步管理 Claude Code / Codex / Gemini CLI / OpenCode / Crush / KiloCode 6 个 coding agent——演示"AI 员工工作间"的工程实现。

## 关键事实

- 6 个 Agent：Claude Code / Codex / Gemini CLI / OpenCode / Crush / KiloCode
- 底层模型：Opus 4.5 / GPT-5.2 / Gemini 3 等
- tmux 多窗口 + Ctrl+B S 切换同步发送模式
- aicoding.sh 代理平台统一 API，降低罢工风险

## 作者观点

- Agent 多开窗口不如分布式编排
- 单一 Agent 在特定场景有优势：Codex UI 质量最高、Gemini 内置搜索最强
- 多 Agent 组合分散风险——单 Agent 不可用时有备选

## 我的判断

- 这是 idoubi 第一篇 multi-agent 实战文，与 wiki 已有 [[Superpowers]] 的"三级审查 pattern"形成有趣对照——**Superpowers 是单 agent 内部串行流水线，idoubi 是多 agent 跨产品同时调度**，两种 multi-agent 范式
- "tmux + 同步发送"是个低技术含量但高实用性的 hack，比那些复杂的 multi-agent framework 更工程务实
- 与 [[2025-12-31_article_idoubi_ai-agents-cowork]] 是同一周连发——可以合并理解为"**Agent 招聘 + 入职评估**"两步走

## 关联

- [[Claude Code]]、[[Codex]]、[[AI Agent]]、[[AI 工作流]]
