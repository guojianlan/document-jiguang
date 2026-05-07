---
source_type: wechat_article
source_url: https://mp.weixin.qq.com/s/E9njjYa6Xxdhhmi72QEKRg
title: 我用GPT Images 2完成了整站UI设计 ； 并开发了完全自主决策自动化的SEO智能Agent框架
author: 熵衍AI
publish_date: 2026-05-02
fetched_at: 2026-05-07
---

# 我用GPT Images 2完成了整站UI设计 ； 并开发了完全自主决策自动化的SEO智能Agent框架

PART 01

前言

最近这段时间，我做了一件自己都觉得有点好玩的事情：用OpenAI刚发布的GPT Images 2，从零完成了一个完整企业官网的全部UI设计，然后在这个官网系统里，构建了一套完全自主决策、自我进化、7x24小时无人值守运行的SEO智能Agent框架。

目前这套系统随着我们新公司的官网CMS一起搭载上线了，Agent团队每天凌晨3点自动醒来，分析昨天的搜索数据，制定今天的优化策略，撰写文章、审核质量、提交收录、复盘效果，48小时后还会回头检查自己的决策是否正确，如果发现做错了，会自动回滚并把教训写进知识库。

整个过程没有人工干预。

这篇文章，我想把这两件事从头梳理一遍。

---

PART 02

起因：一个LOGO引发的探索

事情的起点很简单，今年4月，OpenAI发布了GPT Images 2，我第一时间拿来给我们的产品「优码云」设计LOGO，生成结果让我非常意外，最终设计出来商业级的LOGO，具备顶级的设计感，可以直接用于生产的矢量风格输出。

LOGO做完以后，我当时就在想一个问题：既然生图能力已经强到这个程度了，能不能用它来做完整的UI设计？不是出几张概念图，而是真正意义上的全链路走通，从页面布局、组件设计、矢量插图，到最终导入设计工具并还原成前端代码。

这个想法驱动我开始了一系列的实验。

从生图到设计系统：打通全链路

直接让GPT生成UI截图当然不够，UI设计的核心难点不在于画一张好看的图，而在于设计系统的一致性：颜色体系、字体规范、间距节奏、组件复用、响应式适配。这些东西光靠生图是做不到的。

我的做法是把GPT当成一个具备极强视觉理解力的设计助理，而不是一个自动出图机器，具体的工作流是这样的：

第一步，我先在对话中和GPT充分讨论设计方向，我告诉它，我们要做一个科技公司的官网，风格参考飞书这类产品的设计语言，大量留白、统一的浅蓝色背景、黑色主按钮、不要任何线框感，GPT在理解了这些约束之后，开始为每一个页面生成完整的设计稿。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO646BQxgO4UksDibNpX36JCHsVudvhXqddu0lgxfcLVU5libyhzOo7riaib6ogV6ibia06EKManFgxWvlQia05pKicHgiatib0FHuaXVoGEBg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

首页

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO64ZXoeiawravNBNtxicX8oqIMTGoz8rhm5SBs8lf5PsM0tafIXskUoyeHibUj8ibIx87YN7pMrIeVC8c81oT5drS2xGeaeriawOzX4A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

关于我们页面

第二步，全站共涉及七个核心页面：首页、关于我们、案例展示、案例详情、技术博客、博客详情、联系我们。GPT逐页生成了完整的高保真设计稿，每一页都保持了统一的设计语言。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO65m1DHG6E0OAypKZamQx0OPdwDVLGxicq8BznsjOrZLewsVibicw0vbIcogZokG9jaxicVU76hiaTGtKTaVfPZMpfhlCzT030jomlwo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

案例展示页设计

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO64YX9dqSZ8eOOJNaPBBt2WQFZ74Yh2zrFvxHILsibPByEQHwFKgH2KSOhwCS8vTCc9wDFGxMpfBZiaCmwtvalxehYLwicGGQbtnhE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

案例详情页设计

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO65Ya1FaxTJDia2myibsbIvsymSKh3c1nN6j8iayUeF0fibzumgH0h2ZKqoDL6qpSCV8icWAFEbjOPE6UAZ8iaP6BqKT971ObPViaafFwo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

技术博客列表页设计

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO67zBCs2mnvH17VXSpwv4Tica1n4b8icKEUqvlw0JzakwYbL3hG9kVlv3uYA4Mnero2PEJEbXCUWTJqpACZ15iblellAZ1W0ds1RD0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

