---
type: entity
aliases: [OpenAI]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_article_openai_get-started-with-codex
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
related_concepts: [AI Agent, autonomy, 模型能力变化, 组织如何使用 AI, AI 工作流]
related_entities: [Codex, Anthropic]
status: active
---

# OpenAI

## 是什么

AI 公司，GPT 系列模型与 [[Codex]] 的出品方。在仓库当前覆盖范围里，OpenAI 是 "AGENTS.md + cloud sandbox + 跨厂商标准化" 路线的代表方。

## 核心产品（按 wiki 当前覆盖）

- **GPT 模型**（基础大模型，按代际更新）
- **[[Codex]]**：coding agent 产品，仓库主要观察对象
- **OpenAI Agents SDK**：搭 agent 的 SDK / 协议（来源：[[2026-03-23_article_openai_practical-guide-building-ai-agents]]）

## 核心方向（按已采集来源）

按目前 wiki 里能看到的官方动作：

- **Agentic AI Foundation（Linux Foundation 旗下）**：2025-12-09 与 [[Anthropic]]、Google、Microsoft、AWS 共同成立，把 AGENTS.md 推为跨工具开放标准（来源：[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]）
- **生产级使用证据**：OpenAI 内部用 Codex 跑研发，把"产品方自己怎么用"做成对外案例（来源：[[2026-03-23_pdf_openai_how-openai-uses-codex]]）
- **教学路线**：用 [practical-guide-building-ai-agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) 这类文档教别人搭 agent

## 我看到的实际表现

- AGENTS.md 自 2025-08 发布以来 **60,000+ 个项目 / agent framework 采用**——速度对开放标准来说很快
- 跟 [[Anthropic]] 在同一时段（2025 Q3-Q4）密集动作 agent autonomy 方向，但路线不同（详见下）

## 与其他 entity 的对照

- **vs [[Anthropic]]**：
  - OpenAI：autonomy 通过 AGENTS.md + cloud sandbox 实现"环境隔离 + 长任务托管"——模型本身不需要改，靠工程边界
  - Anthropic：autonomy 通过 checkpoint + sandbox 实现"局部安全 + 可回退"——给 agent 撤销键
  - 两条路线都解决"agent 越自主越危险"问题，侧重点不同（详见 [[autonomy]] 页面对照）
- **生态策略对照**：
  - OpenAI 主动拉同盟（AAIF），把 AGENTS.md 推为标准，让 [[Codex]] / [[Cursor]] # TODO / [[GitHub Copilot]] # TODO 都用同一份约定文件
  - Anthropic 暂未加入 AAIF，更专注于自家 [[Claude Code]] 的产品深度（hooks、subagents、background tasks）

## 待补 / 待证伪

- # TODO OpenAI 与 Microsoft 在 [[Codex]] / [[GitHub Copilot]] 上的边界（Copilot 已建页，但商业边界仍待补一手资料）
- # TODO 模型代际（GPT-4 → GPT-5 等）对 Codex 工具能力的实际影响
- # TODO 价格 / API tier / batch 等成本工具的变化

## 相关阅读

- [[Codex]]
- [[Anthropic]]
- [[autonomy]]
- [[组织如何使用 AI]]
