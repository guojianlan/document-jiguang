---
type: source
source_type: article
source_path: raw/sources/articles/2026-03-17_wechat_huishe-ji_one-skill-remove-ai-flavor-6-design-skills.md
source_url: https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488393&idx=1
source_title: AI写的UI太丑？一个Skill去掉AI味，送6个大神都在用的设计Skill
author: 萤柳
account: 会设计
publish_date: 2026-03-17
ingested_at: 2026-05-07
domains: [domain/ai-coding, domain/indie-dev]
mentions: [Impeccable, UI-UX-pro-max-skill, UI Skills, Taste Skill, Better Icons, UI Design Brain, AI kit, Motion, Cursor, Claude Code, Codex, baseline-ui, taste-skill, redesign-skill, output-skill, soft-skill]
status: ingested
---

# 一个 Skill 去掉 AI 味，送 6 个大神都在用的设计 Skill

## 来源信息

- 链接：搜狗微信跳转链（参考 raw 文件 frontmatter）
- 出处：微信公众号「会设计」（作者萤柳）

## 一句话摘要

横向 snapshot Q1 2026 设计领域 Claude Code skill 生态——主推 Impeccable（21 个设计指令），并列 6 个其他设计 skill（Taste / UI Skills / Better Icons / UI Design Brain / AI kit / UI-UX-pro-max-skill），证明 skill 已从"个别人的奇技淫巧"变成公共生态。

## 关键事实（来自原文）

- **Impeccable 21 个设计指令**（在 Cursor / Codex / Claude Code 输入 `/` 触发）：
  - adapt（适配设备） / animate（微交互） / arrange（布局） / audit（全面审计） / bolder（增加冲击力） / clarify（清晰文案） / colorize（配色） / critique（UX 评审） / delight（增加惊喜） / distill（去繁就简） / extract（抽组件） / frontend-design / harden（边界处理） / normalize（系统对齐） / onboard（新手引导） / optimize（性能） / overdrive（高表现 UI） / polish（精修） / quieter（降噪） / teach-impeccable（初始化） / typeset（排版）
- **6 个推荐设计 skill**：
  - UI Skills（15 个独立 skill：baseline-ui / fixing-accessibility / fixing-metadata / fixing-motion-performance / 12-principles-of-animation 等）
  - Taste Skill（taste-skill / redesign-skill / output-skill / soft-skill 4 个）
  - Better Icons（MCP server + skill，搜索 20 万+ 图标）
  - UI Design Brain（60+ 组件最佳实践库 + 5 种设计风格）
  - AI kit by Motion（$299，Motion+ 会员专属）
  - UI-UX-pro-max-skill（之前文章推荐过）
- **Impeccable 跟 UI-UX-pro-max-skill 的选择规则**：已有界面要提升细节用 Impeccable，从 0 到 1 设计系统用 UI-UX-pro-max-skill

## 作者观点

- "Impeccable 更像设计导师，每个指令都是明确的设计改进目标"
- "AI 帮我们生成基础代码和框架确实很快，但真正决定产品质感和用户体验的，是那些微小的设计细节"
- 文章强调 Impeccable 解决的是"AI 写的界面太丑 / AI 味浓"——跟仓库 critique skill 的"去 AI 味"是同源诉求

## 我的判断

- **本篇本身浅，但提供的横向 snapshot 极其有价值**——一篇文章 ≥ 8 个独立 skill 集（Impeccable + 6 推荐 + UI-UX-pro-max-skill），加上 Superpowers 14、Open Design 19，**Q1 2026 已知 Claude skill 数量轻松破百**
- **Impeccable 的"21 个具名设计指令"**有意思——不是模糊的"帮我设计"，而是把设计师工作拆成 21 个 verb（adapt / animate / clarify / extract / typeset...）。这跟 OpenSpec 把开发拆成 proposal/design/spec/tasks 是同思路：**把人类专业工作拆成可由 AI 执行的具名动作**
- **"去 AI 味" 这个诉求 ≥ 2 个独立来源谈**（本篇 + 之前 [[critique]] skill 仓库内规则）——是个稳定真痛点。仓库 critique 的方法论可以对照 Impeccable 的 audit/critique/polish 指令做更好的产品对照
- **作者提到"Better Icons 是 MCP server + skill 组合"**——这是**MCP 与 skill 配合的具体案例**，证明 [[mcp]] topic 里"MCP + Skill 互补不替代"的判断在野外有真实落地
- **强证据来源**：是 `claude-skill-ecosystem` topic 候选的关键 snapshot 来源

## 关联主题

- [[claude-code]]：补"skill 生态广度"段
- [[critique]]：跟 Impeccable 的 audit/critique 指令对照
- [[mcp]]：补"Better Icons = MCP server + skill"作为协同案例
- 候选新 topic：[[claude-skill-ecosystem]]（强证据，建议提议晋升）

## 下一步

- 提议 claude-skill-ecosystem topic
- 跟 Open Design / Superpowers 的 skill 数量做汇总，构建一份 wiki 内"已知 Claude skill 集合"reference
