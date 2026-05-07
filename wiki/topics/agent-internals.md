---
type: topic
slug: agent-internals
aliases: [Harness, Harness 工程, agent 内部架构, agent inside-out]
domains: [domain/ai-agent, domain/ai-coding]
sources:
  - 2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
  - 2026-05-07_document_shareai-lab_learn-claude-code-12-lessons
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-01-03_article_idoubi_my-ai-2025
related_topics: [claude-code, ai-agent, ai-workflow, mcp, claude-skill-ecosystem, superpowers]
status: active
created_at: 2026-05-07
updated_at: 2026-05-07
---

# Agent Internals（Harness 工程 / agent 内部架构）

## 是什么

跟 [[ai-agent]] topic 正交的视角——[[ai-agent]] 从外部讨论"agent 是什么 / 路线对照"，本 topic 从内部讨论"**agent 内部由什么组成**"。

核心论点（来自 [[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]]）：**开发智能体不是写 if-else，是给模型搭一个干活的环境（Harness）**。Harness = 工具 + 知识 + 上下文管理 + 权限边界。"模型是司机，Harness 是车，你不需要教司机怎么开车，你只需要造一辆好车。"

## 关键问题

- agent 自己的"循环"长什么样？停止条件谁来定？
- 为什么 Skill 比 Function Calling 省 token？
- Subagent 跟"分工 multi-agent"的本质差别是什么？
- agent 内部 Todo / Hook / 权限边界，谁该是默认配置？

## 当前稳定结论：agent 内部 12 组件

按 longjing-agent 12 节课拆解 Coding Agent 内部组件：

| 层 | 组件 | 关键判断 |
|---|---|---|
| 核心 | **主循环** | 模型自己决定停止条件，不需要 if-else——这是 agent 跟 workflow 的本质区别 |
| 安全 | **工具箱 + 权限边界** | 没注册的工具看不见也用不了；加新工具不改循环代码 |
| 纪律 | **Todo 工具** | 防注意力漂移，连续 3 轮没更新会被 Harness 悄悄塞提醒（用户看不到，agent 看得到）|
| 上下文卫生 | **Subagent** | 父级通过 task 工具创建，子级有干净上下文，最终只回传摘要——保护父上下文。**子级没有 task 工具**避免无限套娃 |
| 知识扩展 | **Skill 两级加载** | 启动时只注入名称+描述（几十 token），调用时才加载完整 SKILL.md（几千 token）——比 Function Calling 省 token 的关键 |
| 执行扩展 | **Hook + MCP + 记忆系统** | 在 tool event 上挂命令 / 调外部工具 / 持久化状态 |

## 核心架构判断

**"循环不动，只往工具箱/Skill 库添东西"**——这是 [[claude-code]] 能持续扩展的根本前提。表层的 release notes（checkpoint / subagent / hook）都是这个内部架构的具象化。

## 2026-05-07 大幅更新：从一手 repo 校准的内部架构

读完 [[2026-05-07_document_shareai-lab_learn-claude-code-12-lessons]]（learn-claude-code 12 节课参考实现），原"12 组件并列"清单需要校准——12 章实际**天然分 2 层**，且原清单后半段不准。

### 实际 2 层架构

| 层 | 章节 | 主题 | 关键判断 |
|---|---|---|---|
| **内层（单 agent loop）** | s01-s05 | 循环 / 工具箱 / Todo / Subagent / Skill 加载 | "循环不动，只往工具箱加东西" |
| **外层（多 agent 协调）** | s06-s12 | Context Compact / Task System / Background / Teams / Protocols / Autonomous / Worktree | **以磁盘为协调底座** |

外层关键洞察：**会话上下文随时被 compact 抹掉，跨会话协调必须落到比对话长命的存储**——transcript 压缩 / 任务图 / 邮箱 / worktree index **全部走磁盘**。这把 Claude Code 从"单 agent loop"重新解释为"以磁盘为协调底座的多 agent 系统"。

### 3 个反复出现的设计模式（可抄到自己 agent）

1. **Layer 1/2 注入**（s05 SKILL.md 起源）：启动注 layer 1 元数据（几十 token），运行时按需注 layer 2 完整内容（几千 token）——省 token 内核机制
2. **drain-on-read 队列**（s06 / s09 / s11）：读取即清空，避免重复处理同一消息——分布式系统经典模式被抄到 agent 协调
3. **状态机 + ID 关联**（s07 / s10 / s12）：每个动作 / 任务 / 工作树有唯一 ID 可追溯——多 agent 一致性靠这个

