---
source_url: https://mp.weixin.qq.com/s/7EpVsLbFznkngJbD7tFA9A
source_title: 从零到一：OpenSpec + Superpowers 新项目全流程实战指南
author: 术哥（术哥无界 ShugeX | 运维有术）
publish_date: 2026-04-19
fetched_via: web-access (CDP) + 用户手动复制（双源比对一致）
fetched_at: 2026-05-06
---

# 从零到一：OpenSpec + Superpowers 新项目全流程实战指南

🚩 2026 年「术哥无界」系列实战文档 X 篇原创计划 第 87 篇，AI 编程最佳实战「2026」系列第 19 篇

大家好，欢迎来到 术哥无界 | ShugeX ｜ 运维有术。

我是术哥，一名专注于 AI 编程、AI 智能体、Agent Skills、MCP、云原生、AIOps、Milvus 向量数据库的技术实践者与开源布道者！

Talk is cheap, let's explore。无界探索，有术而行。

你在用 AI 写代码时，有没有遇到过这些问题：前后端对不上接口、需求改了但代码没同步、AI 助手写着写着就跑偏了？

翻了一圈社区讨论，发现这类问题几乎是 AI 编程的通病。根源在于：AI 编程助手擅长生成代码，但不擅长维护上下文一致性——需求、设计和代码三者之间缺少一个强制的对齐机制。

OpenSpec 和 Superpowers 这两个工具，恰好分别解决了这个问题的一端。前者管要做什么，后者管怎么做。合在一起，就是一条从需求规约到可运行代码的自动化流水线。

## 1. 工具链能力矩阵：一个管需求，一个管工程

### 1.1 OpenSpec：用规约当团队的协作契约

OpenSpec 是 Fission AI 团队做的规约框架。核心理念就一句话：写代码之前，先把要做什么写清楚，而且要写成 AI 可读的格式。

它不是让你写 PRD 文档那种纯文本。OpenSpec 的产物是结构化的 Markdown 文件，AI 编程助手可以直接读取、理解、执行。

安装：`npm install -g @fission-ai/openspec@latest`

目录结构：

```
openspec/
├── specs/              # 当前系统的行为描述（真实来源）
│   └── <domain>/
│       └── spec.md
├── changes/            # 拟议的修改（每个变更一个文件夹）
│   └── <change-name>/
│       ├── proposal.md     # 意图和范围
│       ├── design.md       # 技术方案
│       ├── tasks.md        # 实现任务清单
│       └── specs/          # Delta 规约（具体变更内容）
└── config.yaml         # 项目配置
```

specs/ 是整个系统的真实来源——它描述的是系统当前的行为。每次你要加功能或改需求，不是直接改 specs，而是创建一个新的 change。

Delta Spec 机制——变更用增量描述：

- ADDED Requirements — 新增的行为
- MODIFIED Requirements — 修改的行为
- REMOVED Requirements — 废弃的行为

这和数据库的 WAL（Write-Ahead Log）是同一个思路：先记录变更意图，归档时再合并到主规约。

OpenSpec 制品依赖关系（DAG）：

```
proposal（根节点）
    │
    ├── specs（依赖 proposal）
    ├── design（依赖 proposal）
    └── tasks（依赖 specs + design）
```

### 1.2 Superpowers：让 AI 编码代理按规矩干活

Superpowers 是 Jesse Vincent（Prime Radiant 团队）开发的工作流框架。如果说 OpenSpec 是立法机构，那 Superpowers 就是执法机构——它确保 AI 在写代码时遵循标准化的工程实践。

安装：

```
# Claude Code 用户
/plugin install superpowers@claude-plugins-official

# Cursor 用户
/add-plugin superpowers
```

7 个核心工作流：

| 工作流 | 做什么 |
|---|---|
| brainstorming | 苏格拉底式对话，写代码之前先理清需求 |
| using-git-worktrees | 创建隔离的 Git 工作空间 |
| writing-plans | 把工作拆成 2-5 分钟可完成的小任务 |
| subagent-driven-development | 用子代理逐任务执行 |
| test-driven-development | 强制 RED-GREEN-REFACTOR 循环 |
| requesting-code-review | 自动触发代码审查 |
| finishing-a-development-branch | 完成分支，验证测试 |

