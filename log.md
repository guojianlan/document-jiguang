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

## [2026-04-30 14:00] query | 如何了解 agents、如何做 agents
- pages searched: 14（index + 4 entities + 5 concepts + 4 sources）
- pages cited: [[AI Agent]]、[[AI Vibecoding]]、[[AI 工作流]]、[[autonomy]]、[[Claude Code]]、[[Codex]]、[[GitHub Copilot]]、[[OpenSpec]]、[[claude-code-vs-codex_comparison]]、[[openspec-vibecoding_digest]] + 10 sources
- answer filed: ✅ wiki/syntheses/agent-learning-path_digest.md（publishability: 1）
- gaps reported: 5（非 coding 领域 agent / 多 agent 框架 / 翻车事故 / Cursor/Windsurf / 中文社区）
- pages touched: 3（new synthesis + index + log）
- 关键 insight：这是 wiki 第一个"学习路径型 digest"——把 [[AI Vibecoding]] 5 阶段 + [[AI Agent]] 三主流理解 + [[AI 工作流]] 四沉淀范式 + [[autonomy]] 程度变量整合到同一答案。验证了"高覆盖选题直接命中 synthesis"的范式
- 与已有 syntheses 的位置：[[claude-code-vs-codex_comparison]]（工具买哪个）、[[openspec-vibecoding_digest]]（什么时候升级 spec-driven）、本 digest（完整学习路径，入门篇）—— 三者构成 publishability=1 系列

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

## [2026-05-06 后续] ingest | shugex_openspec-superpowers-from-zero-to-one
- summary written: wiki/sources/2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one.md
- raw archived: raw/sources/articles/2026-04-19_wechat_shugex_openspec-superpowers-from-zero-to-one.md
- fetched via: web-access skill (CDP) — WebFetch 被微信反爬挡掉，CDP 直连用户日常 Chrome 拿到完整 16729 字正文
- new entities: Superpowers
- entities updated: OpenSpec（增加 Superpowers 协作段 + `/opsx:apply` 归属澄清）
- concepts updated: AI 工作流（新增"文件系统 handshake 模式"子分支）
- new syntheses: openspec-superpowers_workflow_digest（publishability:1）— OpenSpec × Superpowers handshake + 两层 spec 区分 + 三级审查 pattern + 实战时序
- index.md 更新: sources 13→14、entities 6→7、syntheses 3→4
- pages touched: 7（source、Superpowers、OpenSpec、AI 工作流、新 synthesis、index.md、log.md）
- side effect: 新装 web-access skill 到 .claude/skills/，回写 AGENTS.md 第 7 节"浏览器/联网层"
- judgments captured（在 source "我的判断" 段）:
  - 最有沉淀价值的不是工作流细节而是"两个 spec 的区分"
  - 文件系统 handshake 是 spec-driven 工具链能松耦合扩展的关键
  - 三级审查子代理是 multi-agent 退化成质量门禁的具体范式
  - 角色坍缩论留观察——更准的判断是"懂 spec 与只懂代码的人差距在拉大"

