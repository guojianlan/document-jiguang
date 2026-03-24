---
name: source-auto-summary
description: Use this skill when the user provides a link, local file, or an existing source note and wants it automatically classified into the knowledge base, summarized into a structured source note, and optionally routed into topic notes or downstream content production.
---

# Source Auto Summary

## 何时使用

当用户出现下面这些请求时，使用这个 skill：

- 给你一篇文章链接，希望自动整理并摘要
- 给你一个本地 PDF、Word、PPT、Excel、CSV、视频文件，希望自动入库并生成来源笔记
- 给你一个视频链接，希望先归档，再提取结构、观点和可复用表达
- 已经有 `02_Notes/SourceNotes` 下的来源笔记，希望补全摘要和关键信息

如果用户只是想讨论主题，不涉及具体来源入库或来源摘要，不要触发这个 skill。

## 输入

- URL
- 本地文件路径
- 已存在的来源笔记路径
- 可选主题名

## 输出

- 已分类入库的来源记录
- `02_Notes/SourceNotes` 下更新后的结构化来源笔记
- 必要时给出建议归属的主题
- 如果条件满足，继续衔接到主题笔记或发布包装流程

## 工作流

### 1. 判断输入类型

先判断输入属于哪一类：

- 新 URL
- 新本地文件
- 已存在来源笔记

如果是新 URL 或新本地文件，先执行入库；如果是已有来源笔记，直接进入摘要补全。

### 2. 先做自动入库

对于新来源，优先运行：

```bash
python3 scripts/intake_source.py "<url-or-path>" [--copy-file] [--topic "<主题>"] [--title "<标题>"]
```

脚本位置：

- [intake_source.py](/Users/apple/Desktop/project/document/scripts/intake_source.py)

自动入库完成后，记录生成的来源笔记路径，再继续处理。

### 3. 读取来源内容

按来源类型选择处理方式：

- `article` / `link`：如果内容已在本地可读，提取标题、结构、结论、关键事实
- `video`：优先提取主线观点、结构拆解、案例和可复用表达
- `pdf`：优先抽取正文结构、关键结论、数据和图表结论
- `document`：先判断是资料型、演示型还是数据型，再提炼信息

如果是 PDF，且用户提供的是本地 PDF，优先考虑使用 `pdf-to-ai-markdown` skill 先转 Markdown，再摘要。

如果来源内容当前不可读取，只保留入库结果，并明确说明“已建档，待内容可读后再补摘要”。

## 4. 按来源类型补全来源笔记

来源笔记至少要补齐这些部分：

- 一句话摘要
- 核心观点或关键结论
- 关键事实 / 数据 / 论据
- 方法 / 框架 / 结构拆解
- 我的判断
- 关联主题
- 下一步动作

不同类型的最小要求：

- `article`：摘要、核心观点、关键事实、方法、主题
- `link`：摘要、关键信息、价值判断、主题
- `video`：摘要、结构拆解、关键观点、案例 / 表达、主题
- `pdf`：摘要、目录 / 结构、关键结论、数据 / 图表、判断
- `document`：摘要、结构拆解、关键信息、可复用内容、判断

### 5. 更新状态

当来源笔记已完成基础摘要后：

- 将 frontmatter 里的 `status` 从 `draft` 改为 `processed`
- 如果已有明确主题，则补充 `topic`
- 如有稳定主题，补上双链

### 6. 判断下游衔接

来源笔记完成后，不要默认就停下。继续判断它应该进入哪一层：

- 如果这是单条来源，且用户只要求摘要，到来源笔记即可
- 如果多条来源已经明显指向同一问题，应继续整理成主题笔记
- 如果用户已经明确要写文章、做分享、做系列内容，应把结果继续交给发布链路

默认判断顺序：

1. 先完成来源笔记
2. 再判断是否需要主题笔记
3. 再判断是否进入文章或发布包装

如果任务已经进入发布阶段，优先使用：

- [article-publish-kit](/Users/apple/Desktop/project/document/skills/article-publish-kit/SKILL.md)

### 7. 回写说明

如果这次工作中扩展了能力边界，例如：

- 新增支持的来源类型
- 新增固定工作流
- 新增模板或脚本

必须同步更新：

- [AGENTS.md](/Users/apple/Desktop/project/document/AGENTS.md)
- [README.md](/Users/apple/Desktop/project/document/README.md)
- [自动入库说明](/Users/apple/Desktop/project/document/99_System/自动入库说明.md)
- [内容处理工作流](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)
- [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md)

## 资源加载规则

先读这些资源，再决定如何处理：

- 来源模板：
  - [T-来源笔记-文章.md](/Users/apple/Desktop/project/document/04_Templates/T-来源笔记-文章.md)
  - [T-来源笔记-链接.md](/Users/apple/Desktop/project/document/04_Templates/T-来源笔记-链接.md)
  - [T-来源笔记-视频.md](/Users/apple/Desktop/project/document/04_Templates/T-来源笔记-视频.md)
  - [T-来源笔记-PDF.md](/Users/apple/Desktop/project/document/04_Templates/T-来源笔记-PDF.md)
- [T-来源笔记-文档.md](/Users/apple/Desktop/project/document/04_Templates/T-来源笔记-文档.md)
- 工作流说明：
  - [来源摘要输出规范.md](/Users/apple/Desktop/project/document/skills/source-auto-summary/references/来源摘要输出规范.md)
  - [来源到下游衔接规则.md](/Users/apple/Desktop/project/document/skills/source-auto-summary/references/来源到下游衔接规则.md)
  - [内容处理工作流.md](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)

## 边界

- 这个 skill 的核心是“来源入库 + 来源摘要 + 判断下游去向”，不是直接替代完整的发布包装 skill
- 如果来源不可访问、不可读取、无正文、无字幕或无可解析内容，只能先建档，不能假装完成摘要
- 涉及最新事实、新闻、产品更新时，后续摘要必须基于可验证内容，不能凭记忆补

## 交付要求

- 输出必须落到仓库文件，而不是只停留在聊天里
- 来源笔记应与来源类型模板保持一致
- 要明确区分事实、观点和你的判断
- 能给出主题建议时应给出，但不要强行归类
- 当来源已经明显具备下游条件时，应主动提示继续做主题沉淀或发布包装
