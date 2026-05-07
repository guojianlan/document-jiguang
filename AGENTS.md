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
- 发布类内容优先生成可复用的“内容包”，而不是只停留在单篇正文

## 2. 当前仓库结构

按 [Karpathy LLM Wiki 三层架构](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md)：

**raw 层**（用户拥有，LLM 只读）：
- `raw/inbox`：待处理输入
- `raw/sources`：原始来源归档（Articles / Links / Videos / PDFs / Documents）
- `raw/attachments`：附件（图片、SVG、JSON 数据）

**wiki 层**（LLM 拥有，用户只读浏览）：
- `wiki/sources`：来源摘要（每个 raw source 一份）
- `wiki/entities`：具体物 / 工具 / 产品 / 公司
- `wiki/concepts`：抽象概念 / 模式 / 方法
- `wiki/syntheses`：对比 / 综述 / 时间线（由 `/query` 归档）

**outputs 层**（发布产物）：
- `outputs/drafts`：发布版正文 + 发布建议 + 视觉资产
- `outputs/published`：已对外发布

**schema / meta 层**（不属 Karpathy 三层，schema 由 `AGENTS.md` + `CLAUDE.md` 承担）：
- `04_Templates`：模板
- `05_Workflows`：工作流
- `06_Maps`：导航（含 `index.md`）
- `99_System/Skill候选池.md`、`99_System/Skill孵化-*.md`：skill 候选池与孵化设计
- `99_System`：系统约定、命名规则、自动化说明
- `scripts`：自动化脚本
- `skills`：仓库内 skill 草稿工作区
- `.claude/skills/`：Claude Code 入口 skill

## 3. 默认工作方式

本仓库采用 [LLM Wiki 模式](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md)（Karpathy）：知识在 wiki 层持续累积，发布在 publishing 层派生。两层正交。

wiki 层三种核心操作：
- `/ingest`（[SKILL.md](/Users/apple/Desktop/project/document/.claude/skills/ingest/SKILL.md)）：处理新来源，fan-out 触达 5-10 wiki 页
- `/query`（[SKILL.md](/Users/apple/Desktop/project/document/.claude/skills/query/SKILL.md)）：检索 wiki 回答，可归档为 synthesis
- `/lint`（[SKILL.md](/Users/apple/Desktop/project/document/.claude/skills/lint/SKILL.md)）：周期性检查矛盾、过时、孤儿、缺交叉引用

每次操作必更新 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md) 和 [log.md](/Users/apple/Desktop/project/document/log.md)。

当用户给出一个链接、本地文件、视频、PDF、Word、PPT、Excel、CSV 或主题要求时，默认按下面顺序处理：

1. 判断来源类型
2. 自动分类入库（`scripts/intake_source.py` 把 raw 文件归到 `raw/sources/<type>/`）
3. 跑 `/ingest`：读全文 + 与用户对话 1-3 轮 + 写 source 摘要 + fan-out 更新 entities/concepts/syntheses + 更 index.md + 追 log.md
4. fan-out 触达 < 3 页视为 ingest 失败：要么源没新东西（标 `status: thin`），要么 wiki 缺相应 entity/concept 页（按需补建）
5. 区分事实、观点、判断（落在 source 摘要里，不要放到 entity / concept 页）
6. 如果触达 ≥ 2 个 entity/concept 且组合此前未综合 → 创 synthesis 骨架（`publishability: 0`）
7. 如果用户需要发布，从 `publishability ≥ 1` 的 synthesis 出发跑 `/publish-article`，不直接拿 source 摘要写发布稿

自动入库工具：

- [intake_source.py](/Users/apple/Desktop/project/document/scripts/intake_source.py)

相关说明：

- [自动入库说明](/Users/apple/Desktop/project/document/99_System/自动入库说明.md)
- [内容处理工作流](/Users/apple/Desktop/project/document/05_Workflows/内容处理工作流.md)
- [Markdown发布预览说明](/Users/apple/Desktop/project/document/99_System/Markdown发布预览说明.md)