## [2026-05-06 后续] ingest | 艾逗笔（idoubi）24 篇全档案
- summary written: wiki/sources/2023-11-10 → 2026-04-05 共 24 个 source 文件
- raw archived: raw/sources/articles/idoubi/ 共 24 个 .md（Jina markdown 抽取，零反爬）
- fetched via: 直接 curl + Jina r.jina.ai/ 转 markdown（无需 CDP，因 idoubi.ai 是开放 Next.js 站）
- new entities: MCP, 艾逗笔 (2 个)
- entities updated: Claude Code（横评 + Vibe Coding 实战 + open-agent-sdk）
- concepts updated: AI Vibecoding（新增 Phase 6 候选段：全自动 Vibe Coding）、AI Agent（新增三大件框架 + multi-agent 三种正交编排矩阵）
- new syntheses: idoubi-vibecoding-journey_timeline（publishability:1）、mcp-foundations_digest（publishability:1）
- index.md 更新: sources 14→38、entities 7→9、syntheses 4→6
- pages touched: 33（24 source + MCP + 艾逗笔 + Claude Code + AI Vibecoding + AI Agent + 2 synthesis + index + log）
- discovery: idoubi 用 GitHub Issues + idoubi.ai + 掘金三处镜像，idoubi.ai 是 24 篇精选权威源（无反爬）
- judgments captured（散在各 source 的"我的判断"段，重点）:
  - "支付率 0.03%"（ThinkAny）+ "出书 ROI 未回本"+ "出海 MRR 1k" 组成 wiki 的 AI 应用反神话证据集
  - "建筑师 vs 泥瓦匠" 比喻可作为 [[AI Vibecoding]] Phase 6 标准说法
  - MCP 类比 LSP 比类比 HTTP 更准（结构同构）
  - multi-agent 至少 3 种正交编排（时间串行 / 空间分工 / 同步广播），不是单一概念
  - idoubi 2026-04 流露"做这些产品的意义在哪里"——下一次范式可能是更窄更深
- side effect: 验证了 web-access 之外的另一条抓取路径——纯静态 Next.js 站直接 curl + Jina，无需 CDP

## [2026-05-06 后续] system | wiki taxonomy v2 切换（破坏性低部分）
- 决策：放弃自动建 entity，切到 3 层模型（5 domain + 按需 topic + 自由 mentions）
- 触发：用户指出"自动建 entity 等于 LLM 替用户定义分类法"
- 已完成（破坏性低部分，方案 B）：
  - 38 个 source frontmatter 全部迁移：删 entities/concepts，加 domains + mentions
  - 删 wiki/entities/艾逗笔.md（自然人 entity 不再建立）
  - 自动生成 06_Maps/mentions.md（182 unique mention，30 个 ≥3 次为 topic 晋升候选）
  - 06_Maps/taxonomy.md v1 落地（5 domain + 候选清单 + 决策记录头部）
  - 99_System/llm-wiki约定.md 加 v2 顶部告示
  - .claude/skills/ingest/SKILL.md 改 frontmatter 模板 + fan-out 改"提议而非创建"
  - 06_Maps/index.md 类别速览改为 v2 状态
- 未完成（待用户分批批准）：
  - wiki/entities/ + wiki/concepts/ → wiki/topics/ 合并迁移
  - 30 个 topic 晋升候选逐个批准
  - 旧 entity / concept 页里"我的判断"段重新切给 topic 页
- 决策记录：
  - memory/feedback_user_owned_taxonomy.md（原则）
  - memory/project_wiki_taxonomy_model.md（当前模型 + 再评估钩子 + 退出方案）
- 再评估时间点：2026-08-06 / 100 sources / 用户反馈"提议太烦/太少"

## [2026-05-06 17:30] refactor | v2 topic 迁移（Direction B）

- 9 个 topic 页建立 in `wiki/topics/`：claude-code, mcp, openspec, codex, ai-agent, vibe-coding-path, ai-workflow, autonomy, model-capability-shift
- 7 页降级 `wiki/_drafts/`：Anthropic, OpenAI, GitHub Copilot, Superpowers, AI 产品观察, AI 内容生产, 组织如何使用 AI
- AI 产品观察内容合并入 `topics/ai-agent.md`（厂商路线段 + 路线观察方法论段）
- 删除空目录 `wiki/entities/` + `wiki/concepts/`
- 创建 `wiki/_drafts/README.md`：草稿池规则 + 当前 7 页处置候选
- 更新 `06_Maps/index.md`：Topics 表（9 行）替代 Entities + Concepts 双表；快速命令更新
- 决策依据：用户审核 16 页处置清单后批准
  - 公司不建 topic（Anthropic / OpenAI 路线作为子段进 ai-agent topic）
  - AI 产品观察与 ai-agent 重复 → 合并
  - 孤证页（Copilot / Superpowers / AI 内容生产 / 组织如何使用 AI）→ 草稿池等候
