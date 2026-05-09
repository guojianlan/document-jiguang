---
type: voice-reference-index
created_at: 2026-05-07
purpose: 写作 sub-agent 在 publish-article skill 启动前先读本文件，按"目标场域 + 内容类型"决定调取哪份 voice-reference
---

# 写作风格参考库总览

6 张指纹，**两张是用户本人双 mode**（_self.md 方法论 mode + _self-essay.md 随笔 mode），4 张是外部参照系（按风格定位区分）。

## 一句话定位

| 文件 | 作者 | 定位 | 看家本领 |
|---|---|---|---|
| **`_self.md`** | **用户本人 · 方法论 mode** | **工程文档型方法论作者** | **TL;DR + FAQ + 通过标准三件套** |
| **`_self-essay.md`** | **用户本人 · 随笔 mode** | **技术随笔 / 评测 / 复盘作者** | **观点句章节 + "——"破折号 + "我读完"动词链** |
| `khazix.md` | 数字生命卡兹克 | 高情绪公众号长文派 | 收尾"长 → 短 → 口号"三段式 |
| `idoubi.md` | idoubi | 诚实账本派 indie | 数字精确 + ROI 暴露 + 履历式开场 |
| `guizang.md` | 歸藏 | 设计师 + 开发者结构派 | 平行案例平铺 + 设计行业术语 |
| `xiaohu.md` | 小互 | 翻译者 + 实测者派 | 英文原文 + 中译 + 解释三件套 |

## 量化基线对照

| 维度 | _self（方法论）| _self-essay（随笔）| 卡兹克 | idoubi | 歸藏 | 小互 |
|---|---|---|---|---|---|---|
| 段均字数 | **90-110** | **90-110**（继承）| 24 | 23-44 | 26-50 | 44-57 |
| 篇幅范围 | 3500-8000 | 3500-5500 | 2500-3300 | 因类型不同 | 1700-4600 | 5000-7000 |
| 配图密度 | **0** | 0-1 张/篇 | 1/100 字 | 因类型不同 | 1/270 字 | 1/165-875 字 |
| 第一人称密度 | 1/100 字 | 子型 a 1/500，子型 b 1/40 | 1/50 字 | 1/100 字 | 1/100-200 字 | 1/115-700 字 |
| 第二人称密度 | 1/200 字 | **1/200-300 字（更高更口语）** | 偶用 | 偶用 | 偶用 | 几乎无 |
| 显式分章节 | **强 8 段 SOP** | **5-9 段，标题是观点句** | 0-12 | 因类型不同 | 平行结构 | 数字编号 |
| TL;DR / FAQ | **必有** | **无（核心反差）** | 没有 | 没有 | 没有 | 没有 |
| 通过标准三件套 | **必有** | **无（核心反差）** | 没有 | 没有 | 没有 | 没有 |
| "——"破折号 | 0-3 次 | **15-20 次（招牌）** | 偶用 | 极少 | 极少 | 极少 |
| 不是 X 而是 Y | **5-8 次（招牌）** | 0-2 次 | 极少 | 极少 | 极少 | 极少 |
| 情绪密度 | 极低 | 极低（继承） | 极高 | 低 | 低 | 中 |
| 收尾习惯 | 指标 + 验证 + FAQ | **心法句 + 下一阅读钩子** | 长 → 短 → 口号 | 性格自洽 + 朴素 | 复述 + 链接 + 转发 | 反向钩子提问 |

**最重要的事实**：用户本人的段均是其他人的 2-4 倍。这意味着任何场域要"卡兹克化 / 小互化"都是一次大手术，不是局部调味。
**第二个重要事实**：用户本人有**两个 mode**——方法论 mode 占大多数 blog 篇目，随笔 mode 是新仓库下面向公众号 / 知乎技术随笔场域的写法。**voice-match 必须先选 mode 再评分**，否则同一篇文章按错的 mode 评会差出 10+ 分。

## 用户双 mode 自动判定（voice 选定为 _self 之后必走这一步）

如果目标 voice 已判定为 _self（用户本人），**进一步选 mode**：

### Step 1：硬规则（命中即定）

| 命中信号 | 选 mode |
|---|---|
| 章节标题里出现 `TL;DR` / `适用读者` / `问题定义` / `通过标准` / `最小可复现验证` / `FAQ` | **方法论 mode (_self.md)** |
| 章节标题是观点句（出现"误读"/"为什么"/"会话短命"型完整判断句）| **随笔 mode (_self-essay.md)** |
| 文中出现 5+ 处"——"破折号 + 3+ 处"我读完 / 我看到 / 我数了一遍" | **随笔 mode** |
| 文中出现 5+ 次"不是 X，而是 Y" + blockquote 包"问题定义" | **方法论 mode** |

### Step 2：内容类型关键词（硬规则未命中时）

| 关键词 / 内容类型 | 选 mode |
|---|---|
| 流程 / SOP / 方法 / 实战教程 / 步骤 / 验证 / 通过标准 / 落地 / 闭环 | **方法论 mode** |
| 评测 / 拆解 / 源码精读 / 现象观察 / 反共识 / 误读 / 复盘 / 起源 / 我读完 X / 我看完 / 我数了 / 误读 / 这次我做了 | **随笔 mode** |
| 认知图 / 架构图 / 反思 / 一手观察 / 反对什么 | **随笔 mode** |
| 工程方法论 / 模板 / 治理 / 规范化 / 组件化 | **方法论 mode** |

### Step 3：兜底默认

都不命中 → 默认 **方法论 mode (_self.md)**（用户主站积累 ~60 篇方法论，是更稳的默认）。