来源处理完成后，默认继续判断下游去向：

1. 是否需要并入主题笔记
2. 是否需要生成文章草稿
3. 是否需要进入发布包装

默认链路是：

来源 -> 主题 -> 成稿 -> 发布包装

当用户提出“业务是否能闭环”“现有系统是否能跑通”“是否适合 agent 化”这类问题时，默认按下面顺序处理：

1. 先定义业务目标和边界
2. 再拆输入、动作、反馈三层
3. 再判断结果是否可观察、失败是否可回退
4. 再设计状态机与人工闸门
5. 最后区分当前已能跑通的部分与仍需补齐的基础设施

相关说明：

- [业务闭环设计流程](/Users/apple/Desktop/project/document/05_Workflows/业务闭环设计流程.md)
- [T-业务闭环设计](/Users/apple/Desktop/project/document/04_Templates/T-业务闭环设计.md)
- [内容业务闭环设计示例](/Users/apple/Desktop/project/document/99_System/内容业务闭环设计示例.md)

当用户明确希望把软件类需求做成“PRD -> 搜索上下文 -> 实现计划 -> 写文件 -> 跑测试”的系统时，优先复用仓库内的 Python 闭环引擎，并按下面顺序处理：

1. 先初始化目标仓库，记录仓库用途、允许写入范围、默认测试命令和业务备注
2. 再确认 PRD 或自然语言需求是否结构足够清晰
3. 再选择 research provider 和 strategy provider
4. 再明确允许写入的项目范围和测试命令
5. 先用 mock 跑通链路
6. 再接真实模型进入项目执行

相关说明：

- [PRD到测试闭环流程](/Users/apple/Desktop/project/document/05_Workflows/PRD到测试闭环流程.md)
- [PRD到测试闭环系统说明](/Users/apple/Desktop/project/document/99_System/PRD到测试闭环系统说明.md)
- [业务闭环面板说明](/Users/apple/Desktop/project/document/99_System/业务闭环面板说明.md)
- [T-PRD-交付需求](/Users/apple/Desktop/project/document/04_Templates/T-PRD-交付需求.md)

当用户明确要做文章、分享稿、系列内容或对外发布内容时，默认按下面顺序处理：

1. 先形成主题笔记或工作草稿
2. 再生成发布版正文
3. 再补发布建议
4. 再补视觉资产，例如封面图、认知图、SVG 图卡
5. 最后补社交传播文案
6. 发布版正文落盘前必须跑一次 [critique](/Users/apple/Desktop/project/document/.claude/skills/critique/SKILL.md)，按 4 维度（信息密度 / 独特视角 / 可操作性 / 阅读节奏）评分，低分维度强制返工后再发

相关说明：

- [文章发布包装流程](/Users/apple/Desktop/project/document/05_Workflows/文章发布包装流程.md)
- [T-发布建议](/Users/apple/Desktop/project/document/04_Templates/T-发布建议.md)
- [SVG资产生成与校验说明](/Users/apple/Desktop/project/document/99_System/SVG资产生成与校验说明.md)
- [文章配图与图卡流程](/Users/apple/Desktop/project/document/05_Workflows/文章配图与图卡流程.md)

其中“发布建议”默认不应只停留在中性说明，而应尽量补齐下面这些要素：

- 推荐主标题
- 更有点击欲的备选标题
- 标题选择建议，例如更稳、更强点击、更适合社群、更像分享者口径
- 推荐导语
- 推荐分享开场口径
- 不建议使用的发布方式
- 推荐结尾金句

默认目标不是写一份冰冷的说明卡，而是产出一份更接近真实分享场景、能提升点击欲和查看欲的发布建议。

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
5. 如果与 skill 有关，更新 `99_System/Skill候选池.md`

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
- 对发布资产的偏好，例如 SVG、图卡、发布建议、社交文案

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

### Markdown 发布预览

能力说明：

