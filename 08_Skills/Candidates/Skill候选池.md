# Skill 候选池

这个文件用于管理“哪些能力值得沉淀成 skill”。

## 状态说明

- `idea`：只是一个想法，还没有稳定输入输出
- `candidate`：已经出现重复需求，值得评估
- `incubating`：正在设计或实现
- `active`：已经有 skill，可稳定使用
- `archived`：不再维护或暂不适合

## 评估标准

满足下面任意两项，就应该进入候选池：

- 重复出现 2 次以上
- 输入输出相对稳定
- 有明确的多步流程
- 依赖固定模板、脚本或参考文件
- 适合交给其他 agent 稳定执行

## 当前候选

| 名称 | 状态 | 解决问题 | 触发场景 | 下一步 |
|---|---|---|---|---|
| `source-auto-summary` | incubating | 来源入库后自动生成初步摘要 | 用户给链接或文件后，想先有摘要和关键信息 | 用真实任务验证，并评估是否补脚本自动更新状态 |
| `video-note-extractor` | candidate | 视频链接转结构化来源笔记 | 用户给视频链接，希望提取观点、结构和可复用表达 | 明确是否依赖字幕或外部转录 |
| `pdf-insight-extractor` | candidate | PDF 转 Markdown 后提炼重点 | 用户给 PDF，希望提取摘要、结论、图表信息 | 结合 `pdf-to-ai-markdown` skill 设计流程 |
| `topic-synthesizer` | candidate | 多来源合并为主题笔记 | 用户给多个来源，希望聚成一个主题 | 明确输入格式和主题输出模板 |
| `share-draft-generator` | candidate | 从主题笔记生成分享文档 | 用户已有主题笔记，想生成文章或内部分享 | 固定输出模板和受众字段 |
| `business-loop-designer` | candidate | 评估现有业务是否能跑通闭环，并产出可复用的闭环设计文档 | 用户希望判断某条业务是否适合 agent 化、自动化或系统化改造 | 继续在真实业务场景中验证输入模板、状态机模板和落地清单是否足够稳定 |
| `prd-delivery-loop` | incubating | 把软件类 PRD 推进到本地搜索、实现计划、写文件和测试执行的闭环 | 用户希望把真实项目做成“PRD -> 实现 -> 测试”的系统，并可接入不同 LLM provider | 继续在真实项目中验证文件写入边界、测试命令策略和 provider 分层是否足够稳定 |
| `business-loop-panel` | incubating | 用一个本地面板管理多个业务仓库，直接输入需求并查看闭环状态 | 用户希望在一个界面里初始化项目、维护业务记忆、启动运行并在歧义时自动停止 | 继续验证多项目注册表、运行状态展示和项目记忆编辑是否足够稳定 |
| `article-publish-kit` | active | 文章草稿升级为可发布的内容包 | 用户已有主题或文章，希望生成发布版、SVG 配图、图卡和社交文案 | 继续在真实文章里复用，并保持 SVG 生成、渲染验证、PNG 导出的固定流程 |
| `article-visual-assets` | active | 从文章与切图文案批量生成可复用的视觉资产 | 用户已有正文、发布建议或切图文案，希望补封面图、结构图、图卡与 PNG 预览 | 持续沉淀图卡版式、命名规范和验证流程 |
| `markdown-publish-preview` | active | 把本地 Markdown 渲染成可复制的 HTML 预览页 | 用户要把文章贴到飞书等富文本编辑器，但本地图片路径无法直接复制 | 在真实发布场景里继续验证“浏览器复制”是否足够稳定 |
| `visual-layout-qa` | incubating | 对文本型 SVG 做自动布局检查，优先发现越界、重叠和高风险版式 | 用户持续生成 SVG 图卡、结构图，且经常出现超框、重叠、难以人工预判的问题 | 继续在真实发布任务里验证脚本误报率，并评估是否沉淀为独立 skill |
| `critique` | active | 文章产出后按 4 维度（信息密度 / 独特视角 / 可操作性 / 阅读节奏）评分并强制返工低分段落，去除 AI 味 | 文章草稿、发布版、主题笔记、社交文案产出后，或用户感觉"读起来怪怪的、AI 味太重" | 落在 `.claude/skills/critique/`，含 `references/zh-ai-tells.md` 与 `rule-taxonomy.md`；继续在真实文章上跑、补充新发现的 AI 痕迹模式 |
| `ingest` | active | 把新 raw source 处理进 wiki：写摘要 + fan-out 更新 entities / concepts / syntheses + 更 index + 追 log，预期触达 5-10 页 | 用户在 `raw/inbox/` 或 `raw/sources/` 加了新文件 / 链接 / PDF | 落在 `.claude/skills/ingest/`，按 LLM Wiki 模式（Karpathy）实现；Phase 2 迁移目录后需更新硬编码路径 |
| `query` | active | 检索 wiki 回答问题、按需归档为 synthesis 页、暴露 wiki 缺口 | 用户提知识性问题、对比 / 综述 / 时间线、文章前的素材聚合 | 落在 `.claude/skills/query/`；与 `/ingest`、`/lint` 配合形成知识复利 |
| `lint` | active | 周期性扫 wiki 矛盾 / 过时 / 孤儿 / 缺交叉引用 / 烂尾 TODO / 薄来源 / synthesis 候选 | 每周一次、批量 ingest 后、写文章前、用户感觉 wiki 乱了 | 落在 `.claude/skills/lint/`；阈值可调，调整需同步 `99_System/llm-wiki约定.md` |

## 使用方式

每次出现值得复用的新问题时：

1. 先在这里加一条候选
2. 判断优先级和状态
3. 如果进入 `incubating`，就在 `08_Skills/Incubating` 下创建对应设计文件
4. 如果实现完成，更新这里的状态，并补充接入说明