- pages touched: 12（9 新建 + 1 _drafts/README.md + index.md + log.md）
- 后续：mentions.md 不需更（domains/mentions 字段未变）；现有 wikilink 通过 alias 自动解析到 _drafts/ 与 topics/

## [2026-05-06 18:10] cleanup | T1+T2+T3 目录清理

**T1 安全清理**：
- mv `userstory.md` → `99_System/`
- mv `gstack_publish_ready_final_clean.md` → `outputs/published/`
- mv `AI_Vibecoding_文章审核与再次生成指导建议.docx` → `raw/_archive/`
- mv `04_Templates/Visuals/*.satori.js` → `scripts/satori-templates/`（3 个文件）
- mv `references/ai_workflow_article_outline_template_v4.md` → `04_Templates/T-文章大纲-AI工作流类.md`
- 删空目录：`references/`、`04_Templates/Visuals/`
- 删旧导航：`06_Maps/AI知识库总览.md`（被 index.md 替代，引用过时路径）

**T2 结构合并**：
- mv `08_Skills/Candidates/Skill候选池.md` → `skills/_candidates/`
- mv `08_Skills/Incubating/source-auto-summary.md` → `skills/_incubating/`
- 删空目录 `08_Skills/`（含 .gitkeep）

**T3 模板审计**：
- 13 → 12，删 `T-主题笔记.md`（旧 v1，无引用，与 taxonomy.md 的 v2 topic 模板重复）

**引用更新**（10 个文件）：
- `08_Skills/...` 路径 → `skills/_candidates/...`：CLAUDE.md / AGENTS.md / README.md / 5 个 SKILL.md / 99_System/llm-wiki约定.md / 05_Workflows/Skill开发流程.md / .claude/skills/critique/SKILL.md / skills/_candidates/Skill候选池.md
- `04_Templates/Visuals/...` → `scripts/satori-templates/...`：README.md / 99_System/Satori视觉资产说明.md
- 删 README.md 里 `AI 知识库总览` 链接

**净效果**：
- 根目录 33 项 → 30 项（少 3 个孤儿文件）
- 顶层目录数：删 `references/` + `08_Skills/`，多 `raw/_archive/`（净 -1）
- skill 集中点从 3 处变 2 处（.claude/skills/ + skills/）
- 04_Templates/ 13 → 12 个模板
- pages touched: 14（10 引用更新 + 4 文件移动归位）

## [2026-05-07 10:05] refactor | skill 跨工具统一架构（.agents/skills/ 标准化）

**事实核查（先确认事实再动手）**：
- Codex CLI 实际读 `.agents/skills/` 项目级（**不是** `~/.codex/skills/`，那是历史误传）
- OpenCode 同时原生读 `.agents/skills/` + `.claude/skills/` + `.opencode/skills/`
- Claude Code 仅读 `.claude/skills/`
- Gemini CLI 无 skill 目录概念，只读 `GEMINI.md` 上下文文件
- AGENTS.md（文件）是 Linux Foundation AAIF 正式标准；`.agents/skills/`（目录）是 OpenAI + OpenCode 推动的事实标准但未正式背书

**执行**：
- 创建 `.agents/skills/`，把所有 skill 真身搬过去（10 个）：
  - 6 自治 skill 从 `.claude/skills/` 直接迁：critique, ingest, lint, query, verify, web-access
  - 2 转发型薄壳合并入 kit：`.claude/skills/publish-article` + `skills/article-publish-kit` → `.agents/skills/publish-article`；`.claude/skills/render-svg` + `skills/article-visual-assets` → `.agents/skills/render-svg`
  - 2 独立工具迁入：`skills/markdown-publish-preview`、`skills/source-auto-summary` → `.agents/skills/`
