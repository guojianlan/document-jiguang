---
type: topic
slug: html-as-canvas
aliases: [HTML as canvas, HTML 输出, HTML artifact, agent 宽画布]
domains: [domain/ai-coding, domain/ai-agent]
sources:
  - 2026-05-09_article_baoyuai_claude-code-html-unreasonable-effectiveness
related_topics: [markdown-as-spec_digest, design-md-pattern, claude-code, claude-skill-ecosystem]
status: active
created_at: 2026-05-09
updated_at: 2026-05-09
---

# HTML as Canvas（agent 时代的"宽画布"输出格式）

## 是什么

把 HTML 作为 agent **输出**给人看的默认格式，替代过去默认的 Markdown。不是把 HTML 当网页，而是把它当"一块能塞进 SVG / CSS / script / image / 交互的宽画布"——agent 在这块画布上呈现需求 / 计划 / 代码审查 / 报告 / 临时编辑器。

最早被这样命名是 [[2026-05-09_article_baoyuai_claude-code-html-unreasonable-effectiveness]]：Claude Code 团队成员 Thariq 的"HTML 难以置信的奇效"。

## 跟 markdown-as-spec 的关系（关键）

不是对立，是**镜像**：

| 维度 | [[markdown-as-spec_digest\|markdown-as-spec]] | html-as-canvas |
|---|---|---|
| 方向 | input：人写给 agent | output：agent 写给人 |
| 谁产生 | 人类专家 | LLM |
| 谁消费 | LLM | 人类 |
| 优先目标 | 可被 LLM 稳定解析 + diff 友好 + 跨工具 | 信息密度 + 视觉清晰 + 易分享 + 可交互 |
| 典型形态 | OpenSpec / DESIGN.md / AGENTS.md / SKILL.md | HTML artifact / 临时单页编辑器 / 报告页 |

→ 一个 agent 工作流的两端可以同时跑：input 端用 markdown 契约约束 agent，output 端让 agent 把结果渲染成 HTML 给人看。**markdown-as-spec 与 html-as-canvas 不替代，是 input/output 两端的分工**。

这也意味着 [[markdown-as-spec_digest]] 此前那句"markdown 是 AI 编程时代的协作契约"应当**收缩成"input 端契约"**，不再涵盖 output。

## 5 维优势（来自 Thariq 原文）

| 维度 | 内容 | Markdown 做不到的点 |
|---|---|---|
| 信息密度 | 表格 / CSS / SVG / script / 嵌入图片 / 绝对定位 | Markdown 只能靠 ASCII 画图 / 文字色块伪装 |
| 视觉清晰 | tabs / 插图 / 链接 / 移动端自适应 | 长 Markdown 无人愿读，超 100 行就被弃 |
| 易分享 | 上传云端拿到 URL，任何设备打开 | Markdown 只能塞附件 |
| 双向交互 | sliders / 旋钮 / 一键"复制为 prompt" | Markdown 是只读文本 |
| 数据摄取 | Claude Code 走本地 + MCP 全栈上下文，比 chat 端强 | 与格式无关，与宿主 agent 有关 |

**最特殊的两点**：
- "数据摄取"只有 Claude Code 这种"能读本地 + MCP"的 agent 能跑出来，普通 chat 做不出
- "双向交互"把 HTML 从被动文档升级成"调参 → 一键复制回 prompt"的循环工具——这是 web 时代没有的用法

## 5 类典型 use case

- 需求 / 计划 / 探索：网格并排对比 N 种方案 + 实施计划草图
- 代码审查 / 理解：渲染 diff + 行内注释 + 流程图，PR 附 HTML 解读页
- 设计 / 原型：Claude Design 底层就是 HTML，配 sliders 调参
- 报告 / 研究 / 学习：单页讲解文档 / 周报 / 故障复盘 + SVG 图
- 自定义编辑界面：用完即走的临时单页编辑器（拖拽 / 表单 / 提示词调优）

## 反例 / 待证伪

- **HTML 生成耗时是 Markdown 的 2 到 4 倍**（作者自承）——agent 跑量大时会成瓶颈
- **HTML 在版本控制里 diff 杂乱**（作者自承"HTML 最大的痛点之一"）——意味着 HTML 适合"一次性产物"而非"持续维护"，这跟 markdown-as-spec 的 input 契约要求长期维护正好相反
- **Token 成本**：作者承认 HTML 比 Markdown 多耗 token，依赖 Opus 4.7 1MM 上下文兜底——若上下文窗口收缩或模型 tier 降级，HTML 优势会被压缩
- **审美默认值不够好**：需要"扫描代码库生成专属设计系统 HTML 文件"才能契合品牌——这条反过来证明 [[design-md-pattern]] 仍有必要（DESIGN.md 喂给 HTML 输出过程）
- **样本量偏低**：目前只 1 个一手来源（Thariq 本人），且本人自承"HTML 极端主义者"——其他 Claude Code 成员、Codex / Cursor 用户是否同样判断尚无证据
- **作者主张但留观察**：作者反对把"生成 HTML"做成 /html skill，原因暂不解读（中性记录在 [[claude-skill-ecosystem]] 反例段）

## 跟其他 topic 的对照

- **vs [[markdown-as-spec_digest]]**：input 契约 vs output 呈现，**镜像不冲突**——见上文表格
- **vs [[design-md-pattern]]**：DESIGN.md 是规范文件（输入端），HTML 输出是落地形态（输出端）；DESIGN.md 直接服务于 HTML 输出审美问题
- **vs [[claude-code]]**：Thariq 是 Claude Code 团队成员，本 topic 是 claude-code 的 output-side 主张
- **vs [[claude-skill-ecosystem]]**：作者明确说 HTML 输出**不该做成 skill**——这是 skill 生态的反向证据，已挂到 ecosystem topic 反例段

## 时间线

- **2026-05-09**：Thariq（Claude Code 团队）发布原文（thariqs.github.io/html-effectiveness）；宝玉AI 中文译文同日在微信公众号发布

## 当前可输出方向

- 等更多一手来源（其他 Claude Code 成员 / Codex 用户 / Cursor 用户）出现后，做 "agent 输出格式 2026 观察"——目前只 1 source，独证不能写
- 在仓库内试一次"用 HTML 做单次报告"——比如把 [[indie-dev-sop]] 的 5 步 SOP 输出成 HTML 单页，对比 Markdown 体感
- 关注是否出现"HTML 输出反方证据"——例如团队协作场景下 HTML diff 杂乱真的成为瓶颈

## 相关来源

- [[2026-05-09_article_baoyuai_claude-code-html-unreasonable-effectiveness]]（命名奠基，唯一 1 source）
