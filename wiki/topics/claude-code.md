---
type: topic
slug: claude-code
aliases: [Claude Code, claude-code, ClaudeCode]
domains: [domain/ai-coding, domain/ai-agent]
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
  - 2024-12-16_article_idoubi_use-ai-coding-copilot
  - 2025-12-29_article_idoubi_ai-agents-work-together
  - 2025-12-31_article_idoubi_ai-agents-cowork
  - 2026-01-24_article_idoubi_vibe-coding-workany
  - 2026-04-05_article_idoubi_my-vibe-coding-projects
  - 2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
  - 2026-03-25_article_huishe-ji_figma-official-mcp
  - 2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills
  - 2026-04-30_article_huishe-ji_claude-design-alternative-30-skills
  - 2026-03-13_article_huishe-ji_vibe-coding-claude-code-yolo-auto-test
related_topics: [codex, mcp, openspec, ai-agent, autonomy, vibe-coding-path]
status: active
created_at: 2026-03-23
updated_at: 2026-05-07
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

## 与其他 topic 的对照

- **vs [[codex|Codex]]**：
  - Claude Code 走 "checkpoint + sandbox" 路线（先给边界，边界内自主）
  - Codex 走 "AGENTS.md + cloud sandbox" 路线（详见 [[2026-03-23_pdf_openai_how-openai-uses-codex]]、[[2026-03-23_article_openai_get-started-with-codex]]）
  - 两者的"自主性"语义不同：Claude 强调"可回退"，Codex 强调"可托管"
- **vs [[openspec|OpenSpec]]**：OpenSpec 是规格驱动的协作流程框架，Claude Code 是工具产品；前者管"做什么"，后者管"怎么做"。可以叠加使用——OpenSpec 写 change，Claude Code 跑实现

## 内部架构（inside-out 视角，2026-04 补充）

[[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]] 罕见地从"造车人"视角拆解 Claude Code 内部 12 个组件：

| 层 | 组件 | 关键判断 |
|---|---|---|
| 核心 | 主循环 | 模型自己决定停止条件，不需要 if-else |
| 安全 | 工具箱 + 权限边界 | 没注册的工具看不见也用不了；加新工具不改循环代码 |
| 纪律 | Todo 工具 | 防注意力漂移，连续 3 轮没更新会被系统悄悄塞提醒 |
| 上下文卫生 | 子智能体（Subagent）| 父级通过 task 工具创建，子级有干净上下文，最终只回传摘要——保护父上下文。**子级没有 task 工具**避免无限套娃 |
| 知识扩展 | Skill 两级加载 | 启动时只注入名称+描述（几十 token），调用时才加载完整 SKILL.md（几千 token）——比 Function Calling 省 token 的关键 |
| 执行扩展 | Hook、MCP 集成、记忆系统 | 进一步组件 |

**核心架构判断**："循环不动，只往工具箱/Skill 库添东西"——这是 Claude Code 能持续扩展的根本前提，与 release notes 描述的 "checkpoint / subagent / hook" 等表层能力对应的内部机制。

## 关键 release 时间线

- 2025-09-29：autonomy 增强（checkpoints、subagents、hooks、background tasks）
- 2025-10-20：sandboxing（filesystem + network isolation）
- 2026-03-25：Figma 官方 MCP 接入（[[2026-03-25_article_huishe-ji_figma-official-mcp]]）
- 2026-Q1：Skill 生态爆发——Superpowers 14 项 + Open Design 19 项 + Impeccable 21 指令 + UI Skills 15 + Taste/Better Icons/UI Design Brain 等共数百个开源 skill

## 第三方实战视角（2025-2026）

横向评测（[[2025-12-31_article_idoubi_ai-agents-cowork]]）：

- **综合最强**：Claude Code（在 Agents.md / Agent Skills / 协作架构师等多任务上稳）
- **UI 质量最高**：Codex + GPT-5.2，但慢 5x
- **联网搜索最强**：Gemini CLI（内置 GoogleSearch）
- **Agent Skills 加载最强**：Claude Code 的渐进式加载

全自动 Vibe Coding 实战（[[2026-01-24_article_idoubi_vibe-coding-workany]] + [[2026-04-05_article_idoubi_my-vibe-coding-projects]]）：

- 一周做出桌面 Agent MVP（WorkAny），3 个月迭代成 9 产品矩阵
- 成本曲线：$110 OpenRouter → Claude Pro → Claude Max（顶配仍遇限频）
- 衍生品 **open-agent-sdk**（从 Claude Code 源码提取，2k Stars）——开源社区对闭源 Claude Agent SDK 的回应

## 待证伪 / 待补

- # TODO 与 Copilot 在 skill / profile 抽象上的真实使用差异（仓库内尚无双轨实战）
- # TODO 实际 hook 误报率与上下文消耗 — 需要实战观测，不能靠官方 release notes 判断
- # TODO subagent 在大型 monorepo 的并行收益 — 仓库内尚未跑过对照
- # TODO 与 Cursor 的协作位（如果你同时用，是叠加还是替代）

## 相关来源

- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2024-12-16_article_idoubi_use-ai-coding-copilot]]
- [[2025-12-29_article_idoubi_ai-agents-work-together]]
- [[2025-12-31_article_idoubi_ai-agents-cowork]]
- [[2026-01-24_article_idoubi_vibe-coding-workany]]
- [[2026-04-05_article_idoubi_my-vibe-coding-projects]]
