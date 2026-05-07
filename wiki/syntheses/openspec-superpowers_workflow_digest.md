---
type: synthesis
form: digest
created_at: 2026-05-06
based_on_sources:
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-03-23_link_openspec-practical-guide
  - 2026-03-23_link_openspec-ai-workflow-analysis
based_on_entities: [OpenSpec, Superpowers, Claude Code]
based_on_concepts: [AI 工作流, AI Vibecoding, AI Agent]
publishability: 1
triggered_by: ingest 2026-05-06 of shugex 微信文章
---

# OpenSpec × Superpowers：文件系统 handshake 让工具链可以松耦合扩展

## TL;DR

- **OpenSpec 管 what，Superpowers 管 how**——两个独立工具，握手只通过 Markdown 文件，不依赖 API/SDK，这是它们能配对的关键
- 真正容易踩坑的是**两层 spec 的混淆**：OpenSpec 的 spec（业务行为）≠ Superpowers 实现计划里的 spec（工程步骤）
- **三级审查子代理**（实现 → spec reviewer → code quality reviewer）是 multi-agent 落地的现实形态——不是分工，而是流水线 + 质量门禁
- worktree 在 brainstorming 阶段就创建，不是写代码时才创建——理解时序很重要
- `/opsx:apply` 是 OpenSpec 命令，**不是** Superpowers 的——这种归属混淆会让排查问题时找错地方

## 为什么这个组合值得合成

wiki 已有 3 篇 OpenSpec 单工具来源 + 1 篇 Vibecoding 学术合成（[[openspec-vibecoding_digest]]），但都是 OpenSpec **单兵作战**视角。[[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]] 第一次提供了 **OpenSpec + 另一个工具协作** 的端到端实战，揭示了两个 spec-driven 工具如何不耦合地拼装。

这个 pattern 比单工具用法更具普适价值——它指向"**spec-driven 工具链的开放架构**"，未来可能不止 OpenSpec + Superpowers，会出现 OpenSpec + 自建 skill / OpenSpec + Codex 等组合。

## 文件系统 handshake：协作机制拆解

| 衔接点 | 上游产物（OpenSpec） | 下游消费（Superpowers） | 作用 |
|---|---|---|---|
| 任务粒度细化 | `changes/<name>/tasks.md`（粗粒度业务任务）| `writing-plans` 拆成 2-5 分钟原子操作 | 业务任务 → 工程任务 |
| 技术上下文传递 | `changes/<name>/design.md`（技术方案）| `subagent-driven-development` 子代理读取 | 防止生成方案漂移（PostgreSQL ≠ MongoDB）|
| 规约审查标准 | `specs/<domain>/spec.md`（行为规约）| `requesting-code-review` 当审查标准 | 代码合规由 spec 说了算 |

**关键性质**：握手只通过文件系统的 Markdown 文件——不依赖 API 调用、插件 SDK、网络通信。结果：

- 任一工具升级，不会破坏另一方
- 可以替换其中任一工具（OpenSpec 换成自建 spec 体系也行）
- 调试时只需读 Markdown 文件，不需要插桩

## 容易踩的两个坑

### 坑 1：两层 spec 的混淆

| | OpenSpec 的 spec | Superpowers 实现计划里的 spec |
|---|---|---|
| 描述什么 | 业务行为（what） | 工程步骤（how） |
| 文件位置 | `openspec/specs/<domain>/spec.md`、`openspec/changes/<name>/specs/` | `docs/superpowers/plans/<feature>.md` 内的 spec 段 |
| 谁审查它 | 人审 + `openspec validate` | brainstorming 阶段 + 代码评审 |
| Superpowers 的 spec reviewer 检查谁 | ❌ 不直接检查这个 | ✅ 检查这个 |

**实战影响**：很多人以为 Superpowers 的 spec reviewer 会兜底验证代码符合 OpenSpec 的 business spec。**它不会**。两层是否对齐由 brainstorming 阶段保证。如果 brainstorming 没把 OpenSpec spec 完整翻译进实现计划，三级审查也救不了你。

### 坑 2：`/opsx:apply` 的归属

