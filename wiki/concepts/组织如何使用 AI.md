---
type: concept
aliases: [组织如何使用 AI, organizational AI adoption, enterprise AI]
first_seen: 2026-03-20
updated_at: 2026-04-29
sources:
  - 2026-03-23_pdf_openai_how-openai-uses-codex
  - 2026-03-23_article_openai_practical-guide-building-ai-agents
related_entities: [Anthropic, Codex, Claude Code]
related_concepts: [AI 工作流, AI Agent, autonomy]
maturity: tracked
status: active
tags: [topic]
---

# 组织如何使用 AI

## 定义

团队、部门、公司把 AI 纳入日常流程——不是个人试用层面的"我也用了 AI"，而是流程级、有 ownership、可衡量的采用。

## 关键问题

- 哪些工作适合先被标准化
- 如何把经验沉淀成流程和模板
- 如何衡量 AI 使用是否真的带来价值

## 当前的几种采用范式

### "工具产品 + 内部约定"路线

- 部署 [[Claude Code]] 或 [[Codex]] 之类的 coding agent 工具
- 写 AGENTS.md / 内部 wiki / playbook 沉淀团队约定
- 让 agent 行为在多人协作下保持一致
- 来源：[[2026-03-23_article_openai_agentic-ai-foundation-agents-md]]

### "OpenAI 自身怎么用 Codex"案例

- OpenAI 内部把 Codex 推到生产线（[[2026-03-23_pdf_openai_how-openai-uses-codex]]）
- 这是少数能看到一手"组织如何采用自己产品"的来源
- 关键观察：连产品方自己用都需要长时间打磨流程，不是装上就能跑

### "agent 框架 + 业务整合"路线

- 把 agent 框架嵌入业务系统（客服、销售、数据分析）
- 来源：[[2026-03-23_article_openai_practical-guide-building-ai-agents]]
- # TODO 仓库内非 coding 领域的真实落地案例还很少

## 我倾向的判断

- **个人采用 ≠ 组织采用**——前者靠技巧，后者靠流程、约定、衡量、归档
- **AGENTS.md 类约定是组织采用的最低门槛**——它让"agent 在这个仓库怎么工作"成为团队共识，而不是每个人各自摸索
- **组织采用的失败多半是治理失败，不是技术失败**：模型够用，但权限、审计、责任边界没定下来
- **衡量价值需要 ≥ 3 个月数据**——短期看节省时间，长期看是否降低出错率与新人 onboarding 成本

## 反例与边界

- 不是所有团队都需要 agent——确定性流程用 SOP / RPA 更稳
- 把 AI 当 KPI 推动会扭曲采用——员工为了"显得用了 AI"硬塞 prompt，反而拖慢真实工作

## 待补

- # TODO 中型企业（100-1000 人）真实落地案例
- # TODO 非技术部门（市场、运营、HR）采用案例
- # TODO 失败 / 退坑案例——这是仓库长期缺的角度

## 相关阅读

- [[Anthropic]]
- [[Codex]] # TODO 待建页
- [[AI 工作流]]
- [[autonomy]]
