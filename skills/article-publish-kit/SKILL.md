---
name: article-publish-kit
description: Use this skill when the user has a topic note or article draft and wants it refined into a publish-ready content package, including a clean publish version, publish brief, SVG cover/diagrams, social copy, and optional social cards.
---

# Article Publish Kit

## 何时使用

当用户出现下面这些请求时，使用这个 skill：

- 已经有文章草稿，希望精修成更适合发布的版本
- 已经有主题笔记，希望生成一整套文章发布资产
- 希望给文章补封面图、认知图、SVG 图卡、社交媒体文案
- 希望把“知识库草稿”升级成“可发版正文 + 发布建议 + 传播物料”

如果用户只是想做主题研究、来源整理或单纯写一版草稿，不必触发这个 skill。

## 输入

- 主题笔记
- 文章草稿
- 可选目标平台信息，例如公众号、社群、小红书、朋友圈
- 可选视觉方向或个人品牌偏好

## 输出

最少应产出以下其中 2 项；如果用户明确要“可发版”，优先产出完整内容包：

- 发布版正文
- 发布建议卡
- SVG 封面图
- SVG 认知图 / 结构图
- 社交媒体切图文案
- SVG 图卡

## 工作流

### 1. 判断当前阶段

先判断用户现在手上的内容处于哪一层：

- 只有主题笔记
- 已有文章草稿
- 已有发布版正文
- 已有正文但缺传播物料

不要跳步。先补最短板，再继续往下生成。

### 2. 先出正文主稿

如果还没有文章主稿，先生成：

- 一版结构完整的工作稿

如果已经有文章主稿，但不适合直接发布，则再生成：

- 一版更干净的发布版正文

### 3. 再做发布包装

发布包装默认顺序：

1. 发布版正文
2. 发布建议卡
3. 封面图
4. 认知图 / 结构图
5. 社交媒体切图文案
6. SVG 图卡

不要一开始就只做图，而没有正文核心表达。

### 4. 视觉资产默认策略

如果用户没有指定设计系统，优先使用：

- SVG
- SVG 生成后先做一次 PNG 渲染验证
- 如需分发位图，再从已验证的 SVG 导出 PNG
- 实际发布到飞书、公众号编辑器等富文本平台时，正文默认引用 PNG
- 中文可读的大字号标题
- 适合截图传播的版式
- 与正文观点强绑定的图，而不是装饰图

默认优先做：

- 1 张封面图
- 1 张认知图或结构图
- 2 到 4 张切图卡

### 5. 文案层默认策略

发布类内容优先分层产出：

- 工作稿：保留思考和编辑痕迹
- 发布版：结构更干净，适合直接发
- 发布建议：告诉后续怎么选标题、怎么排图
- 社交文案：适合社群、朋友圈、图文平台分发

其中“发布建议”默认不应只写成中性说明卡，而应尽量写得更接近真实分享场景。

默认至少补齐：

- 推荐主标题
- 更有点击欲的备选标题
- 标题优化建议
- 标题选择建议，例如更稳、更适合搜索、更适合社群、更像分享者口径
- 推荐导语
- 推荐分享开场口径
- 不建议使用的发布方式
- 推荐结尾金句

默认写法要求：

- 不要只写“这篇文章讲了什么”，还要写“读者为什么现在值得点开”
- 不要只给冷标题，应至少提供一组更有传播感的标题备选
- 标题和导语可以更像真人分享、经验复盘、社群转发口径，但不能脱离正文真实内容
- 如果文章本身带有认知纠偏、少走弯路、方法升级、实战复盘等属性，应主动把这些抓手写进发布建议

### 6. 回写规则

如果这次工作中扩展了能力边界，例如：

- 新的发布资产类型
- 新的 SVG 版式
- 新的文章收口方式
- 新的适合用户的写作偏好

必须同步更新：

- [AGENTS.md](/Users/apple/Desktop/project/document/AGENTS.md)
- [README.md](/Users/apple/Desktop/project/document/README.md)
- [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md)
- [文章发布包装流程.md](/Users/apple/Desktop/project/document/05_Workflows/文章发布包装流程.md)

## 资源加载规则

优先读取：

- [发布资产清单.md](/Users/apple/Desktop/project/document/skills/article-publish-kit/references/发布资产清单.md)
- [SVG图卡生成与校验规范.md](/Users/apple/Desktop/project/document/skills/article-publish-kit/references/SVG图卡生成与校验规范.md)
- [T-分享文章.md](/Users/apple/Desktop/project/document/04_Templates/T-分享文章.md)
- [T-发布建议.md](/Users/apple/Desktop/project/document/04_Templates/T-发布建议.md)
- [文章发布包装流程.md](/Users/apple/Desktop/project/document/05_Workflows/文章发布包装流程.md)

## 边界

- 这个 skill 解决的是“发布包装”，不是“来源研究”
- 如果文章核心观点还没稳定，不要过早做大量图卡
- 图像资产应服务正文表达，不要只追求视觉热闹

## 交付要求

- 所有产物必须落盘到仓库文件，而不是只停留在聊天中
- 发布类产物应尽量分层命名，便于后续继续编辑
- 图卡和封面默认使用 SVG，除非用户另有要求
- 每次生成或修改 SVG 后，应至少完成一次渲染验证
- 若目标平台需要 PNG，应从验证后的 SVG 再导出
- 若正文将直接用于发布，图片引用应优先切换到 PNG
- 文案应面向中文读者，优先保证可读性和路径感