- 启动本地 HTML 预览服务
- 预览 Markdown 正文并内嵌本地图片
- 支持常见正文语法，包括标题、列表、引用、行内代码、fenced code block、表格、分隔线
- 适合从浏览器复制富文本内容到飞书、公众号编辑器等场景测试
- 支持从仓库 `.env` 读取预览端口配置

入口：

```bash
node scripts/serve_markdown_publish_preview.js "outputs/drafts/xxx.md" --open
```

重启入口：

```bash
bash scripts/restart_markdown_publish_preview.sh
```

监听入口：

```bash
npm run preview:md:watch -- "outputs/drafts/xxx.md" --open
```

飞书复制模式：

- 预览页应优先提供“飞书复制版正文”按钮或对应预览区
- 如果已经出现多个平台的稳定差异，预览页应支持平台选择，而不是只保留单一复制结构
- 当用户在正文区域直接按复制快捷键时，可以拦截复制事件并替换成当前平台对应的输出
- 当普通网页结构复制到飞书出现代码块、背景色或图片粘贴异常时，优先增加“复制专用 HTML 输出”，而不是只调网页展示样式
- 飞书复制版可以牺牲部分原生语义，例如把块级代码降级为带行内样式的内容块，以换取更稳定的粘贴结果

端口配置：

```bash
MARKDOWN_PUBLISH_PREVIEW_PORT=4312
```

相关说明：

- [Markdown发布预览说明](/Users/apple/Desktop/project/document/99_System/Markdown发布预览说明.md)
- [markdown-publish-preview](/Users/apple/Desktop/project/document/.agents/skills/markdown-publish-preview/SKILL.md)

### PRD 到测试闭环引擎

能力说明：

- 读取 Markdown PRD
- 本地搜索项目上下文
- 用 research provider 压缩搜索结果
- 用 strategy provider 生成实现计划
- 写入文件并执行测试命令
- 保存每次运行的日志、阶段产物和备份

入口：

```bash
python3 -m business_loop.cli run --prd path/to/prd.md --project-root path/to/project
```

测试入口：

```bash
python3 -m unittest discover -s tests -v
```

相关说明：

- [PRD到测试闭环流程](/Users/apple/Desktop/project/document/05_Workflows/PRD到测试闭环流程.md)
- [PRD到测试闭环系统说明](/Users/apple/Desktop/project/document/99_System/PRD到测试闭环系统说明.md)

### 业务闭环面板

能力说明：

- 用一个本地 Web 面板管理多个业务项目
- 初始化项目身份和长期记忆
- 直接输入自然语言需求或 PRD 路径
- 启动一次闭环运行并查看状态
- 当业务规则不清时自动阻断

入口：

```bash
python3 -m business_loop.cli serve-panel --open
```

快捷入口：

```bash
bash scripts/start_business_loop_panel.sh
npm run loop:panel
```

相关说明：

- [业务闭环面板说明](/Users/apple/Desktop/project/document/99_System/业务闭环面板说明.md)

### 后续可继续 skill 化的候选能力

- 来源内容自动摘要
- 视频内容结构化拆解
- PDF 转 Markdown 后提炼重点
- 多来源合并为主题笔记
- 主题笔记生成分享文章

skill 候选池与流程入口：

- [Skill候选池.md](/Users/apple/Desktop/project/document/99_System/Skill候选池.md)
- [Skill开发流程.md](/Users/apple/Desktop/project/document/05_Workflows/Skill开发流程.md)
- [Skill集成说明.md](/Users/apple/Desktop/project/document/99_System/Skill集成说明.md)

当前已进入孵化的本地 skill：

- [source-auto-summary](/Users/apple/Desktop/project/document/.agents/skills/source-auto-summary/SKILL.md)

当前已可复用的本地 skill：

- [article-publish-kit](/Users/apple/Desktop/project/document/.agents/skills/publish-article/SKILL.md)
- [article-visual-assets](/Users/apple/Desktop/project/document/.agents/skills/render-svg/SKILL.md)
- [markdown-publish-preview](/Users/apple/Desktop/project/document/.agents/skills/markdown-publish-preview/SKILL.md)