- `.claude/skills/<name>` 全部改为 symlink → `../../.agents/skills/<name>`（10 个 symlink，已验证全活）
- skill 元数据搬到 99_System/：`Skill候选池.md` + `Skill孵化-source-auto-summary.md`
- 删 `skills/` 顶层目录
- 创建 `GEMINI.md`：项目根上下文，Gemini CLI 读到后能知道有哪些 skill 可手动调

**引用同步**（11 个文件）：
- AGENTS.md：重写"Skill 跨工具发现机制"段，改 10 个 skill 的路径，标注 `~/.codex/skills/` 是无效配置
- CLAUDE.md：Skill 位置段改写，说明 .agents/skills/ 是真身、.claude/skills/ 是 symlink
- README.md / 99_System/llm-wiki约定.md / 99_System/Skill候选池.md / 99_System/Skill孵化-*.md / 99_System/内容业务闭环设计示例.md / 05_Workflows/Skill开发流程.md / 04_Templates/T-反AI味检查清单.md
- .agents/skills/ 内 SKILL.md 的相互引用全部改为 .agents/skills/

**净效果**：
- 真身物理位置统一在 `.agents/skills/`（10 个 skill）
- Codex / OpenCode 自动发现，无需安装 / 配置
- Claude Code 通过项目级 symlink 自动发现
- Gemini CLI 通过 GEMINI.md 知道有哪些可手动调
- 删 skills/ 顶层目录（再少一个根目录条目）
- 删两对薄壳冗余（publish-article + article-publish-kit、render-svg + article-visual-assets）
- 用户的 `~/.codex/skills/web-access` 残留：保留无害（按用户决定）
- pages touched: ~25

## [2026-05-07 11:30] ingest | 12 篇 wechat 批量 ingest（4 公众号 + 会设计 6 篇）

**Tier 1（4 篇深度 fan-out）**：
- `2026-04-01_longjing-agent_harness-engineering` → 提议新 topic [[agent-internals]]（inside-out 视角，wiki 关键空白）
- `2026-04-18_zhihuiwenshu_superpowers-claude-code-engineering` → Superpowers 第 2 source，仍差 1 source 达 v2 阈值；同时强化 [[claude-skill-ecosystem]] 候选证据
- `2026-04-08_ai-chongdianguan_awesome-design-md` → 提议新 topic [[design-md-pattern]]（达 3 source 阈值）+ 触发 synthesis 候选 [[markdown-as-spec_digest]]
- `2026-03-17_huishe-ji_one-skill-remove-ai-flavor-6-design-skills` → 提议新 topic [[claude-skill-ecosystem]]

**Tier 2（4 篇更新现有 topic）**：
- `2026-03-25_huishe-ji_figma-official-mcp` → 更 mcp topic 时间线 + claude-code 集成证据
- `2026-04-30_huishe-ji_claude-design-alternative-30-skills` → 强化 design-md-pattern + claude-skill-ecosystem 双候选
- `2026-03-13_huishe-ji_vibe-coding-claude-code-yolo-auto-test` → 更 vibe-coding-path 第二阶段
- `2026-05-02_shangyanai_gpt-image-2-ui-seo-agent` → 填 ai-agent 待补段（非 coding agent 案例）

**Tier 3（4 篇 status: thin，仅入 source 池）**：
- `2026-04-30_ai-zhudaimatang_taste-skill`、`2026-04-30_bazijichanpinhua_codex-fighter-game`、`2026-04-29_huishe-ji_27-tools`、`2026-05-03_huishe-ji_refero.design`

**topic 页更新**（5 个）：
- mcp.md：+3 sources，+ Q1 2026 时间线 3 节点（Figma MCP / DESIGN.md / MCP×Skill）
- vibe-coding-path.md：+2 sources，+ 第二阶段 YOLO mode 段，+ 多模态拼装样本段
- claude-code.md：+6 sources，+ 内部架构 inside-out 段（12 组件表），+ release 时间线 2 节点
- ai-agent.md：+3 sources，+ 第四种 multi-agent 范式（上下文卫生型 Subagent）+ Superpowers 系统化调试，+ 待补段填 SEO Agent
- ai-workflow.md：+2 sources，+ Superpowers 跨工具支持段，+ Harness 内部 workflow 段

