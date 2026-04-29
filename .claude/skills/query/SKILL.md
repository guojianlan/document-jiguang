---
name: query
description: Answer a question against the wiki by reading index.md, drilling into relevant entity/concept/source pages, synthesizing an answer with citations. If the answer is non-trivial and reusable, file it back as a synthesis page so future queries don't redo the work. Use whenever the user asks a knowledge-base question, wants a comparison/analysis, or asks "what do we know about X".
---

# query

按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 的"检索 + 综合"操作。Karpathy 强调：好的回答应当**回流成新页**，让仓库越查越富。

## 何时使用

- 用户提出知识性问题："我们对 OpenSpec 的判断是什么"、"AI Agent 和 Workflow 的差别"、"过去一个月 Anthropic 在 autonomy 上的动作"
- 需要在 wiki 内做对比、综述、时间线
- 写文章前的素材聚合（不替代 `/publish-article`，但提供原料）

不适合：

- 仓库外的常识问题（用 `web-access` skill 或直接搜索）
- 单条来源的细节查找（直接读对应 source 摘要即可）
- "下一步该做什么"这类规划问题（不属于知识检索）

## 输入

- 必填：问题（自然语言）
- 可选：限定范围（"只看 entities"、"只看 2026-03 之后的来源"）
- 可选：输出形态偏好（markdown / 对比表 / 时间线 / slide）

## 工作流

### 1. 拆问题

把问题先拆解：

- **类型**：事实查询 / 对比 / 综述 / 时间线 / 立场判断
- **涉及哪些 entity / concept**（先猜，从 index.md 校对）
- **涉及哪些来源时段**（如有）

### 2. 走 index.md → 命中页

打开 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md)：

- 先扫"类别速览"和"待补"清单（可能问题正好命中"待补"项 → 报告缺口）
- 在 entities 和 concepts 表里找命中页
- 在 sources 表里按 `涉及 entity / concept` 列筛出相关 source

如果命中 ≤ 2 页：本次 query 大概率会暴露 wiki 颗粒度问题——保留这个信号，准备在 step 5 给用户一个 "wiki 缺口报告"。

### 3. 读命中页

按"entity → concept → source"顺序读。entity 与 concept 页是已经被组织过的视角，读起来比 raw source 高效。

读时记三件事：

- **直接引用证据**（哪句话支持回答）
- **矛盾点**（页之间如有冲突，标记下来——也是 `/lint` 的潜在线索）
- **缺口**（问题需要的信息在 wiki 里没有 → 报告 `web-access` 或 ingest 候选）

### 4. 综合答案

按用户要求的形态输出：

- **markdown 段落**：默认
- **对比表**：用户问"X 和 Y 的差别"时优先
- **时间线**：用户问"过去 N 个月 X 的演进"时优先
- **slide（Marp）**：用户明确要 deck 时（暂未在仓库内沉淀模板，按需写）
- **canvas / chart**：用户明确要图时

每个判断必须带**引用**——格式：`(来自 [[wiki 页名]] / SourceNote 文件名)`。读者要能直接跳到原文核对。

不要凭印象作答。如果 wiki 没有支撑，说"wiki 里没有"——并把它列入 step 5 的缺口清单。

### 5. 评估归档（关键）

回答完毕后，**对自己提一个问题**：

> 这个回答以后还会有人问吗？回答里有 wiki 之前没整合过的 insight 吗？

如果两条任一为 yes：**归档成 synthesis 页**。

- 位置：`02_Notes/TopicNotes/_synthesis_<slug>.md`（Phase 1）→ `wiki/syntheses/<slug>_<form>.md`（Phase 2）
- frontmatter：

```yaml
---
type: synthesis
form: comparison | timeline | debate | digest
created_at: <YYYY-MM-DD>
based_on_sources: [...]
based_on_entities: [...]
based_on_concepts: [...]
publishability: 0
triggered_by_query: "<原问题>"
---
```

- 正文 = step 4 输出 + 一段"未覆盖的缺口"列表
- 把新页加到 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md) 的 Syntheses 表

如果两条都 no（典型：纯事实查询、用户随口问），**不归档**——避免 wiki 灌水。

### 6. 报告 wiki 缺口（必）

无论是否归档 synthesis，都要给用户一段"本次 query 暴露的缺口"：

- 命中页过少 → 提议 `/lint` 或补来源
- 多个 source 谈同一组合但没有 synthesis → 提议下次手动归档
- 关键 entity / concept 缺独立页 → 提议建页

### 7. 追加 log.md

按 [log.md](/Users/apple/Desktop/project/document/log.md) 格式：

```text
## [<YYYY-MM-DD HH:MM>] query | <问题简写>
- pages searched: <count>
- pages cited: <list>
- answer filed: <synthesis 路径 or "not filed">
- gaps reported: <count>
- pages touched: <total>
```

## 输出形态

```
回答：<内容>

引用：
- [[entity/concept 名]] § 段落
- SourceNote: <file>.md

归档：<是 / 否，原因>

wiki 缺口：
- <缺口 1>
- <缺口 2>

建议下一步：
- <跑 /ingest <某来源> 补缺> / <跑 /lint 校对> / 无
```

## 反模式

- **不引用**：直接给答案不附 wiki 出处——破坏知识可追溯
- **过度归档**：每个回答都建 synthesis——wiki 会被噪音淹没
- **照抄整段**：把 entity 页一整段复制过来——synthesis 应该是**新组合**，不是复读
- **冷启动跳过 index.md**：直接 grep 全仓库找答案——容易遗漏已经组织好的视角
- **越过 wiki 用 web-access**：先看 wiki 有没有，wiki 不够再上网

## 与其他 skill 的协作

- 经常一起跑：`/query` 报告缺口 → 决定跑 `/ingest` 补来源 → 再 `/query` 一次确认覆盖
- 归档的 synthesis 是 `/publish-article` 的天然原料（`publishability=1` 后即可发布加工）
- `/lint` 会扫"被 query 多次但仍无 synthesis 的话题"
