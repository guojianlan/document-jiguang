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

- `raw/inbox`：临时收集区，先放素材和待处理事项
- `raw/sources`：外部来源原始记录，按来源类型分类
- `wiki`：处理后的笔记，分为来源笔记和主题笔记
- `outputs`：对外输出内容，包括草稿和已发布文档
- `04_Templates`：标准模板
- `05_Workflows`：固定工作流和 SOP
- `06_Maps`：总览页和主题导航页
- `raw/attachments`：图片、截图、导出文件等附件
- `08_Skills`：skill 候选池和孵化区
- `99_System`：命名规则、标签规则、Obsidian 使用建议
- `skills`：仓库内 skill 草稿工作区

## 推荐使用方式

### 1. 收内容
把链接、PDF、视频链接、文章摘录先放到 `raw/inbox`，或者直接让我帮你处理。

### 2. 建来源笔记
按内容类型选用 `04_Templates` 里的模板，沉淀到 `raw/sources` 或 `wiki/sources`。

### 3. 做结构化拆解
至少提取以下几类信息：

- 一句话摘要
- 核心观点
- 关键事实
- 方法或框架
- 对你有价值的启发
- 可复用表达

### 4. 聚合成主题
当多个来源都指向同一个主题时，在 `wiki/concepts` 下建立主题笔记，并把来源链接过去。

### 5. 生成输出内容
当你要做分享、写文章、做群发内容时，从 `outputs/drafts` 开始写，引用主题笔记而不是重新整理原始材料。

### 6. 做发布包装
当内容已经准备对外发布时，继续补：

- 发布版正文
- 发布建议
- 封面图
- 社交媒体文案
- SVG 图卡

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

当前已可复用的本地 skill：

- [article-publish-kit](/Users/apple/Desktop/project/document/skills/article-publish-kit/SKILL.md)
- [article-visual-assets](/Users/apple/Desktop/project/document/skills/article-visual-assets/SKILL.md)
- [markdown-publish-preview](/Users/apple/Desktop/project/document/skills/markdown-publish-preview/SKILL.md)

当前已可配合使用的全局外部 skill：

- `web-access`：用于联网搜索、网页读取、动态页面和浏览器自动化

入口见：

- [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md)
- [Skill开发流程.md](/Users/apple/Desktop/project/document/05_Workflows/Skill开发流程.md)
- [Skill集成说明.md](/Users/apple/Desktop/project/document/99_System/Skill集成说明.md)

## 业务闭环设计

仓库现在额外沉淀了一套“业务闭环设计”方法，用来回答这类问题：

- 现有业务需求是否可以跑通
- 哪些环节适合 agent 化或自动化
- 哪些动作必须保留人工闸门
- 如何把一次性分析沉淀成别人也能复用的参考文档

这套方法适合内容业务，也适合迁移到其他业务流程。

默认会按下面顺序分析：

1. 判断业务目标和边界
2. 拆输入、动作、反馈
3. 明确成功条件和失败条件
4. 设计状态机和人工闸门
5. 区分“已经能跑通”和“还缺基础设施”的部分
6. 给出建议的自动化等级和落地路径

相关入口：

- [业务闭环设计流程](/Users/apple/Desktop/project/document/05_Workflows/业务闭环设计流程.md)
- [T-业务闭环设计](/Users/apple/Desktop/project/document/04_Templates/T-业务闭环设计.md)
- [内容业务闭环设计示例](/Users/apple/Desktop/project/document/99_System/内容业务闭环设计示例.md)

## PRD 到测试闭环引擎

仓库现在还提供了一套可运行的 Python 系统，用来把软件类需求从 PRD 推进到测试结果。

当前系统支持：

- 读取 Markdown PRD
- 提取需求、约束和验收条件
- 在项目中本地搜索相关上下文
- 用较轻量模型压缩搜索结果
- 用较强模型生成实现计划
- 写入文件并执行测试命令
- 保存每次运行的状态、日志、阶段产物和备份

代码入口：

- [business_loop](/Users/apple/Desktop/project/document/business_loop)

文档入口：

- [PRD到测试闭环流程](/Users/apple/Desktop/project/document/05_Workflows/PRD到测试闭环流程.md)
- [PRD到测试闭环系统说明](/Users/apple/Desktop/project/document/99_System/PRD到测试闭环系统说明.md)
- [业务闭环面板说明](/Users/apple/Desktop/project/document/99_System/业务闭环面板说明.md)
- [T-PRD-交付需求](/Users/apple/Desktop/project/document/04_Templates/T-PRD-交付需求.md)

最小测试命令：

```bash
python3 -m unittest discover -s tests -v
```

推荐使用顺序：

1. 先对目标仓库执行初始化，声明它是做什么的、允许写哪里、默认跑什么测试
2. 再直接给 `PRD` 或自然语言需求启动运行
3. 如果业务规则不清，系统会自动进入 `blocked`，等待人工确认

