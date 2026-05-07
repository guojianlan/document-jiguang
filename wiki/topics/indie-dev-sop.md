---
type: topic
slug: indie-dev-sop
aliases: [独立开发, indie dev, 独立开发方法论, 独立开发 SOP]
domains: [domain/indie-dev, domain/ai-coding]
sources:
  - 2025-07-03_article_idoubi_ai-solo-dev
  - 2026-04-05_article_idoubi_my-vibe-coding-projects
  - 2026-01-24_article_idoubi_vibe-coding-workany
  - 2026-01-03_article_idoubi_my-ai-2025
  - 2025-01-01_article_idoubi_my-ai-2024
  - 2024-11-09_article_idoubi_get-paied-all-over-the-world
  - 2024-08-12_article_idoubi_migrate-to-cloudflare
  - 2024-05-22_article_idoubi_ai-search-engine
  - 2024-02-23_article_idoubi_sora-ai-video-generator
  - 2024-01-30_article_idoubi_ai-cover-generator
  - 2024-01-09_article_idoubi_my-ai-course-in-2024
  - 2024-01-04_article_idoubi_my-ai-projects-in-2023
  - 2023-12-20_article_idoubi_an-ai-native-product
  - 2023-11-24_article_idoubi_I-quit-from-tencent
  - 2023-11-19_article_idoubi_my-gpts-works-project
  - 2023-11-10_article_idoubi_how-to-create-gpts
related_topics: [vibe-coding-path, claude-code, mcp, ai-agent]
status: active
created_at: 2026-05-07
updated_at: 2026-05-07
---

# 独立开发 SOP（idoubi 方法论合集）

## 是什么

把 idoubi（艾逗笔）从 2023-11 离职腾讯到 2026-04 做出 9 产品矩阵的 16+ 篇 wechat 复盘**汇总成一份方法论**——不只是单个产品的成败，是 **3 年时间在一个独立开发者身上完整跑通的"5 步 SOP + 6 感悟 + 反神话集"**。

跟 [[vibe-coding-path]] 的关系：vibe-coding-path 关注"工具 / 技术成长路径"，本 topic 关注"独立开发的商业 / 运营 / 产品 SOP"——同一作者两个维度。

## 关键问题

- 离职做独立开发的真实门槛是什么？
- "AI 时代独立开发"跟传统独立开发差在哪？
- 一个产品什么时候算成功 / 什么时候该砍？
- 收入路径有几条，各自上限多少？
- "套壳"是耻辱还是合理选择？
- 真实的失败率 / 跑通率是多少？

## 5 步 SOP（来自 [[2025-07-03_article_idoubi_ai-solo-dev]]）

idoubi 在《AI 独立开发者》总结的 5 步流程：

1. **选品**：从兴趣 / 技能 / 市场缝隙 三角找
2. **MVP**：1-2 周做出能跑的 demo，不追求完美
3. **冷启动**：海外 ProductHunt + Twitter 是主要渠道；国内 V2EX / 即刻次之
4. **变现**：免费用户 → 转化 → 复购；记住 SaaS 转化率 0.03-3% 是常态
5. **复盘**：每个产品季度复盘，决定 续做 / 砍 / 套壳重做

## 6 感悟（同源）

1. **流量比技术稀缺**：AI 抹平技术，流量 / 商业 / 架构变成竞争力
2. **稳定的产品节奏 > 一次性高光**：每月一个新尝试 > 一年一个完美产品
3. **海外现金流 > 国内付费意愿**：ThinkAny / aiwallpaper / GPTs Works 都靠海外
4. **基础设施投入要早**：Cloudflare / Stripe / Wise 一次配通终身受益（详见下面"基础设施集"）
5. **诚信底线不能赌**：[[2024-02-23_article_idoubi_sora-ai-video-generator]] 套 Sora 名字被 OpenAI 直接 takedown，"套壳"要分清"借壳"和"碰瓷"
6. **意义焦虑会反复出现**：[[2026-04-05_article_idoubi_my-vibe-coding-projects]] 原话"做这些产品的意义在哪里"——这是顶配工具反而带来的副作用

## 反神话集（关键数字）

idoubi 系列里散落但**反主流叙事**的数字，独立开发者必须知道：

| 数字 | 出处 |
|---|---|
| ThinkAny 支付率 **0.03%** | [[2024-05-22_article_idoubi_ai-search-engine]]——"AI 搜索能赚钱"叙事的反例 |
| sora.fm 一夜爆火后被 OpenAI takedown | [[2024-02-23_article_idoubi_sora-ai-video-generator]]——套壳风险的具体代价 |
| Vibe Coding 全自动 3 个月做出 9 产品 | [[2026-04-05_article_idoubi_my-vibe-coding-projects]]——速度的反面是测试资源跟不上 |
| MCP.so 年访问 11M | [[2026-01-03_article_idoubi_my-ai-2025]]——"AI 时代的卖铲子"具体收益 |
| Claude Pro → Claude Max 顶配仍遇限频 | [[2026-01-24_article_idoubi_vibe-coding-workany]]——AI 编程的"算力税"门槛 |

## 基础设施集（独立开发者必备）