**catalog 更新**：
- mentions.md 重生成：182 → 273 唯一 mention（+91）；310 → 440 总出现（+130）；30 → 37 候选 ≥3 source（+7）
- index.md：sources 38 → 50；新增 12 行入 sources 表

**待用户批准的提议**：
- 新 topic：`agent-internals` / `design-md-pattern` / `claude-skill-ecosystem`
- Superpowers 晋升候选（达 2 source，差 1 source）
- 新 synthesis：`markdown-as-spec_digest`（OpenSpec / DESIGN.md / AGENTS.md / SKILL.md 4 个 pattern 的统一观察）

- pages touched: 21（12 source + 5 topic + index + log + mentions + 1 待提议清单）

## [2026-05-07 12:00] promote | 4 topic 全批 + 1 synthesis 创建 + Superpowers 晋升

**新建 4 个 topic**：
- `wiki/topics/design-md-pattern.md`：4 source（awesome-design-md / Open Design / refero / Figma MCP），命名"DESIGN.md = AI 时代设计师与工程师协作契约"
- `wiki/topics/agent-internals.md`：4 source（longjing-agent 主 + Superpowers 辅助 + idoubi 三大件），inside-out 12 组件视角，破例建（1 主 source 但密度高）
- `wiki/topics/claude-skill-ecosystem.md`：6 source，Q1 2026 公开 100+ skill 生态 snapshot
- `wiki/topics/superpowers.md`：2 source（shugex + zhihuiwenshu），破例晋升（差 1 source 达阈值，但 14 skill + 跨 6 工具事实成熟）

**新建 1 个 synthesis**：
- `wiki/syntheses/markdown-as-spec_digest.md`：4 个独立工件 pattern（OpenSpec / DESIGN.md / AGENTS.md / SKILL.md）走到同一答案——"人类规则正在变成 AI 可消费的 markdown"。`publishability: 1`，可发布候选

**草稿池更新**：
- 删 `wiki/_drafts/entity_Superpowers.md`（已晋升）
- _drafts/README.md 加 "## 已晋升离开" 段记录

**索引更新**：
- 06_Maps/index.md：topics 9 → 13，syntheses 6 → 7，_drafts 7 → 6；topic 表 + synthesis 表新增条目；2026-03 重复 section 去重
- 06_Maps/taxonomy.md：加 "## 已晋升记录" 段记录 4 个 topic 晋升及破例理由

**总结：v2 wiki 现状**：
- 50 sources / 13 topics / 7 syntheses / 6 drafts
- 273 mentions / 37 候选（≥3 source）
- 已晋升 topic 池跨 5 domain（ai-coding / ai-agent / indie-dev / wiki-meta / infra）
- pages touched: 9（4 新 topic + 1 新 synthesis + 1 删 + 3 更新）

## [2026-05-07 12:30] promote | mentions 候选筛选 → 2 个 topic 晋升

按 lint + mentions 分析筛选 37 候选，其中只有 2 个值得晋升（其他已被现有 topic 吸收 / 是工具列表 / 时效已过）：

- `wiki/topics/indie-dev-sop.md`：16 source（idoubi 全系列 2023-2026），含 5 步 SOP + 6 感悟 + 反神话集（ThinkAny 0.03% / sora.fm takedown 等）+ 9 产品矩阵
- `wiki/topics/agents-md.md`：4 source，AAIF 跨厂商标准；本仓库 AGENTS.md 自身就是 8 个月实践样本

**淘汰候选** + 理由：
- gpts / cursor / vercel / cloudflare / stripe / nextjs：工具厂商或时效已过，留 mention
- agent-skills / sandboxing / spec-driven / multi-agent-orchestration：已被 claude-skill-ecosystem / autonomy / openspec / ai-agent 吸收

