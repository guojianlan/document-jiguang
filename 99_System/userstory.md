# User Stories

这是这个仓库**作为一个"知识到文章"系统**的使用说明，用用户故事的形式写——告诉你**什么时候做什么、怎么做、不该做什么**。

每条故事都是一个独立场景，按"触发→动作→结果"组织。读完后你就知道怎么把这个系统用起来。

## 整体心智模型

```
你看到的内容          你说的话                 系统做的事
   ↓                    ↓                       ↓
外部文章 / PDF  →   "把这个入库"          归类到 raw/sources/
   ↓                    ↓                       ↓
                  "/ingest <文件>"          fan-out 到 wiki/
   ↓                    ↓                       ↓
                  wiki 长大                  entity / concept / synthesis
   ↓                    ↓                       ↓
某个写作选题  →   "/query <问题>"          扫 wiki 给答案 + 缺口
   ↓                    ↓                       ↓
                  发现可发素材              生成或定位 synthesis
   ↓                    ↓                       ↓
                  "/publish-article ..."   生成正文 + 发布建议
   ↓                    ↓                       ↓
                  "/critique ..."           4 维度评分 + 返工
   ↓                    ↓                       ↓
                  "/render-svg ..."         封面 + 图卡
   ↓                    ↓                       ↓
                  PNG 导出                  飞书 / 公众号实际发
```

四个核心动作：`ingest` / `query` / `publish-article` / `critique`。其他都是辅助。

---

## 故事 1：我看到一篇真的有判断的文章

**触发**：刷推 / 读 newsletter / 朋友分享一个链接，你判断"这篇有干货，不想丢"。

**我想**：让这篇文章的判断进入仓库，将来写选题时能用得上。

**怎么做**：

```bash
# 一行命令入库（自动判断类型 + 自动生成摘要骨架）
python3 scripts/intake_source.py "https://example.com/article-url"
```

跑完后会看到：

- `raw/sources/Articles/<日期>_<slug>.md`（原始内容归档）
- `wiki/sources/<日期>_<type>_<slug>.md`（摘要骨架，待 ingest 填充）

然后让 LLM 真正消化它：

```
/ingest wiki/sources/<刚生成的文件>
```

`/ingest` 会做：

1. 读全文
2. 跟你对话 1-3 轮（确认重点是什么、与现有 wiki 怎么对照）
3. 自动 fan-out 到相关 entity / concept 页（最少 3 页才算成功）
4. 必要时建新 entity / concept / synthesis 骨架
5. 更新 `06_Maps/index.md` 和 `log.md`

**注意**：

- 不要跳过 1-3 轮对话，否则 fan-out 会做成机械填表
- 如果 `/ingest` 报"触达 < 3 页"，说明这篇 source 内容浅或 wiki 缺相应页，按它的提示补
- 不同来源类型都能用：article / link / video / pdf / document

---

## 故事 2：我读了一堆文章但没时间一篇篇 ingest

**触发**：周内浏览了 5-10 篇 agent 相关文章，下班想先存着，周末再统一处理。

**我想**：先把链接 / 文件囤起来，不想现在就跟 LLM 对话 ingest。

**怎么做**：

```bash
# 直接 echo URL 到 inbox（最简）
echo "https://example.com/some-article" > raw/inbox/2026-04-30_some-article.md

# 或者下载好的 PDF 直接丢
cp ~/Downloads/whitepaper.pdf raw/inbox/
```

文件名建议：`<YYYY-MM-DD>_<short-slug>.<ext>`，日期前缀让后续 ingest 自然按时间。

**周末集中处理时**，跟我说：

> 处理一下 inbox

我会：

1. 列出 inbox 里所有文件
2. 逐个跟你确认要不要 ingest（哪些保留 / 哪些删除）
3. 对要保留的逐个跑 `/ingest`（每个完整 fan-out）

**注意**：

- inbox 攒超过 10 个文件会变成"债务"——容易忘了为什么收的，价值衰减
- 推荐节奏：每周末过一次，过期就别留
- inbox **不会自动 ingest**，没有定时任务，必须你说一声

---

## 故事 3：我有一个选题，想看看 wiki 里有没有素材

**触发**：突然想到一个想写的主题，比如"AI 编程的经验沉淀范式"，但不知道仓库里覆盖到什么程度。

