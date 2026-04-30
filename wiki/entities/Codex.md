---
type: entity
aliases: [Codex, codex, OpenAI Codex]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
related_concepts: [AI Agent, AI 工作流, AI Vibecoding, autonomy, 模型能力变化, 组织如何使用 AI]
related_entities: [OpenAI, Claude Code, Anthropic]
status: active
---

# Codex

## 是什么

OpenAI 的 coding agent 产品。**定位是"实际执行任务的 agent"，不是聊天窗口**——把 Claude Code / Cursor 这类 IDE-side agent 推到"任务式协作"的方向。

## 核心机制

按当前 wiki 已采集来源整理：

- **AGENTS.md 作为项目级约定**：每个仓库放一份 `AGENTS.md` 描述"agent 在这个项目应该怎么工作"，agent 进项目先读约定再行动（来源：[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]）
- **Cloud sandbox 跑长任务**：把任务推到隔离环境运行，可以跑很久不阻塞本地（[[autonomy]] 页面已展开）
- **入门四步**：安装 → 登录 → 选择文件夹/Git 仓库 → 启动第一个任务（来源：[[2026-03-23_article_openai_get-started-with-codex]]）
- **覆盖完整研发链路**：代码理解、测试、迁移、性能优化等场景，不只是"代码生成"（来源：[[2026-03-23_pdf_openai_how-openai-uses-codex]]）

## 我看到的实际表现

- AGENTS.md 自 2025-08 发布以来已被超过 **60,000 个开源项目和 agent framework 采用**（来源：agentic-ai-foundation 文）
- OpenAI 自己内部用 Codex 跑研发——这是少数能看到"产品方自己怎么用产品"的一手案例
- 仓库内的 `AGENTS.md` 就是 Codex 路线在本仓库的落地

## 与其他 entity 的对照

- **vs [[Claude Code]]**：
  - Claude Code 走 "checkpoint + sandbox" 路线（先给边界，边界内自主，可回退）
  - Codex 走 "AGENTS.md + cloud sandbox" 路线（用约定文件 + 环境隔离实现 [[autonomy]]）
  - 差别：Claude 强调"敢做大动作（有 undo）"，Codex 强调"敢托管长任务（环境隔离）"
  - 两条路线**不冲突**——本仓库的 `AGENTS.md` + Claude Code 的 hook 体系叠加使用最佳
  - 详见 [[claude-code-vs-codex_comparison]]
- **vs [[OpenSpec]]**：
  - OpenSpec 是规格驱动的协作流程框架（proposal/design/spec/tasks 工件）
  - Codex 是工具产品 + 项目级约定标准（AGENTS.md）
  - 两者层级不同——OpenSpec 写"做什么"，Codex 跑"怎么做"

## 关键里程碑

- **2025-08**：AGENTS.md 标准发布
- **2025-12-09**：与 Anthropic、Google、Microsoft、AWS 共同成立 Agentic AI Foundation（[Linux Foundation 旗下](https://openai.com/index/agentic-ai-foundation/)），AGENTS.md 跨工具、跨厂商成为开放标准

## 待补 / 待证伪

- # TODO Codex CLI vs Codex web app 的真实使用差异
- # TODO 与 [[Cursor]] # TODO 待建页 的协作位（同时用 / 替代关系）
- # TODO Codex 在大型 monorepo 的实际表现（仓库内尚无证据）
- # TODO 中文开发者社区采用情况

## 相关阅读

- [[OpenAI]]
- [[Claude Code]]
- [[autonomy]]
- [[AI Agent]]
- [[组织如何使用 AI]]
- [[claude-code-vs-codex_comparison]]
