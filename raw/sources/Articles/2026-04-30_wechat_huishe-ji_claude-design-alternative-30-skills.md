---
source_type: wechat_article
source_url: https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247489658&idx=1
title: Claude Design的平替版来了！30+设计Skills，支持超 71 套设计系统
author: 萤柳
account: 会设计
publish_date: 2026-04-30
fetched_at: 2026-05-07
---

哈喽大家好，我是萤柳！

最近发现了一个Claude Design 的开源替代品，在GitHub 上的nexu-io/open-design项目，它叫Open Design。

如果用不上Claude Design，可以用这个替代。

这个工具主要在你自己的电脑上运行，也可以发布成网页使用，并且允许你使用自己的 AI/API 密钥。

这是一个开源的 AI 设计生成工具：用来生成网页、PPT、App 原型、仪表盘、文档等可预览、可导出的设计。

它提供一整套设计生成流程：

用户输入需求后，它会先弹出问题表单确认设计目标、受众、风格、品牌约束等信息；

然后选择视觉方向和设计系统；

这个工具会调用你电脑上已经安装好的 AI 编程工具，让它在本地项目里自动读取模板、写代码、生成页面或文档。

然后在网页中安全预览，并可以导出成多种文件格式，比如：HTML、PDF、PPTX、ZIP、Markdown 等格式。

链接：https://github.com/nexu-io/open-design

# 一、它能做什么

它内置了19 个 Skills，也就是不同类型的设计任务模板。例如：

网页原型

SaaS 落地页

仪表盘

定价页

文档页

博客文章

移动 App 原型

简单演示文稿

杂志风 PPT

产品需求文档

周报

会议纪要

工程运行手册

财务报告

入职计划

发票

看板

OKR 表

它还内置了71 套设计系统，每套都是 Markdown 格式的 DESIGN.md，包含颜色、字体、间距、布局、组件、动效、品牌语气、反模式等规范。生成设计时，AI 会按选中的设计系统来做，而不是完全自由发挥。

# 二、它好在哪？

这个项目强调“反 AI 味”的设计流程。它会先确认需求，再结合预设设计方向、设计系统、检查清单和自我评审流程，让生成结果更准确、更统一，也更接近真实设计师的工作方式。

核心思路可以拆成四步来看：

第一，先问问题再设计。新的设计 brief 会先让用户填写表单，确认页面类型、受众、语气、品牌上下文、规模和限制，然后再进入生成流程。

第二，风格不是瞎猜。如果没有品牌规范，它会让用户从 5 个视觉方向里选一个，例如编辑杂志风、现代极简、技术工具感、粗野主义、柔和温暖风等。

第三，结果会落成本地文件。它会在本地生成真实项目文件，方便继续编辑、交付或二次开发。

第四，技能和设计系统都可以自定义。你可以新增一个 SKILL.md 技能文件夹，也可以修改 DESIGN.md 设计系统，让它适配自己的工作流。

# 三、怎么使用？

打开Codex，让它帮忙下载。

Codex不知道怎么下载？可以看这篇：