**子代理驱动开发的三级审查**：

1. 为每个任务分派一个实现子代理
2. 实现完成后，自动分派规约审查子代理（检查代码是否符合设计规约）
3. 规约审查通过后，分派代码质量审查子代理（检查代码风格、性能等）
4. 三级审查全部通过，才标记任务完成

文档存放：

```
docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md
docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md
```

### 1.3 逻辑打通：两者如何在指令级实现闭环

三个衔接点：

- **衔接点一：tasks.md → writing-plans** — OpenSpec 生成的 tasks.md 是粗粒度任务清单，Superpowers 通过 writing-plans 拆成 2-5 分钟原子操作
- **衔接点二：design.md → subagent-driven-development** — 子代理写代码时读 design.md 理解上下文（PostgreSQL + REST，就不会生成 MongoDB + GraphQL）
- **衔接点三：specs/ → requesting-code-review** — Superpowers 做代码审查时把 OpenSpec 的行为规约当审查标准

关键观察：**OpenSpec 的产物就是 Superpowers 的输入。两者通过文件系统中的 Markdown 文件完成握手——不依赖任何 API 调用或网络通信。**

## 2. 角色驱动的全流程实战：以看板系统为例

需求：看板创建、任务卡片管理、状态流转（Todo / In Progress / Done）、多人协作。

### 2.1 第一阶段：规约设计（架构师执行）

```bash
mkdir enterprise-kanban && cd enterprise-kanban
npm install -g @fission-ai/openspec@latest
openspec init --tools claude,cursor
```

config.yaml 关键字段是 `context`——决定 AI 生成规约时的技术方向。

启动变更提案：`/opsx:propose kanban-board-system`

OpenSpec 会按 DAG 依赖关系自动按顺序生成四个制品。spec.md 用 Given/When/Then 格式定义行为：

```
### Create Board
- GIVEN a user with board creation permission
- WHEN they submit a new board with title "Sprint 2026-Q2"
- THEN the system creates a board with default columns:
      Todo, In Progress, Done
```

校验：`openspec validate`、`openspec status --change kanban-board-system --json`

快进命令：`/opsx:ff kanban-board-system`

### 2.2 第二阶段：脚手架自动化生成（架构师/Lead 执行）

**重要前置说明**：Superpowers 不是命令行工具，它是一套安装在 AI 编程助手里的 Skills 系统。AI 检测到你在做某类工作时，会自动调用对应流程。

**步骤 1：安装** — `/plugin install superpowers@claude-plugins-official`

**步骤 2：触发 brainstorming**

Superpowers 的 brainstorming 技能第一步是"Explore project context"——它会扫描项目文件、文档和最近的 commits。但**它不会自动识别 OpenSpec 的目录结构**。你需要明确指出规约文件的位置。

brainstorming 9 步 Checklist：

1. 探索项目上下文
2. 提出澄清问题（一次只问一个）
3. 提出 2-3 个方案（带权衡分析和推荐方案）
4. 分段展示设计
5. 写设计文档（保存到固定路径）
6. 设计自查（检查 placeholders、矛盾、歧义、范围）
7. 用户审阅
8. （隐式）创建 worktree
9. （隐式）调用 writing-plans

设计文档落到：`docs/superpowers/specs/2026-04-18-kanban-board-design.md`

**步骤 3：创建隔离的 Git 工作空间**

worktree 在 brainstorming 阶段就创建（源码标注为 "REQUIRED when design is approved"），不是之后才创建：

```bash
git worktree add .worktrees/kanban-board -b feature/kanban-board
cd .worktrees/kanban-board
# 自动检测 package.json/Cargo.toml 并安装依赖
npm test  # 验证测试基线
```

**步骤 4：触发 writing-plans**

brainstorming 的最后一步自动调用 writing-plans。

**关键澄清**：writing-plans 生成的是**独立的实现计划**，它基于 brainstorming 的设计文档，**而不是直接读取 OpenSpec 的 tasks.md**。OpenSpec 的 tasks.md 和 Superpowers 的实现计划是两份独立的文档——前者是业务任务清单，后者是工程实现步骤。

