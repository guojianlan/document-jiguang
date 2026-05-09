---
type: source
source_type: article
source_path: raw/sources/Articles/2026-05-09_wechat_baoyuai_claude-code-html-unreasonable-effectiveness.md
source_url: https://mp.weixin.qq.com/s/E0tlwWQnmSQ4CgtfPoib4g
source_title: 使用 Claude Code：HTML 难以置信的奇效【译】
author: 宝玉AI（译） / Thariq（原作）
publish_date: 2026-05-09
ingested_at: 2026-05-09
domains: [domain/ai-coding, domain/ai-agent]
mentions: [Claude Code, Thariq, HTML, Markdown, MCP, Opus 4.7, Anthropic, 宝玉AI]
status: ingested
---

# 使用 Claude Code：HTML 难以置信的奇效（Thariq 原作 / 宝玉AI 译）

## 来源信息

- 中文链接：https://mp.weixin.qq.com/s/E0tlwWQnmSQ4CgtfPoib4g
- 原文链接：https://thariqs.github.io/html-effectiveness/
- 推文：https://x.com/trq212/status/2052809885763747935
- 译者：宝玉AI（微信公众号）
- 原作者：Thariq Shihipar（Claude Code 团队成员）
- 发布时间：2026-05-09（中文译文）
- 抓取方式：web-access CDP

## 一句话摘要

Thariq 主张：随着 agent 越来越强、人类亲自编辑文件越来越少，Markdown 作为 **AI 输出格式**已经过时——HTML 在信息密度 / 视觉清晰度 / 易分享 / 双向交互 / 数据摄取 5 个维度全面胜出，应当成为 Claude Code 默认的"宽画布"输出。

## 关键事实（来自原文）

- 作者身份：Claude Code 团队成员（Anthropic）
- 作者声明 Claude Code 团队"其他成员正越来越频繁地使用 HTML"
- 给出 5 维优势：信息密度 / 视觉清晰度 / 易分享 / 双向交互 / 数据摄取
- 给出 5 类 use case：需求/计划/探索 / 代码审查 / 设计原型 / 报告研究 / 自定义编辑界面
- 自承代价 1：HTML 比 Markdown 多耗 token（在 Opus 4.7 1MM 上下文里"几乎可以忽略不计"）
- 自承代价 2：HTML 生成时间是 Markdown 的 2 到 4 倍
- 自承代价 3：HTML 在版本控制里的 diff 杂乱，"HTML 最大的痛点之一"
- 自承代价 4：默认审美需要靠"扫描代码库生成专属设计系统 HTML"才能契合品牌
- 配套示例站：https://thariqs.github.io/html-effectiveness/

## 作者观点（明确归属于作者）

- "面对动辄上百行的 Markdown 文件，我根本没有耐心读下去"
- "我现在越来越少亲自去编辑这些文件了……即使需要修改，我通常也是直接写提示词让 Claude 去改。这就让 Markdown 最核心的优势——易于人工编辑——荡然无存"
- "只要是 Claude 能读懂的信息，几乎没有什么是不能用 HTML 高效展现出来的"
- 关于 skill 化（**直接引用，不解读**）：
  > "我其实有点担心，大家读完这篇文章后，会把它搞成一个专门的 /html 复杂技能指令或者类似的东西。虽然那样做可能也有价值，但我特别想强调的是：你根本不需要做任何繁琐的设置，就能让 Claude 为你生成 HTML。你只需要像平时聊天一样，直接告诉它：'给我做一个 HTML 文件'或者'生成一个 HTML 制品'就行了。"
- "说实话，我现在几乎干什么都不用 Markdown 了，不过我承认我可能已经在'HTML 极端主义者'的道路上走得太远了"
- 收尾："我之前一度很恐惧，既然我连几百行的 Markdown 计划书都懒得仔细看了……但现在我很高兴地说，因为有了 HTML，我感觉自己比以往任何时候都更紧密地参与到了这段人机协同的创作旅程中"

## 我的判断

- **这是 wiki 内第一份明确把 markdown 作为 AI "输出格式"否定的一手陈述**——而且来自 Claude Code 团队内部成员，分量比第三方测评重
- **跟 [[markdown-as-spec_digest]] 不冲突，是镜像**：markdown-as-spec digest 讲的是"人写给 agent 的契约"（input），Thariq 讲的是"agent 写给人的呈现"（output）。两条线是 input 契约 vs output presentation，**不矛盾，但说明"markdown 全栈契约"的判断需要收缩边界**——只对 input 成立
- **HTML 作为"宽画布"是新隐喻**：不是把 HTML 当网页，而是把它当一种比 Markdown 表达力更高的"agent 输出载体"——可以塞 SVG / CSS / script / image / 交互。这种隐喻值得新建 topic 留住
- **作者反对 skill 化的态度值得中性记录**：原话"不需要做成 /html skill"——只引用，不揣测原因（可能是怕过度抽象、可能是怕用户偷懒、可能是想保持 prompt 灵活度），目前一手证据不足以下结论
- **5 维优势里"数据摄取"和"双向交互"最特殊**：前者只有 Claude Code 这种"能读本地 + MCP 全栈上下文"的 agent 能做到，普通 chat 做不出；后者把 HTML 从被动文档升级成"可调旋钮 + 一键复制回 prompt"的循环工具——这两点是 HTML 在 agent 时代独有的优势，不是 web 时代就有的
- **代价段值得保留**：4 倍生成时间 + diff 杂乱 + 默认审美问题——后续如果 wiki 内出现"HTML 输出"的反方证据，这一段是天然挂载点

## 关联主题

- [[markdown-as-spec_digest]]：input 契约 vs 本文 output 呈现，互为镜像，需在 digest 反例段加这条
- [[claude-skill-ecosystem]]：作者明确反对把 HTML 输出做成 /html skill，需在反例段中性记录
- [[claude-code]]：Claude Code 团队内部成员陈述，强化 claude-code 的 inside-out 视角
- 新 topic：[[html-as-canvas]]（与 design-md-pattern 同 domain，"格式作为契约"主题）

## 下一步

- 新建 topic：html-as-canvas（已决策）
- 更 markdown-as-spec_digest 反例段（已决策）
- 更 claude-skill-ecosystem 反例段，中性记录（已决策）
- 后续若出现"HTML 输出反方证据"或"agent 时代输出格式"二次讨论，挂到本 source 与 html-as-canvas