博客详情页设计

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO67YFQicKkwWibFde7NMJkNNSBLjTBLqBMRxzRfmcsrcjqBnkQfd5dhAtSoicPjHqt5sIiaHtzQIxQm4Sn0ZvN9bXUqsUianju3uB3iag/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

联系我们页面设计

矢量插图：AI生图真正的杀手级应用

页面布局搞定之后，还有一个环节是传统设计流程中非常耗时的：矢量场景插图，官网的每个页面英雄区都需要一张高质量的3D等距风格主视觉，用来传达页面的核心信息。

过去这类插图要么找素材网站购买，要么找插画师定制，成本高且周期长，而GPT Images 2在这个场景下表现得极为出色，我把每个页面的主题描述给它，它生成的等距风格矢量插图，玻璃质感透明方块、云平台架构图、数据流动的线条，视觉完成度非常高，且风格高度统一。

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO66NraCjGDA8uq97EL2bdTZnibB3tNXcpOgJ4EC0sZlwoGAic0xeZdia2voibZol67et5whUjocjQlPvLibJRjLE094Cq5EfOR85OQYg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

在ChatGPT中生成全站各页面的矢量场景插图

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO65yQRx4r8OINOgyRlgMNonbP9hyMASJkYsouqQOSl6wsrkiaNS2kxq63BPPDdYhx0DzZ01ukhiaJPAjK4y18AGcxShR6okbboWLA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

联系我们页面的矢量主视觉生成

关键桥梁：GPT内置Figma应用

设计稿生成之后，最关键的问题是如何把它们落地，直接截图给前端开发显然太粗糙，这里我发现了一个很多人可能还不知道的功能：GPT内置了Figma应用。

通过GPT自带的Figma连接器，我可以直接把GPT生成的UI设计导出到Figma中。在Figma里，设计稿变成了可编辑的矢量图层，我可以进一步调整间距、对齐、颜色变量，然后通过Figma的开发者模式导出精确的CSS数值和组件结构，最终还原到React代码中。

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO67XaQuJtSGMSWzf2Xh3k7HlBAibsxTj5jhJ9okiapecu980OwD48oJKhbZGhHXj9bpAOyOO7fW19L3pibWZ5gqhD4noSbVd1oibhIc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

GPT内置的Figma应用，支持将设计直接导入Figma

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO66N8N7iaKMR6r0Wd7aFkPcB7E7KGUY8yF21lAZcr7Q7SNqZCA0IkPyibNhskzGv0PzkcAZuXPtxJMLKjAGDib3bAiaaPhtRiblw49f0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

全站所有页面设计稿已导入Figma，包含完整的图层结构

这条路径的意义在于，它第一次真正打通了AI生成设计 -> 专业设计工具-> 前端代码 的全链路，不只是玩具，是可以实际用于生产的工作流。

最终成品：从设计到上线

经过Figma中的精调和前端工程师的代码还原，由于我更喜欢黑白灰的设计风格，做了一些细节调整，最终上线的网站效果如下，整站采用了Blue-White 3D Tech的设计语言，所有颜色通过CSS自定义属性管理，字体使用Inter + Noto Sans SC + JetBrains Mono的组合，图标全部来自lucide-react，保证了视觉系统的一致性和可维护性。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO67LU9JUrB8nwCh0iaTSq5YMPIgb9fcKpkFyH50PK8N43y8YU2anLicKgngtt60z1RZqMLHOibAawSkUUoQ7adch4lL2oFGibCbTy7s/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

上线后的首页效果

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO67EEsOf8YbeD6oM9z0wwJUryIBicrJ0TuUh5ZJ1rgcgBD3PsALf96yU0YLps6EjibCbibBibu9TMsGS5x0Gcz3mbphdDzpm8qadEzI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

服务能力展示区域

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO65qzr2ePHsZYU6u696aibK6FzQcRQhTtBLicfkCtgHib9MRzq1cUVxdtk5qnbddqoHGdlFlwue4LGfKccTkpqGAp6NnT7Kx009BLA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=13)

五步走通方法论区域

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO65v9grTEsGOVThru3Ia1vNrnFZLsSMXg7J4CpzBpiaPWgaF1UbxRmeYKjK1zDVN56M7qFB2how5ianZfA3Nb6sncVeMRteVAAlvg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=14)

关于我们页面

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO67aoIhYLrogvde7jGYdnFVGjiczppZHriaicom46GALQWgz6hJsDlfNWLIU7QK4qZ7wNVfVvz5cicb4KEwSeEuLPJK7ZeialmEV9GYU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=15)

