---
type: topic
slug: design-md-pattern
aliases: [DESIGN.md, design-md, design spec injection]
domains: [domain/ai-coding, domain/indie-dev]
sources:
  - 2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems
  - 2026-04-30_article_huishe-ji_claude-design-alternative-30-skills
  - 2026-05-03_article_huishe-ji_global-2000-design-md
  - 2026-03-25_article_huishe-ji_figma-official-mcp
related_topics: [openspec, mcp, claude-skill-ecosystem, claude-code, vibe-coding-path]
status: active
created_at: 2026-05-07
updated_at: 2026-05-07
---

# DESIGN.md Pattern（视觉规范注入）

## 是什么

把人类设计规范（颜色 / 字体 / 间距 / 组件 / 反模式 / 品牌语气）打包成 AI 可直接消费的 Markdown 文件，让 AI 编程 / UI 生成工具按规范产出，避免"配色随意 / 间距混乱 / AI 味浓"的默认模板感。

最早被命名是 [[2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems]]：**"DESIGN.md 是 AI 时代设计师与工程师之间的协作契约"**。

## 关键问题

- DESIGN.md 跟 Figma 文件 / Storybook 的差别是什么？
- 谁该维护 DESIGN.md——设计师 / 前端 / AI 自动从 Figma 抽？
- DESIGN.md 跟运行时 MCP 拉取（Figma MCP）是替代关系还是叠加？
- 大厂的 DESIGN.md 复用价值多大——风格一致 vs 同质化？

## 当前稳定结论

- **DESIGN.md 是 AI 编程 / UI 工具的"视觉契约"**，跟 [[openspec]] 的"业务行为契约"、[[ai-workflow]] 的 AGENTS.md "协作约定契约"、[[claude-skill-ecosystem]] 的 SKILL.md "工作流契约"是同 pattern 的不同领域应用——详见 [[markdown-as-spec_digest]]
- **3 个独立来源已成生态**：
  - awesome-design-md（VoltAgent，58 个大厂规范）—— **reference 库**形态
  - refero.design（2000+ 顶级产品）—— **商业聚合**形态
  - Open Design 内置 71 套 DESIGN.md 模板 —— **产品集成**形态
- **设计→AI 有两条互补路线**：
  - **静态规范注入**：DESIGN.md 落项目根目录，AI 启动时读
  - **运行时拉取**：Figma 官方 MCP（[[2026-03-25_article_huishe-ji_figma-official-mcp]]），AI 实时从设计稿拉数据
  - 两路解决同一问题——让 AI 知道"该按什么标准做"

## 与其他 topic 的对照

- **vs [[openspec]]**：OpenSpec 把业务行为写成 markdown，DESIGN.md 把视觉规范写成 markdown，**同思路不同领域**
- **vs [[mcp]]**：MCP 是运行时协议（让 AI 调外部工具），DESIGN.md 是设计时规约（让 AI 按规则产出）。Figma 同时走两条——MCP 让 AI 拉设计稿，DESIGN.md 让 AI 用规范——**互补不替代**
- **vs [[claude-skill-ecosystem]]**：DESIGN.md 是规范，SKILL.md 是工作流；Open Design 内置 19 skill + 71 DESIGN.md 是"skill（怎么做）+ DESIGN.md（按什么标准做）"的二维矩阵——这种结构在多个独立项目里成熟

## 反例 / 待证伪

- **同质化风险**：人人用同一份 Apple HIG / Stripe 风格的 DESIGN.md，会不会让所有 AI 产品长得一样？尚无野外证据
- **DESIGN.md 维护成本**：大厂的设计规范每季度都在变，开源 DESIGN.md 怎么追？awesome-design-md 靠社区 issue，长期质量未知
- **跟 Figma MCP 的边界尚不清晰**：什么场景该用 DESIGN.md（项目级规范固定），什么时候直接 MCP 拉 Figma（一次性还原设计稿），目前野外没有清晰判断

## 时间线

- **2026-04-08**：awesome-design-md 由 VoltAgent 开源，作者 AI充电官明确命名"AI 时代协作契约"
- **2026-04-30**：Open Design 上线，把 71 套 DESIGN.md 集成进自己产品（"反 AI 味"作为产品卖点）
- **2026-05-03**：refero.design 把规模推到 2000+ 设计规范

## 当前可输出方向

- **写一份你自己产品的 DESIGN.md**：把仓库现有视觉风格（SVG 图卡 + Satori 模板）抽出来，未来 AI 写图时按这套规范走——可作为 [[render-svg]] skill 的延伸
- 跟 [[mcp]] 做对照分析（设计→AI 两条路）
- 关注 PROMPT.md / VOICE.md 等"DESIGN.md 思路在其他领域的复刻"是否出现

## 相关来源

- [[2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems]]（pattern 命名奠基）
- [[2026-04-30_article_huishe-ji_claude-design-alternative-30-skills]]（产品集成形态）
- [[2026-05-03_article_huishe-ji_global-2000-design-md]]（规模证据）
- [[2026-03-25_article_huishe-ji_figma-official-mcp]]（互补路线对照）
