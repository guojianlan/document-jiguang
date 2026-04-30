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

## [2026-04-30 11:00] publish | claude-code-codex 两个都装 (Phase 4 #1)
- 来源 synthesis: wiki/syntheses/claude-code-vs-codex_comparison.md (publishability: 1)
- 产出文件:
  - outputs/drafts/2026-04-30_article_claude-code-codex_两个都装_发布版.md (正文)
  - outputs/drafts/2026-04-30_article_claude-code-codex_两个都装_发布建议.md (发布建议)
- critique 一轮: 信息密度 4 / 独特视角 4 / 可操作性 5 / 阅读节奏 2（冒号×7 严重超额、P29 全面综述开场）
- critique 二轮（返工后）: 4 / 4 / 5 / 4，硬规则全清，总分 17/20 通过
- 返工要点: 7 个冒号全部改写为破折号或完整句子；P29 "下面这篇讲三件事" 删除；7 处"最..." 极值判断收敛到 1 处
- 视觉资产: TODO（封面图 + 对照表 SVG 图卡，建议走 Satori 模板）
- 这是 Phase 4 第一次 wiki → publish 链路验证：synthesis (publishability=1) → /publish-article → /critique → 返工 → 通过

## [2026-04-30 09:30] ingest | vibecoding 三件套 (Phase 3 #3-5)
- summary written: 3 个 source 摘要已存（vibecontract / goodvibe / vibe-coders-guide），仅做 fan-out
- new entities: —
- new concepts: —
- entities updated: OpenSpec（加 § 与 Vibecoding 5 阶段的咬合，引入学术背书 + vibe-coders-guide 间接证据）
- concepts updated: AI Vibecoding（Phase 3 加 vibe-coders-guide 5 步对照；Phase 5 加 vibecontract / goodvibe 学术背书）
- new pages: 1 synthesis = 1 (openspec-vibecoding_digest.md, publishability: 1)
- synthesis seeded: ✅ **OpenSpec × Vibecoding digest**——本批 ingest 的核心产出
- pages touched: 6（3 source frontmatter 之前已升级 + 1 entity update + 1 concept update + 1 new synthesis + index）
- 关键 insight：三个独立来源（vibe-coders-guide 教学方法、vibecontract 学术 QA、goodvibe 学术安全）**独立得出与 OpenSpec 一致的判断** —— "vibecoding 进阶瓶颈不在 prompt，在工件"。这是 wiki 第二个 publishability=1 synthesis
- 决策：3 个 source 内容浅但**互相佐证强**——单看每个都不够 fan-out，组合起来直接触发 synthesis。这是"批量 ingest 跑 synthesis"的范式，与 ingest #1 单源跑 synthesis 形成对照
- friction：vibecontract / goodvibe 内容浅（论文摘要级）但仓库未标 thin——本次也未补 thin 标签，因为它们在组合证据里有价值（"thin in isolation, dense in combination"）；约定层未来需要补充对这种情况的处理

## [2026-04-29 16:30] ingest | github_about-custom-agents (Phase 3 #2)
- summary written: wiki/sources/2026-03-23_article_github_about-custom-agents.md（仅 frontmatter 升级到新 schema，正文已存）
- new entities: GitHub Copilot
- new concepts: —
- entities updated: Claude Code（待补缩窄）、OpenAI（待补细化）
- concepts updated: AI Agent（加 Profile 型 agent 路线）、AI 产品观察（加 GitHub/Microsoft 路线）、AI Vibecoding（Phase 4 三种沉淀范式成形）、AI 工作流（加 Profile/角色化路线 + 四条路线判断）
- new pages: 1 entity = 1 (GitHub Copilot.md)
- synthesis seeded: 否（claude-code-vs-codex_comparison 反向回链了一句"可升级为三方对比"——视为 future synthesis 候选）
- pages touched: 9（1 source + 1 new entity + 4 concepts + 2 entities update + 1 synthesis backref + index）
- 关键 insight：Copilot 是 wiki 内**第三条 coding agent 路线**——profile-based 多角色 agent。三方对比表已埋在 [[GitHub Copilot]] 页，下次 query "三大 coding agent 对比"会自然综合
- friction：进入 ingest 时 source frontmatter 已被 lint [b] 步骤批量升到新 schema——验证了 lint 与 ingest 应协同（先 lint 升 schema，再 ingest 跑 fan-out）

