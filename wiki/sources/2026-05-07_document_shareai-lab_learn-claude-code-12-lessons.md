---
type: source
source_type: document
source_path: raw/sources/documents/2026-05-07_learn-claude-code_12-lessons-extract.md
source_url: https://github.com/shareAI-lab/learn-claude-code
source_title: learn-claude-code 12 lessons GitHub repo（提取笔记）
author: shareAI-lab
publish_date: 2026 (持续更新)
ingested_at: 2026-05-07
domains: [domain/ai-agent, domain/ai-coding]
mentions: [Claude Code, Harness, learn-claude-code, claw0, shareAI-lab, Agent Loop, Tool Use, TodoWrite, Subagent, Skills, Context Compact, Task System, Background Tasks, Agent Teams, Team Protocols, Autonomous Agents, Worktree, SKILL.md, drain-on-read, Layer 1/2 注入]
status: ingested
---

# learn-claude-code 12 节课（一手代码层提取）

## 来源信息

- 仓库：https://github.com/shareAI-lab/learn-claude-code
- 出处：作者 shareAI-lab（GitHub），是 [[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]] 文章引用的 12 节课参考实现
- 抓取方式：sub-agent 用 git clone 抓 repo + 提取 12 章 README + 关键代码片段（30KB 浓缩笔记）

## 一句话摘要

把 Claude Code 拆成 12 个递进式 harness 机制的开源参考实现——**循环本身只在 s01 写了 30 行，后续 11 章全部在这个循环上叠加机制**。作者反复强调的核心命题："**Agency 来自模型训练，不是来自 harness 编排。harness 工程师的工作不是写智能，而是为模型构建栖居的世界**。"

## 关键事实（来自原仓库，超出 longjing-agent 文章的部分）

### 1. 12 章实际命名跟 longjing-agent 文章列的有偏差

仓库后半段（s06-s12）**不是** longjing-agent 文章猜测的 "Hook / 上下文 / 权限 / MCP / 记忆"，而是：

| 课 | 名 | 格言 | 主题 |
|---|---|---|---|
| s01 | Agent Loop | One loop & Bash is all you need | 单 agent 内核 |
| s02 | Tool Use | 加一个工具，只加一个 handler | 工具注册 |
| s03 | TodoWrite | 没有计划的 agent 走哪算哪 | 注意力锚点 |
| s04 | Subagent | 大任务拆小，每个小任务干净的上下文 | 上下文卫生 |
| s05 | Skills | 用到什么知识，临时加载什么知识 | 知识扩展 |
| s06 | Context Compact | 上下文总会满，要有办法腾地方 | **持久化起点** |
| s07 | Task System | 大目标拆成小任务，排好序，记在磁盘上 | 多 agent 协调 |
| s08 | Background Tasks | 慢操作丢后台，agent 继续想下一步 | 异步执行 |
| s09 | Agent Teams | 任务太大一个人干不完 | 团队协作 |
| s10 | Team Protocols | 队友之间要有统一的沟通规矩 | 协议握手 |
| s11 | Autonomous Agents | 队友自己看看板，有活就认领 | 自治 |
| s12 | Worktree + Task | 各干各的目录，互不干扰 | 隔离 |

学习路径官方分 4 阶段：**循环 → 规划与知识 → 持久化 → 团队**。

### 2. 真正主线是"用磁盘文件做协调骨架"

s06 之后所有机制（transcript 压缩、任务图、邮箱、worktree index）**都依赖磁盘**。原因：会话上下文随时被 compact 抹掉，**跨会话协调必须落到比对话长命的存储**。这把 Claude Code 从"单 agent loop"重新解释为"**以磁盘为协调底座的多 agent 系统**"——这是 longjing-agent 文章没说出来的关键判断。

### 3. 三个反复出现的设计模式

- **Layer 1/2 注入**（s05 SKILL.md 起源）：启动时只注 layer 1 元数据，运行时按需注 layer 2 完整内容。**省 token 的内核机制**。
- **drain-on-read 队列**（s06 / s09 / s11）：读取即清空，避免重复处理同一消息——这是从分布式系统抄来的模式
- **状态机 + ID 关联**（s07 / s10 / s12）：每个动作 / 任务 / 工作树有唯一 ID 可追溯——多 agent 一致性靠这个

### 4. README 的"政治宣言"跟代码风格高度一致

README 前 30% 是哲学声明：

> Agency comes from training. The harness's job is not to write intelligence — it is to build the world the model inhabits.

12 章源码**没有一处用 if-else 替模型做决策**。所有"判断"都是模型在循环里自己做的，harness 只提供工具 / 知识 / 上下文 / 协调底座。**这是"造车人不教司机开车"的代码层兑现**。

### 5. 姊妹项目 claw0

作者另一个项目 [`shareAI-lab/claw0`](https://github.com/shareAI-lab/claw0) 在 12 课基础上加了**心跳 + 定时任务**——做常驻 agent。longjing-agent 文章完全没提，但这是"agent 内部架构"的延伸方向（从 session-bound → resident agent）。

## 作者观点（明确归属于作者）

- "**循环属于 agent，机制属于 harness**"——这是把 12 章组织起来的核心区分
- "**Agency 来自训练，不是来自编排**"——拒绝走 LangGraph / CrewAI 那种"用工作流 DSL 替模型做决策"的路线
- "bash 一个工具就够 agent 干活"——LLM 训练数据里有海量 shell 命令，bash 是 agent 能调用的最大行动空间
- "上下文总会满"是 s06 之后所有持久化机制的根本驱动力

## 我的判断

- **本仓库是 [[claude-code]] 内部架构的最强一手参考**——比 Anthropic 官方 release notes 深一层（release notes 描述 feature，本仓库描述实现机制）
- **12 章天然分两段**（S01-S05 单 agent loop / S06-S12 多 agent 协调），是写"内部架构"文章的最佳骨架——比 longjing-agent 文章的"12 个并列组件"更准
- **"磁盘协调底座"的判断**值得独立成段：**会话上下文短命 → 必须有比对话长命的存储**——这是 [[agent-internals]] topic 应该补的关键洞察
- **3 个设计模式可作为通用 pattern**：Layer 1/2 注入 / drain-on-read / 状态机 + ID——可以抄到自己 agent
- **"Agency 来自训练"宣言**对应反 LangGraph / CrewAI 立场，跟 [[ai-agent]] topic 现有"agent 与 workflow 边界"判断一致——agent **不是** workflow

## 关联主题

- [[claude-code]]：补"内部架构 12 章"段
- [[agent-internals]]：补"磁盘协调底座"+ "Agency 来自训练"宣言段 + 3 设计模式段
- [[ai-agent]]：补"反编排"立场作为反例段
- [[claude-skill-ecosystem]]：补 SKILL.md 两层注入的代码层证据

## 下一步

- 已用作"Claude Code 内部 12 组件"文章的核心 source（[[outputs/drafts/2026-05-07_article_claude-code-12-components_发布版]]）
- claw0 仓库是延伸阅读候选，下次跟踪 resident agent 主题时可补
