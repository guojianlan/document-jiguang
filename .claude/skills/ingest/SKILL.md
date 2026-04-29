---
name: ingest
description: Process a new raw source (article, link, video, PDF, document) into the wiki. Read the source, write a structured summary, fan-out updates to relevant entities/concepts/syntheses pages, refresh index.md, append log.md. Use whenever a new source enters raw/inbox/ or raw/sources/ and the user wants it integrated into the knowledge base.
---

# ingest

按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 执行的"摄入"操作。一个新来源进入仓库后，**最少触达 4 类页 + log + index**，预期 fan-out 到 5-10 页。

## 何时使用

- 用户在 `raw/inbox/` 或 `raw/sources/` 新增了文件 / URL / PDF
- 用户说"把这篇文章入库"、"把这个链接处理一下"、"我刚加了几个来源"
- 完成一次外部阅读 / 视频 / 播客后，希望沉淀到 wiki

不适合：

- 仓库内部已有内容的二次整理（用 `/query` 或 `/lint` 而非 `/ingest`）
- 临时事实查询（用 `/query`）
- 单条引用或短句（直接加到现有页即可）

## 输入

- 必填：raw source 路径或 URL
- 可选：用户给的导向（如"重点关注 OpenSpec 部分"、"这个我之前读过类似的，注意对比"）

## 工作流

### 1. 读源 + 对话

读完整篇 raw source。读完后**先和用户对话** 1-3 轮，确认：

- 这篇里最值得保留的 1-3 个判断是什么
- 涉及哪些 entity / concept（先从 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md) 看现有项，再补未列入的）
- 有没有和现有 wiki 页明确矛盾或印证的地方

> 对话不是走过场。Karpathy 强调 user 决定方向、LLM 做苦力。如果跳过对话，fan-out 会变成机械填表。

### 2. 写 source 摘要页（必）

落到 `wiki/sources/<YYYY-MM-DD>_<type>_<slug>.md`（沿用现有命名规范）。

frontmatter 按约定：

```yaml
---
type: source
source_type: article | link | video | pdf | document
source_path: <raw 源文件路径或 URL>
ingested_at: <YYYY-MM-DD>
entities: [<entity 名字>, ...]
concepts: [<concept 名字>, ...]
status: ingested
---
```

正文按现有 `04_Templates/T-来源笔记-*.md` 模板。**重点**：事实 / 观点 / 判断分离——这是 wiki 的基础不变量，不要省。

### 3. Fan-out 更新 entities

对 step 1 列出的每个相关 entity：

- 如果 entity 页已存在（在 `wiki/entities/`）：
  - 在 `## 我看到的实际表现` 加一行证据，引用本次 source
  - 如果本次 source 与之前判断矛盾，在 `## 待补 / 待证伪` 加一条
  - 如果引出与其他 entity 的新对照，在 `## 与其他 entity 的对照` 加
- 如果 entity 页不存在：
  - 创建新页到 `wiki/entities/<name>.md`（按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 中 entity frontmatter 与段落约定）
  - 至少先写"是什么"段，其他段标 `# TODO` 后续完善

每个 entity 改动 = 1 页 fan-out。

### 4. Fan-out 更新 concepts

同 step 3，对每个相关 concept（在 `wiki/concepts/`）：

- 已存在 → 在 `## 当前的几种主流理解` 加新视角；矛盾时改 `## 我倾向的判断`
- 不存在 → 新建到 `wiki/concepts/<name>.md` + 至少写"定义"段

### 5. 评估 synthesis 触发

如果本次 source 同时触达 ≥ 2 个 entity 或 ≥ 2 个 concept，且这种组合在 wiki 里不曾综合过：

- 创建 synthesis 骨架页到 `wiki/syntheses/<slug>_<form>.md`（form: comparison / timeline / debate / digest）
- frontmatter 里 `publishability: 0`、列 `based_on_sources` 与 `based_on_entities/concepts`
- 正文先写一句"为什么这个组合值得合成"，其他段标 `# TODO`

如果一时合成不出来，**不要硬合**——记一条 lint TODO 到 [log.md](/Users/apple/Desktop/project/document/log.md) 就好，下次 `/lint` 再处理。

### 6. 更新 index.md（必）

- 新 source 加到"Sources"表
- 新建的 entity / concept 加到对应表
- 新 synthesis 加到"Syntheses"表
- 涉及但已存在的 entity / concept 不需在 index 改动（除非状态变了）

### 7. 追加 log.md（必）

按 [log.md](/Users/apple/Desktop/project/document/log.md) 格式。模板：

```text
## [<YYYY-MM-DD HH:MM>] ingest | <source-slug>
- summary written: wiki/sources/<file>.md
- entities updated: <list>
- concepts updated: <list>
- new pages: <count> (<names>)
- synthesis seeded: <if any>
- pages touched: <total>
```

### 8. Fan-out 自检

**触达 < 3 页 = ingest 失败**。要么：

- source 没新东西（在摘要页 frontmatter 标 `status: thin`，告知用户）
- wiki 缺相应 entity / concept 页（按 step 3-4 补）
- entity / concept 已存在但读 source 时没找出关联（重读 source 的 step 1）

不要把"3 页"凑数——必须是真有更新。如果反复触达 < 3 页，说明 wiki 颗粒度偏粗或来源同质化，提议 `/lint` 整体扫一次。

## 输出形态

1. 摘要页（必）
2. 改动的 entity / concept / synthesis 页（≥ 2）
3. 更新的 index.md（必）
4. 追加的 log.md（必）
5. 给用户的报告：

```
ingest 完成：<source-slug>
- 摘要：wiki/sources/<file>.md
- entities updated: <list> (<count> 页)
- concepts updated: <list> (<count> 页)
- new entities/concepts: <list>
- synthesis seeded: <yes/no>
- 总触达页数: <N>

下一步建议：
- <可选：建议跑 /query 或 /lint>
- <可选：建议补的来源>
```

## 边界

- 不替代 [scripts/intake_source.py](/Users/apple/Desktop/project/document/scripts/intake_source.py) 的"自动分类入库"——脚本负责把 raw 文件归到正确的 `raw/sources/<type>/` 子目录；本 skill 负责 wiki 层的处理。Phase 3 后会把脚本和 skill 串起来。
- 不做事实核查——source 里的事实信息就是事实（除非和 wiki 已有事实直接冲突，那是 lint 的工作）
- 不做发布包装——这是 `/publish-article` 的工作。如果发现某个 synthesis 值得发布，标 `publishability: 1` 然后让用户决定要不要走发布流程

## 与其他 skill 的协作

- 触达多个 entity → `/query` 时这些 entity 已经互联，更容易合成好答案
- `/lint` 会扫描"`status: thin` 的 source"和"标了 `# TODO` 久未填充的 entity 段"
- `/publish-article` 输入应该来自 `publishability ≥ 1` 的 synthesis 页，而不是直接来自 source 摘要

## 反模式

不要做的事：

- **机械填表**：每个 entity 都加一行"本次 source 也提到了 X"——这是噪音不是 fan-out
- **跳过对话**：直接读完源就开写。Karpathy 设计这套是因为人脑在前期介入价值最高
- **过早合成**：source 里有 1 个新观点就开 synthesis 页。等 ≥ 3 来源谈同一组合再合成
- **path drift**：把摘要写到 `outputs/drafts/` 或乱放——摘要必须落在 sources，发布产物必须从 synthesis 派生
