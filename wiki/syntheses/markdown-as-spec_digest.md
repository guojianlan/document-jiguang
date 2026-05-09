---
type: synthesis
form: digest
created_at: 2026-05-07
based_on_sources:
  - 2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems
  - 2026-04-30_article_huishe-ji_claude-design-alternative-30-skills
  - 2026-05-03_article_huishe-ji_global-2000-design-md
  - 2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one
  - 2026-04-18_article_zhihuiwenshu_superpowers-claude-code-engineering
  - 2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent
  - 2026-03-23_article_openai_agentic-ai-foundation-agents-md
  - 2026-01-03_article_idoubi_my-ai-2025
based_on_topics:
  - openspec
  - design-md-pattern
  - claude-skill-ecosystem
  - ai-workflow
  - mcp
  - agent-internals
publishability: 2
derived_outputs:
  - outputs/drafts/2026-05-07_article_markdown-as-spec_发布版.md
  - outputs/drafts/2026-05-07_article_markdown-as-spec_发布建议.md
  - outputs/drafts/2026-05-07_article_markdown-as-spec_认知图.svg
  - outputs/drafts/2026-05-07_article_markdown-as-spec_社交媒体切图文案.md
---

# Markdown as Spec：人类规则正在变成 AI 可消费的 markdown

## 一句话核心

2025-2026 之间，4 个原本独立演化的工具范式（OpenSpec / DESIGN.md / AGENTS.md / SKILL.md）走到同一答案：**把人类规则用 markdown 写下来，喂给 AI**。这不是巧合，是 AI 编程时代的"协作契约"在不同领域分头实现。

## 为什么这个组合值得合成

4 个独立工具，4 个独立社区，4 个独立时间窗口，**没有协调地走到同一格式**——这种独立收敛通常意味着背后有真实的需求结构，不是某一家的偶然选择。本 synthesis 要做的就是把这 4 条线索拉到一起看，识别共性 pattern。

## 4 个独立 pattern 实例

| 工具 | 写什么 | 喂给谁 | 关键格式 | 来源 |
|---|---|---|---|---|
| **[[openspec\|OpenSpec]]** | 业务行为规约 | coding agent | proposal/design/spec/tasks markdown | [[2026-04-19_article_shugex_openspec-superpowers-from-zero-to-one]] |
| **[[design-md-pattern\|DESIGN.md]]** | 视觉规范 | UI 生成 AI | DESIGN.md（颜色 / 字体 / 间距 / 组件 / 反模式）| [[2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems]] |
| **AGENTS.md** | 协作约定 | 进入项目的 agent | AGENTS.md（项目根，跨厂商标准）| [[2026-03-23_article_openai_agentic-ai-foundation-agents-md]] |
| **[[claude-skill-ecosystem\|SKILL.md]]** | 工作流（"做什么 + 怎么做"）| Claude Code / Codex / OpenCode | SKILL.md（YAML frontmatter + body）| [[2026-04-01_article_longjing-agent_harness-engineering-claude-code-agent]] |

## 共性 pattern（5 条）

### 1. 都是 Markdown，不是 JSON / YAML / DSL

**为什么**：人类要写、AI 要读、版本控制要 diff、审查要可读——只有 markdown 同时满足这 4 条。JSON 难写、DSL 学习成本高、纯文本无结构。

### 2. 都靠**文件系统**做交付，不靠 API

OpenSpec 把 spec 落 `openspec/specs/`，DESIGN.md 落项目根目录，AGENTS.md 落仓库根，SKILL.md 落 `.agents/skills/<name>/SKILL.md`。**没人走 API**——因为文件能被任何工具读，API 绑死生态。

