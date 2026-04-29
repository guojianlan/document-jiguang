# LLM Wiki 约定

本文件把 [Karpathy 的 LLM Wiki 模式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 翻译成本仓库的术语和操作。

> The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read.

—— Karpathy

仓库的核心定位从此分两层看：

1. **wiki 层**：知识在这里持续累积、交叉引用、自动维护，写入由 LLM 完成
2. **publishing 层**：把 wiki 里的某些综合页打包成对外发布的文章/图卡/社交文案

两层正交。`/critique`、`/publish-article`、`/render-svg` 是 publishing 层；`/ingest`、`/query`、`/lint` 是 wiki 层。

---

## 三层架构

按 Karpathy 的定义对齐到本仓库目录（Phase 2 已完成，目录结构按本表）：

| Karpathy 层 | 本仓库目录 | 谁拥有 |
|---|---|---|
| **Raw sources** | `raw/inbox/`、`raw/sources/`、`raw/attachments/` | 用户（不可被 LLM 修改）|
| **The wiki** | `wiki/sources/`、`wiki/entities/`、`wiki/concepts/`、`wiki/syntheses/` | LLM（用户只读浏览）|
| **The schema** | `AGENTS.md` + `CLAUDE.md` + `99_System/` | 共同维护 |

不属于 Karpathy 三层但保留在仓库内的 meta 目录：`04_Templates/`、`05_Workflows/`、`06_Maps/`、`08_Skills/`、`scripts/`、`skills/`、`.claude/skills/`、`business_loop/`、`tests/`。

---

## wiki 四类页面

按 Karpathy 推荐的分类切，每类页面有固定 frontmatter 与文件命名规则。

### 1. sources（来源摘要）

- **位置**：`wiki/sources/`
- **作用**：每个 raw source 对应一份 wiki 摘要——结构化提取、事实/观点/判断分离
- **命名**：`YYYY-MM-DD_<type>_<slug>.md`（已有规范，沿用）
- **frontmatter**：

```yaml
---
type: source
source_type: article | link | video | pdf | document
source_path: raw/sources/Articles/<file>.md
ingested_at: 2026-04-28
entities: [OpenSpec, Anthropic]
concepts: [spec-driven 开发, AI Agent]
status: ingested
---
```

### 2. entities（具体物/工具/产品/人物/组织）

- **位置**：`wiki/entities/`
- **作用**：每个具体名词一页——OpenSpec、Claude Code、Anthropic、Codex、Cursor 等
- **命名**：`<EntityName>.md`（保留 Obsidian wikilink 友好的纯名字）
- **frontmatter**：

```yaml
---
type: entity
aliases: [OpenSpec, openspec]
first_seen: 2026-03-23
sources: [link_openspec-practical-guide, link_openspec-ai-workflow-analysis]
related_concepts: [spec-driven 开发, change management]
related_entities: [Claude Code, Codex]
status: active
---
```

- **正文段落约定**：
  - `## 是什么`（一句话）
  - `## 核心机制`
  - `## 我看到的实际表现`
  - `## 与其他 entity 的对照`
  - `## 待补 / 待证伪`

### 3. concepts（抽象概念/模式/方法）

- **位置**：`wiki/concepts/`
- **作用**：每个抽象概念一页——"AI Agent"、"AI Vibecoding"、"spec-driven 开发"、"prompt caching" 等
- **命名**：`<concept-slug>.md`
- **frontmatter**：

```yaml
---
type: concept
aliases: [AI Agent, agent, autonomous agent]
first_seen: 2026-03-23
sources: [...]
related_entities: [Claude Code, Codex, OpenSpec]
related_concepts: [AI 工作流, 模型能力变化]
maturity: tracked | hypothesis | parked
status: active
---
```

- **正文段落约定**：
  - `## 定义`（先用一句话；不超过 40 字；不要堆叠"本质上是…"）
  - `## 当前的几种主流理解`
  - `## 我倾向的判断`
  - `## 反例与边界`
  - `## 待补`

### 4. syntheses（对比/分析/时间线/分享文档）

- **位置**：`wiki/syntheses/`（初始为空，由 `/query` 与 `/lint` 触发归档填充）
- **作用**：把 ≥ 2 个来源或 ≥ 2 个 entity/concept 拉到一起的产物——对比表、时间线、争议综述、复盘
- **触发**：`/query` 跑出值得保留的回答，归档成一个 syntheses 页；或 `/lint` 发现 ≥ 3 个来源谈同一概念时主动合成
- **命名**：`<topic-slug>_<form>.md`（form: comparison / timeline / debate / digest）
- **frontmatter**：

```yaml
---
type: synthesis
form: comparison | timeline | debate | digest
created_at: 2026-04-28
based_on_sources: [...]
based_on_entities: [...]
based_on_concepts: [...]
publishability: 0 | 1 | 2  # 0=纯内部知识 1=可改成发布稿 2=已派生发布稿
derived_outputs: [outputs/drafts/<file>.md]
---
```

`syntheses` 是 wiki → publishing 的桥梁。`publishability=2` 的 synthesis 会在 `derived_outputs` 字段记录已经派生出的文章草稿。

---

## 三种核心操作

详见各自 skill：

- `/ingest` ([SKILL.md](/Users/apple/Desktop/project/document/.claude/skills/ingest/SKILL.md))：处理新来源，fan-out 更新 wiki
- `/query` ([SKILL.md](/Users/apple/Desktop/project/document/.claude/skills/query/SKILL.md))：检索 wiki 回答问题，可归档为 synthesis
- `/lint` ([SKILL.md](/Users/apple/Desktop/project/document/.claude/skills/lint/SKILL.md))：扫矛盾、过时、孤儿、缺交叉引用

### Ingest 的 fan-out 含义

Karpathy 强调"一个来源更新 10-15 页"。在本仓库的具体含义：

每收到一个新来源，**最少**要做 4 步、**预期**触达 5-10 页：

1. **写 source 摘要页**（必）：`wiki/sources/<file>.md`
2. **更新涉及的 entities 页**（每个相关实体 1 页）：在 `## 我看到的实际表现` 加证据，在 `## 与其他 entity 的对照` 加新对比
3. **更新涉及的 concepts 页**（每个相关概念 1 页）：在 `## 当前的几种主流理解` 加新视角，必要时改 `## 我倾向的判断`
4. **更新 [index.md](/Users/apple/Desktop/project/document/06_Maps/index.md)**（必）：source 入新条目；如果创建了新 entity/concept 也入新条目
5. **追加 [log.md](/Users/apple/Desktop/project/document/log.md)**（必）：一条 ingest 记录

可选第 6 步：如果触达 ≥ 2 个 entity 且未来可能成文，建一个 `synthesis` 页骨架，标 `publishability: 0`。

如果只动了 source 摘要 1 页 + index/log 2 页 = 3 页，**说明 fan-out 失败**——要么源没新东西、要么 wiki 缺相应的 entity/concept 页。前者跳过，后者补建。

---

## 索引与日志

### index.md（内容索引）

- **位置**：`06_Maps/index.md`
- **作用**：所有 wiki 页的 catalog——名字 + 一句话摘要 + 类别 + 元数据
- **更新频率**：每次 ingest 必更
- **结构**：按四类（sources / entities / concepts / syntheses）分节，每节一表

### log.md（时间线）

- **位置**：根目录 `log.md`
- **作用**：append-only 时间线（**meta 审计日志，不属于 wiki 知识图**）
- **不出现在 Obsidian Graph view**：log 是事件流而非知识，与 entities/concepts/syntheses 不在同一层。`.obsidian/graph.json` 的 search 过滤已经把 log 排除——见 graph.json
- **格式**（保证 `grep` 可解析）：

```text
## [2026-04-28 14:30] ingest | <source-slug>
- summary written: wiki/sources/<file>.md
- entities updated: OpenSpec, Claude Code
- concepts updated: spec-driven 开发
- pages touched: 5
- new pages: 1 (Claude Code.md)

## [2026-04-28 15:00] query | "Vibecoding vs spec-driven 的核心差异"
- pages searched: 8
- answer filed: wiki/syntheses/vibecoding-vs-spec-driven_comparison.md
- pages touched: 3
```

每条以 `## [<timestamp>] <op> |` 开头。

---

## 与 publishing 层的关系

publishing 层（`outputs/`、`/publish-article`、`/critique`、`/render-svg`）**不直接触碰 wiki**，但通过 synthesis 页连接：

1. 一个值得发的话题 → 在 `wiki/syntheses/` 有对应页（`publishability ≥ 1`）
2. `/publish-article` 把 synthesis 页转写成发布版正文 → 落 `outputs/drafts/`
3. 发布版正文跑 `/critique` 通过 → 落 `outputs/published/`
4. 在 synthesis 页 frontmatter 的 `derived_outputs` 字段写入派生的 draft 路径，标 `publishability: 2`

这样：**wiki 是知识的"主线"**，**outputs 是发布的"派生分支"**，互不污染。

---

## 与现有 skill 的兼容

| skill | 类型 | 对接 |
|---|---|---|
| `/ingest`、`/query`、`/lint` | 新增（wiki 层）| 维护 wiki + index + log |
| `/publish-article` | 现有（publishing 层）| 输入改为 synthesis 页路径，输出仍到 `outputs/drafts/` |
| `/critique` | 现有（publishing 层）| 不变 |
| `/render-svg` | 现有（publishing 层）| 不变 |
| `/verify` | 现有（基础）| 不变 |
| `intake_source.py` | 现有脚本 | Phase 1 不动；Phase 3 接入 `/ingest` 的前置预处理（自动落 raw/source 摘要骨架） |

---

## Phase 演进历史

- **Phase 1**（已完成）：本文件 + 三个 skill + index.md + log.md，零文件移动
- **Phase 2**（已完成）：raw/ + wiki/ + outputs/ 三层目录迁移 + 路径硬编码替换 + Obsidian 配置更新
- **Phase 3**（计划）：实战验证——跑 ≥ 5 次 ingest 看 fan-out 是否真的发生；建 Codex / OpenAI / Cursor 等待补 entity 页；触发第一个 synthesis