**index/taxonomy 同步**：topics 13 → 15；taxonomy.md "已晋升记录" +2

**lint 顺手修复**：6 处 [[艾逗笔]] 断链改为纯文本（自然人删除遗留）

publish-article 子 agent 在背景跑 markdown-as-spec_digest 发布包，等通知。

## [2026-05-07 15:00] publish | markdown-as-spec_digest 完整发布包落盘

**4 产物**（outputs/drafts/）：
- `2026-05-07_article_markdown-as-spec_发布版.md`（9KB）
- `2026-05-07_article_markdown-as-spec_发布建议.md`（8KB）
- `2026-05-07_article_markdown-as-spec_认知图.svg`（389KB）+ PNG 预览（185KB，Chrome headless 0 越界 0 重叠）
- `2026-05-07_article_markdown-as-spec_社交媒体切图文案.md`（4KB）

**critique 评分** 16/20，全部 ≥ 3：
- 信息密度 4 / 独特视角 4 / 可操作性 4 / 阅读节奏 4
- 硬规则：而是 ×1（边界内）/ 协作路标 / 客服 / 戏剧化 / 模板段 / 行话堆叠 / 伪学术 全 0

**返工记录**：
- 17 个冒号 → 改 6 处"预告型/戏剧型"为破折号或句号
- 新建 Satori 模板 `scripts/satori-templates/four-by-five-matrix.satori.js` + 数据 `raw/attachments/markdown-as-spec_matrix-data.json`，可被未来任意 4×N 矩阵图复用

**推荐标题**（写进发布建议卡）：
- 主：4 个独立工具，1 个共同答案——markdown 正在成为 AI 时代的协作契约
- 强点击备选：装到第 3 个 AI 工具的时候，我才反应过来它们的契约文件长一模一样

**synthesis 状态更新**：publishability 1 → 2，derived_outputs 写入 4 个 draft 路径

## [2026-05-07 16:30] publish | claude-code-12-components 完整发布包落盘

**4 产物**（outputs/drafts/ + raw/attachments/）：
- `2026-05-07_article_claude-code-12-components_发布版.md`（约 5KB / 4000 字 + 5 段代码引用）
- `2026-05-07_article_claude-code-12-components_发布建议.md`
- `2026-05-07_article_claude-code-12-components_认知图.svg`（双层架构图）+ PNG 预览（Chrome headless 0 越界 0 重叠）
- `2026-05-07_article_claude-code-12-components_社交媒体切图文案.md`（5 条候选金句）

**critique 评分** 18/20，全部 ≥ 4：
- 信息密度 5 / 独特视角 4 / 可操作性 5 / 阅读节奏 4
- 硬规则：而是 ×1（边界内）/ 冒号 ×0（首版 41 个全清）/ 协作路标 / 客服 / 戏剧化 / 模板段 / 隐喻词 全 0

**返工记录**：
- 首版 41 个非引语冒号 → 整篇改写为破折号或拆句，二轮降到 0
- "尺子"（隐喻义）→ 改"对照"
- 新建 Satori 模板 `scripts/satori-templates/two-layer-architecture.satori.js`（双层卡片 + 中间磁盘条），可被未来"内核 vs 外围"双层架构图复用

**推荐标题**：
- 主：Claude Code 内部 12 组件 — 造车人视角
- 强点击备选：读完 Claude Code 12 章源码，4000 行里 0 个 if-else

**与 markdown-as-spec 那篇的差异化**：本篇有 5 段真实代码（s01 循环 / s02 dispatch / s05 SkillLoader / s11 身份重注入 / s09 drain-on-read），不是纯抽象，是"看着代码下判断"

## [2026-05-07 16:20] publish | Claude Code 内部 12 组件 — 造车人视角（intent-driven 流程首次实战）

**首次跑 intent-driven 发布流程**（自上而下：用户给 intent → 我列选项 → 用户选 → 评估证据 → 爬取补料 → 写作）：