## [2026-04-29 16:00] lint | Phase 3 #1 后健康度 + 批量修复
- issues found: 17（11 source schema 旧 + 4 entity frontmatter 不一致 + 1 待 ingest GitHub Copilot 源 + 1 仅 index 引用孤儿待修）
- fixed: 15（11 source frontmatter 升级到新 schema with entities/concepts、4 entity frontmatter 日期字段统一为 updated_at）
- deferred: 2（38 个 TODO 全部 ≤ 1 天未达 30 天阈值不动；AI 产品观察/内容生产 仅 index 引用待后续 ingest 自然修复）
- contradictions: 0
- stale: 0
- orphans: 0
- synthesis candidates: OpenSpec × AI Vibecoding（≥ 4 source 跨度 1 月，index 已挂候选）；三大 coding agent profile/skill/AGENTS.md 三方对比（待 Cursor 补一手）
- 此次 lint 是首次"扫描 → 批量修复 → 直接连跑 ingest"的链路验证：source frontmatter 升级让 ingest #2 不需要重写 schema，只补 fan-out

## [2026-04-29 15:10] query | Claude Code vs Codex 核心差异
- pages searched: 5（index + 2 entities + 1 synthesis + 1 concept）
- pages cited: [[claude-code-vs-codex_comparison]]、[[Claude Code]]、[[Codex]]、[[autonomy]]、[[AI 工作流]]
- answer filed: not filed —— synthesis 已于 ingest #1 存在，避免重复归档
- gaps reported: 3（缺第三方测评、Cursor/Windsurf 路线归属、价格/API tier 对比）
- pages touched: 1（仅 log）
- 此次 query 是首次"已建 synthesis 直接命中"的案例 —— 验证 ingest 时建好 synthesis 后续 query 几乎零成本

## [2026-04-29 14:30] ingest | get-started-with-codex (Phase 3 #1)
- summary written: wiki/sources/2026-03-23_article_openai_get-started-with-codex.md（修订 frontmatter 为新 schema）
- new entities: Codex, OpenAI
- new concepts: —
- entities updated: —
- concepts updated: AI Agent, AI Vibecoding, AI 工作流, AI 产品观察, autonomy
- new pages: 2 entities + 1 synthesis = 3 (Codex.md, OpenAI.md, claude-code-vs-codex_comparison.md)
- synthesis seeded: 是 — wiki/syntheses/claude-code-vs-codex_comparison.md (publishability: 1)
- pages touched: 11 (1 source frontmatter + 2 new entities + 5 concept updates + 1 new synthesis + index + log)
- 此次 ingest 利用了 wiki 里已存在的 3 个相关 source（agentic-ai-foundation、how-openai-uses-codex、practical-guide-building-ai-agents）补全 Codex/OpenAI entity 的内容深度——一个浅入门来源也能跑出 11 页 fan-out
- synthesis 首次落地：Claude Code vs Codex 对照已成 publishability=1，是 Phase 3 第一个可发布候选

## [2026-04-29 13:30] system | Phase 2 LLM Wiki 目录迁移完成
- baseline commit: 3bc1a07
- stage 2.1 (9e631eb): 创建 raw/, wiki/, outputs/ 顶层骨架
- stage 2.2 (787abda): 146 个 git mv，01_Sources→raw/sources、02_Notes/SourceNotes→wiki/sources、02_Notes/TopicNotes 按 type 分到 wiki/{entities,concepts}、03_Outputs→outputs、07_Attachments→raw/attachments、00_Inbox→raw/inbox
- stage 2.3 (17a8eab): 39 个文件路径硬编码替换 + 修补过度替换（AGENTS.md 仓库结构、index.md entities 路径、SKILL.md entity 位置、llm-wiki约定.md 三层架构表）
- stage 2.4 (eedcabe): Obsidian graph.json colorGroups 切到新目录（entities / concepts / syntheses 各自路径过滤），app.json 让 raw/inbox/ 在 Obsidian 可见
- stage 2.5: 验证全部通过——intake_source.py --help 正常、所有目录存在、零旧路径残留、wikilinks 解析无误、git working tree clean
- friction: bulk sed 把所有 02_Notes/TopicNotes 一律映射到 wiki/concepts，导致 entity 引用初次落错位置（wiki/concepts 应该是 wiki/entities）；事后逐文件修复。教训：未来类似批量替换应分维度处理具体名字（Claude Code/Anthropic/OpenSpec → wiki/entities）后再做兜底替换
- 接下来：Phase 3 计划——跑 ≥ 5 次实战 ingest 验证 fan-out，建 Codex/OpenAI 等待补 entity，触发第一个 synthesis

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
