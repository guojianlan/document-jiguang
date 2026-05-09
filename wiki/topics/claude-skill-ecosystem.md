---
type: topic
slug: claude-skill-ecosystem
aliases: [Skill ecosystem, Claude Skills, SKILL.md 生态]
domains: [domain/ai-coding, domain/indie-dev]
sources:
  - 2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
  - 2026-04-30_article_huishe-ji_claude-design-alternative-30-skills
  - 2026-04-30_article_ai-zhudaimatang_gpt-image-2-codex-taste-skill
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent
related_topics: [claude-code, agent-internals, design-md-pattern, superpowers, ai-workflow]
status: active
created_at: 2026-05-07
updated_at: 2026-05-07
---

# Claude Skill Ecosystem（Q1 2026 Skill 生态）

## 是什么

记录 Claude Skill 在 2026 Q1 从"个别人的奇技淫巧"变成"公共生态"的关键节点。

**SKILL.md 已经成为 AI 编程工具中"工作流可复用资产"的事实格式**——每个 skill 是一个文件夹，含 SKILL.md（YAML frontmatter + body）、可选 scripts/、references/、assets/。Claude Code 原生支持 `.claude/skills/`，OpenCode 同时读 `.claude/skills/` + `.agents/skills/`，Codex 读 `.agents/skills/`——多工具收敛到 skill 文件夹格式（详见 [[ai-workflow]] 跨工具发现机制段）。

## 当前稳定结论

### Q1 2026 已知 skill 集量级（只统计有公开来源的）

| 项目 | skill 数 | 领域 | 来源 |
|---|---|---|---|
| Superpowers | 14 | 工程协作（TDD / debug / brainstorm / review）| [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]] |
| Open Design | 19 | 设计任务（网页 / PPT / 仪表盘 / 周报）| [[2026-04-30_article_huishe-ji_claude-design-alternative-30-skills]] |
| Impeccable | 21 指令 | 设计动作（adapt / animate / typeset 等）| [[2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills]] |
| UI Skills | 15 | UI 子能力（baseline-ui / accessibility / motion）| 同上 |
| Taste Skill | 4 | 设计 + 输出（taste / redesign / output / soft）| [[2026-04-30_article_ai-zhudaimatang_gpt-image-2-codex-taste-skill]] |
| UI Design Brain | 60+ | 组件最佳实践 + 5 风格 | 同 Impeccable 文 |
| Better Icons | 1 | MCP server + skill 混合（搜 20 万图标）| 同 Impeccable 文 |
| AI kit by Motion | 多个 | 动效 + 性能审计（$299 付费）| 同 Impeccable 文 |
| 仓库自身 .agents/skills/ | 10 | 入口 skill | [[claude-code]] 仓库 |

**保守估计：Q1 2026 公开 skill 数 ≥ 100**。

### 二维矩阵：Skill × 标准 = 完整工作流

[[2026-04-30_article_huishe-ji_claude-design-alternative-30-skills]] 揭示的结构：**Open Design = 19 skill（怎么做）+ 71 DESIGN.md（按什么标准做）**。

类似结构出现在多处：
- Open Design：skill × DESIGN.md
- Superpowers：14 skill × spec/test 工件
- Claude Code 仓库：10 skill × AGENTS.md / CLAUDE.md / 99_System

→ **共性 pattern：skill（动作）+ markdown 规约（标准）= 完整工作流**。详见 [[markdown-as-spec_digest]]。

### Skill 两级加载机制

[[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]] 揭示——为什么 Claude Code 能装几十 skill 不爆 token：

- **第一层**（启动时）：扫描所有 SKILL.md，**只注入技能名称 + 描述**（几十 token）
- **第二层**（调用时）：智能体决定用某个 skill，**才加载完整 SKILL.md**（几千 token）

这是 SKILL.md 比 Function Calling 省 token 的关键架构——也是 skill 生态能扩张的前提。

## "反 AI 味"是设计 skill 的稳定真痛点

3 个独立证据（[[2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills]]、[[2026-04-30_article_huishe-ji_claude-design-alternative-30-skills]]、仓库自身 [[critique]] skill）都把"去 AI 味"作为产品/skill 卖点——意味着这是设计领域的真痛点不是噱头。

## 与其他 topic 的对照

- **vs [[agent-internals]]**：本 topic 关注 skill 在野外的生态生长，agent-internals 关注 skill 在 agent 内部的加载机制——外部生态 + 内部机制双面
- **vs [[claude-code]]**：claude-code topic 是宿主，本 topic 是宿主之上长出的生态层
- **vs [[design-md-pattern]]**：DESIGN.md 是规约，SKILL.md 是动作——形成"动作 + 规约"二维矩阵
- **vs [[superpowers]]**：Superpowers 是单个 skill 集（14 项），本 topic 是 skill 生态宏观

## 反例 / 待证伪

- **质量参差**：100+ skill 不等于 100+ 高质量 skill。idoubi 在 [[2026-01-03_article_idoubi_my-ai-2025]] 评价 90% MCP 是噱头，skill 生态可能也有同样的"长尾噪音 + 头部精品"分布
- **跨工具兼容性陷阱**：Claude / Codex / OpenCode 都说支持 skill，但 SKILL.md 的细节字段（如 frontmatter）是否完全一致尚无系统对比
- **skill 与 plugin / extension 的边界**：未来 skill 会不会被某种"更结构化的 extension 协议"替代？
- **作者主动反对 skill 化某些场景**：Thariq（Claude Code 团队成员）2026-05 在 [[2026-05-09_article_baoyuai_claude-code-html-unreasonable-effectiveness]] 文中明确说："你根本不需要做任何繁琐的设置，就能让 Claude 为你生成 HTML。你只需要像平时聊天一样，直接告诉它：'给我做一个 HTML 文件'或者'生成一个 HTML 制品'就行了。"
  - 这是反向证据，原因暂不解读。后续如有更多此类一手陈述，再考虑是否需要新增"什么不该做成 skill"段。

## 当前可输出方向

- "Q1 2026 Claude Skill 100+ 全景"系列文章（设计 / 工程 / 通用 三类）
- 一份"自建 skill 之前先看这 6 个开源 skill 集"reference 表
- 跟 [[markdown-as-spec_digest]] 联动——为什么 SKILL.md 跟 OpenSpec / DESIGN.md / AGENTS.md 是同 pattern

## 相关来源

- [[2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills]]（设计领域 6 skill snapshot）
- [[2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering]]（Superpowers 14 skill 详解）
- [[2026-04-30_article_huishe-ji_claude-design-alternative-30-skills]]（Open Design 19 skill 矩阵）
- [[2026-04-30_article_ai-zhudaimatang_gpt-image-2-codex-taste-skill]]（Taste Skill 4 件套）
- [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]]（Superpowers 装机经验）
- [[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]]（skill 两级加载机制）