1. **intent**：用户选 C "Claude Code 内部 12 组件 — 造车人视角"
2. **本地证据评估**：12 组件名称充分，但代码层细节缺
3. **补料 sub-agent**：clone `shareAI-lab/learn-claude-code` repo，提取 12 章 README + 关键代码 → `raw/sources/documents/2026-05-07_learn-claude-code_12-lessons-extract.md`（26KB，572 行）
4. **关键发现**（超出 longjing-agent 文章）：
   - 12 章天然分 2 层（s01-s05 单 agent loop / s06-s12 多 agent 协调）
   - 真正主线："以磁盘为协调底座"——s06 之后所有机制（transcript / 任务图 / 邮箱 / worktree）走磁盘
   - 3 个反复出现设计模式：Layer 1/2 注入 / drain-on-read / 状态机+ID
   - 政治宣言："Agency 来自训练，不是来自编排"——12 章源码 0 处 if-else
   - 姊妹项目 claw0（心跳+定时任务做常驻 agent）
5. **wiki 更新**：
   - 新 source 页 `2026-05-07_document_shareai-lab_learn-claude-code-12-lessons.md`
   - agent-internals topic 大幅更新（+ 2 层架构 + 3 模式 + 政治宣言 + claw0 段）
6. **publish sub-agent 跑发布包**（4 产物）：
   - 正文 `2026-05-07_article_claude-code-12-components_发布版.md`（约 4000 字，5 段真实代码）
   - 发布建议（主标 + 5 备选 + 4 平台选择建议）
   - 2 层架构认知图 + 新 Satori 模板 `two-layer-architecture.satori.js`（橙色内层 5 + 黑色磁盘条 + 绿色外层 7）
   - 社交切图（含 4 条要求金句）
7. **critique 18/20**（信息密度 5 / 独特视角 4 / 可操作性 5 / 阅读节奏 4），硬规则 0 命中（41 个冒号清零）

**推荐主标题**：Claude Code 内部 12 组件 — 造车人视角
**强点击备选**：读完 Claude Code 12 章源码，4000 行里 0 个 if-each

**intent-driven 流程跑通**——比上次 markdown-as-spec（synthesis-driven，critique 16/20）评分高 2 分，跟原文连接强、有真实代码、不只是抽象。

**复盘**：这次流程"用户 intent → 评估本地证据 → 补料 → 写"明显优于"自下而上从 source 综合"。建议：
- 路径 A 候选：把这 6 步固化成 `.agents/skills/write-article/SKILL.md`（用户已表态先用一次再说）
- 路径 B（已选）：跑通了，下次写作默认走这个流程

## [2026-05-07 21:30] critique-fix | 12-components article + critique skill upgrade
- 触发：外部读者评分 17/20，命中"极值 6+"和"二人称连续"两条快速自检漏抓
- article 精修 6 处低风险段落（保留 line 64 唯一极值，删 5 处 + 拆连续二人称 + 删软命中协作路标）：outputs/drafts/2026-05-07_article_claude-code-12-components_发布版.md
- critique skill 升级：.claude/skills/critique/references/zh-ai-tells.md 快速自检 8 → 10 条，新增"极值 ≤ 1"和"我最大的 X 是"清零，含对仗变体识别
- 反思：之前自评 18/20 偏宽——零件齐全但 8 条快速自检未覆盖第九节极值判断规则，hard-rule 规则文档与扫描清单脱节

## [2026-05-07 22:00] voice-ref | 数字生命卡兹克写作指纹归纳
- 抓取 3 篇代表作（行业反思 / 工具教程 / 产品评测）入 raw/sources/Articles/
- 归纳 A 结构层 6 条 + B 语言层 8 条指纹（段均 24 字、第一人称密度 1/50 字、收尾三段式、"昨天 X"起手等）
- 沉淀 99_System/voice-references/khazix.md（含跟本仓库 2 稿对照表 + 1 段改写示例 + 按平台选风格判定）
- 关键发现：我们 vs 卡兹克 = "高质量行业博客" vs "高情绪公众号长文"，两条路线不互斥，按场域选