`/opsx:apply` 是 OpenSpec 自身的工作流命令。同时装 Superpowers 时，apply 过程可能附带触发 TDD 等技能，但**底层执行是 OpenSpec 的**。

**实战影响**：apply 出问题时，要去 OpenSpec 排查（是 tasks.md 写得不对？还是 validate 没过？），不要去翻 Superpowers 的 skill 文件。

## 三级审查子代理：multi-agent 的现实落地形态

社区讨论 multi-agent 时通常想的是"分工"——几个 agent 各做各的、并行起来。Superpowers 的实际落地是另一种形态：

```
[实现子代理]
   ↓ TDD 循环写代码 + commit
[规约审查子代理]
   ↓ 对照实现计划检查
[代码质量审查子代理]
   ↓ 检查风格、命名、冗余、测试质量
→ 三级通过 → Task 标记完成
```

**性质判断**：

- 不是并行分工，是**串行流水线 + 质量门禁**
- 三级是**逐级阻断**——任何一级不过，task 不完成
- subagent-driven-development 在**单会话内串行**——前后端要"并行"得开两个独立会话

**对 [[AI Agent]] 的启示**：把 multi-agent 退化成"多次单 agent 调用 + 角色切换"，反而是最稳的落地姿势。所谓"agent 协作"在工程场景里，更像是审查链而不是协作网。

## 实战时序：哪些动作发生在什么时机

很多教程把流程画成"先 OpenSpec 全做完，再 Superpowers 全做完"，实际不是这样：

```
1. OpenSpec /opsx:propose          → 生成 proposal/specs/design/tasks
2. openspec validate                → 校验
3. （切到 AI 助手会话）
4. Superpowers brainstorming
   ├─ Step 1: 探索项目（需明确指出 OpenSpec 路径）
   ├─ Step 2-7: 9 步 Checklist
   ├─ Step 8: ⚠️ 创建 worktree（在这一步！）
   └─ Step 9: 自动调用 writing-plans
5. writing-plans 生成实现计划       → docs/superpowers/plans/
6. Subagent-Driven Development      → 三级审查循环 N 次
7. finishing-a-development-branch    → 4 选项收尾
8. （回到 OpenSpec）
9. openspec archive <change-name>    → 主规约自动更新
```

**最容易理解错的时序**：

- worktree 不是"开始写代码时才创建"，是 **brainstorming 设计审批通过就立刻创建**——目的是让设计文档本身就在隔离分支里，避免污染 main
- writing-plans **不直接读 OpenSpec 的 tasks.md**，而是基于 brainstorming 生成的设计文档拆任务——所以 OpenSpec 的 tasks.md 在工程实施中其实没起到指挥作用，更多是 archive 时的回溯凭证

## 与已有 syntheses 的关系

- vs [[openspec-vibecoding_digest]]：那篇是 OpenSpec 在 Vibecoding **5 阶段成长路径**的位置 + 学术背书；本篇是 OpenSpec 在 **工程实战流水线** 的具体接口与坑
- vs [[claude-code-vs-codex_comparison]]：那篇对比两个 coding agent 的路线；本篇是单 agent（Claude Code）+ 两个工具（OpenSpec + Superpowers）的协作样本——可作为 [[Claude Code]] 路线下"如何叠加 spec-driven"的具体案例
- vs [[agent-learning-path_digest]]：本篇可作为该路径中 **Phase 4 agent 化协作** 阶段的实操参考

## 可输出方向

- 一篇"OpenSpec × Superpowers 配对实战避坑指南"——核心是两个 spec 区分 + 时序图 + `/opsx:apply` 归属
- 一篇"multi-agent 在工程落地的真实形态：流水线还是协作网？"——以三级审查为切入
- 一段添加到 [[AI 工作流]] 的"文件系统 handshake"模式介绍——已经做了

## 待补 / 待证伪

- # TODO 跑一次真实的 OpenSpec + Superpowers 配对项目，验证"两层 spec 不对齐"会不会真的被三级审查漏过
- # TODO 验证 worktree 创建时机的源码标注是否准确（作者引用 "REQUIRED when design is approved"）
- # TODO 找 Cursor 端的 Superpowers 实战来源，看是否与 Claude Code 端体验一致