**我想**：先看 wiki 有什么，再决定要不要写。

**怎么做**：

```
/query "AI 编程的经验沉淀范式有哪些"
```

`/query` 会：

1. 拆问题 → 找命中的 entity / concept / source
2. 读命中页给答案
3. 标注 wiki 缺口
4. 评估是否归档为新 synthesis（如果回答 insight 重要）

**结果三种情况**：

| 情况 | 信号 | 你接下来做的 |
|---|---|---|
| **A. 完全覆盖** | 已有 publishability=1 synthesis | 直接 `/publish-article <synthesis 路径>` |
| **B. 部分覆盖** | 命中 ≥ 3 页但无 synthesis | `/query` 自动归档新 synthesis (publishability=0)；你判断是否升 1 |
| **C. 缺关键来源** | 命中 ≤ 1 页或缺口报告很大 | 先按故事 1 补几篇一手来源，再回 `/query` |

**注意**：

- 不要凭印象写——`/query` 必须引用 wiki 出处
- 如果 wiki 缺，**先补 source 再写**，不要靠 LLM 编造
- `/query` 也是发现"wiki 该补什么"的好机会，每次缺口报告都有价值

---

## 故事 4：我要发布一篇文章

**触发**：你确认有可发布素材（情况 A 或 B），想出文章。

**我想**：把 synthesis 派生成可发布的正文 + 发布建议 + 视觉资产。

**怎么做**（标准 4 步）：

### Step 1 — 生成正文 + 发布建议

```
/publish-article wiki/syntheses/<某 synthesis>.md
```

产出：

- `outputs/drafts/<日期>_article_<slug>_发布版.md`（正文）
- `outputs/drafts/<日期>_article_<slug>_发布建议.md`（含主标题、点击欲备选、推荐导语、3 种分享开场、不建议发布方式、推荐金句、社群短文案）

### Step 2 — 强制 critique

```
/critique outputs/drafts/<日期>_article_<slug>_发布版.md
```

按 4 维度打分（信息密度 / 独特视角 / 可操作性 / 阅读节奏），命中硬规则（"而是"句过多、冒号超额、协作路标词）必须返工。任一维度 ≤ 2 分**不准发**。

返工后会自动进入二轮自审，目标是"读起来不再明显是 AI"。

### Step 3 — 视觉资产

```
/render-svg
```

按发布建议里的 TODO 生成封面图 + 维度对照表 / 流程图。所有 SVG 自动跑布局校验（hook 已挂在 `.claude/settings.json`）。

PNG 导出：

```bash
bash scripts/validate_svg_asset.sh raw/attachments/<file>.svg \
  --png raw/attachments/<file>.png --width 1440
```

### Step 4 — 预览 + 实际发布

```bash
node scripts/serve_markdown_publish_preview.js \
  "outputs/drafts/<文件>" --open
```

浏览器打开，按发布建议里的"复制版正文"按钮拷贝，粘贴到飞书 / 公众号编辑器。

**注意**：

- 永远不要跳过 `/critique`——硬规则命中过多会被读者读出 AI 味
- 视觉资产是 SVG 优先 → PNG 导出（飞书 / 公众号引用 PNG，不直接引用 SVG）
- 发布建议里挂的 TODO 要逐项处理完，不要发"半成品"

---

## 故事 5：我想看 wiki 的整体健康度

**触发**：连着 ingest 了几天 / 一周没碰仓库 / 主观感觉"wiki 越来越乱"。

**我想**：自动扫一遍找出腐烂点。

**怎么做**：

```
/lint
```

会扫描 7 项：

1. 矛盾（同一事实在不同页给出不同数字）
2. 过时声明（页未跟新最新 source）
3. 孤儿（无 index 条目 / 无引用的页）
4. 缺失交叉引用（A 提了 B 但 B 没回提）
5. 烂尾 TODO（≥ 30 天没动）
6. 薄来源（fan-out ≤ 1 页的 source）
7. synthesis 候选（≥ 3 source 谈同一组合但无合成页）

报告分三级：

- 🚨 关键（建议立即处理）
- ⚠️ 维护（本周可以处理）
- 💡 建议（可选）

低风险修复 lint 会主动做（补 index 条目、补显然该有的交叉引用）；高风险报告给你判断。

**注意**：