## [2026-05-07 22:50] voice-ref-batch | 风格库扩展 4 张指纹
- _self.md（用户本人，9 篇 blog.workmn.com 样本）：工程文档型方法论作者，段均 90-110，强 8 段 SOP 骨架
- idoubi.md（16 篇本地样本）：诚实账本派 indie，数字精确 + ROI 暴露
- guizang.md（3 篇 CDP 抓）：设计师 + 开发者结构派
- xiaohu.md（2 篇 CDP 抓，样本不足已标注）：翻译者 + 实测者派
- _index.md 总览：5 张指纹一句话定位 + 量化基线对照表 + 按场域决策树
- ⚠️ 关键冲突：用户本人"而是"句标志特征 vs critique 硬规则"全文≤1"——待裁决 A/B/C
- 用户备注：「小互」公众号 vs X/Twitter @imxhy 是同一人但两种声音，X 平台短播报需另起指纹

## [2026-05-09 09:00] critique-fix | 加场域分层（方案 C）
- SKILL.md §1.5 新增三档场域：strict / blog / reference，含触发条件 + 跳过规则定义
- 自动扣分规则按场域分支：universal 5 条所有场域跑；strict 项 4 条仅严格场域扣分；blog 模式只软警示
- 诊断卡第一行强制显示场域档；blog 模式额外行显示软警示
- zh-ai-tells.md 14 节加适用范围标签（universal / strict-only / strict + blog）
- 第一节"而是"句改写策略仅 strict 模式触发，blog 不扣分（用户本人 _self.md B1 验证为正向风格特征）
- 快速自检拆成 universal 6 条 + strict 项 7 条
- 影响：以后写 outputs/drafts/、wiki/、99_System/ 默认走 blog/reference 不会再被"而是" / 冒号 / 极值误扣

## [2026-05-09 09:30] ingest | baoyuai_thariq_html-effectiveness
- summary: wiki/sources/2026-05-09_article_baoyuai_claude-code-html-unreasonable-effectiveness.md
- new topic: wiki/topics/html-as-canvas.md
- topics updated: markdown-as-spec_digest（反例段）, claude-skill-ecosystem（反例段，中性记录）
- pages touched: 5

## [2026-05-09 12:30] new-skill | voice-match
- 新 skill：.agents/skills/voice-match/SKILL.md（symlink 入 .claude/skills/voice-match）
- 用户决策 Q1=C / Q2=A / Q3=A / Q4=5维 / Q5=A：双轨触发 + 诊断报告 + 默认 _self.md + 5 维评分 + 与 critique 完全独立
- 5 维：段密度 / 人称密度 / 章节结构 / 句式特征 / 收尾形态
- publish-article SKILL.md 加 §0 写作前轻量加载 voice 基线 + §6.5 critique 通过后建议跑 voice-match
- AGENTS.md / CLAUDE.md skill 列表 10 → 11

## [2026-05-09 13:30] voice-ref | _self-essay.md（用户随笔 mode）
- 新建 99_System/voice-references/_self-essay.md（基于 12-components + OpenSpec 前段反推，置信度 low-medium，sample_size 1.5）
- _index.md 升级 6 张指纹，加"用户双 mode 自动判定"3 步规则段
- voice-match SKILL.md §1.2 加 mode 选择步骤，维度 3/4/5 按 mode 分支评分
- AGENTS.md 标注 voice-match 双 mode 拆分 + 第 8 节加"用户写作有双 mode"稳定偏好
- 子型发现：essay mode 内部还有观察评测体（子型 a，"我"克制）vs 复盘起源体（子型 b，"我"爆表 1/40）
- 12-components 按新基线预测 23-25/25（vs 按 _self.md 评 11/25），证明双 mode 拆分正确