### "Agency 来自训练，不是来自编排"——核心宣言

learn-claude-code README 前 30% 是哲学声明：

> Agency comes from training. The harness's job is not to write intelligence — it is to build the world the model inhabits.

12 章源码**没有一处用 if-else 替模型做决策**——所有判断都是模型在循环里自己做。这是"造车人不教司机开车"的代码层兑现。**这条宣言对应反 LangGraph / CrewAI 立场**——agent 不是 workflow，agent 编排器抢了模型本该自己做的决策权。

### claw0 — 延伸方向

作者姊妹项目 [`shareAI-lab/claw0`](https://github.com/shareAI-lab/claw0) 在 12 课基础上加心跳 + 定时任务，做常驻 agent（resident agent）。longjing-agent 文章完全没提，但这是 agent 内部架构的延伸方向：从 session-bound → resident。

## Subagent 是第四种 multi-agent 范式

[[ai-agent]] topic 已记录 3 种 multi-agent 范式（时间维度串行 / 空间维度分工 / 同步广播）。Subagent 是第四种——**上下文卫生型**：

- 不是"分工"也不是"流水线"，是"**保护主 Agent 上下文**"
- Claude Code 内置，对用户透明——你可能用了都没意识到这是 multi-agent
- 详见 [[ai-agent#Multi-agent 范式对照]]

## 跟其他 topic 的对照

- **vs [[ai-agent]]**：ai-agent 看外部（路线对照），本 topic 看内部（组件构成）。两者正交
- **vs [[claude-code]]**：Claude Code 是 Harness 工程的具体落地实例，本 topic 是 Harness 工程的抽象拆解
- **vs [[claude-skill-ecosystem]]**：Skill 两级加载是 agent 内部机制，skill ecosystem 是 skill 在野外生长的现状——内部机制 + 外部生态共同支撑 skill 范式
- **vs [[superpowers]]**：Superpowers 14 skill 是"agent 工程纪律"的外部表达，本 topic 是"为什么 agent 能装这些 skill"的内部解释

## 反例 / 待证伪

- 12 组件清单**只来自一个独立来源**（learn-claude-code 项目作者教程），其他厂商（Codex / Gemini CLI / OpenCode）的内部架构是否同构尚无独立证据——**破例建 topic 是因为这条 inside-out 视角的高密度证据**，但需后续追加独立来源
- "循环不动只加工具"这一原则是否在 agent 长期演化中保持稳定？长尾 release 可能引入循环本身的改动
- # TODO Codex / Gemini CLI / OpenCode 内部架构是否同构

## 当前可输出方向

- 一篇"Claude Code 内部 12 组件"的中文系统拆解（基于本 topic + longjing-agent 课程）
- "Hook / Skill / Subagent 哪些值得抄到自己业务 agent" 实战清单
- 跟 [[markdown-as-spec_digest]] 联动——为什么 SKILL.md / DESIGN.md / AGENTS.md 都走 markdown 注入

## 相关来源

- [[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]]（核心来源，inside-out 完整视角）
- [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]（14 skill 实例 + ECC 框架对比）
- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]（多 agent 协作 + worktree 路径）
- [[2026-01-03_article_idoubi_my-ai-2025]]（"Agent = Framework + Tools + Sandbox" 三大件框架）


## 已派生发布产物

| 类型 | 路径 | 创建日期 |
|---|---|---|
| 文章正文 | outputs/drafts/2026-05-07_article_claude-code-12-components_发布版.md | 2026-05-07 |
| 发布建议 | outputs/drafts/2026-05-07_article_claude-code-12-components_发布建议.md | 2026-05-07 |
| 认知图（2 层架构）| raw/attachments/2026-05-07_article_claude-code-12-components_认知图.png | 2026-05-07 |
| 社交切图文案 | outputs/drafts/2026-05-07_article_claude-code-12-components_社交媒体切图文案.md | 2026-05-07 |
| 复用 Satori 模板 | scripts/satori-templates/two-layer-architecture.satori.js | 2026-05-07 |

critique 评分 18/20（信息密度 5 / 独特视角 4 / 可操作性 5 / 阅读节奏 4），硬规则 0 命中。

外部读者复评 17/20（阅读节奏 3/5），命中"极值判断 6+"与"连续二人称"。已 2026-05-07 精修 6 处并把 critique 快速自检升级到 10 条（加"极值 ≤ 1"+"我最大的 X 是"清零）。