### 已知已确认的 mode 归属（参考样本）

| 文章 / 草稿 | 归属 mode | 备注 |
|---|---|---|
| openspec-sdd-ai-coding-workflow（OpenSpec 起源篇）| 方法论 mode（中后段为主），前 3 段是随笔子型 b 复盘体 | 混合篇 |
| observability-for-frontend-feedback-loop | 方法论 mode | 标准 SOP |
| export-pipeline-methodology-pptx-pdf-consistency | 方法论 mode | 标准 SOP |
| bff-boundaries-routing-migration-gray-release | 方法论 mode | 标准 SOP |
| seo-meta-componentization-unified-entry | 方法论 mode | 标准 SOP |
| doubleToken / nextjs-with-typrorm-sass-startup-01 | 方法论 mode（教程子型）| SOP 简化 |
| NextJS-MatchMedia-BUG-FIX | 方法论 mode（速记子型）| 800 字短笔记 |
| **outputs/drafts/2026-05-07_article_claude-code-12-components_发布版.md** | **随笔 mode（子型 a 观察评测体）** | **essay mode 主样本** |

## 按场域选风格（默认决策树）

写作 sub-agent 在动笔前先回答：

**Q1：发布平台是什么？**

```
博客（blog.workmn.com）/ 少数派 / 掘金 / 内部 wiki
  → 默认走 _self.md（方法论 mode），外部参照系几乎不用

知乎专栏 / 公众号"技术评测/源码拆解"类
  → 默认走 _self-essay.md（随笔 mode），按上文"双 mode 自动判定"复核

公众号 / 朋友圈
  → 主要参照 khazix.md（短段 + 灌情绪 + 收尾三段式）
  → 如果是工具评测类，混 guizang.md 的"平行案例"结构

小红书 / 抖音文案
  → khazix.md（极致情绪化）+ 大幅压缩到 1500 字以内

掘金 / 少数派的"教程类"
  → _self.md 的 SOP 骨架 + idoubi.md 的"数字账本"

X / Twitter 短帖
  → 不用本库（短帖另起 voice-reference）
```

**Q2：内容类型是什么？**

```
方法论 / SOP / 架构总结
  → _self.md 8 段式骨架（TL;DR + 适用读者 + 问题定义 + 目标 + 方案 + 实现 + 步骤 + 指标 + 坑 + FAQ）

技术随笔 / 源码精读 / 工具评测 / 反共识观察
  → _self-essay.md 5-9 段观点句骨架（读者代入 + 钩子事实 + 反共识断言 + 心法收尾）

个人复盘 / 方法论起源故事
  → _self-essay.md 子型 b 复盘体（"我"主导 / 第一人称 1/40）

产品复盘 / 项目总结
  → idoubi.md "数字账本式"（精确数字 + 主动暴 ROI + 履历式开场）

工具评测 / 模型评测
  → 取决于平台：博客 → _self.md；技术随笔 → _self-essay.md；公众号 → khazix.md；设计/产品向 → guizang.md

行业反思 / 现象解读
  → 公众号 → khazix.md；博客技术随笔 → _self-essay.md（带钩子和反共识）

新闻 / 速报 / 翻译
  → xiaohu.md（英文原文 + 中译 + 解释三件套）
```

## ⚠️ 已知冲突：critique 硬规则 vs `_self.md` B1 标志句

**冲突描述**：
- `_self.md` 指纹：用户本人在方法论文里**大量用 "不是 X，而是 Y"**（OpenSpec 那篇 8+ 次）——是稳定风格特征
- `critique/zh-ai-tells.md` 第一节硬规则：**"而是" 全文 ≤ 1 次**

**意思**：critique skill 一直在把用户的标志句式当 AI 味扣分。我们前两稿（markdown-as-spec / 12-components）"读起来不像用户" 的部分原因就在这。

**待裁决方案**：
- A — 按目标场域分流（critique skill 加一个"场域"参数）
- B — 改 critique 硬规则（"而是" 改软警示，5+ 次才警告）
- C — 缩小 critique 适用边界（只对公众号 / 小红书生效，博客 / 知乎 / wiki 默认跳过部分硬规则）

**当前推荐 C**——最小改动覆盖核心冲突，待用户确认。

## 还有哪些场域没覆盖

- **X / Twitter 短帖**：_self.md 的方法论骨架显然不适用，需要单独建指纹
- **微博**：未抓样
- **小红书**（区别于公众号）：当前用 khazix.md 凑合，但小红书有自己的"标题党 + 情绪 + 表情"模板
- **B 站视频脚本**：完全没建

需要时按本目录新增 `<author>.md` 或 `<platform>.md`。

## 维护约定

- 新增任何 voice-reference 文件，必须更新本 `_index.md`
- 量化基线表的字段保持一致（段均 / 篇幅 / 配图 / 人称 / 分节 / 情绪 / 收尾）
- 跟 `_self.md` 出现重大冲突时，在本文件"已知冲突"段记录，等待裁决
- 半年回顾一次：用户实际发版的稿件跟哪份 voice-reference 最像？数据驱动调整推荐顺序

## 相关文件

- 6 张指纹：本目录 `_self.md` / `_self-essay.md` / `khazix.md` / `idoubi.md` / `guizang.md` / `xiaohu.md`
- 反向规则（什么不能写）：`.claude/skills/critique/references/zh-ai-tells.md`
- AGENTS.md 第 8 节"协作口径"：长期偏好沉淀地
- 写作 sub-agent 入口：`.agents/skills/publish-article/SKILL.md`（待接入本库）
- voice-match skill：`.agents/skills/voice-match/SKILL.md` §1 已加双 mode 选择步骤