本地面板入口：

```bash
python3 -m business_loop.cli serve-panel --open
bash scripts/start_business_loop_panel.sh
npm run loop:panel
```

## 文章发布包装

现在仓库已经支持把一篇内容进一步包装成“可发版内容包”。

典型产物包括：

- 发布版正文
- 发布建议卡
- 封面图（源文件 SVG + 发布 PNG）
- 认知图 / 结构图（源文件 SVG + 发布 PNG）
- 社交媒体切图文案
- 图卡（源文件 SVG + 发布 PNG）

相关入口：

- [文章发布包装流程](/Users/apple/Desktop/project/document/05_Workflows/文章发布包装流程.md)
- [T-分享文章](/Users/apple/Desktop/project/document/04_Templates/T-分享文章.md)
- [T-发布建议](/Users/apple/Desktop/project/document/04_Templates/T-发布建议.md)
- [文章配图与图卡流程](/Users/apple/Desktop/project/document/05_Workflows/文章配图与图卡流程.md)
- [article-publish-kit](/Users/apple/Desktop/project/document/skills/article-publish-kit/SKILL.md)
- [article-visual-assets](/Users/apple/Desktop/project/document/skills/article-visual-assets/SKILL.md)
- [SVG资产生成与校验说明](/Users/apple/Desktop/project/document/99_System/SVG资产生成与校验说明.md)
- [Satori视觉资产说明](/Users/apple/Desktop/project/document/99_System/Satori视觉资产说明.md)

默认建议：

- 用 SVG 作为源文件
- 生成后先渲染 PNG 预览检查
- 文本型 SVG 默认再跑一次布局检查，优先发现文字越界和重叠
- 确认无裁切和版式问题后，再按平台需要导出 PNG
- 如果正文要直接发布到飞书、公众号编辑器等富文本平台，正文里默认引用 PNG
- PNG 导出必须锁定为 SVG 根尺寸，不允许让当前机器窗口大小决定最终宽高
- 发布 PNG 支持按目标宽度导出，并自动保持原始宽高比
- 文本密度高的结构图首次生成就优先使用 `Satori` 模板 + 数据生成，不再默认手写 SVG `text`
- 如果要跨机器保持高度一致，优先使用稳定字体方案，不要完全依赖系统字体

本地命令：

```bash
bash scripts/validate_svg_asset.sh "raw/attachments/xxx.svg"
```

例如横版封面按 `1440` 宽导出：

```bash
bash scripts/validate_svg_asset.sh "raw/attachments/xxx.svg" --png "raw/attachments/xxx.png" --width 1440
```

如果要用 `Satori` 模板生成 SVG：

```bash
npm run render:satori -- 04_Templates/Visuals/full-structure-map.satori.js raw/attachments/xxx.data.json raw/attachments/xxx.svg
```

如果要检查文本布局风险：

```bash
npm run check:svg -- raw/attachments/xxx.svg
```

## 飞书发布预览

如果你是要把 Markdown 文章复制到飞书文档，直接复制 `.md` 源码通常不够，因为本地图片路径不会自动变成飞书里的图片。

仓库现在提供了一个本地预览服务：

```bash
node scripts/serve_markdown_publish_preview.js "outputs/drafts/xxx.md" --open
```

如果希望端口固定从仓库配置读取，可以在仓库根目录 `.env` 中设置：

```bash
MARKDOWN_PUBLISH_PREVIEW_PORT=4312
```

如果要按当前配置一键重启预览服务：

```bash
bash scripts/restart_markdown_publish_preview.sh
```

也可以直接用 npm 入口：

```bash
npm run preview:md
npm run preview:md:restart
npm run preview:md:watch -- "outputs/drafts/xxx.md" --open
```

它会把 Markdown 渲染成带本地图片的 HTML 预览页，适合从浏览器复制到飞书测试。

现在预览页里还提供了一套“飞书复制版”输出：

- 可以先选择目标平台，例如“飞书”或“通用富文本”
- 页面正文保持正常阅读样式，不因平台切换而改变
- 侧边栏可以直接点“复制当前选中内容”
- 正常的 `Command+C` 仍然保持浏览器默认行为，不会被页面拦截

如果你正在改预览服务本身，比如 `scripts/serve_markdown_publish_preview.js`，更适合用 `nodemon` 监听模式。它会在脚本或 `.env` 变化后自动重启服务。

当前已经支持常见正文结构，包括：

- 标题
- 段落
- 有序列表和无序列表
- 引用块
- 行内代码
- fenced code block
- 表格
- 分隔线
- 本地图片与链接

说明见：

- [Markdown发布预览说明.md](/Users/apple/Desktop/project/document/99_System/Markdown发布预览说明.md)

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