idoubi 多篇验证过的基础设施栈：

- **CDN / 部署**：Cloudflare（[[2024-08-12_article_idoubi_migrate-to-cloudflare]]）
- **支付**：Stripe（海外）+ Wise（中转）（[[2024-11-09_article_idoubi_get-paied-all-over-the-world]]）
- **AI 网关**：MCP.so（自建）+ OpenRouter
- **桌面 Agent**：Claude Code + Tauri（[[2026-01-24_article_idoubi_vibe-coding-workany]]）

**判断**：基础设施一次配通，能撑得动 9 个产品并行运营。

## 产品矩阵（已验证规模化）

idoubi 9 产品矩阵作为"AI 独立开发"规模化样本：

| 产品 | 类型 | 关键特征 |
|---|---|---|
| ThinkAny | AI 搜索 | 0.03% 支付率反例 |
| GPTs Works | GPTs 聚合 | 2023 起点 |
| sora.fm | 视频聚合 | takedown 教训 |
| 红包封面 | 节日工具 | 模板复用变现 |
| zKnown 知了阅读 | AI Native | "AI 原生"概念落地 |
| MCP.so | MCP server 索引 | 卖铲子位 |
| WorkAny | 桌面 Agent | Vibe Coding 全自动样本 |
| aiwallpaper | AI 壁纸 | 出海冷启动样本 |
| ShipAny | 模板套件 | 知识付费 + 模板 |

## 当前稳定结论

- **AI 抹平的是实现层壁垒，不是商业 / 流量 / 架构判断**——这是 idoubi 全系列最稳定的判断
- **独立开发是"产品组合"游戏而非"单点豪赌"**——3 年 9 产品，每个都不大，组合形成防御性
- **AI 时代的独立开发不是"少做事"，是"换做哪些事"**——技术变快但选品 / 渠道 / 复购更重要
- **"卖铲子"的位机会窗口短**——MCP.so 这类聚合站要早做，2024-2025 是窗口

## 与其他 topic 的对照

- **vs [[vibe-coding-path]]**：vibe-coding-path 是工具成长路径（怎么跟 AI 搭档），本 topic 是商业方法论（怎么靠 AI 谋生）。两者**互补**——同一作者两个维度
- **vs [[claude-code]]**：本 topic 是 Claude Code 实战的最强连续样本来源（idoubi 系列）
- **vs [[mcp]]**：MCP.so 是 idoubi 在 MCP 生态里的卖铲子位实例

## 反例 / 待证伪

- 全是 idoubi 一个人的样本——**单一作者偏差**。需要找更多独立开发者样本对比
- "AI 抹平技术"判断在 enterprise 项目可能不成立（合规 / 安全 / 集成壁垒还在）
- "海外 > 国内付费"——2025-2026 国内 AI 付费意愿是否在变化？wiki 缺这个角度
- # TODO 找另一个独立开发者的连续 3 年样本做对照（避免单一来源放大）

## 当前可输出方向

- "idoubi 3 年 9 产品方法论拆解"系列文章（已部分覆盖在 [[idoubi-vibecoding-journey_timeline]]）
- "AI 时代独立开发 SOP 中文版"
- "套壳的边界" 案例分析（sora.fm + 红包封面 + GPTs Works 三种"套"对比）
- "0.03% 支付率" 反神话单篇

## 相关来源

按时间倒序：

- [[2026-04-05_article_idoubi_my-vibe-coding-projects]]（9 产品矩阵 + 意义焦虑）
- [[2026-01-24_article_idoubi_vibe-coding-workany]]（WorkAny 全自动）
- [[2026-01-03_article_idoubi_my-ai-2025]]（年终 + Agent 三大件）
- [[2025-07-17_article_idoubi_my-mcp-book]]（MCP 出书）
- [[2025-07-03_article_idoubi_ai-solo-dev]]（**核心：5 步 SOP + 6 感悟**）
- [[2025-01-01_article_idoubi_my-ai-2024]]（2024 年终）
- [[2024-11-09_article_idoubi_get-paied-all-over-the-world]]（海外收付款）
- [[2024-08-12_article_idoubi_migrate-to-cloudflare]]（基础设施）
- [[2024-05-22_article_idoubi_ai-search-engine]]（**ThinkAny 0.03% 反神话**）
- [[2024-02-23_article_idoubi_sora-ai-video-generator]]（**sora.fm takedown 教训**）
- [[2024-01-30_article_idoubi_ai-cover-generator]]（红包封面）
- [[2024-01-09_article_idoubi_my-ai-course-in-2024]]（知识付费）
- [[2024-01-04_article_idoubi_my-ai-projects-in-2023]]（2023 年终）
- [[2023-12-20_article_idoubi_an-ai-native-product]]（zKnown）
- [[2023-11-24_article_idoubi_I-quit-from-tencent]]（**起点：离职腾讯**）
- [[2023-11-19_article_idoubi_my-gpts-works-project]]（GPTs Works）
- [[2023-11-10_article_idoubi_how-to-create-gpts]]（GPTs 教程）

相关 synthesis：[[idoubi-vibecoding-journey_timeline]]
