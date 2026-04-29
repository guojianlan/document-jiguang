# LLM Wiki 时间线

append-only 记录。每条 ingest / query / lint 都要追加一条。

## 格式约定

每条以 `## [<timestamp>] <op> | <subject>` 开头，timestamp 用 `YYYY-MM-DD HH:MM`。这样可以直接 grep：

```bash
grep "^## \[" log.md | tail -10            # 最近 10 条事件
grep "^## \[.*ingest" log.md | wc -l       # ingest 总次数
grep "^## \[2026-04" log.md                # 2026 年 4 月所有事件
```

`<op>` 取以下三种之一：`ingest` / `query` / `lint`。

## 字段约定

每条事件下用 `-` 列表写关键字段，便于扫描：

- **ingest** 必含：`summary written`、`entities updated`、`concepts updated`、`pages touched`、`new pages`
- **query** 必含：`pages searched`、`answer filed`（可选）、`pages touched`
- **lint** 必含：`issues found`、`fixed`、`deferred`

---

## [2026-04-28 15:25] system | LLM Wiki 模式启动
- 文档：`99_System/llm-wiki约定.md`
- skill：`/ingest`、`/query`、`/lint` 已建骨架
- 索引：`06_Maps/index.md` 初始化
- Phase 1 完成，等待第一次实战 ingest

## [2026-04-29 11:00] lint | 旧 topic_note schema 迁移
- 迁移到新 schema：AI 产品观察、AI 内容生产、组织如何使用 AI（→ type: concept）、OpenSpec（→ type: entity）
- 加 backfill wikilinks 让它们进入 wiki 连通图（避免视觉孤岛）
- 同时回写 Anthropic、模型能力变化、how-openai-uses-codex 三页加入对应交叉引用
- index.md 更新：entities 3→4
- pages touched: 7
- friction: AI 产品观察 此前真的没有任何 backfill 路径——证明仅有 index 引用不足以让 wiki 连通；index.md 不能算入 fan-out 度量

## [2026-04-28 15:50] ingest | claude-code-autonomy（test run）
- summary written: wiki/sources/2026-03-23_article_anthropic_claude-code-autonomy.md（修订 frontmatter 为新 schema）
- new entities: Claude Code, Anthropic
- new concepts: autonomy
- entities updated: —
- concepts updated: AI Agent, AI 工作流, 模型能力变化, AI Vibecoding
- new pages: 3 (Claude Code.md, Anthropic.md, autonomy.md)
- synthesis seeded: 否（暂记 candidate: "Claude Code vs Codex 路线对比"，等 Codex entity 建后再跑 /query 触发）
- pages touched: 9
- known design frictions:
  - friction 1: 仓库内 raw source 对网络文章默认仅以 URL 存在，raw/sources/Articles 不含原文 → /ingest SKILL.md 应明确"raw 可为 URL only"
  - friction 2: 旧 SourceNote frontmatter 的 `topic` 字段是单值，新 schema 用 `entities[]` + `concepts[]`——批量迁移时需做格式转换
  - friction 3: SKILL.md 要求 step 1 与用户对话 1-3 轮，但 test run 跳过——后续真实 ingest 应执行