详见 [[ai-workflow#子分支：文件系统 handshake 模式]]。

### 3. 都把"人类规则"前置到 AI 启动 / 调用前

不是 AI 跑出来再人工 review，而是 AI 启动前就把约束注入。这是跟 prompt-only 范式的本质差别——**prompt 是临时上下文，markdown 契约是持久规约**。

### 4. 都跨厂商收敛（或正在收敛）

- AGENTS.md：Linux Foundation AAIF 正式标准（OpenAI / Anthropic / Google / Microsoft / AWS）
- SKILL.md：Codex / OpenCode 原生读 `.agents/skills/`，Claude Code 通过 symlink 接入（详见 [[ai-workflow]]）
- DESIGN.md：awesome-design-md / refero / Open Design 三家不约而同采用
- OpenSpec：跨 Claude Code / Codex / Cursor 等

→ **跨厂商不是协调出来的，是同一答案被不同厂商独立选中**。

### 5. 都是"动作 + 标准"的二维结构

最早出现在 [[2026-04-30_article_huishe-ji_claude-design-alternative-30-skills]]：Open Design = 19 skill（动作）+ 71 DESIGN.md（标准）。但回头看，OpenSpec / Superpowers / 仓库自身都符合：

| 项目 | 动作（怎么做）| 标准（按什么做）|
|---|---|---|
| Open Design | 19 个 skill | 71 套 DESIGN.md |
| Superpowers | 14 个 skill | spec/test 工件 |
| OpenSpec | tasks.md 步骤 | spec/scenario |
| 本仓库 | 10 个 .agents/skills/ | AGENTS.md / CLAUDE.md / 99_System |

→ **动作 + 标准 = 完整工作流**——单独有 skill 不知道按什么标准，单独有标准不知道怎么做。

## 推论与判断

### 推论 1：未来还会出现更多 `*.md` 契约

按这个 pattern 推下去，可预期会出现：

- **PROMPT.md**：项目级 prompt 规约（怎么跟用户对话）
- **VOICE.md**：品牌语气规范（写文案时按这个）
- **SECURITY.md**：威胁模型 + 边界（agent 应该警惕什么——可能跟现有 .well-known/security.txt 整合）
- **DATA.md**：数据 schema + 隐私边界

不是预言哪个一定出现，而是**这个 pattern 模板已成熟，会被复制到其他领域**。

### 推论 2：人类的"专业知识"正在被 markdown 化

设计师的视觉判断（→ DESIGN.md）、架构师的业务规约（→ OpenSpec）、工程师的协作约定（→ AGENTS.md）、senior 的工作流经验（→ SKILL.md）。

**这是知识沉淀模式的转折**：以前知识在脑子里 / Notion / Wiki / Confluence，**现在直接以"AI 可消费"为目标书写**。

### 推论 3：仓库自身是这个 pattern 的实例

本仓库的 v2 模型本身就在走 markdown-as-spec：
- `06_Maps/taxonomy.md` = wiki 分类规约
- `99_System/llm-wiki约定.md` = wiki 操作约定
- `.agents/skills/<name>/SKILL.md` = 10 个工作流
- `AGENTS.md` / `CLAUDE.md` / `GEMINI.md` = 跨工具协作约定
- `wiki/topics/<slug>.md` = 知识 topic 契约

→ **wiki 本身是 markdown-as-spec pattern 的应用**——meta 层与 pattern 自洽。

## 反例 / 待证伪

- **markdown 不能表达所有规则**：复杂状态机、严格 schema、跨语言一致性等场景，markdown 表达力不足。会不会出现"markdown 契约 + JSON schema 校验层"的组合？
- **markdown 易发散**：4 个工具都是 markdown 但格式不统一（OpenSpec 走 proposal/design/spec/tasks，DESIGN.md 走颜色/字体/间距/组件，SKILL.md 走 YAML frontmatter + body），会不会出现"meta-spec spec"来统一格式？
- **AI 真的"理解"这些 markdown 吗**？还是只是凑巧有效。当 LLM 升级 / 退化时，markdown 契约的稳定性是否被影响？
- **HTML 反向命题**：Thariq（Claude Code 团队成员）2026-05 主张 markdown 作为 **AI 输出格式**已失效，HTML 在信息密度 / 视觉清晰 / 易分享 / 双向交互 / 数据摄取 5 维全面胜出。详见 [[html-as-canvas]] / [[2026-05-09_article_baoyuai_claude-code-html-unreasonable-effectiveness]]。
  - **跟本 synthesis 的关系**：markdown-as-spec 讲的是 input 契约（人写给 agent 看），HTML 反命题讲的是 output 呈现（agent 写给人看）——不冲突，但说明"markdown 全栈契约"的判断需要收缩到 input 端，不再涵盖 output。

## 跟现有 wiki 的连接

- 跟 [[ai-workflow]]：4 路线（hooks / spec-driven / profile / AGENTS.md）的更高维抽象
- 跟 [[mcp]]：MCP 是运行时协议，markdown-as-spec 是设计时规约——两条线一起完成 "AI 在什么时候按什么标准做什么"
- 跟 [[agent-internals]]：SKILL.md 的两级加载机制是这个 pattern 在 agent 内部的实现细节

## 可发布方向

- 一篇文章："4 个独立工具，1 个共同答案——markdown-as-spec 是怎么悄悄成为 AI 编程时代协作契约的"
- 一份"未来值得期待的 *.md 候选清单"reference
- 一张图："4 + 5 矩阵"（4 个工具 × 5 个共性 pattern 维度）

`publishability: 2` ——本 synthesis 已经接近发版水平，需要补：
- 文章导语（更接近真人分享口径，不是百科式）
- 一张配图（4 工具 × 5 pattern 矩阵 SVG）
- 一段反方观点（找一个否认这个 pattern 存在的来源——目前 wiki 内 0）
