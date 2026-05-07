---
name: lint
description: Periodic health check on the wiki. Scan for contradictions between pages, stale claims newer sources have superseded, orphan pages, missing cross-references, "TODO"/"待补" markers gone stale, sources with status:thin, and synthesis candidates (≥3 sources on the same combination but no synthesis page). Suggest follow-up sources and queries to fill gaps. Use weekly, before major writing pushes, or after a batch ingest.
---

# lint

按 [LLM Wiki 约定](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 的"健康度检查"操作。Karpathy 强调：wiki 不维护就会腐烂，但**自动化的腐烂检测让维护成本接近零**。

## 何时使用

- 周期性（建议每周一次）
- 批量 ingest 之后（一次入 ≥ 3 个来源）
- 写文章前（避免拿着腐烂数据下笔）
- 用户主观感觉"wiki 越来越乱了"

不适合：

- 小问题修复（直接改即可，不必启动 lint）
- 单页内整理（属于编辑工作）

## 输入

- 可选：扫描范围（默认全 wiki；可指定 `entities` / `concepts` / `sources` / `syntheses`）
- 可选：阈值（默认按下面的"硬阈值"）

## 工作流

### 1. 准备扫描清单

读 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md)，建立本次扫描覆盖的页清单。

读 [log.md](/Users/apple/Desktop/project/document/log.md) 最近 30 天事件，标出"高活动期"——那段时间集中写入的页更可能有矛盾。

### 2. 七项扫描

#### A. 矛盾扫描（pages contradicting each other）

跨 entity / concept / synthesis 页，找：

- 同一事实陈述在 ≥ 2 页里给出不同数字 / 时间 / 引用
- 同一概念的"我倾向的判断"段在不同页里立场不一致
- entity 页"与其他 entity 的对照"段被对方页推翻

报告格式：

```
[contradiction] <page A> § <段名> ⇄ <page B> § <段名>
  A: "<引用>"
  B: "<引用>"
  建议: <修一边、合并、还是标 disputed>
```

#### B. 过时声明（stale claims）

找：

- 引用了某来源后又有更新来源，但 entity / concept 页没改"我倾向的判断"
- frontmatter `updated_at` 早于最新关联 source 的 `ingested_at`
- 文中有"目前"、"截至 X 时"、"最新"等时间表达，但页本身长期未更新（≥ 60 天）

#### C. 孤儿页（orphans）

- entity / concept / synthesis 页：在 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md) 没条目
- entity / concept 页：被 0 个 source 引用、0 个 synthesis 引用
- source 摘要：未关联任何 entity / concept

孤儿不一定要删，但要回答"为什么孤"。

#### D. 缺失交叉引用（missing cross-refs）

- entity A 在 5 个 source 里都和 entity B 同时出现，但 A 页和 B 页都没互相提
- concept X 在多个 entity 页有讨论，但 X 自己的 concept 页没列这些 entity
- index.md 待补清单里某项已经在 ≥ 3 source 出现，应该立即建页

#### E. 烂尾 TODO

- entity / concept 页里 `# TODO` 或 `待补`、`待证伪` 标记 ≥ 30 天没动
- synthesis 页 frontmatter `publishability: 0` ≥ 60 天没升级（要么升 1 转入发布，要么标 parked）

#### F. 薄来源（thin sources）

- source 摘要 frontmatter `status: thin`
- source 摘要触达 entities/concepts ≤ 1（应该是 fan-out 失败的信号）

报告这些来源，决定：删除 / 重写 / 接受其薄

#### G. Synthesis 候选

`/lint` 主动发现合成机会：

- 某 entity / concept 组合在 ≥ 3 source 都出现，但没有 synthesis 页
- 多个 source 在 frontmatter `entities` 字段里同时列出 X 和 Y，但 X 与 Y 没有 synthesis

按候选强度排序（出现次数 + 时间跨度）输出 top 5。

### 3. 修复 vs 报告 决策

每个发现项决定：

- **立即修**：明确的、低风险的（如孤儿页加 index 条目、补一对交叉引用）
- **报告给用户**：需要判断的（如矛盾应该相信哪边、烂尾 TODO 是否要 park）
- **deferred**：复杂或需新来源（如某 entity 应建独立页但缺一手资料 → 建 ingest 候选）

### 4. 修复（在能力范围内）

立即修类项目直接动手：

- 补 index.md 缺失条目
- 补显然该有的交叉引用（A 提了 B，但 B 页没回提）
- 给 ≥ 30 天没动的 synthesis 改 status: parked

修改前给用户一个"将要修的清单"，征得同意再批量动。

### 5. 报告

输出三段：

```
=== Lint 报告 [<YYYY-MM-DD>] ===

🚨 关键问题（建议立即处理）
- [contradiction] OpenSpec.md § 适用范围 ⇄ AI Vibecoding.md § 与 OpenSpec 的对照
  ...
- [orphan] 模型能力变化.md 在 index.md 未登记
  ...

⚠️ 维护项（建议本周处理）
- [stale] AI Agent.md 已 45 天未更新，最近相关 source 是 2026-04-15
- [thin source] 2026-03-23_link_xxx.md 仅触达 1 个 concept，疑似 fan-out 失败
- [todo] OpenSpec.md § 待证伪 已挂 50 天

💡 综合建议（可选）
- synthesis 候选: OpenSpec × AI Vibecoding（4 source，跨度 2 月）
- ingest 候选: 关于 prompt caching 的来源在 wiki 缺一手资料

=== 已自动修复 ===
- 补 index.md 条目: <list>
- 补交叉引用: <list>
- 标记 parked: <list>
```

### 6. 追加 log.md

```text
## [<YYYY-MM-DD HH:MM>] lint | weekly check
- issues found: <count>
- fixed: <count>
- deferred: <count>
- contradictions: <count>
- stale: <count>
- orphans: <count>
- synthesis candidates: <list>
```

## 硬阈值

| 项 | 阈值 |
|---|---|
| 烂尾 TODO 的"久" | ≥ 30 天 |
| Stale 页的"久未更新" | ≥ 60 天 |
| Synthesis 候选的"足够多来源" | ≥ 3 source 谈同一组合 |
| 孤儿 source 的"无关联" | 0 entity + 0 concept |
| 薄 source 的"触达少" | ≤ 1 entity/concept fan-out |

阈值都可以按仓库实际情况调，但调整本身要在 [llm-wiki约定.md](/Users/apple/Desktop/project/document/99_System/llm-wiki约定.md) 里记一笔。

## 反模式

- **过度修复**：自动改了页面立场。`/lint` 不替用户判断"哪边对"——只指出冲突
- **删孤儿**：孤儿页可能是值得发展的萌芽，先报告别动手
- **报告轰炸**：100 条无优先级输出。报告必须分级（关键 / 维护 / 建议）
- **跳过 log**：lint 没记日志 → 下次 lint 看不到上次状态
- **每天跑**：lint 没那么频繁就该跑。每周一次足够；少了 wiki 真的会腐烂，多了浪费上下文

## 与其他 skill 的协作

- `/lint` 报"建议 ingest 某来源" → 用户去 `/ingest`
- `/lint` 报"synthesis 候选" → 用户用 `/query` 触发综合
- `/lint` 修了 index.md → 不需要单独通知 `/query`，下次自然命中
- 发布前应跑一次 `/lint`，再跑 `/publish-article`，避免拿过期判断写文章
