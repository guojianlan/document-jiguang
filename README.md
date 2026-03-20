# AI 内容知识库

这是一个面向长期积累的 AI 内容工作仓库，用来统一管理：

- 外部来源：文章、网页、PDF、视频、播客、推文、报告、Word、PPT、Excel、CSV
- 结构化拆解：摘要、关键信息、观点、方法、案例、行动项
- 主题沉淀：把多个来源合并成某个主题下的知识卡片
- 对外输出：内部分享、公众号文章、演讲稿、短内容提纲

整个仓库采用 Markdown First 的方式组织，可以直接作为 Obsidian Vault 使用，不依赖特定平台。

长期协作约定见：

- [AGENTS.md](/Users/apple/Desktop/project/document/AGENTS.md)

## 目录结构

- `00_Inbox`：临时收集区，先放素材和待处理事项
- `01_Sources`：外部来源原始记录，按来源类型分类
- `02_Notes`：处理后的笔记，分为来源笔记和主题笔记
- `03_Outputs`：对外输出内容，包括草稿和已发布文档
- `04_Templates`：标准模板
- `05_Workflows`：固定工作流和 SOP
- `06_Maps`：总览页和主题导航页
- `07_Attachments`：图片、截图、导出文件等附件
- `08_Skills`：skill 候选池和孵化区
- `99_System`：命名规则、标签规则、Obsidian 使用建议
- `skills`：仓库内 skill 草稿工作区

## 推荐使用方式

### 1. 收内容
把链接、PDF、视频链接、文章摘录先放到 `00_Inbox`，或者直接让我帮你处理。

### 2. 建来源笔记
按内容类型选用 `04_Templates` 里的模板，沉淀到 `01_Sources` 或 `02_Notes/SourceNotes`。

### 3. 做结构化拆解
至少提取以下几类信息：

- 一句话摘要
- 核心观点
- 关键事实
- 方法或框架
- 对你有价值的启发
- 可复用表达

### 4. 聚合成主题
当多个来源都指向同一个主题时，在 `02_Notes/TopicNotes` 下建立主题笔记，并把来源链接过去。

### 5. 生成输出内容
当你要做分享、写文章、做群发内容时，从 `03_Outputs/Drafts` 开始写，引用主题笔记而不是重新整理原始材料。

## 你以后可以怎么让我配合

你可以直接给我下面这些输入，我会按这个仓库结构帮你整理：

- 一篇文章链接，让我提炼摘要和关键信息
- 一个视频链接，让我拆成主题、观点和可复用表达
- 一份 PDF，让我抽取重点并写成笔记
- 一份 Word / PPT / Excel / CSV，让我自动分类并生成来源笔记
- 一个主题，让我把已有内容整理成分享文档
- 一个方向，让我帮你设计长期追踪清单

## 自动分类入库

现在仓库已经支持基础自动入库。

当你给我一个链接或本地文件路径时，我可以直接调用脚本：

- 自动判断内容类型
- 自动放入对应目录
- 自动生成来源笔记

说明文档见：

- [自动入库说明](/Users/apple/Desktop/project/document/99_System/自动入库说明.md)

## Skill 机制

现在仓库已经具备一套明确的 skill 孵化机制。

包括：

- 候选池登记
- skill 开发流程
- skill 草稿工作区
- 后续全局集成说明

当前已开始孵化的第一个 skill：

- [source-auto-summary](/Users/apple/Desktop/project/document/skills/source-auto-summary/SKILL.md)

入口见：

- [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md)
- [Skill开发流程.md](/Users/apple/Desktop/project/document/05_Workflows/Skill开发流程.md)
- [Skill集成说明.md](/Users/apple/Desktop/project/document/99_System/Skill集成说明.md)

## 是否适合 Obsidian

适合，而且建议直接用 Obsidian 打开这个目录。

原因很简单：

- 你未来会积累大量主题之间的关联，双链比纯文件夹更有价值
- 图谱不是重点，但在“概念 - 工具 - 公司 - 方法 - 案例”之间建立关联时很有用
- Markdown 和 frontmatter 足够轻量，不会把内容锁死在某个平台

具体约定见：

- [内容处理工作流](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)
- [AI 知识库总览](/Users/apple/Desktop/project/document/06_Maps/AI知识库总览.md)
- [命名与标签约定](/Users/apple/Desktop/project/document/99_System/命名与标签约定.md)
- [Obsidian 使用建议](/Users/apple/Desktop/project/document/99_System/Obsidian使用建议.md)