- 推荐节奏：**每周一次**（少了 wiki 真的会腐烂，多了浪费上下文）
- 大批量 ingest 之后（一次入 ≥ 3 个来源）也跑一次
- 写文章前跑一次（避免拿过期判断下笔）

---

## 故事 6：我想知道 wiki 现在有什么

**触发**：想快速看一眼当前知识库有哪些 entity / concept / source / synthesis。

**我想**：不用打开 100 个文件，看一张总览。

**怎么做**：

打开 `06_Maps/index.md`——这是 wiki 的总目录。每次 `/ingest` 必更，永远新鲜。

四张表：

- **类别速览**（数量统计）
- **Entities**（每条一句话 + 关键来源 + 状态）
- **Concepts**（每条一句话 + 状态）
- **Sources**（按时段倒序 + 涉及 entity / concept）
- **Syntheses**（含 publishability 标记）

每条都有 `[[wikilink]]`，点击直达。

也可以打开 Obsidian 看 graph 视图——entities / concepts / syntheses / sources 已经按颜色分组。

---

## 故事 7：我想发一个系列，多篇文章打包

**触发**：手头有 ≥ 3 个 publishability=1 synthesis，想打包成系列发。

**我想**：保持各篇独立可读，但读者按顺序看能形成完整知识图。

**怎么做**：

1. 先在 `06_Maps/index.md` 看哪些 synthesis 是 publishability=1
2. 判断三个之间是否有"入门 → 进阶 → 实战"的层次关系
3. 对每个 synthesis 单独跑 `/publish-article`，产出 3 套独立的正文 + 发布建议
4. 每篇发布建议里相互引用（"如果你想看入门篇 → [篇 1]，进阶篇 → [篇 2]"）
5. 在 outputs/drafts 下建个汇总页 `<日期>_series_<主题>.md` 列三篇入口

**注意**：

- 不要把三个 synthesis 合并成一篇大文章——会失去层次感
- 系列文章每篇都要独立跑 `/critique`
- 视觉风格保持一致（封面用同一模板）

---

## 故事 8：我想根据某个外部需求快速产出

**触发**：被领导 / 客户问"你能写一篇 AGENTS.md 入门吗"，但 wiki 当前没现成 synthesis。

**我想**：快速判断能不能交付，不能就明确告知"还需要先采集来源"。

**怎么做**：

```
/query "AGENTS.md 入门"
```

看缺口报告：

- 如果命中 ≥ 5 页 → 可以快速归档 synthesis 然后发
- 如果命中 < 3 页 → 缺一手来源，先 `intake_source.py` 抓 2-3 篇官方文档 + `/ingest`，再 query

**真实需要 1-2 小时的工作**：

- 抓 2 篇官方文档：`intake_source.py` + `/ingest` ≈ 30 min
- query 触发 synthesis ≈ 10 min
- publish-article + critique ≈ 30 min
- render-svg ≈ 20 min

如果时间不够，直接把 synthesis 用作初稿（不发布），告诉对方"需要 2 小时正式打磨"。

---

## 故事 9：我想纠正 wiki 里的一个判断

**触发**：发现某 entity 页对一个判断说反了 / 时间错了 / 引用错了。

**我想**：直接改正，并让相关的 synthesis 也同步更新。

**怎么做**：

1. 直接编辑对应的 entity / concept 页（你拥有 wiki 层的修改权）
2. 跟我说"我刚改了 [[XXX]]，请同步更新引用了它的 synthesis 和 source 摘要"
3. 我会扫所有引用页，把矛盾点标出来或自动修

**注意**：

- 改完顺手在 frontmatter 里加 `updated_at: <今天>`
- 重大判断变更（例如某个工具被 deprecated）应该同时更新 status 字段
- 不要直接改 source 摘要——那是事实层，事实出错应该重新 ingest

---

## 命令速查表