案例展示页面

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO65BRTk6y0OB9pZ97XvRsPZrUHA7pFYNwbRENRycKoY5vY9RxQk1m4iaHfltxQp8FPNibMsiaqzgicVyIXG6Gm3Rwju7uib0kFUV8Yps/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

技术博客页面

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO67xAc9xiarEMMar0lWE4y9Hyx900zM84eoJtGEibqxFvMmoADHhBIibAhhujG1T8RrMsjCwyY8xYRpXYQbgVjgpjqNUR1L1bhTFK4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

联系我们页面

---

PART 03

真正的重头戏：SEO智能Agent框架

如果说用GPT完成UI设计是一次有趣的探索，那么接下来要讲的SEO Agent框架，才是这个项目真正的技术内核。

我们构建了一个完整的多角色AI Agent团队，它不是一个需要人类下指令才能干活的工具，而是一个具备完整感知-规划-执行-反思闭环的自治系统。

六角色Agent团队：各司其职的SEO专家

整个Agent团队由六个专业角色组成，每个角色拥有独立的职责边界、专属的工具集合和差异化的模型配置：

- Strategist（策略师）：团队的总指挥，拥有近150+个工具的最大权限集，负责分析全局KPI数据、制定优化策略、分配任务，使用最强推理能力的主力模型。

- Writer（撰稿师）：负责撰写800-1500字的SEO/GEO优化文章，路由到成本更低但写作能力优秀的二号模型，避免主力模型被长文生成任务占用。

- Auditor（审核师）：基于7个维度的质量矩阵对每篇内容进行严格审核，维度包括事实准确性、关键词覆盖度、文章结构、GEO友好性、品牌调性、E-E-A-T合规性和SEO完整性。

- Pusher（推送员）：唯一不需要LLM的角色，直接通过IndexNow、Bing和百度的API提交URL收录请求，确保新内容第一时间被搜索引擎发现。

- Analyst（分析师）：专注于数值推理，分析搜索指标的变化趋势，将排名更新写回目标看板。

- HomeOptimizer（首页优化师）：专门负责首页的on-page SEO优化，首页因为爆炸半径最大被单独隔离，避免其他角色的操作意外影响核心页面的排名。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO65iad3bV7EbeiajEaiatIAscAEXn5QaNU8tMicg8AXbY6NVj6NuFS1J0iahMV8tnXcudWCMPqnGwBBBl90TZocC2Hy2FySmY3pxsLvI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=18)

SEO控制台：关键词目标看板与实时排名追踪

OODA决策循环：感知-规划-执行-反思

Agent团队的核心运转逻辑借鉴了军事决策理论中的OODA循环（Observe-Orient-Decide-Act），并在此基础上增加了反思层，形成了完整的OODRA闭环。

Sense（感知）

每个决策周期开始时，Orchestrator会拉取过去7天的搜索指标快照，包括展示量、点击量、平均排名位置、独立查询词数量以及弱势关键词列表，同时读取内容管理系统中的草稿和已发布文章数量，获取全局内容状态。

Recall（检索）

这一步是系统自我进化的关键，Orchestrator会将当前的KPI数据和排名前3的关键词差距拼接为查询向量，通过双存储混合RAG系统在历史决策反思中进行语义检索。系统从两个向量库中并行检索：一个存储Orchestrator的历史周期日志，使用1536维向量；另一个存储经过人工审核的策略手册和反面教材，使用BGE-M3模型的1024维向量。两个库的结果按相似度分数合并、去重、排序后，为本次决策提供历史经验参考。

Plan（规划）

规划阶段的核心设计理念是：确定性兜底 + LLM增强，系统首先运行一个纯确定性的任务规划函数，这个函数不依赖数据库也不调用LLM，完全基于规则和启发式算法选择1-4个任务。规划依据的核心公式是关键词优先级评分：

`PriorityScore = Gap x Priority x IntentWeight`

其中Gap衡量当前排名与目标排名之间的差距（未上榜的关键词以目标排名+30作为惩罚值），Priority是管理员赋予的1-10权重，IntentWeight是基于搜索意图的加权系数：交易型意图为1.5倍，商业调研型为1.3倍，信息型为1.0倍，导航型为0.7倍。这个加权设计反映了一个经验事实：交易型关键词每提升一个排名位置带来的线索转化价值，大约是信息型关键词的5倍。

