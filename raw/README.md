# raw/

Karpathy LLM Wiki 三层中的 **raw sources** 层。LLM 只读、永不修改。

## 子目录

- `sources/`：按类型归档的原始来源（Articles / Links / Videos / PDFs / Documents）
- `inbox/`：待处理输入的暂存区
- `attachments/`：图片、SVG、JSON 数据等附件

## 不可变性

raw/ 下所有文件视为**事实**。LLM 在 `/ingest` 时读取它们写 wiki/ 里的摘要，但**不应修改 raw 文件本身**。

修改 raw 的唯一合法方式：

- 用户手动删除 / 改名 / 替换源文件
- `scripts/intake_source.py` 把新文件分类入库（添加新文件，不修改已有）

详见 [99_System/llm-wiki约定.md](../99_System/llm-wiki约定.md)。
