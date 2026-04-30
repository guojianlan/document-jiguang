---
type: entity
aliases: [Claude Code, claude-code, ClaudeCode]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
related_concepts: [AI Agent, AI 工作流, AI Vibecoding, autonomy, 模型能力变化]
related_entities: [Anthropic, Codex]
status: active
---

# Claude Code

## 是什么

Anthropic 出的 coding agent 产品，把 Claude 模型包装成可以在终端持续工作的开发助手。

## 核心机制

按当前 wiki 已采集的来源整理：

- **Checkpoints**（[[autonomy|自主性]]前置）：agent 自主执行前自动保存状态，让用户可以回退（来源：[[2026-03-23_article_anthropic_claude-code-autonomy]]）
- **Subagents**：把任务拆给多个并行子代理处理（来源：同上）
- **Hooks**：在 tool event 上挂 shell 命令，例如自动跑测试 / lint / 格式化（来源：同上）
- **Background tasks**：长进程不阻塞当前对话（来源：同上）
- **Sandboxing**：filesystem isolation + network isolation 提供边界，让 agent 能在边界内更自主，又减少权限提示（来源：[[2026-03-23_article_anthropic_claude-code-sandboxing]]）

## 我看到的实际表现

- 仓库内 `.claude/skills/` + `.claude/settings.json` 的 hook 机制是 Claude Code 真实使用证据（详见 `99_System/SVG资产生成与校验说明.md` 的 hook 配置）
- 当前仓库的 `/critique`、`/ingest`、`/query`、`/lint` 等 skill 都是 Claude Code skill 体系下落地的

## 与其他 entity 的对照

- **vs [[Codex]]**（OpenAI）：
  - Claude Code 走 "checkpoint + sandbox" 路线（先给边界，边界内自主）
  - Codex 走 "AGENTS.md + cloud sandbox" 路线（详见 [[2026-03-23_pdf_openai_how-openai-uses-codex]]、[[2026-03-23_article_openai_get-started-with-codex]]）
  - 两者的"自主性"语义不同：Claude 强调"可回退"，Codex 强调"可托管"
- **vs [[OpenSpec]]**：OpenSpec 是规格驱动的协作流程框架，Claude Code 是工具产品；前者管"做什么"，后者管"怎么做"。可以叠加使用——OpenSpec 写 change，Claude Code 跑实现

## 关键 release 时间线

- 2025-09-29：autonomy 增强（checkpoints、subagents、hooks、background tasks）
- 2025-10-20：sandboxing（filesystem + network isolation）

## 待补 / 待证伪

- # TODO 与 [[GitHub Copilot]] 在 skill / profile 抽象上的真实使用差异（已建页 + 已建对照表，但仓库内尚无双轨实战）
- # TODO 实际 hook 误报率与上下文消耗 — 需要实战观测，不能靠官方 release notes 判断
- # TODO subagent 在大型 monorepo 的并行收益 — 仓库内尚未跑过对照
- # TODO 与 Cursor 的协作位（如果你同时用，是叠加还是替代）

## 相关阅读

仓库内：
- [[Anthropic]]
- [[autonomy]]
- [[AI Agent]]
- 系统约定：[CLAUDE.md](/Users/apple/Desktop/project/document/CLAUDE.md)
- skill 体系：`.claude/skills/`（[ingest](/Users/apple/Desktop/project/document/.claude/skills/ingest/SKILL.md) / [query](/Users/apple/Desktop/project/document/.claude/skills/query/SKILL.md) / [lint](/Users/apple/Desktop/project/document/.claude/skills/lint/SKILL.md) / [critique](/Users/apple/Desktop/project/document/.claude/skills/critique/SKILL.md) / [verify](/Users/apple/Desktop/project/document/.claude/skills/verify/SKILL.md)）