实现计划保存到：`docs/superpowers/plans/2026-04-18-kanban-board.md`

### 2.3 第三阶段：并行业务实现（后端和前端并行）

选择 Subagent-Driven 后，subagent-driven-development 自动启动。

每个任务循环：

```
[分派实现子代理]
  → RED: 写失败测试 → 验证 FAIL ✅
  → GREEN: 写最小实现 → 验证 PASS ✅
  → REFACTOR
  → git commit

[分派 spec reviewer 子代理]
  → 对照实现计划检查代码

[分派 code quality reviewer 子代理]
  → 检查风格、命名、冗余、测试质量

→ 三级通过 → Task 完成
```

**审查参照物的关键澄清**：Superpowers 的规约审查子代理检查的是**实现计划中的 spec 描述**，不是 OpenSpec 的 spec 文件。两者的区别：OpenSpec 的 spec 定义的是系统行为（what），Superpowers 的实现计划定义的是工程步骤（how）。审查子代理确保代码按计划实现，至于计划本身是否符合 OpenSpec 的 spec，是 brainstorming 阶段要保证的。

全部任务完成后，触发 finishing-a-development-branch：

```
1. Merge back to main locally
2. Push and create a Pull Request
3. Keep the branch as-is
4. Discard this work
```

**前端 — 可与后端并行**：因为 OpenSpec 的 spec.md 已经定义了完整的 API 行为，前端不需要等后端写完。**注意**：Superpowers 的 subagent-driven-development 是单会话内串行的，前后端需要各自独立的会话。

### 2.4 第四阶段：契约驱动的迭代

新需求例：给任务卡片加优先级字段。

`/opsx:propose add-task-priority` → Delta Spec 只描述变更部分（ADDED Requirements）

应用：`/opsx:apply add-task-priority`

**重要区分**：`/opsx:apply` 是 OpenSpec 自身的工作流命令，**不是 Superpowers 的**。它做的事情是：读取 tasks.md → 逐条完成未勾选的任务 → 写代码 → 运行测试 → 勾选 checkbox。如果同时安装了 Superpowers，可能会自动触发 TDD 等辅助技能，但 `/opsx:apply` 本身是 OpenSpec 的独立能力。

归档：`openspec archive add-task-priority` — specs/ 目录下的主规约自动更新。

## 3. 深度思辨：AI 时代的组织重构

### 3.1 角色坍缩：我们还需要前端和后端吗？

判断：**严格的前后端分工，正在被 AI 工具消解**。

理由：Superpowers 的子代理可以同时处理后端 API 和前端组件——因为两者基于同一份 spec.md。AI 不关心自己是写后端还是写前端，它只关心 spec 说了什么。

技术壁垒从"会不会写代码"变成了"会不会写规约"。

但有重要限定：**AI 抹平的是实现层的壁垒，不是设计层的判断力**。知道什么时候用 WebSocket 而不是 REST、什么时候需要乐观更新、怎么设计数据模型才能扛住未来半年的需求变化——这些决策能力，AI 目前替代不了。

更准确的说法是：**前后端的技能分工在坍缩，但思维分工还在**。

### 3.2 协作进化：3 人组会变成 2 人组吗？

趋势：传统的前端 + 后端 + 架构师三人组，会逐渐演变为**架构师 + AI 工具操作者**的两人结构。

理由三点：

1. 规约成为核心资产
2. AI 工具的操作门槛在快速降低
3. 并行开发的效率提升是实在的

风险点：如果项目的业务逻辑足够复杂，AI 生成的代码可能需要大量人工审查和修正。这时候一个人操作 AI 反而成为瓶颈——审查速度跟不上生成速度。

坦白：这套工具链对**需求明确、技术方案清晰**的项目效果很好。但对需求模糊、需要频繁试错的早期项目，人的判断力和沟通能力仍然不可替代。

建议：先别急着裁人。先试试让现有的架构师用 OpenSpec 管理需求，让一个开发者用 Superpowers 做全栈实现。跑一轮完整流程后，自然知道团队需要几个人。

OpenSpec + Superpowers 这套工具链，只是让"能定义清楚问题的人比只会执行方案的人稀缺"这个事实暴露得更明显了。