## Skill 跨工具发现机制（2026-05-07 起）

**统一架构**：所有 skill 真身在 `.agents/skills/<name>/`，多工具自动发现：

| 工具 | 发现路径 | 接入方式 |
|---|---|---|
| Codex CLI | `.agents/skills/`（项目级，原生）| 直接读，无需配置 |
| OpenCode | `.agents/skills/` + `.claude/skills/`（都原生支持）| 直接读 |
| Claude Code | `.claude/skills/`（仅这个）| 通过 symlink → `../../.agents/skills/<name>` 自动接入 |
| Gemini CLI | 无 skill 目录概念，只读 `GEMINI.md` | 见仓库根 [GEMINI.md](/Users/apple/Desktop/project/document/GEMINI.md) |

> ⚠️ Codex CLI **不**读 `~/.codex/skills/`（这是历史误传）。Codex 真正读的是项目级 `.agents/skills/` + 用户级 `~/.agents/skills/`。

当前 10 个 skill（全部住 `.agents/skills/`）：

wiki 层：

- [ingest](/Users/apple/Desktop/project/document/.agents/skills/ingest/SKILL.md)：处理新来源，fan-out 触达 5-10 wiki 页
- [query](/Users/apple/Desktop/project/document/.agents/skills/query/SKILL.md)：检索 wiki 回答问题，可归档为 synthesis
- [lint](/Users/apple/Desktop/project/document/.agents/skills/lint/SKILL.md)：周期性 wiki 健康度检查

publishing 层：

- [critique](/Users/apple/Desktop/project/document/.agents/skills/critique/SKILL.md)：文章产出后按 4 维度评分并强制返工，去 AI 味
- [publish-article](/Users/apple/Desktop/project/document/.agents/skills/publish-article/SKILL.md)：发布包装完整工作流（含原 article-publish-kit 全部内容）
- [render-svg](/Users/apple/Desktop/project/document/.agents/skills/render-svg/SKILL.md)：视觉资产生产 + 校验（含原 article-visual-assets 全部内容）

基础层：

- [verify](/Users/apple/Desktop/project/document/.agents/skills/verify/SKILL.md)：跑测试 + SVG 布局校验

浏览器 / 联网层：

- [web-access](/Users/apple/Desktop/project/document/.agents/skills/web-access/SKILL.md)：通过 CDP 直连用户日常 Chrome（带登录态），处理反爬站、动态渲染、登录态页面、社交媒体（小红书 / 微信公众号 / 微博等）。前置依赖：Node 22+ 与 Chrome 远程调试授权（`chrome://inspect/#remote-debugging`）。CDP Proxy 端口 `localhost:3456`。
  - 触发场景：抓取微信公众号 / 小红书 / 知乎等反爬中文站、需要登录态的内部系统、视频帧采样、动态渲染页面
  - 使用原则：URL 已知且静态可达 → 优先 WebFetch；反爬站、登录态、需要交互 → 直接走 web-access CDP

工具型 skill（独立工具，slash 触发非必需）：

- [markdown-publish-preview](/Users/apple/Desktop/project/document/.agents/skills/markdown-publish-preview/SKILL.md)：本地 Markdown 富文本预览
- [source-auto-summary](/Users/apple/Desktop/project/document/.agents/skills/source-auto-summary/SKILL.md)：来源自动摘要

> 旧 `~/.codex/skills/web-access` 残留：可保留无影响（Codex 不读它，但也不报错）。新机器请按本节安装方式直接用项目级 `.agents/skills/`。

## 8. 协作口径

本仓库默认使用中文协作。

当前已识别到的稳定偏好：

