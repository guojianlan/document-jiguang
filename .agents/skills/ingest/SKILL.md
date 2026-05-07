---
name: ingest
description: Process a new raw source (article, link, video, PDF, document) into the wiki. Read the source, write a structured summary, fan-out updates to relevant entities/concepts/syntheses pages, refresh index.md, append log.md. Use whenever a new source enters raw/inbox/ or raw/sources/ and the user wants it integrated into the knowledge base.
---

# ingest

按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 执行的"摄入"操作。

> **⚠️ 2026-05-06 起新模型**：本仓库切换到**用户拥有 taxonomy** 的 3 层架构（domain + 按需 topic + mentions）。**不要再自动建 entity/concept**——只能用 [`06_Maps/taxonomy.md`](/Users/apple/Desktop/project/document/06_Maps/taxonomy.md) 已批准的 domain/tag。详见下方"## 新模型：write source + 提议而非创建"段。

新来源进入仓库后，**最少触达 source 摘要 + log + index + 提议清单**，预期 fan-out 到 5-10 页（fan-out 现在含"建议晋升 topic"提议，不含真实建页）。

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

**frontmatter 按 v2 模型**（2026-05-06 起）：

```yaml
---
type: source
source_type: article | link | video | pdf | document
source_path: <raw 源文件路径或 URL>
source_url: <如有>
source_title: <原文标题>
author: <原作者名，仅供审计追溯，不参与分类>
publish_date: <如有>
ingested_at: <YYYY-MM-DD>
domains: [domain/ai-coding, domain/ai-agent, ...]   # ← 只能用 taxonomy.md 已批准的 domain
mentions: [<具体名字>, ...]                          # ← 自由字符串，记录 source 提到的产品/工具/人/概念
status: ingested
---
```

**禁用字段**：`entities` / `concepts`（已废弃，2026-05-06 切换到 v2）。如果遇到旧 source 含这些字段，按需迁移。

正文按现有 `04_Templates/T-来源笔记-*.md` 模板。**重点**：事实 / 观点 / 判断分离——这是 wiki 的基础不变量。**作者称谓用"该来源 / 该案例 / 该实践者"，不写"作者 X 说"**——人名只在 frontmatter 的 `author` 字段。

### 3. Fan-out：提议而非创建（重要）

**v2 模型下 fan-out 不再自动建页**。你的工作变成：

1. **提议 topic 候选**：根据本次 source + 已有 wiki，识别哪些 mention / 主题"应该建 topic 页"。在 ingest 报告的"Topic 提议"段列出，**不真实建页**。用户批准才建
2. **提议 mentions 归一**：如果新 mention 与已有 mention 是同义词（"Karpathy" / "Andrej Karpathy"），在报告里提议归一
3. **提议新 domain**（仅当确实出现新行业，比如 wiki 第一次开始覆盖"AI 教育"时——不是经常发生）

**已有 topic 页的更新**（如已存在 `wiki/topics/mcp.md`）：
- 在该 topic 页的 `sources:` frontmatter 加本次 source
- 在 `## 当前稳定结论` 段补充新证据（如有）
- 在 `## 待证伪` 段记本次 source 引出的矛盾点

不要自动创建新 topic 页——任何新页必须经用户批准。

### 4. （已合并到 step 3）

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
- 新晋升的 topic 加到 topics 表（仅当用户批准建页后）
- 新 synthesis 加到"Syntheses"表
- 涉及但已存在的 topic 不需在 index 改动（除非状态变了）

### 7. 追加 log.md（必）

按 [log.md](/Users/apple/Desktop/project/document/log.md) 格式。**v2 模板**：

```text
## [<YYYY-MM-DD HH:MM>] ingest | <source-slug>
- summary written: wiki/sources/<file>.md
- domains: <list>
- mentions added: <count> new (<list of new mentions>)
- topics updated (existing): <list>
- topic promotion proposals: <list>  # 提议但未建
- mentions normalization proposals: <list>  # 别名归一建议
- synthesis seeded: <if any>
- pages touched: <total>
```

### 8. Fan-out 自检

v2 下"fan-out"含义变化——**不再要求 ≥ 3 页真实改动**，而是：

- source 摘要 ≥ 1 页（必）
- 已有 topic 页更新 ≥ 0 页
- 提议 ≥ 1 个动作（topic 候选 / mentions 归一 / 新 domain）

如果 source 完全没引出任何提议、也不更新任何 topic，标 `status: thin` 告知用户。

## 输出形态（v2）

1. source 摘要（必）
2. 已存在 topic 页的更新（如有，可能 0 页）
3. 更新的 index.md + log.md（必）
4. mentions.md 重新生成（自动）
5. **给用户的"提议清单"报告**（v2 关键产出）：

```
ingest 完成：<source-slug>

- 摘要：wiki/sources/<file>.md
- domains: <list>
- 新增 mentions: <list>
- 已更新 topic 页: <list>

【需你批准的动作】

Topic 候选（≥3 source，建议晋升）：
- <slug-1>: 涉及 <N> 条 source，建议建 wiki/topics/<slug-1>.md
- <slug-2>: ...

Mentions 归一建议：
- "Karpathy" / "Andrej Karpathy" → 统一 "Karpathy"

新 domain 申请（仅当出现新行业）：
- 暂无

请回复："批 1, 驳 2，归一同意" 之类。

下一步建议：
- <可选：跑 /query 或 /lint>
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