Act（执行）

Dispatcher按照严格的串行顺序执行任务队列，串行而非并行的设计是刻意的，目的是避免多个Agent同时写入同一行数据库记录导致的竞态条件。底层使用PostgreSQL的FOR UPDATE SKIP LOCKED机制保证并发安全，每个Agent在运行时被限制在一个有界的工具调用循环内，最多迭代20轮，配合提供者级别的fallback链实现容错：主模型5xx或429错误时自动切换到备选模型，确保任务不会因为单一供应商的临时故障而失败。

Reflect（反思）

每次决策周期结束后，Orchestrator会写入一条反思记录，包含本次的KPI快照、执行的任务列表、引用的历史反思ID和策略推理文本。这条记录会被嵌入向量化，成为未来决策的检索素材，形成真正的经验积累。

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO65Mv8qO0x4EzMnbFXjokS5iaxoW9WyRaV8FMnQDVn9JWeBzKZdN6JmAoMicqAPibNpW7unA1aey02BkekicEIm2FfMCfPfkNVHHJU8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

SEO大屏：实时展示Agent团队的KPI和任务执行状态

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO65gHfiadu2ic42oSS238PjAa6HiaNyzo5X8G8OichKVQRkkXRCYWk0I5y99KDNweehF2b4rWZhmU4WibxkZYpm3p2PF4MOwq4ZCvxMo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=20)

任务时间线：每个Agent角色的执行记录

48小时延迟反馈：系统如何自我进化

这是整个框架中我最满意的设计。

搜索引擎优化有一个天然的特点：效果不是即时的。你今天修改了一篇文章的Title和Description，搜索引擎可能需要24-72小时才能重新抓取和更新排名，大多数SEO工具选择忽略这个延迟，而我们的系统专门为此设计了一个48小时延迟反馈机制。

ReflectionPass每小时运行一次，扫描48到72小时前完成的任务，计算任务执行前后各7天的搜索指标窗口，然后将效果分类为四个等级：improved（排名提升>=0.8位或点击率增长>=15%）、flat、declined、unknown。每条分类结果会附带可操作的洞察，比如「improved -- 下次优先复用这个策略」或「declined -- 规避这个方向，尝试不同角度」。

这些反思记录被嵌入向量化后存入知识库，当未来的Orchestrator运行Recall阶段时，就能检索到这些经验教训，真正实现了闭环学习：执行 -> 观察延迟效果 -> 写入反思 -> 向量化存储 -> 未来检索并调整策略 -> 执行新方案。

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO64AFH4XdyX7MWSEYHLXjVPibDd0a4RhfnLPwK6WrpX0YsMW5icic61Fibib0QVA6y5LB5YlrAozhR803h9SdeabnhTicRfGDkCM4Exf8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=21)

SEO大脑：Agent团队的决策推理与KPI反思时间线

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO64rNGXnhGqlIMQmrQgalAIHS4SBOC5icXLFr2ulatT7WMSAgT9CibIibNPgS3IGS256nhRDUvPVVlBWzZnCu5SuzOYicngKqragyv8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

SEO大脑决策日志：每条决策的详细推理过程和引用的历史经验

三层安全防护：自主不等于失控

让AI系统完全自主运行，最大的担忧是安全，我设计了三层纵深防护，确保自主性不等于失控。

1. 第一层：前置质量门禁。每次Agent写入内容前，系统会运行一个26项检测字典，检查AI套话（如「在当今这个快速发展的时代」）、关键词堆砌（密度超过2.5%触发告警）、内容重复（6-gram重复率超过5%阻断）、标题党检测、结构完整性检查（是否包含H2标题、数字、段落），检测结果分为block（直接阻止写入）和warn（允许但记录）两级。
2. 第二层：运行后自治决策引擎。Agent执行结束后，自治决策引擎对整次运行进行综合评估，输出三种裁决：accepted（通过）、quarantined（隔离观察）、auto_rollback（自动回滚），当风险评分达到50分或以上时触发自动回滚，如果24小时内累计出现3次事故，系统会自动暂停整个Agent团队的自主权限12小时，强制人工介入。
3. 第三层：7天效果回溯。即使内容通过了前两层检查并成功发布，系统会在7天后再次回溯评估。它比较每篇被修改的文章在修改前后的搜索指标变化，如果发现效果为负面（点击量和展示量同时下降，或排名恶化超过1个位置），系统会自动回滚到修改前的版本，并将这次失败的经验写入知识库。

