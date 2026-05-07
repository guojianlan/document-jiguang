---
type: entity
aliases: [GitHub Copilot, Copilot, GitHub Copilot Coding Agent]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_article_github_about-custom-agents
related_concepts: [AI Agent, AI 工作流, AI Vibecoding, AI 产品观察]
related_entities: [Codex, Claude Code, OpenAI, Anthropic]
status: active
---

# GitHub Copilot

## 是什么

GitHub / Microsoft 出品的 coding agent 产品，最早从"代码补全"起家，现在演进到 "Coding Agent + Custom Agents profile" 体系。在 wiki 当前覆盖里，Copilot 是**第三条 coding agent 路线**——既不是 [[Claude Code]] 的"checkpoint + sandbox"，也不是 [[Codex]] 的"AGENTS.md + cloud sandbox"，而是 **"profile-based 多角色 agent"**。

## 核心机制（按当前 wiki 已采集来源）

- **Custom agents 作为可复用配置**：用 Markdown + YAML frontmatter 定义 agent profile（name、description、prompt、tools、MCP server）（来源：[[2026-03-23_article_github_about-custom-agents]]）
- **跨表面复用**：同一个 custom agent 在 GitHub.com、IDE、Copilot CLI 三个表面复用——profile 是共享层
- **从"万能助手"走向"角色编排"**：进阶用户不再只用一个 agent，而是把不同任务做成不同 agent profile

## 我看到的实际表现

- 仓库内尚无第三方独立测评，目前观察仅基于 GitHub 官方文档
- profile 的概念非常接近 [[Claude Code]] 的 `.claude/skills/` —— 都是"把工作流沉淀成可复用资产"

## 与其他 entity 的对照

- **vs [[Claude Code]]**：
  - Claude Code 用 `.claude/skills/` + hooks 实现"项目级行为定制"
  - Copilot 用 custom agents profile 实现"任务级角色定制"
  - 颗粒度不同：Claude 的 skill 偏"在这个项目里怎么做"，Copilot 的 profile 偏"扮演什么角色"
- **vs [[Codex]]**：
  - Codex 用 `AGENTS.md` 让所有 agent 读同一份项目约定
  - Copilot 用 profile 让同一个 agent 切换不同角色
  - 互补不冲突——Copilot 在 Codex 的 AGENTS.md 标准里也是参与方（[[OpenAI]] 主导的 AAIF）
- **vs [[OpenSpec]]**：
  - OpenSpec 是规格驱动的协作流程框架（"做什么"工件化）
  - Copilot 是工具产品 + profile 复用机制（"怎么做"配置化）
  - 层级不同

## 当前的判断

三条 coding agent 路线对照：

| 路线 | 代表产品 | 核心抽象 | 复用单元 |
|---|---|---|---|
| 边界 + 回退 | [[Claude Code]] | checkpoint + sandbox + hooks | skill + 项目配置 |
| 约定 + 隔离 | [[Codex]] | AGENTS.md + cloud sandbox | 项目级约定文件 |
| profile + 多表面 | [[GitHub Copilot]] | custom agents | agent 角色定义 |

三者**正交**——profile 解决"agent 扮演什么角色"，AGENTS.md 解决"项目希望 agent 怎么做"，Claude 的 hooks 解决"在 tool event 上自动触发什么"。理论上可以叠加使用。

## 关键里程碑

- **2025**：Copilot 从代码补全演进到 Coding Agent
- **2026-03 前后**：Custom agents 文档发布，profile 体系正式对外

## 待补 / 待证伪

- # TODO Copilot Coding Agent 与 [[Codex]] 在长任务托管上的对比（两者都基于云端执行）
- # TODO Microsoft × OpenAI × GitHub 三方在 Copilot 上的协作 / 边界
- # TODO IDE 类（[[Cursor]] # TODO 待建页、Windsurf）是否也走 profile 路线
- # TODO custom agents profile 与 Claude Code skill 的真实使用差异——仓库内尚无对照实战
- # TODO 第三方独立测评（仓库当前所有 Copilot 信息均来自 GitHub 官方文档）

## 相关阅读

- [[Codex]]
- [[Claude Code]]
- [[OpenAI]]
- [[AI Agent]]
- [[AI 产品观察]]
- [[claude-code-vs-codex_comparison]]
