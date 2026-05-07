---
type: topic
slug: agents-md
aliases: [AGENTS.md, agents.md, AAIF AGENTS.md]
domains: [domain/ai-agent, domain/ai-coding, domain/wiki-meta]
sources:
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
related_topics: [codex, claude-code, ai-workflow, openspec, design-md-pattern, claude-skill-ecosystem]
status: active
created_at: 2026-05-07
updated_at: 2026-05-07
---

# AGENTS.md（跨厂商 agent 项目约定标准）

## 是什么

放在仓库根目录的 markdown 文件，描述"agent 在这个项目应该怎么工作"——agent 进项目先读 AGENTS.md 再行动。

**关键事实：是 [Linux Foundation Agentic AI Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)（2025-12-09 成立）正式背书的跨厂商标准**——OpenAI 主推，Anthropic / Google / Microsoft / AWS 共建，自 2025-08 发布以来 60,000+ 项目采用。

## 谁读 AGENTS.md

| 工具 | 是否原生读 |
|---|---|
| Codex CLI | ✅ 项目根 + `~/.codex/AGENTS.md`（user 级）|
| Cursor | ✅ |
| GitHub Copilot CLI | ✅ |
| Gemini CLI | 部分（通过 GEMINI.md 自定义 import）|
| OpenCode | ✅ |
| Claude Code | ❌ 不原生读，需在 CLAUDE.md 内 `@AGENTS.md` 导入 |

→ Claude Code 是唯一例外，但通过 import 兼容。详见 [[ai-workflow]] 跨工具发现机制段。

## 关键问题

- AGENTS.md 跟 README.md 的差别是什么？
- AGENTS.md 跟 CLAUDE.md / GEMINI.md / .opencode/ 的关系？
- AGENTS.md 该写多详细？太长 agent 读不完，太短没约束力
- 团队多人维护时，AGENTS.md 谁来改 / 谁审？

## 当前稳定结论

- **AGENTS.md = 项目级 agent 行为契约**，**不是 README**——README 给人看，AGENTS.md 给 agent 看（虽然格式都是 markdown）
- **跨厂商收敛是真的**：AAIF 5 家共建（OpenAI / Anthropic / Google / Microsoft / AWS），不是某一家的独占标准
- **写法已成型**：项目定位 / 目录结构 / 默认工作流 / 必读规则 / 写入边界——5 段是事实标准结构（参考本仓库 `AGENTS.md`）
- **AGENTS.md 是 [[markdown-as-spec_digest]] 4 个 pattern 之一**——把"协作约定"写成 markdown 喂 agent，跟 OpenSpec / DESIGN.md / SKILL.md 同源

## 仓库自身就是 AGENTS.md 标准实例

本仓库 `AGENTS.md`（500+ 行）是 AGENTS.md 在内容生产领域的具体实现：
- 第 1 节：项目定位
- 第 2 节：目录结构
- 第 3 节：默认工作方式（含 LLM Wiki 模式）
- 第 4 节：必须维护的规则（A/B/C）
- 第 7 节：已沉淀自动化能力清单
- 第 8 节：协作口径（语言 / 风格偏好）

→ **仓库 AGENTS.md 跑通了 8 个月**（2026-03 至今），证明 5 段结构对长期项目可行。

## AGENTS.md 跟其他契约文件的关系

| 文件 | 写什么 | 读者 |
|---|---|---|
| **AGENTS.md** | 项目级 agent 协作约定（语言 / 工作流 / 边界）| 所有进项目的 agent |
| CLAUDE.md | Claude Code 专属 + `@AGENTS.md` import | Claude Code |
| GEMINI.md | Gemini CLI 上下文 | Gemini CLI |
| `.opencode/AGENTS.md` | OpenCode 项目级 | OpenCode |

→ **AGENTS.md 是基础层，其他 X.md 是工具特化层 + import**

## 与其他 topic 的对照

- **vs [[openspec]]**：OpenSpec 写"业务行为"（per-change），AGENTS.md 写"项目协作"（per-repo）。颗粒度不同
- **vs [[design-md-pattern]]**：DESIGN.md 写"视觉规范"，AGENTS.md 写"协作约定"。同 pattern 不同领域
- **vs [[claude-skill-ecosystem]]**：SKILL.md 写"具体动作"，AGENTS.md 写"项目级宏观约束"。layer 不同
- **vs [[ai-workflow]]**：AGENTS.md 是 ai-workflow 4 路线之一（"AGENTS.md 约定路线"）

## 反例 / 待证伪

- **AGENTS.md 易膨胀**：本仓库 500+ 行已偏长。agent 进项目要全读再开干，巨型 AGENTS.md 是负担——是否需要"AGENTS.md 二级结构"（如分 sections, agent 按需加载）尚无答案
- **多 agent 同时编辑 AGENTS.md 会冲突**：Claude / Codex 都改 AGENTS.md 时缺协调机制
- **跨厂商兼容只是"基本兼容"**：AGENTS.md 内容里的 `~/.codex/AGENTS.md` import 语法、`@FILE` 引用语法等，各厂商支持度不同——浅层兼容不等于深层互操作
- **AAIF 是政治背书还是技术背书**？60,000+ 项目采用 = 真实使用还是 readme 装饰？没野外审计

## 时间线

- **2025-08**：OpenAI 发布 AGENTS.md 标准
- **2025-08 至今**：60,000+ 项目采用（OpenAI 数据）
- **2025-12-09**：Linux Foundation Agentic AI Foundation 成立，AGENTS.md 进入正式标准
- **2026-Q1**：跨工具事实兼容（Codex / Cursor / Copilot / Gemini / OpenCode 都读）
- **2026-05**：本仓库验证 AGENTS.md + CLAUDE.md `@import` + GEMINI.md 三件套架构（详见 [[ai-workflow]]）

## 当前可输出方向

- "AGENTS.md 怎么写"——基于本仓库 8 个月验证的 5 段结构 + 反例
- "AGENTS.md vs README.md vs CLAUDE.md" 对照清单
- AGENTS.md 在不同领域（coding / 内容 / 设计 / 数据）的写法对照——本仓库就是"内容生产"领域 AGENTS.md 的样本

## 相关来源

- [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]（核心来源：AAIF 成立 + 60k 数字）
- [[2026-03-23_article_openai_get-started-with-codex]]（Codex 入门 4 步含 AGENTS.md）
- [[2026-03-23_pdf_openai_how-openai-uses-codex]]（OpenAI 内部 AGENTS.md 实践）
- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]（AGENTS.md × OpenSpec × Superpowers 三件套实战）

相关 synthesis：[[markdown-as-spec_digest]]
