# outputs/

发布层产物。从 `wiki/syntheses/` 派生，跑 `/publish-article` + `/critique` 生成对外可发布的内容。

## 子目录

- `drafts/` ← 原 `03_Outputs/Drafts/`：发布版正文 + 发布建议 + 视觉资产 + 社交切图文案 等
- `published/` ← 原 `03_Outputs/Published/`：已对外发布的版本

## 与 wiki 的关系

不是简单的"复制 + 改写"。规范：

1. 发布候选必须先在 `wiki/syntheses/` 有对应 synthesis 页（`publishability ≥ 1`）
2. 用 `/publish-article` 从 synthesis 转写为发布版正文 → 落 `outputs/drafts/`
3. 跑 `/critique` 4 维度评分；任一维度 ≤ 2 强制返工
4. 发布后在 synthesis 的 frontmatter 标 `publishability: 2` + 写 `derived_outputs` 路径

详见 [99_System/llm-wiki约定.md](../99_System/llm-wiki约定.md) 与 [skills/article-publish-kit/SKILL.md](../skills/article-publish-kit/SKILL.md)。