| 你想做的事 | 命令 |
|---|---|
| 看 wiki 有哪些页 | 打开 `06_Maps/index.md` |
| 看 wiki 演进时间线 | 打开 `log.md`（grep 友好） |
| 入库一个 URL / PDF | `python3 scripts/intake_source.py "<URL或路径>"` |
| 让来源进入 wiki | `/ingest <wiki/sources/某文件>` |
| 找选题素材 | `/query "<问题>"` |
| 查全 wiki 健康度 | `/lint` |
| 从合成页发文章 | `/publish-article wiki/syntheses/<文件>.md` |
| 文章去 AI 味校验 | `/critique outputs/drafts/<文件>.md` |
| 生成封面 / 图卡 | `/render-svg` |
| 验证 SVG 布局 | `node scripts/check_svg_layout.js <文件>` |
| 启动正文预览 | `node scripts/serve_markdown_publish_preview.js "<文件>" --open` |
| SVG 导出 PNG | `bash scripts/validate_svg_asset.sh <svg> --png <out.png> --width 1440` |
| 重启预览服务 | `bash scripts/restart_markdown_publish_preview.sh "<新文件>"` |

---

## 反模式（不要做的事）

- ❌ **看完文章只记到云笔记** —— 脱离 wiki 就脱离了 fan-out 网络
- ❌ **拿 source 摘要直接写发布稿** —— AGENTS.md 明确禁止，必须经过 wiki 综合
- ❌ **跳过 critique 直接发** —— 硬规则命中会被读者读出 AI 味
- ❌ **inbox 攒 ≥ 10 个文件不处理** —— 会变成"债务"，价值衰减
- ❌ **每个 query 都归档 synthesis** —— wiki 会被噪音淹没
- ❌ **synthesis 没升 publishability=1 就发** —— synthesis 是知识，不是发布稿
- ❌ **改完 entity 不同步 synthesis** —— wiki 内会出现矛盾
- ❌ **拿没有一手来源的内容写文章** —— wiki 不接受没 source 支撑的判断

---

## 文件位置导航

```
raw/                           ← 用户拥有，原始素材
  inbox/                       └─ 待处理文件（不会自动 ingest）
  sources/                     └─ 已分类原始来源（Articles / Links / Videos / PDFs / Documents）
  attachments/                 └─ 视觉资产（SVG / PNG / JSON）

wiki/                          ← LLM 拥有，知识层
  sources/                     └─ source 摘要（每个 raw 一份）
  entities/                    └─ 工具 / 产品 / 公司
  concepts/                    └─ 抽象概念 / 模式 / 方法
  syntheses/                   └─ 跨页综合（comparison / digest / timeline）

outputs/                       ← 发布产物
  drafts/                      └─ 发布版正文 + 发布建议 + 图卡
  published/                   └─ 已对外发布

06_Maps/index.md               ← wiki 总目录（每次 ingest 必更）
log.md                         ← 时间线审计
AGENTS.md                      ← 长期协作约定
CLAUDE.md                      ← Claude Code 专属约定
99_System/llm-wiki约定.md      ← Karpathy 模式说明
.claude/skills/                ← 入口 skill（ingest / query / lint / publish-article / critique / render-svg / verify）
skills/                        ← 长期 skill（article-publish-kit / article-visual-assets / markdown-publish-preview / source-auto-summary）
scripts/                       ← 自动化脚本
04_Templates/                  ← 模板
```

---

## 推荐的日常节奏

```
每天 / 看到好文章
  └─ intake_source.py + /ingest        即时型，单篇高价值

每周末
  ├─ 看 raw/inbox/                      处理累积
  ├─ /lint                              健康度检查
  └─ 决定本周想写的选题                 跑 /query 看覆盖度

每月
  ├─ 看 06_Maps/index.md                wiki 整体规模 / 待补清单
  ├─ 评估 publishability=1 的 synthesis 是不是该发了
  └─ 检查 outputs/drafts/                有没有挂着没发的文章

写文章时
  ├─ /query "<选题>"                    覆盖度判断
  ├─ 缺料 → intake_source.py 补 2-3 篇  补来源
  ├─ /publish-article ...               生成正文 + 建议
  ├─ /critique                          强制返工
  ├─ /render-svg                        视觉资产
  └─ 飞书 / 公众号实际发                 真分发
```

---

## 如果还有疑问

- 系统设计原理：`99_System/llm-wiki约定.md`
- 仓库长期约定：`AGENTS.md`
- Claude Code 专属规则：`CLAUDE.md`
- 各 skill 详细规范：`.claude/skills/<skill>/SKILL.md`
- 模板结构：`04_Templates/`

或者直接跟我说"我想做 X，怎么做"，我会按上面的故事框架告诉你具体走哪条路径。
