---
type: entity
aliases: [Anthropic]
first_seen: 2026-03-23
updated_at: 2026-04-29
sources:
  - 2026-03-23_article_anthropic_claude-code-autonomy
  - 2026-03-23_article_anthropic_claude-code-sandboxing
related_concepts: [AI Agent, autonomy, 模型能力变化, 组织如何使用 AI]
related_entities: [Claude Code, OpenAI]
status: active
---

# Anthropic

## 是什么

AI 公司，Claude 系列模型与 [[Claude Code]] 的出品方。在仓库当前覆盖范围里，Anthropic 是"agent autonomy + safety boundary"路线的代表方。

## 核心产品

- **Claude（模型）**：基础大模型，按代际更新
- **[[Claude Code]]**：把 Claude 包装成 coding agent，是仓库内主要观察对象
- **Claude API**：模型直接调用接口（仓库目前未深入采集）

## 核心方向（按已采集来源）

按目前 wiki 里能看到的官方动作：

- **Agent autonomy**：从"辅助生成"走向"自主执行 + 可回退"（[[2026-03-23_article_anthropic_claude-code-autonomy]]）
- **Safety as enabler**：sandbox 不是束缚，是让 agent 更敢自主行动的前提（[[2026-03-23_article_anthropic_claude-code-sandboxing]]）

## 我看到的实际表现

- 2025-09 → 2025-10 一个月内连发"autonomy + sandboxing"两篇——动作密度高，方向一致
- 路线判断：**autonomy 与 safety 在 Anthropic 这里被绑成同一件事**，不像 OpenAI 把两者拆开做

## 与其他 entity 的对照

- **vs [[OpenAI]]**：
  - Anthropic：autonomy 通过 checkpoint + sandbox 给"局部安全"，再放大权限
  - OpenAI：autonomy 通过 AGENTS.md + cloud sandbox 给"环境隔离"，再延长任务
  - 两条路线都解决"agent 越自主越危险"问题，但侧重点不同（详见 [[autonomy]] 页面对照）

## 待补 / 待证伪

- # TODO Anthropic 的企业版 / Team plan 真实采用情况（[[组织如何使用 AI]] 角度）——仓库内仅有官方文档，缺第三方使用证据
- # TODO Constitutional AI / RLHF 等核心研究方向（与 agent 产品线的关系）
- # TODO 与 AWS Bedrock 等托管渠道的关系

## 相关阅读

- [[Claude Code]]
- [[autonomy]]
- [[模型能力变化]]
