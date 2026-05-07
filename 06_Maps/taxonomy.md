# Wiki Taxonomy（v1 — 2026-05-06）

## 决策记录（重要：未来想换模型先读这里）

**当前模型**：3 层结构

```
Tier 1：domain（5 个固定货架）
   ↓
Tier 2：topic 页（按需生长，wiki/topics/）
   ↓
Tier 3：mentions（自由字符串，孵化池）
```

**为什么选这个**：扁平 tag 在 1000 sources 时崩溃。3 层把"分类"和"知识沉淀"分开——domain 永不变，topic 按内容长出来。

**已知风险**：见 [memory/project_wiki_taxonomy_model.md](file:///Users/apple/.claude/projects/-Users-apple-Desktop-project-document/memory/project_wiki_taxonomy_model.md)（包含再评估触发条件 + 退出方案）

**何时复盘**：3 个月后（2026-08-06）/ 100 sources 后 / 用户反馈"提议 topic 太烦/太少" / domain 桶过载

---

## Tier 1：domain（5 个固定货架）

| domain | 含义 | 涵盖范围 |
|---|---|---|
| `domain/ai-coding` | AI 写代码相关 | coding agent、IDE 集成、AI 辅助编程、Vibe Coding 实战、spec-driven 开发 |
| `domain/ai-agent` | Agent 主题 | Agent 编排、multi-agent、工具调用协议（含 MCP）、autonomy、sandboxing |
| `domain/indie-dev` | 独立开发 | 独立开发者方法论、出海、商业化、SEO、收付款、套壳生命周期 |
| `domain/infra` | 基础设施 | 部署、CDN、数据库、成本治理、向量数据库 |
| `domain/wiki-meta` | 关于本 wiki 自己 | wiki 模式、ingest/query/lint 流程、taxonomy 决策、Skill 体系 |

**规则**：

- domain 数量固定 5 个，**新增 domain 是大事**（意味着 wiki 进入新行业），需用户明确批准
- source 可属多 domain（典型 1-2 个，最多 3 个）
- domain 只是初筛，不是查询的主入口——主入口是 topic 页

---

## Tier 2：topic 页（按需生长）

**当前状态**：迁移中，从原 `wiki/entities/` + `wiki/concepts/` 提炼。

**晋升规则**：

1. 触发：某主题被 ≥ 3 条 source 集中讨论
2. 提议：我在 ingest 报告里列"topic 候选"
3. 批准：用户点头才建（驳回 / 改名 / 拆分都可）
4. 落地：建 `wiki/topics/<slug>.md`，按统一结构（是什么 / 当前结论 / 待证伪 / 与其他对照 / 相关 source）

**topic 页结构**（建议模板）：

```markdown
---
type: topic
slug: <kebab-case>
domains: [domain/x, domain/y]
sources: [source-1, source-2, ...]
related_topics: [topic-a, topic-b]
status: active | thin | deprecated
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
---

# <Topic Name>

## 是什么
## 当前稳定结论
## 待证伪 / 待补
## 与其他 topic 的对照
## 相关 source
```

**自然人不建 topic 页**——艾逗笔、术哥等。frontmatter 留 `author` 字段供审计追溯。

**当前候选 topic 列表**（待用户批准建立）：

按现有 38 source 反推，达到 ≥ 3 条 source 阈值的候选：

| 候选 slug | 涉及 source 数 | 涉及 domain | 已有的判断密度 |
|---|---|---|---|
| `mcp` | 9 | ai-agent | 高（已有 entity 页）|
| `claude-code` | 7 | ai-coding, ai-agent | 高（已有 entity 页）|
| `openspec` | 5 | ai-coding | 高（已有 entity 页）|
| `codex` | 4 | ai-coding | 中（已有 entity 页）|
| `vibe-coding-path` | 4 | ai-coding | 高（已有 concept 页）|
| `gpts` | 4 | ai-agent, indie-dev | 中（无独立页）|
| `agents-md` | 3 | ai-agent | 中（已在多页提及）|
| `spec-driven` | 5 | ai-coding | 中（待提炼）|
| `multi-agent-orchestration` | 3 | ai-agent | 中（已在 AI Agent concept 内）|
| `indie-dev-sop` | 5 | indie-dev | 高（艾逗笔方法论集大成）|
| `model-capability-shift` | 4 | ai-coding, indie-dev | 中（散在多源）|
| `role-shift-to-architect` | 3 | ai-coding, indie-dev | 中（散在多源）|
| `ai-app-monetization-myth` | 3 | indie-dev | 中（反神话集）|

**未达阈值但值得保留的 topic 候选**（< 3 source，先记着）：

- `superpowers`（1）— 工程价值高，等更多 source 累积
- `agent-skills`（2）— 接近阈值
- `claude-agent-sdk`（2）— 接近阈值
- `cursor`（2）— 接近阈值
- `sandboxing`（2）— 接近阈值

---

## Tier 3：mentions（自由字符串）

**用法**：source frontmatter 加 `mentions: [...]`，记录 source 里出现的具体名字（产品 / 工具 / 人 / 公司 / 概念），不需要审核。

**规范化**：

- 我维护 `06_Maps/mentions.md`（自动生成），记录所有出现过的 mention 和归一规则
- 同一概念多种叫法自动归一："Karpathy" / "karpathy" / "Andrej Karpathy" → 统一 `Karpathy`
- 不确定时（"Claude" 是模型还是人名？）我会在 ingest 时问

**晋升路径**：mention 被 ≥ 3 条 source 提及 → 我提议晋升为 topic 页（用户批准）。

**当前已识别的高频 mention（来自 38 source）**：

具体产品：ThinkAny / GPTalk / WorkAny / FastClaw / mcp.so / ShipAny / CopyWeb / aiwallpaper / 知了 zKnown / sora.fm / open-agent-sdk
具体人物：艾逗笔（idoubi）/ 术哥无界 / Andrej Karpathy / Jesse Vincent
工具产品：Cloudflare / Stripe / Wise / Tauri / NextJS / Supabase / Manus / Cline / Windsurf / Cursor / Bolt.new
学术媒体：a16z / ProductHunt / V2EX / 极客公园 / arXiv

迁移时这些会自动落到对应 source 的 `mentions: [...]` 字段。

---

## 迁移待办（taxonomy 锁定后我做）

1. **改 38 个 source 的 frontmatter**：删 `entities` / `concepts`，加 `domains` + `mentions`
2. **创建 `wiki/topics/` 目录**：把现有 `wiki/entities/` + `wiki/concepts/` 里**仍有沉淀**的页迁过去
3. **删自然人 entity**（艾逗笔），原内容拆分：方法论/数字判断进 `topic/indie-dev-sop` + `topic/ai-app-monetization-myth`
4. **逐个候选 topic 提议给用户**——不一次性全建，按主题逐批
5. **生成 `06_Maps/mentions.md`**：扫所有 source 的 mentions 字段，去重 + 归一
6. **更新 `06_Maps/index.md`**：反映新结构
7. **更新 `99_System/llm-wiki约定.md`**：写入 3 层模型 + 与原 Karpathy 模型的关系
8. **更新 `.claude/skills/ingest/SKILL.md`**：让以后 ingest 默认按新模型走
9. **追加 `log.md`**：记录这次架构重构

---

## 已晋升记录（v2）

| 候选 | 晋升日期 | 阈值情况 |
|---|---|---|
| design-md-pattern | 2026-05-07 | 4 source 达阈值 |
| agent-internals | 2026-05-07 | 1 source（破例，inside-out 视角高密度证据）|
| claude-skill-ecosystem | 2026-05-07 | 6 source 达阈值 |
| superpowers | 2026-05-07 | 2 source（破例，体系成熟 + 跨工具事实）|
| indie-dev-sop | 2026-05-07 | 16 source 达阈值（idoubi 系列汇总）|
| agents-md | 2026-05-07 | 4 source 达阈值（AAIF 标准）|

详见 [log.md](/Users/apple/Desktop/project/document/log.md) 的 2026-05-07 条目。
