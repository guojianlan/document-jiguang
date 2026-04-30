---
type: output
output_type: article
status: draft
topic: Claude Code vs Codex 对比
audience: 已经在用 Claude Code 或 Codex 但没装过另一边的开发者
created_at: 2026-04-30
based_on: wiki/syntheses/claude-code-vs-codex_comparison.md
---

# 为什么 AI 编程工具买一个就够，但你最好两个都装

## 开篇

最近半年，coding agent 这一类产品的两个头部，Claude Code 和 Codex，常被放在一起比。大多数对比文章会让你"二选一"。

我的判断不一样。仓库里我装了两个，并且它们没冲突。

## 两条路线，三句话讲完

Claude Code 走的是**"先给边界，边界内自主"**。它把 autonomy 这个词解构成两件事——agent 能自己做多步任务，但每一步执行前先存 checkpoint，必要时可回退；同时把文件系统和网络都关进 sandbox，超出边界时再申请权限。这套机制让你敢把任务真扔给它跑，因为搞砸了能撤回来。

Codex 走的是**"约定先行 + 环境隔离"**。它的核心抽象是 `AGENTS.md`——仓库根目录放一份约定文件，agent 进项目先读约定再行动；任务推到 cloud sandbox 跑，不阻塞本地。这套机制让 agent 之间行为一致（无论是 Codex 自己、Cursor 还是 Copilot 都读同一份约定），同时长任务可以托管运行。

第三件最容易被忽略的事——**两条路线的入门第一步几乎一样**。Claude Code 是装→进仓库→给指令；Codex 是装→登→选 Git 仓库→启动第一个任务。Anthropic 和 OpenAI 都把"降低第一步门槛"作为产品设计核心，谁先开口你就先用谁。

## 维度对照（带使用建议）

| 维度 | Claude Code | Codex |
|---|---|---|
| 出品方 | Anthropic | OpenAI |
| autonomy 实现机制 | checkpoint + sandbox | AGENTS.md + cloud sandbox |
| 项目级约定 | `.claude/skills/` + `.claude/settings.json` hooks | `AGENTS.md`（跨工具共享） |
| 关键能力 | hooks、subagents、background tasks、checkpoints | AGENTS.md 标准、cloud sandbox、CLI/web app |
| 生态策略 | 自家产品深度（hooks 是 Claude 专有） | 开放标准（Linux Foundation 旗下 AAIF） |
| 标志性命题 | "autonomy 越高越需要 safety" | "agent 进生产需要可移植的项目级指令" |
| 主要里程碑 | 2025-09 autonomy 增强 / 2025-10 sandboxing | 2025-08 AGENTS.md 标准 / 2025-12-09 AAIF 成立 |

实际选择起来很简单。想让 agent 直接动文件、跑测试、连命令行，并配 hook 自动校验输出，选 Claude Code。想跑长任务、多人协作、和团队的 Cursor / Copilot 行为对齐，选 Codex。

但你注意到了——这两件事在真实开发里**经常同时需要**。

## 三个真正值得记的判断

### 1. 这两条路线天然不冲突

Anthropic 和 OpenAI 解决的不是同一层问题。

Anthropic 在解决"agent 敢不敢做大动作"——靠 checkpoint 让出错代价可回退。当你真的让 agent 改 100 个文件，关键在"如果改错了我能不能撤"。

OpenAI 在解决"多个 agent 怎么行为一致"——靠 AGENTS.md 让所有工具读同一份约定。当 Cursor、Codex、Copilot 三种工具都在仓库里跑，关键在"它们是不是按同一规矩干活"。

这两个问题没有谁取代谁。所以工程实践里它们经常叠加起来用——项目根放 `AGENTS.md`（让所有 AI 工具按同一约定）+ `.claude/settings.json` 配 hooks（让 Claude Code 自动跑校验）。本仓库就是这样跑的。

### 2. 生态策略反映两家商业判断不同

OpenAI 选了开放标准这条路。AGENTS.md 自 2025-08 发布以来已经被 60,000+ 项目采用，OpenAI 还拉了 Anthropic、Google、Microsoft、AWS 一起在 Linux Foundation 旗下成立 Agentic AI Foundation。生态规模赌得很大。

Anthropic 走的是产品深度路线。Claude Code 的 hooks、subagents、background tasks、checkpoints 都是自家专有能力，没有同等竞品工具能直接迁过去。用户粘性高，但生态分散。

未来 12 个月值得盯紧的一个动作——**Anthropic 会不会加入 AAIF**。加入则两生态融合，AGENTS.md 在 Claude 工具链里也原生支持；不加入则两条生态会越走越远，开发者"装两个"的成本会变高。这件事还没发生，建议盯着看。

### 3. 入门体验本质相同，因为新手痛点相同

虽然底层路线差异大，两边的新手第一步几乎一样。Claude Code 是装→在仓库启动→给指令；Codex 是装→登→选 Git 仓库→启动第一个任务。

两家都把"第一步门槛"作为产品设计核心。这个判断对学习路径有用——如果你刚开始接触 coding agent，不要纠结"哪个工具更先进"，先把任意一个跑起来。差异在第二个项目上才会显现。

## 实战——怎么把两个一起用

实际混用的做法是在仓库根放一份 `AGENTS.md`，里面包含四件事——项目目标和边界（让所有 agent 进来先理解上下文）、允许写入的目录范围、默认测试命令、业务约束（比如"提交前必须跑 SVG 校验"）。

然后在 `.claude/settings.json` 里挂 hook，常见两种——PostToolUse 上挂 SVG 校验脚本、写入特定目录时自动跑测试。

这样一来，**Codex 进来读 `AGENTS.md` 知道怎么做**，**Claude Code 进来既读 `AGENTS.md` 又被 hook 卡住没跑测试的输出**。两边的强项叠加。

如果你只装了 Claude Code，今天可以做的起步动作是在仓库根新建一份 `AGENTS.md`，把项目目标和测试命令写进去。哪怕只用 Claude Code，这份约定也能让未来加入的任何 agent 工具直接对齐。

如果你只装了 Codex，可以补一个最简 hook（写完 markdown 自动跑 lint 这种），先在 `.claude/settings.json` 里把 hook 机制摸一遍，下次再决定要不要装 Claude Code。

## 适用边界

- 这两条路线的对比基于 2025 Q3-Q4 公开材料，未来路线可能继续分化或合流
- 两条路线背后都没有第三方独立测评，全部观察基于厂商一手材料——读的时候保留一点偏差判断
- IDE 类工具（Cursor、Windsurf）走哪条路尚不明朗，本文不展开

## 收尾

二选一这件事在 coding agent 这一类产品上是个伪命题。你装一个工具能解决 80% 的问题，但剩下 20% 的边界往往就在另一条路线的强项上。

今天可以先看一眼仓库根有没有 `AGENTS.md`、`.claude/settings.json` 有没有 hook。两个文件不会冲突，加上一个不影响另一个。

## 参考来源

- [[claude-code-vs-codex_comparison]]
- [[Claude Code]]
- [[Codex]]
- [[2026-03-23_article_anthropic_claude-code-autonomy]]
- [[2026-03-23_article_anthropic_claude-code-sandboxing]]
- [[2026-03-23_article_openai_get-started-with-codex]]
- [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]
- [[2026-03-23_pdf_openai_how-openai-uses-codex]]
