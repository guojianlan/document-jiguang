---
name: publish-article
description: Turn a topic note or draft into a publish-ready content package (clean publish version, publish brief with click-worthy titles, SVG cover and diagrams, social copy). Use when the user wants an article refined to publish, a publish brief, or a full publish kit beyond the raw draft.
---

# publish-article

这是一个入口 skill，真正的执行规范在仓库内的长期 skill：

- [skills/article-publish-kit/SKILL.md](/Users/apple/Desktop/project/document/skills/article-publish-kit/SKILL.md)

## 何时使用

- 已有文章草稿，希望精修为可发布版本
- 已有主题笔记，希望生成完整发布资产包（正文 + 发布建议 + 视觉 + 社交文案）
- 希望补封面图、认知图、SVG 图卡、社交文案
- 希望把"知识库草稿"升级为"可发版正文 + 发布建议 + 传播物料"

如果用户只是做来源整理或只想要一版工作稿，不必触发本 skill。

## 工作流

按 [skills/article-publish-kit/SKILL.md](/Users/apple/Desktop/project/document/skills/article-publish-kit/SKILL.md) 执行。要点：

1. 先判断当前阶段（主题笔记 / 工作稿 / 发布版 / 缺传播物料）
2. 不跳步，先补最短板
3. 按"发布版正文 → 发布建议卡 → 封面图 → 认知/结构图 → 社交切图文案 → SVG 图卡"顺序产出
4. 视觉默认 SVG 优先，文本密度高的图优先用 Satori 模板生成
5. SVG 必做布局校验，再决定是否导 PNG
6. 发布建议必须补齐主标题、点击欲备选、标题选择建议、推荐导语、推荐分享开场口径、不建议使用的发布方式、推荐结尾金句

## 资源

优先读：

- [发布资产清单.md](/Users/apple/Desktop/project/document/skills/article-publish-kit/references/发布资产清单.md)
- [SVG图卡生成与校验规范.md](/Users/apple/Desktop/project/document/skills/article-publish-kit/references/SVG图卡生成与校验规范.md)
- [T-分享文章.md](/Users/apple/Desktop/project/document/04_Templates/T-分享文章.md)
- [T-发布建议.md](/Users/apple/Desktop/project/document/04_Templates/T-发布建议.md)
- [文章发布包装流程.md](/Users/apple/Desktop/project/document/05_Workflows/文章发布包装流程.md)

## 交付要求

- 所有产物落盘到仓库文件，不要只停留在聊天
- 发布产物分层命名，便于继续编辑
- 图卡和封面默认 SVG，平台分发再导 PNG，PNG 锁定 SVG 根尺寸
- 文案面向中文读者，靠近真人分享口径
- **发布版正文落盘前必须跑一次 `/critique`**：按 4 维度（信息密度 / 独特视角 / 可操作性 / 阅读节奏）评分，任一维度 ≤ 2 必须返工，命中硬规则（"而是"句、协作路标词、模板段、客服口吻、戏剧化揭露）也必须改完再发
