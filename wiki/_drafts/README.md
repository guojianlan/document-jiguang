# wiki/_drafts/ — 草稿池 / 待处理页

这里存放从 wiki 主体下线的页面。**不是正式知识层，是缓冲区**。

## 何时进入这里

- entity / concept 页的内容质量尚可，但 source 数 < 3，未达 topic 晋升阈值（[06_Maps/taxonomy.md](/Users/apple/Desktop/project/document/06_Maps/taxonomy.md)）
- 旧 schema 的页（v1 entity / concept）在 v2 重构后失去正式位置，但内容值得留存
- 自然人 / 公司类页（按 v2 不再建 topic）

## 何时离开这里

- 当对应 mention 累积到 ≥ 3 source → 提议晋升为 topic 页（用户批准后建立 `wiki/topics/<slug>.md`，本目录原稿可删）
- 当判定内容已被新 topic 完全吸收 → 删除原稿
- 当判定内容长期无引用 → 6 个月后清理

## 当前居民（2026-05-06 v2 重构入驻）

| 文件 | 原类型 | 下线原因 | 后续处置候选 |
|---|---|---|---|
| `entity_Anthropic.md` | entity | 公司不建 topic | 已合并入 `topics/ai-agent.md` 厂商路线段 |
| `entity_OpenAI.md` | entity | 公司不建 topic | 已合并入 `topics/ai-agent.md` 厂商路线段 |
| `entity_GitHub-Copilot.md` | entity | 仅 1 source（thin），未达阈值 | 等 ≥ 3 source 后晋升 `topics/github-copilot.md` |
| `concept_AI-产品观察.md` | concept | 与 ai-agent 路线观察重复 | 已合并入 `topics/ai-agent.md` |
| `concept_AI-内容生产.md` | concept | 0 source，内容已在 99_System/llm-wiki约定.md | 候选删除 |
| `concept_组织如何使用-AI.md` | concept | 仅 2 source，未达阈值 | 等 ≥ 3 source 后晋升 `topics/org-ai-adoption.md` |

## 注意

- 这里的页**保留原 frontmatter 与 aliases**，所以 Obsidian 的 `[[Anthropic]]` 等 wikilink 仍能解析（通过 alias）
- **不要往这里写新内容**——新页要进 `wiki/topics/`（经用户批准）或 `wiki/sources/`
- `/lint` 应定期扫描本目录，提议清理或晋升

## 已晋升离开

| 文件 | 晋升日期 | 去向 |
|---|---|---|
| `entity_Superpowers.md` | 2026-05-07 | `wiki/topics/superpowers.md`（破例晋升，2 source）|