[我用 Codex 免费打通 Figma，自动生成全套设计规范，1 分钟把UI设计稿变成网页](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488209&idx=1&sn=c2df0e8f84372aa9f11da17f2ddff800&scene=21#wechat_redirect)

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UO1z9krNMwN6kygo4prQhkLU9CTL3CDYS2sfB4o6FbrJrz6zDeNfq1NLC8HuUX4QZ2fsrkcMtHCIibCtHia91ayyekxRFoxQe4iaA/640?wx_fmt=png&from=appmsg#imgIndex=0)

因为我这里Codex突然用完了额度，所以后面转到Claude code，如何使用Claude code没看过的可以看这篇：

[Claude Code 打通 Figma 实测，2 分钟搞定产品UI界面（附保姆级安装教程）](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488151&idx=1&sn=02a4ea38279b55fe6cf70e6e95edec4d&scene=21#wechat_redirect)

我们跟Claude code说【打开这个项目的网页地址】

等待几分钟，就会发个网址给你，如下图。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UM5kE9ungAy9KvBWq5rMYvKbat7AEbMtzzh7RehW5tNlooPiauEibmicnXIGWeZSj1gLPelN6k1bVb81ATXYhYibhKU1gyibgR9bF9I/640?wx_fmt=png&from=appmsg#imgIndex=1)

【本地 CLI 】表示使用你电脑上已经安装好的命令行工具来生成内容，如果本地有的话直接点击【Get start】按钮。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UN6iakT9SibYEL8U33ibVdJJ7MUCvX969Nh0DNGP8dn9fuS4hwGhibHGIGzwyq5jw4icyYL5wuk9bw1H4pmmED5DljO5GP42RYGq9a0/640?wx_fmt=png&from=appmsg#imgIndex=2)

【人类学 API 】这个选项表示你自己提供 API 配置。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UM6G7Nb1DpFb4EzUqp5yubViapDQZd4xibO7Dhwia1Dk6cH3D2ZY38URPJOOhNbefpyAvfne3kIicCibmrtZIpenUAmVpOX9IMwFFI4/640?wx_fmt=png&from=appmsg#imgIndex=3)

## 1.示例

我们可以看到右边这里有很多【示例】。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UM04JClJC0zdCGM7vxeCNWHleHiaeQW25gDMSoJ6A46ZWrOrrK5wNNKsSib5eKqRq1fygn1JryOUGhjhuEBAJgxia0V7Pibx8wLm8Y/640?wx_fmt=png&from=appmsg#imgIndex=4)

我们可以【使用此提示】或者【打开预览】看效果。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UMHomX0aIrbyOrbHwrkkFhtGyMAj8gZtHic6WqpEicrMib9WmByf3cCzJEEDYPGzykLSJ9wzo2gQ3o0OL5BZOkfNZg5MJzGibFX3JI/640?wx_fmt=png&from=appmsg#imgIndex=5)

打开预览可以看到很多下载方式。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UPMicoERs18mXLc2RR0GYiaPRgViapibZA3dqibdKcg2Q7YmV49icIBh6a8gDhoaKJABNPFbhUeSiaAMRn4WLlI8UiauMvEicrpC9z3wAhQ/640?wx_fmt=png&from=appmsg#imgIndex=6)

## 2.设计系统

示例的右边还有71 套设计系统。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UM8GzZDneMU3rjURJCUaTTibOmUxDFRibjAOnFDtvMcXnBy66xwibqOdhSFGMwE1oUOGbwNYMwaicrCicWiaMC9sae8KEg0caicFoNcJw/640?wx_fmt=png&from=appmsg#imgIndex=7)

预览第一个爱彼迎的设计系统，都是非常全面的。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UOEB2kbU0iabHZUdsibsUr8rDKd4fwVJ7iakr8wZ8VWszPvxiaXH6EVKrDETMJwvvXyesPulrvCLibic9EvCiaStXicgmc23ChEzj9IXDc/640?wx_fmt=png&from=appmsg#imgIndex=8)

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UOyy9BtfrGfRc6icWF4Sf2NDj6wEzpaQyZkbd820hHKPSJnyr6YVY7icDG0WjmFLKyX8JHJ5akKXlFkLnxvGhfO3TibGzjqNialCb0/640?wx_fmt=png&from=appmsg#imgIndex=9)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/4ZNIrm7H9UPY0ibdVtzpvAjTUZbg17NEWFoQuQdMsfW6N5jediaL36RIOVC2VqWsMVpenTaggTUafdLOehNYTQicv0JUp46IaphMSK4SHW6Ljs/640?wx_fmt=gif&from=appmsg#imgIndex=10)

## 3.生成UI设计页面

填写原型名称【New prototype】，比如运动健身网站。

接着选择设计系统【Design systen】，根据项目选择符合网页的风格的设计系统，单选或者多选设计系统都可以。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMR01VNM23O2jElF0u0WqgbUpyvGhy5fict7iaVlFvFVJEvTkPbarK2xvhQhqSoD8z9xCyCD3FTtliaTR405ibCOzOQ6CBRxFK7ObQ/640?wx_fmt=png&from=appmsg#imgIndex=11)

选择【高保真】，点击【创建】

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMu0UwatM9obmKEXLPeZNQs6v8HZmzGMJFqfQemKl09ibXdhDluomRKQOxPmQlzrich4lHD0BqPZYgDuftmB9lOzP0AibKUClnKico/640?wx_fmt=png&from=appmsg#imgIndex=12)

输入你想要做的页面，比如我这里写的是：做一个运动健身网站首页，然后点击【发送】

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UNlI8t6hoqr8YqAnOhdHBZGuvTOr3VUhKEw7vP3LhcK3nnfdg0Y1FmKEcsw01oMeJh2Oib0lzdHsPaHKwueMD1faZ7ibhsuuAAew/640?wx_fmt=png&from=appmsg#imgIndex=13)

它会让你选择一些信息来设计。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UOKTGv1bfy5ianZkMlEBAFTlwYU9IW64EyDvnrFRicavGmgicChoWxJMFHk8LQ08Wfope2R5kg2HmmLLjOD2J9kic9GS6w255hTFfI/640?wx_fmt=png&from=appmsg#imgIndex=14)

等待一会，就能生成一个UI设计界面了。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UOL74ic0Vg3mFT8gWSE52mVL15FWuvQKaNZVLyRwAWYr479zIZTkbN0sqqVgLOKgibxktcJ7Ek0ygIA3sxmzGHcarK6aeh6CrRZw/640?wx_fmt=png&from=appmsg#imgIndex=15)

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UOLYjZcJicnTk0uNwibJuuMEEepS7Pn73zfXGGK0QU1vURlrJMFOQItcViagJ3oU6zr62z9D4uUI1mr5iadp2McpAofcy7XOTCbqnA/640?wx_fmt=png&from=appmsg#imgIndex=16)

## 4.PPT

做PPT也是一样的，选择幻灯片后创建。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UNBKO9EsF8fCJt3nSWNCXC4QcDUqJGCBLiaHYghLszdfMuSQA7dDUsXWaqx9Q1f1gichF0YmicZXh3YG7Hf9P7TgLUQh6I4y7ibZvI/640?wx_fmt=png&from=appmsg#imgIndex=17)

让它随便做一个PPT，它同样会问你一些问题，包括你要不要上传一些资料给它。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UPK5P73S9Lib6TPraiaRFlGgKOdpb7iaHtsONGwcj3naOia2ZU8b1rvibz6LSqmvT4oqMU4vdiccTfVQxtLfbDB1J4d5eibSWu1iaZshxc/640?wx_fmt=png&from=appmsg#imgIndex=18)

接着让你选择一个视觉方向，我们选择喜欢的颜色就可以了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UM4by62AUOZnkdNH9aIcv2aOCIBhiaFpv30FvxAT60aWWibjL8ib2pbia0HqWWZhXofTjaRXrYLfVL0aia3cxRfzV1gNk9KjQpVOvpk/640?wx_fmt=png&from=appmsg#imgIndex=19)

再等一会后，就会生成一个PPT了。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UNRzxic1I1IVouaMUe9zjlyicV17yhlkuEyI72SsmZAxaQ2Vpo39vA4cfR9bkicU0xx3gmYoj3iaFnDlkjN1Y7M6h8DQ2ppia5Gso3s/640?wx_fmt=png&from=appmsg#imgIndex=20)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/4ZNIrm7H9UNz7BLZ8ovuEPM5zxhbdc8gFDGNhNtDmqqINV3096I0QCbAapKTeppHribwpFWXpTb1yPuTIxjWQsHNneXUpHlTJ4YlpbFPhhFU/640?wx_fmt=gif&from=appmsg#imgIndex=21)

除了上面演示的 UI 页面和 PPT 生成，Open Design 里还有很多 Skills 可以继续探索。

比如产品需求文档、仪表盘、周报、会议纪要、财务报告、OKR 表等。

对设计师来说，它比较有价值的地方，不只是能生成页面，还能把“需求确认、风格选择、设计系统约束、文件导出”这些环节都串成了一套完整流程。

如果你平时经常需要做网页原型、产品方案、汇报 PPT 或内部文档，可以把它当成一个本地优先的 AI 设计工作台来试试。

今天的分享就到这里，希望对你有帮助！

最后，想和大家推荐一下我整理的 UI/UX 设计知识库。

里面汇总了我多年工作积累的设计规范、组件设计细节、排版指南以及 AI 辅助设计的实操案例。

如果你想系统提升自己的设计能力，想在日常工作中寻找灵感和参考，或者想了解如何更好地把 AI 工具融入设计流程。

这份知识库能为你提供很多实质性的帮助。

感兴趣的朋友可以点击下方链接了解详情，期待在知识库里与你相见👇👇👇

[永久买断！这套All in one的 UI / UX 设计知识库，可能是你今年最值的投资](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247486869&idx=2&sn=9417adbf542d49b8fa9bf4b87d042e05&scene=21#wechat_redirect)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/NGpZALUyrg4w6azKXTdW22JP3jaKQRSiaJynNmcEHbuIDqDx2J5KxAtw5TibPSuOAteGej8fQOjrhT3mJFCubDjw/640?wx_fmt=gif&from=appmsg#imgIndex=22)

拓展阅读：

[GPT Image2 搞定全套品牌方案，一键生成Logo动效+Logo品牌视觉规范！](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247489398&idx=1&sn=fc67bc809815c7453a9ee16b588d35d1&scene=21#wechat_redirect)

[我用Canva一键配色，解决了海报配色难题，配色速度比以前快了 5 倍！](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247489143&idx=1&sn=dd65145a0930e34661ecc4fb0a28918c&scene=21#wechat_redirect)

[我只花了5分钟，用AI开发了一个微信小程序！(附教程)](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488357&idx=1&sn=23c6f7f9e283c7b9a72b4a4db5670a1f&scene=21#wechat_redirect)

点赞转发推荐，祝您年薪百亿！
