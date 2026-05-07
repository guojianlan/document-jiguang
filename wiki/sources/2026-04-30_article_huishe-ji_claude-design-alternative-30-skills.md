---
type: source
source_type: article
source_path: raw/sources/articles/2026-04-30_wechat_huishe-ji_claude-design-alternative-30-skills.md
source_url: https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247489658&idx=1
source_title: Claude Design 的平替版来了！30+ 设计 Skills，支持超 71 套设计系统
author: 萤柳
account: 会设计
publish_date: 2026-04-30
ingested_at: 2026-05-07
domains: [domain/ai-coding, domain/indie-dev]
mentions: [Open Design, Claude Design, Claude Code, Codex, DESIGN.md, SKILL.md, Apple HIG, Material 3, shadcn, Airbnb design system]
status: ingested
---

# Claude Design 的平替版来了！Open Design 30+ 设计 Skills

## 来源信息

- 链接：搜狗微信跳转链
- 出处：微信公众号「会设计」（作者萤柳）
- 项目源：https://github.com/nexu-io/open-design

## 一句话摘要

Open Design 是 Claude Design 的开源平替——本地 / 网页运行，自带 19 个设计任务 skill（网页 / PPT / App 原型 / 仪表盘 / 周报 / OKR 等）+ 71 套 DESIGN.md 设计系统模板，强调"反 AI 味"——先问需求 → 选风格 → 用设计系统约束生成。

## 关键事实（来自原文）

- 项目位置：GitHub `nexu-io/open-design`，本地优先 + 可发布网页
- **19 个 Skills 覆盖任务**：网页原型 / SaaS 落地页 / 仪表盘 / 定价页 / 文档页 / 博客文章 / 移动 App 原型 / 演示文稿 / 杂志风 PPT / 产品需求文档 / 周报 / 会议纪要 / 工程运行手册 / 财务报告 / 入职计划 / 发票 / 看板 / OKR 表
- **71 套设计系统**：每套 markdown 格式 DESIGN.md，含颜色 / 字体 / 间距 / 布局 / 组件 / 动效 / 品牌语气 / **反模式**——预览图含 Apple HIG / Material 3 / shadcn / Airbnb 等
- **核心 4 步流程**：先问问题（需求确认）→ 风格不瞎猜（5 个视觉方向）→ 结果落本地文件 → skill / DESIGN.md 都可自定义
- **使用方式**：让 Codex / Claude Code 帮忙下载 → 打开本地网页 → 选 CLI 或 API → 选设计系统 + 输入需求 → 生成
- 用户自己的 AI/API 密钥，本地运行

## 作者观点

- "如果用不上 Claude Design，可以用这个替代"
- "这个项目强调'反 AI 味'的设计流程"——明确把"反 AI 味"作为产品卖点
- 本身是 walkthrough 教程，深度判断不多

## 我的判断

- **本篇对 design-md-pattern 候选 topic 是关键证据**——Open Design 把 71 套 DESIGN.md 集成进自己的产品，证明 DESIGN.md 已经是**生态可消费的标准格式**，不只是 awesome-design-md 那种 reference 集合
- **"先问需求再设计"** 这个机制 = OpenSpec 的 brainstorming 阶段在设计领域的复刻——再次印证 [[design-md-pattern]] 跟 [[openspec]] 是同 pattern 在不同领域的应用
- **19 个 skill + 71 个 DESIGN.md** 结构 = **skill（怎么做）+ DESIGN.md（按什么标准做）的二维矩阵**。这个结构跟 [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]] 描述的"14 skill + 各种 systematic 流程"是同构的——证明 wiki 内 [[claude-skill-ecosystem]] 候选 topic 的"二维结构"在多个独立项目里成熟
- **"反 AI 味"作为产品卖点**：跟 [[2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills]] 的 Impeccable 是同一诉求 = 反 AI 味已经是设计领域的稳定真痛点，**至少 3 篇独立来源都谈**（本篇 + Impeccable 文 + 仓库 critique skill 自身）
- **本地优先 + 自带密钥** 模式值得记——跟传统 SaaS AI 设计工具相反，Open Design 把 control 还给用户。这是独立开发者友好

## 关联主题

- [[claude-code]]：补"Open Design 是 Claude Code 衍生生态实例"
- 候选新 topic：[[design-md-pattern]]（强证据）
- 候选新 topic：[[claude-skill-ecosystem]]（19 skill + 71 DESIGN.md 矩阵证据）

## 下一步

- design-md-pattern 与 claude-skill-ecosystem 双 topic 都从本篇取证
- 跟 [[2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems]] 形成对照：awesome-design-md 是 reference 库，Open Design 是产品化集成