- 优先用中文完成内容生产和协作
- 内容不仅要有正文，还要尽量补齐发布版、发布建议和传播物料
- 发布建议不应只停留在冷标题和中性导语，默认应补“更有点击欲的标题备选”“标题选择建议”“推荐分享开场口径”“不建议使用的发布方式”
- 发布建议的整体风格应更接近真人分享、社群转发和经验复盘口径，而不是百科式、说明书式或过度冰冷的表达
- 视觉资产优先使用 SVG
- SVG 资产生成后，应先渲染预览验证，再决定是否导出 PNG
- 文本型 SVG 默认应再跑一次布局检查，优先识别文字越界和重叠风险
- 对外发布正文、飞书文档、公众号编辑器等实际分发场景，默认引用 PNG，不直接引用 SVG
- PNG 导出必须锁定为 SVG 根尺寸，不能让当前机器窗口大小决定最终宽高
- 横版发布图默认可按统一宽度导出，例如 1440，并保持原始比例
- 对文本密度高、容易超框的结构图，首次生成就优先使用 `Satori` 的“模板 + 数据”方式生成 SVG
- 如果希望跨机器尽量保持一致，应优先使用稳定字体方案，不完全依赖系统字体
- 文章应尽量加入示例，增强可读性和完整性
- 同一篇内容优先拆成分层产物，便于后续继续编辑和复用
- 当发布目标是飞书等富文本编辑器时，优先考虑先渲染 HTML 预览再复制，而不是直接复制 Markdown 源码
- 对可重复使用的方法和流程，优先沉淀为“参考文档 + 模板”的组合，方便他人按自己的业务重新定制
- 发布前默认跑一次 `/critique` 去 AI 味校验，命中硬规则（"而是"句、协作路标词、戏剧化揭露、模板段、客服口吻）必须返工
- 反 AI 味规则沉淀在 [.claude/skills/critique/references/zh-ai-tells.md](/Users/apple/Desktop/project/document/.claude/skills/critique/references/zh-ai-tells.md) 与 [rule-taxonomy.md](/Users/apple/Desktop/project/document/.claude/skills/critique/references/rule-taxonomy.md)，发现新模式按规则 A 回写

输出原则：

- 先判断内容类型，再处理
- 先结构化，再表达观点
- 先沉淀主题，再生成文章
- 先形成工作稿，再做发布包装
- 优先可复用、可维护，不追求一次性结果

当内容任务已经进入发布阶段时，优先检查是否适合使用本地 skill：

- [article-publish-kit](/Users/apple/Desktop/project/document/.agents/skills/publish-article/SKILL.md)
- [article-visual-assets](/Users/apple/Desktop/project/document/.agents/skills/render-svg/SKILL.md)

当任务涉及封面图、认知图、结构图或 SVG 图卡时，默认执行：

1. 先生成 SVG
2. 文本型资产优先判断是否应改用 `Satori`
3. 再做 PNG 预览验证
4. 再做布局检查，确认没有明显越界和重叠
5. 发现裁切或版式问题后先修 SVG 或模板
6. 如有平台分发需求，再导出 PNG

当任务从来源整理进入主题或发布阶段时，应优先检查：

- [source-auto-summary](/Users/apple/Desktop/project/document/.agents/skills/source-auto-summary/SKILL.md)
- [article-publish-kit](/Users/apple/Desktop/project/document/.agents/skills/publish-article/SKILL.md)

当任务涉及业务闭环设计、流程 agent 化或系统化评估时，应优先复用：

- [业务闭环设计流程](/Users/apple/Desktop/project/document/05_Workflows/业务闭环设计流程.md)
- [T-业务闭环设计](/Users/apple/Desktop/project/document/04_Templates/T-业务闭环设计.md)

当任务涉及软件类 PRD 落地、实现计划生成、受控写文件和测试闭环时，应优先复用：

- [PRD到测试闭环流程](/Users/apple/Desktop/project/document/05_Workflows/PRD到测试闭环流程.md)
- [PRD到测试闭环系统说明](/Users/apple/Desktop/project/document/99_System/PRD到测试闭环系统说明.md)
- [业务闭环面板说明](/Users/apple/Desktop/project/document/99_System/业务闭环面板说明.md)
- [business_loop](/Users/apple/Desktop/project/document/business_loop)

如果任务完成后能够顺手提高仓库的长期可用性，应主动补齐文档、模板、规则或 skill 候选说明。
