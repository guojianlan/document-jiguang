---
type: skill_candidate
status: incubating
skill_name: source-auto-summary
owner: codex
created_at: 2026-03-20
updated_at: 2026-03-20
---

# source-auto-summary

## 要解决的问题

把“用户给来源 -> 自动入库 -> 生成结构化摘要”这条链路固定下来，减少每次重复组织和判断。

## 典型触发场景

- 给一个文章链接，希望自动归档并生成摘要
- 给一个视频链接，希望先建来源笔记，再补结构和观点
- 给一个本地 PDF，希望先入库，再提炼重点
- 已经有来源笔记，希望补全摘要并把状态从 `draft` 更新为 `processed`

## 典型输入

- URL
- 本地文件路径
- 来源笔记路径
- 可选主题名

## 典型输出

- 来源文件已进入正确目录
- 来源笔记已按模板补全
- 笔记状态更新为 `processed`
- 可选主题建议

## 为什么值得 skill 化

- 重复性：高
- 稳定性：高
- 是否依赖模板 / 脚本 / 参考资料：是

## 当前设计

依赖：

- `scripts/intake_source.py`
- `04_Templates` 下的来源模板
- `skills/source-auto-summary/references/来源摘要输出规范.md`

## 当前状态

- incubating

## 下一步

- 用 1 到 2 次真实任务验证工作流
- 根据真实来源补充失败处理和类型边界
- 评估是否需要增加脚本来更新 `status: processed`
