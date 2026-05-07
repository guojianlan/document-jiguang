---
type: topic
slug: superpowers
aliases: [Superpowers, superpowers, claude-superpowers, obra/superpowers]
domains: [domain/ai-coding]
sources:
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
related_topics: [claude-code, openspec, ai-workflow, agent-internals, claude-skill-ecosystem]
status: active
created_at: 2026-05-07
updated_at: 2026-05-07
note: 破例晋升（差 1 source 达 v2 阈值，但 14 skill 体系成熟 + 跨工具支持已成生态事实）
---

# Superpowers

## 是什么

Jesse Vincent（Prime Radiant 团队）出品的开源工程工作流框架——以**插件**形式分发，安装后注入 14 项自动触发的 skill。**不是 CLI 工具**——skill 由 AI 编程助手在感知到对应任务时自动调用，不需要用户记命令。

定位类比：如果 [[openspec]] 是"立法机构"（写下要做什么），Superpowers 是"执法机构"（在编码时强制执行工程实践）。

## 跨工具支持（关键事实）

不绑某一家——Superpowers 同时支持：

- Claude Code
- Codex CLI / App
- Cursor
- GitHub Copilot CLI
- Gemini CLI
- OpenCode

→ **意味着 spec-driven 工作流的工件层是跨工具中间件**，详见 [[ai-workflow#子分支：文件系统 handshake 模式]]。

## 14 项核心 skill 全表

| 类别 | skill | 能力 |
|---|---|---|
| **测试** | test-driven-development | RED-GREEN-REFACTOR：先测试后编码 |
| **调试** | systematic-debugging | 4 阶段根因定位（复现 → 收集证据 → 定位根因 → 修复验证）|
| **调试** | verification-before-completion | 完成前的强制验证 |
| **协作** | brainstorming | 苏格拉底式对话理清需求 |
| **协作** | writing-plans | 拆 2-5 分钟原子任务 |
| **协作** | executing-plans | 执行 plan |
| **协作** | dispatching-parallel-agents | 并行 agent 派发 |
| **协作** | requesting-code-review | 代码审查请求 |
| **协作** | receiving-code-review | 接收审查结果 |
| **协作** | using-git-worktrees | 创建隔离工作区（brainstorming 阶段就建）|
| **协作** | finishing-a-development-branch | 完成时给 4 选项（merge / PR / 保留 / 丢弃）|
| **协作** | subagent-driven-development | 三级审查子代理（实现 → spec reviewer → quality reviewer）|
| **Meta** | writing-skills | 教 agent 怎么写 skill |
| **Meta** | using-superpowers | Meta 引导 |

## 安装

```bash
# Claude Code
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace

# Cursor
/add-plugin superpowers
```

## 核心机制：三级审查子代理

每个 task 由 3 个子代理串行处理，**全过才标记完成**：

1. **实现子代理**（implementation） — 按 TDD 循环写代码
2. **规约审查子代理**（spec reviewer） — 对照实现计划检查代码是否合规
3. **代码质量审查子代理**（code quality reviewer） — 检查风格、命名、冗余、测试质量

**关键澄清**（来自 [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]）：spec reviewer 检查的是**实现计划文档**（`docs/superpowers/plans/`）里的 spec 描述，**不是** OpenSpec 的 `openspec/specs/`。计划本身是否符合 OpenSpec 的 spec，是 brainstorming 阶段的责任。

## systematic-debugging 4 阶段（关键工程纪律）

来自 [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]：

1. **复现问题**：先通过稳定步骤复现 Bug，确认问题真实存在
2. **收集证据**：提取日志、报错堆栈、数据快照、调用链路——**完全依赖事实而非经验判断**
3. **定位根因**：穿透表面现象，找到唯一核心原因（而非"看起来相关"的次要因素）
4. **修复验证**：针对根因制定修复方案，初步验证修复效果

⚠️ 作者明确指出**AI 的证据收集受限于上下文窗口**，建议配合 Sentry 等可观测性工具自动注入关键证据。

## 文档存放（固定路径）

```
docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md   # 设计文档
docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md   # 实现计划
```

## 与 OpenSpec 的协作（文件系统 handshake）

两者通过文件系统的 Markdown 文件完成握手——**不依赖任何 API 调用或网络通信**。3 个具体衔接点：

1. **OpenSpec tasks.md → Superpowers writing-plans**：粗粒度任务被拆成 2-5 分钟原子操作
2. **OpenSpec design.md → subagent-driven-development**：子代理读 design 理解技术上下文
3. **OpenSpec specs/ → requesting-code-review**：审查时把 OpenSpec 的行为规约当审查标准

详见 [[openspec-superpowers_workflow_digest]]。

## 当前稳定结论

- Superpowers 是**插件形态的 skills 集合**，不要把它误解为 CLI——所有 14 个 skill 都是被动触发
- subagent-driven-development 是**单会话内串行**的，不是并行 multi-agent；前后端要并行就要开两个独立会话
- worktree 在 brainstorming 阶段就创建（`.worktrees/<feature-name>`），不是写代码时才创建
- `/opsx:apply` 是 OpenSpec 的命令，**不是** Superpowers 的——同时装时可能附带触发 TDD，但底层是 OpenSpec 在跑

## 与其他 topic 的对照

- **vs [[openspec]]**：OpenSpec 管"做什么"（业务行为 spec，what 层），Superpowers 管"怎么做"（工程实现步骤，how 层）。两个独立工具，靠 Markdown 文件 handshake，不强耦合
- **vs [[claude-code]]**：Claude Code 是 Superpowers 宿主之一（Cursor / Codex / Gemini CLI / OpenCode 也是）。Superpowers 不替代 Claude Code 能力，而是给它装上一套标准化工作流
- **vs [[claude-skill-ecosystem]]**：Superpowers 是 skill 生态里的**一个集合**，不是 skill 本身的元概念
- **vs [[agent-internals]]**：Superpowers 14 skill 是工程纪律的**外部表达**，agent-internals 是这些 skill 能装进 agent 的**内部前提**

## 待证伪 / 待补

- 当 OpenSpec spec 与 Superpowers 实现计划出现分歧时，三级审查能不能发现？作者没给反例
- 当业务需求模糊、需要试错时，brainstorming 的 9 步 Checklist 是否反而成为负担？
- # TODO 与 Claude Code skill 原生机制的边界——Superpowers 自己也是用 skill 实现的，那它和直接写一个项目级 skill 的区别在哪
- # TODO 跨工具体验是否一致——14 skill 在 Codex / Cursor / Gemini CLI / OpenCode 是否都达到 Claude Code 等效

## 相关来源

- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]（OpenSpec × Superpowers 协作实战）
- [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]（14 skill 详解 + ECC 框架对比）

## 当前可输出方向

- Superpowers vs 自建 Claude Code skill 的对比分析
- "三级审查子代理"作为 multi-agent 落地范式的拆解
- OpenSpec × Superpowers 文件系统 handshake 的工程价值（详见 [[openspec-superpowers_workflow_digest]]）
- Superpowers 跨工具适配差异实测（待补 source）
