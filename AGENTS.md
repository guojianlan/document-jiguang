# AGENTS.md

本文件是这个仓库的长期协作约定。后续无论是我还是其他 AI agent 进入这个项目，都应该先读这里，再执行工作。

## 1. 项目定位

这是一个面向长期积累的 AI 内容知识库与内容生产仓库，核心目标不是单次整理某篇材料，而是持续完成四件事：

1. 收集外部来源
2. 拆解来源内容
3. 沉淀主题认知
4. 生成可分享输出

仓库默认要求：

- 全部内容优先使用 Markdown
- 保持 Obsidian 兼容
- 区分来源事实、作者观点、我的判断
- 优先复用已有模板、脚本和工作流，不重复造轮子

## 2. 当前仓库结构

- `00_Inbox`：待处理输入
- `01_Sources`：原始来源归档
- `02_Notes/SourceNotes`：来源笔记
- `02_Notes/TopicNotes`：主题笔记
- `03_Outputs`：对外输出
- `04_Templates`：模板
- `05_Workflows`：工作流
- `06_Maps`：导航与总览
- `07_Attachments`：附件
- `08_Skills`：skill 候选池与孵化区
- `99_System`：系统约定、命名规则、自动化说明
- `scripts`：自动化脚本
- `skills`：仓库内 skill 草稿工作区

## 3. 默认工作方式

当用户给出一个链接、本地文件、视频、PDF、Word、PPT、Excel、CSV 或主题要求时，默认按下面顺序处理：

1. 判断来源类型
2. 自动分类入库
3. 生成来源笔记
4. 提炼摘要
5. 提取关键信息
6. 区分事实、观点、判断
7. 判断是否归入某个主题笔记
8. 如果用户需要，再继续生成对外输出

自动入库工具：

- [intake_source.py](/Users/apple/Desktop/project/document/scripts/intake_source.py)

相关说明：

- [自动入库说明](/Users/apple/Desktop/project/document/99_System/自动入库说明.md)
- [内容处理工作流](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)

### 本地 skill 使用规则

如果仓库 `skills/` 目录下已经存在与当前任务匹配的 skill，后续 agent 应优先使用该 skill，而不是重新发明一套流程。

使用方式：

1. 先检查 `skills/` 下是否已有匹配 skill
2. 如果有，先读对应 `SKILL.md`
3. 优先复用该 skill 指向的脚本、模板、参考文件
4. 如果执行后发现 skill 不足，再补强 skill，而不是绕过 skill 长期手工处理

## 4. 必须维护的规则

这是本项目最重要的长期规则。

### 规则 A：每新增一个功能，都必须同步维护 `AGENTS.md`

这里的“功能”包括但不限于：

- 新脚本
- 新工作流
- 新模板
- 新目录约定
- 新的内容处理能力
- 新的自动化命令
- 新的主题生产流程

每次新增功能后，至少检查并更新以下内容：

1. `AGENTS.md`
2. `README.md`
3. 对应的 `99_System` 或 `05_Workflows` 说明文档
4. 如果影响使用方式，补充模板或导航页
5. 如果与 skill 有关，更新 `08_Skills/Candidates/Skill候选池.md`

如果功能只写了代码，没有回写这些说明，视为未完成。

### 规则 B：每解决一类重复问题，都要评估是否抽成 skill

满足下面任意两个条件，就应考虑 skill 化：

- 这个流程会重复使用
- 它有稳定输入和稳定输出
- 它包含 3 步以上固定处理流程
- 它依赖专门模板、脚本或参考材料
- 以后交给其他 agent 执行也应该保持一致

### 规则 C：发现稳定偏好，要写进仓库

如果用户表现出稳定偏好，例如：

- 语言风格偏好
- 文件组织偏好
- 命名偏好
- 输出结构偏好
- 对摘要、分析、分享文档的格式要求

这些偏好不应该只留在上下文里，而应该沉淀到：

- `AGENTS.md`
- 对应模板
- 对应工作流文档

目标是让仓库越来越懂用户，而不是每次重新学习。

## 5. 新功能落地检查清单

以后每次做完功能，至少走一遍这个检查清单：

1. 功能是否已经真正可用，而不是只停留在说明
2. 是否补了对应文档
3. 是否更新了 `AGENTS.md`
4. 是否有模板或示例需要同步更新
5. 是否会影响 Obsidian 使用方式
6. 是否值得沉淀成 skill
7. 是否需要在导航页或 README 中暴露入口

## 6. Skill 提取规则

当一个能力值得抽成 skill 时，默认按下面方式处理：

1. 先定义 skill 解决的具体问题
2. 明确触发条件，不要做成泛化助手
3. 固定输入、输出和处理流程
4. 优先复用已有脚本、模板、参考材料
5. 产出 `SKILL.md`
6. 如果需要，补 `scripts/`、`templates/`、`references/`
7. 记录接入方式和后续维护说明

skill 的目标不是“更聪明地聊天”，而是“更稳定地复用某类能力”。

## 7. 当前已沉淀的自动化能力

### 自动分类入库

能力说明：

- 自动判断链接或本地文件类型
- 自动放到对应目录
- 自动生成来源笔记

入口：

```bash
python3 scripts/intake_source.py "<url-or-path>"
```

适用类型：

- article
- link
- video
- pdf
- document

### 后续可继续 skill 化的候选能力

- 来源内容自动摘要
- 视频内容结构化拆解
- PDF 转 Markdown 后提炼重点
- 多来源合并为主题笔记
- 主题笔记生成分享文章

skill 候选池与流程入口：

- [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md)
- [Skill开发流程.md](/Users/apple/Desktop/project/document/05_Workflows/Skill开发流程.md)
- [Skill集成说明.md](/Users/apple/Desktop/project/document/99_System/Skill集成说明.md)

当前已进入孵化的本地 skill：

- [source-auto-summary](/Users/apple/Desktop/project/document/skills/source-auto-summary/SKILL.md)

## 8. 协作口径

本仓库默认使用中文协作。

输出原则：

- 先判断内容类型，再处理
- 先结构化，再表达观点
- 先沉淀主题，再生成文章
- 优先可复用、可维护，不追求一次性结果

如果任务完成后能够顺手提高仓库的长期可用性，应主动补齐文档、模板、规则或 skill 候选说明。