智能模型路由：成本与能力的最优解

六个Agent角色对模型能力的需求差异很大，策略师和审核师需要最强的推理能力，撰稿师需要优秀的写作能力但token消耗最大，分析师只需要基础的数值推理。如果所有角色都用同一个顶级模型，成本会非常高且造成浪费。

我们的ModelRouter每个角色配置了独立的模型路由策略，每个AgentBinding指定一个FallbackIndex参数：-1表示使用主力模型（用于策略师和审核师），0表示使用第一备选模型作为首选（用于撰稿师），1表示使用第二备选（用于分析师）。无论首选是什么，原始主力模型始终被追加为最终兜底，确保所有角色在极端情况下都能获得最强模型的支持。

双存储混合RAG：不只是向量搜索

RAG（检索增强生成）系统采用了双存储并行检索架构，这个设计的考量是：不同来源的知识对embedding维度和相似度阈值的需求不同。

第一个存储是seo*reflections，使用1536维向量，存储Orchestrator每个决策周期的反思日志和48小时后的效果回溯记录。第二个存储是team*knowledge_base，使用BGE-M3模型生成的1024维向量，存储经过人工审核的SEO策略手册和反面教材。

同一个查询会被分别嵌入为两种维度的向量，在两个存储中并行执行pgvector余弦相似度搜索，结果按分数合并去重。默认相似度阈值设定为0.55（偏召回），当知识库积累超过100条记录时自动收紧到0.70（偏精确），避免噪声干扰决策。当向量检索完全无果时，系统还会降级到PostgreSQL的三元组模糊搜索，确保Strategist永远不会在没有任何历史参考的情况下做出决策。

---

PART 04

技术栈与架构概览

![](https://mmbiz.qpic.cn/mmbiz_png/hv8ic6sYzO66T9wrBCWavhbibYVxexPZSLE0HnsI6smV7Kmm1gfDLcgHkbq2yIzNj94dfKUXjUVx1Vhteh3k5J0XcgryBCId7amb2K3tEY1wE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=23)

最后简单梳理一下整个系统的技术栈，前端使用Next.js 15 + React 19 + TypeScript，采用App Router架构，服务端渲染保证SEO友好，后端使用Go 1.23 + Gin + pgx，数据库为PostgreSQL 16配合pgvector扩展实现向量检索，Agent运行时使用OpenAI兼容协议的Chat API，支持多供应商fallback，向量嵌入默认使用SiliconFlow的BGE-M3模型（1024维），同时支持重排序（BGE-reranker-v2-m3交叉编码器），定时调度基于robfig/cron，配合互斥锁防止任务重叠。

前后端之间通过Next.js的API代理路由衔接，浏览器只与Next.js通信，所有到Go API的请求经由/backend/*代理转发，保证Cookie同源，管理后台的每一个写操作都会写入audit_logs审计表，确保所有变更可追溯。

---

PART 05

写在最后

![](https://mmbiz.qpic.cn/sz_mmbiz_png/hv8ic6sYzO65tpwhyqTjY9FaotB2cBqcQ0OCReaIQiazuv8WWUaia36iaxibcyULqIUnyQQu8CnEspso7HyrFGVFicMDJIic7ZD7ZtyBBG7qvspRSY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

回头看这个项目，有两件事让我感触很深。

第一，AI在设计领域的能力已经到了一个临界点，GPT Images 2生成的UI设计稿，不只是能用的水平了，是达到了好用并可当生产力的水平，当然，它不能替代资深设计师的审美判断和用户研究，但它可以把设计流程中大量机械性的工作压缩到极致，一个懂设计语言的工程师，现在可以用AI完成过去需要设计团队一两周才能交付的工作量。

第二，Agent系统让AI做事、让AI学会从错误中学习，我的48小时延迟反馈机制和三层安全防护，本质上是在解决一个控制论问题：如何在给予系统充分自主权的同时，保证它的行为不会偏离预期的收敛轨道，这个问题没有完美的理论解，但工程上可以通过多层反馈回路和安全阈值来逼近一个可接受的解。

如果你也在思考如何将AI Agent应用到实际业务中，希望这篇文章能给你一些启发。真正的难点从来不是调用一个API，而是构建一个能够持续自主运行、自我纠偏、不断进化的系统。

以上就是我们在优码云这个项目上的完整实践，欢迎交流探讨。

以下是我们的官网地址：

https://www.umayun.com
