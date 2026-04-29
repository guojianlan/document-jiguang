# wiki/

Karpathy LLM Wiki 三层中的 **the wiki** 层。LLM 拥有，用户只读浏览（一般通过 Obsidian）。

## 子目录

- `sources/` ← 原 `02_Notes/SourceNotes/`：每个 raw source 对应一份摘要（事实/观点/判断分离）
- `entities/` ← 原 `02_Notes/TopicNotes/` 中 `type: entity` 的页：具体物 / 工具 / 产品 / 公司（Claude Code、Anthropic、OpenSpec 等）
- `concepts/` ← 原 `02_Notes/TopicNotes/` 中 `type: concept` 的页：抽象概念 / 模式 / 方法（autonomy、AI Agent、AI 工作流 等）
- `syntheses/` （Phase 2 新建，初始为空）：对比 / 分析 / 时间线，由 `/query` 跑出值得保留的回答归档而来

## 维护规则

每次 `/ingest` 触达 ≥ 5 wiki 页（fan-out）。每次 `/query` 出好答案归档到 syntheses/。每周跑 `/lint` 健康度检查。

详见 [99_System/llm-wiki约定.md](../99_System/llm-wiki约定.md)。
