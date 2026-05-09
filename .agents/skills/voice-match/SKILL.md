---
name: voice-match
description: Score how closely an article matches a target writing voice (default the user's own _self.md baseline) on 5 quantitative dimensions, then surface the most-deviating paragraphs with rewrite suggestions. Use after /critique passes, before declaring an article "voice-aligned". Reads from 99_System/voice-references/.
---

# voice-match

这个 skill 解决的问题是：critique 能把"AI 味"消除，但消除了 ≠ 像作者本人写的。voice-match 把"是否像作者"变成可量化对照——5 维评分 + 偏离最严重段落定位 + 改写建议（不直接改文件）。

## 何时使用

- `/critique` 已通过（4 维全部 ≥ 3），但用户感觉"读起来不像我写的"
- `/publish-article` 流程末尾，正文落盘前最后一道闸
- 写作 sub-agent 完成草稿后主动调用，对照 voice-references 自查
- 用户调取某个外部作者风格做参考（"按卡兹克风格写一篇"）

不适合：素材整理、纯结构图、单条社交文案（< 200 字）。

## 输入

- 一篇 Markdown 文章路径（必填）
- 可选：**目标 voice**（默认 `_self.md` 用户基线；可指定 `khazix` / `idoubi` / `guizang` / `xiaohu` 或 mix-in 形式如 `_self+khazix-rhythm`）
- 可选：**目标平台**（用于解释偏离是否合理。公众号场域允许"借用 khazix 节奏"，博客场域强约束 `_self`）

## 资源加载规则

执行前必读：

- [99_System/voice-references/_index.md](/Users/apple/Desktop/project/document/99_System/voice-references/_index.md) — 6 张指纹的总览 + 按场域决策树 + **用户双 mode 自动判定段**
- [99_System/voice-references/_self.md](/Users/apple/Desktop/project/document/99_System/voice-references/_self.md) — 用户方法论 mode 基线（默认）
- [99_System/voice-references/_self-essay.md](/Users/apple/Desktop/project/document/99_System/voice-references/_self-essay.md) — 用户随笔 mode 基线（按 §1.2 mode 选择规则触发）
- 如指定其他作者，加载对应 `<author>.md`

## 工作流

### 1. 判定目标 voice（含双 mode 选择）

#### 1.1 选 voice 作者

按优先级：
1. 用户在调用时显式声明（"按 khazix 跑 / 按 _self+khazix-rhythm 跑"）
2. 文件路径 / 标题推断目标平台 → 用 `_index.md` 的"按场域决策树"映射 voice
3. 默认走 `_self`（用户本人）

#### 1.2 如目标 voice = _self，必须再选 mode

用户本人有两个 mode：

- **方法论 mode** → 加载 [`_self.md`](/Users/apple/Desktop/project/document/99_System/voice-references/_self.md)
- **随笔 mode** → 加载 [`_self-essay.md`](/Users/apple/Desktop/project/document/99_System/voice-references/_self-essay.md)

mode 判定按 [_index.md](/Users/apple/Desktop/project/document/99_System/voice-references/_index.md) "用户双 mode 自动判定"段的 3 步规则：

1. **Step 1 硬规则**：扫文章章节标题，命中 `TL;DR / 适用读者 / 问题定义 / 通过标准 / FAQ` → 方法论；命中观点句章节标题 + 5+ 处"——" + 3+ 处"我读完/我看到/我数了一遍" → 随笔
2. **Step 2 关键词**：硬规则未命中时按内容类型关键词（流程/SOP/方法 → 方法论；评测/拆解/源码精读/反共识/复盘 → 随笔）
3. **Step 3 兜底**：都不命中 → 默认方法论 mode（用户主站积累更多）

mode 判定结果直接影响维度 3（章节结构）和维度 5（收尾形态）的评分基线。**选错 mode 会导致同一篇文章差出 10+ 分**——这是引入双 mode 机制的根本原因（参见 12-components 文章按方法论 mode 评 11/25，按随笔 mode 评 23-25/25 的对照）。

#### 1.3 把判定结果显式写在诊断卡第一行

格式：

```
voice：_self（mode：essay 随笔 / 子型：a 观察评测体）（场域：知乎技术随笔）
```

或：

```
voice：_self（mode：methodology 方法论）（场域：blog.workmn.com）
```

### 2. 量化 5 维

对照目标 voice 的量化基线表逐项打分。**每维 1-5 分**：

#### 维度 1 — 段落密度

测：段均字数（中文字符数 / 段落数，剔除标题段、引用段、代码段、列表项前缀）。

打分：
- **5 分**：差距 ≤ 30%（基本一致）
- **3 分**：差距 30%-100%（偏离明显）
- **1 分**：差距 > 100%（不同物种）

证据：报告"实测段均 X 字 / 基线 Y 字 / 差距 Z%"。

#### 维度 2 — 人称密度

测：第一人称"我"次数 / 第二人称"你"次数 / 千字密度。

打分：
- **5 分**：千字密度跟基线差 ≤ 50%
- **3 分**：差 50%-200%
- **1 分**：差 > 200% 或方向反（基线第一人称，实际全第三人称）

证据：报告"我 N 次（千字 X）/ 你 N 次（千字 Y）/ 基线 _self 是 千字 Z"。

#### 维度 3 — 章节结构

**对 `_self` 方法论 mode**：
- 有无 TL;DR 段
- 有无 FAQ 段
- 有无"通过标准 / 最小可复现验证 / 不通过先查"三件套
- 章节数（## + ###）

打分：
- **5 分**：3 件齐全（TL;DR + FAQ + 三件套）
- **4 分**：2 件齐全
- **3 分**：1 件齐全
- **1 分**：全无

**对 `_self` 随笔 mode**（关键：跟方法论 mode 评分方向相反）：
- 章节标题是观点句而非 SOP 段名（必要）
- **没有** TL;DR / 适用读者 / 问题定义 / 通过标准 / FAQ（命中即 +）
- 5-9 个章节（多了像方法论，少了像速记）
- 配图 0-1 张 + 对照表 0-1 张

打分：
- **5 分**：章节标题全是观点句 + 砍掉所有 SOP 段名 + 章节数 5-9
- **3 分**：章节标题部分观点句 + 偶混 SOP 段名
- **1 分**：直接套了 _self.md 的 SOP 骨架（出现 TL;DR / 适用读者 / 通过标准）

如果目标 voice 不是 `_self`，按对应基线的章节模板打分（卡兹克 = 是否分章节符合内容类型；idoubi = 4 套模板对应度等）。

#### 维度 4 — 句式特征

测下列句式 / 词频是否出现且在合理区间：

| 标志特征 | _self 方法论 mode | _self 随笔 mode | khazix 基线 | idoubi 基线 |
|---|---|---|---|---|
| "不是 X，而是 Y" | 5-15 次/3000 字 | 0-2 次 | 0-1 次 | 0-2 次 |
| "把 X 当作 / 当成 Y" | 频繁 | 偶尔 | 不用 | 出现 |
| **"——"破折号** | 0-3 次 | **15-20 次/3000 字（招牌）** | 偶用 | 极少 |
| **"我读完 / 我数 / 我抄 / 我看到"动词链** | 极少 | **3-8 次（招牌）** | 偶尔 | 不用 |
| **章节标题是观点句** | 不（全是 SOP 段名）| **是（招牌）** | 偶有 | 偶有 |
| 物理化动词（摁 / 砸 / 砍）| 不用 | 不用 | 频繁 | 偶尔 |
| 极值判断（"最 X 的 Y"）| 出现但克制 | 出现但克制 | 频繁 | 偶尔 |
| 数字精确到位（ARR / star / 用户数）| 偶尔 | 偶尔 | 不用 | 频繁 |
| 英文术语零翻译 + 反引号 | 频繁 | 频繁（继承）| 不用 | 频繁 |
| 个人词典（口径 / 信号 / 护栏 / 工件 / 三件套）| 频繁 | 频繁（继承）| 不用 | 不用 |

打分：
- **5 分**：3+ 个标志特征命中且密度合理
- **3 分**：1-2 个命中
- **1 分**：完全无命中或全反方向

证据：列出本文实际命中的标志特征 + 频次。

#### 维度 5 — 收尾形态

测正文最后 200 字的结构：

| voice | 收尾配方 |
|---|---|
| `_self` 方法论 mode | 指标 + 验证 + 坑（FAQ 收）|
| `_self` 随笔 mode | 一句心法 + 引出下一阅读钩子（**禁止 FAQ 收**）|
| `khazix` | 长解释 → 3-5 短句 → 4 字成语 / 口号 |
| `idoubi` | 性格自洽 + 朴素口号 |
| `guizang` | 复述价值 + 链接 + 转发请求 |
| `xiaohu` | 反向钩子 / 留个问题给读者 |

打分：
- **5 分**：完全符合目标 voice 收尾配方
- **3 分**：部分符合（结构对但元素不全）
- **1 分**：完全是另一种 voice 的收尾，或平铺无收尾

证据：直接引用最后 200 字 + 标注偏离点。

### 3. 出诊断卡

```
voice：<target>（场域：<field>）

维度 1 段密度    X/5  实测 N 字 / 基线 M 字 / 差距 Z%
维度 2 人称密度  X/5  我 A 次（千字 a）/ 你 B 次（千字 b）/ 基线 千字 c
维度 3 章节结构  X/5  TL;DR ✓ / FAQ ✗ / 通过标准三件套 ✗
维度 4 句式特征  X/5  命中：<list> | 缺失：<list>
维度 5 收尾形态  X/5  实际是 <type> 收尾，目标应是 <type>

总分 N/25，最偏离维度：<X>
```

### 4. 标注最偏离的 3 段

按维度偏离程度排序，找出**最不像目标 voice 的 3 段**，每段：

```markdown
### 偏离段 N（命中维度 X）

**原文**（line 12-15）：
> ...

**问题**：[具体说哪里偏离基线，比如"段长 320 字 vs 基线 100 字 / 0 个"我"vs 基线 1/40 字密度"]

**建议改写方向**（不直接改文件，给方向）：
- [拆段建议 / 加第一人称 / 改收尾 / 等等]
```

### 5. 决定返工范围

- 任一维度 ≤ 2 → **建议返工，并指明具体段落**
- 全部 ≥ 4 → **通过**
- 总分 < 15（5 项均分 < 3） → **建议整段重写**而非局部修补

**重要**：voice-match **不直接改文件**。只给诊断 + 建议。改不改、怎么改由用户或写作 sub-agent 决定。这跟 critique 的"局部返工动手"不同。

### 6. 跟 critique 的串行关系

publish-article 流程里推荐顺序：

```
草稿 → /critique → /voice-match → 用户审 → 落盘
```

critique 解决"读起来 AI"，voice-match 解决"读起来不像作者"。两件事评的是不同东西，不要塞进一个 skill。

如果 critique 已经把 `场域` 字段判定了（详见 critique SKILL.md §1.5），voice-match 直接复用同一个场域字段决策 voice，不要重复判定。

### 7. 回写规则

如果在评分中发现新的"作者标志特征"（在用户实际稿件中反复出现但 `_self.md` 没记录），更新：

- `99_System/voice-references/_self.md` 对应维度
- 必要时更新 `_index.md` 的量化基线对照表

按 AGENTS.md 规则 A：回写说明视为完成必要条件。

## 双轨触发

按用户 2026-05-09 决策（Q1=C），voice-match 走双轨：

### 轻量调用（自动）

`/publish-article` 启动时**只读 `voice-references/_index.md`**（约 5KB），按目标平台决定本次写作的 voice 基线，注入写作 sub-agent prompt。**不调 voice-match 完整流程**，避免摩擦。

### 重量调用（手动）

用户主动跑 `/voice-match <article>`，触发完整 5 维评分 + 段落定位 + 改写建议。适用：
- critique 通过但读起来不像本人
- 想看一篇外部稿子按"按 khazix 风格"是否合格
- 写作 sub-agent 自查

## 边界

- **不直接改文件**——只出诊断 + 建议，改写由用户或写作 sub-agent 完成
- **不替代 critique**——AI 味 ≠ voice 偏离，两件事正交
- **不评判 voice 优劣**——只评"是否像目标 voice"，不评"目标 voice 是否好"
- **样本量警告**：voice-references 中标注 `sample_size_warning` 的（如当前 `xiaohu.md`）评分置信度低，诊断卡需明示

## 与其他 skill 的协作

- 与 `/critique` 串联：critique 通过后跑 voice-match，串在 publish-article 末尾
- 与 `/publish-article` 双向：写作前轻量读 `_index.md`；写作后重量跑 voice-match
- 与 `/lint` 解耦：lint 看 wiki 健康度，voice-match 看发布稿 voice 对齐度

## 维护

- voice-references 库新增作者，本 skill 不需改动（自动通过 `_index.md` 发现）
- 5 维评分模板若需调整，改本文件 §2 即可
- 跟 `_self.md` 的基线漂移（用户写作风格演化）需要每季度审一次
