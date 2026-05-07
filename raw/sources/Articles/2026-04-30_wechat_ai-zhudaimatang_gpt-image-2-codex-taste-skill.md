---
source_type: wechat_article
source_url: https://mp.weixin.qq.com/s/ULYI_maFBCpcWrXkE4DD8Q
title: GPT image 2 + Codex 强强联合：一键搭建高端网站！这个 Taste-Skill 项目太强了
author: AI煮代码汤
publish_date: 2026-04-30
fetched_at: 2026-05-07
---

# GPT image 2 + Codex 强强联合：一键搭建高端网站！这个 Taste-Skill 项目太强了

🌟星标+👆关注，带给你更多有意思的github项目

直接用 GPT Image 2 先生成高质量设计图，再让 Codex 分析图像、精准还原代码，这种“`生成图片，Codex 分析，Codex 构建网站`”的流程，能让 AI 生成的网站瞬间从“模板味”变成“产品级”。

这个完整高效的工作流，被完美封装成了一个开源神器 —— Taste-Skill。这个项目彻底解决了 AI 生成前端界面品位不足、视觉平庸的问题，让你用几句话就能做出布局高级、排版舒服、细节精致的网页。

GitHub 仓库：`https://github.com/Leonxlnx/taste-skill`

这篇文章我会按以下顺序来介绍：

- 使用效果：先看它生成出来的页面到底怎么样。

- 核心优势：再看它为什么能解决 AI 前端的“模板味”。

- Skills 一览：接着介绍一下仓库里的技能包

- 安装使用教程：最后给出安装命令和关键提示词。

## 使用效果

官方给出的效果图很棒

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/iaNqLNrWSicIoEFRmPHicHKFSHrly1mia9xFbLNvJiaEibicH001L0GhHkibkCBapeYI5nFMD9W4jdIV8xAPLZ3jz3RQgicMHBNyicsLEialWHzzCrVQP0/640?wx_fmt=png&from=appmsg#imgIndex=0)

我用它生成了一个猫咖网站，出来的效果确实比普通一句话生成的网站舒服不少：页面更有层次，视觉更统一，也更像一个真实品牌页面，而不是临时拼出来的 Demo👍

                                                                  
![](https://mp.weixin.qq.com/s/ULYI_maFBCpcWrXkE4DD8Q)
                                                     已关注

                   **                 

             

                            Follow

           

                                       **               Replay                                         **               Share                                                      **               Like                                     

         

                                             

     

     Close**

**观看更多**

更多**

**

**

**

*退出全屏*

[**](javascript:;)

*切换到竖屏全屏**退出全屏*AI煮代码汤已关注

[**](javascript:;)

Share Video

**，时长00:26

0/0

00:00/00:26

 切换到横屏模式 

继续播放

进度条，百分之0

**

[Play](javascript:;)

00:00

/00:26

00:26

[倍速](javascript:;)

*全屏*

** 倍速播放中 

[ 0.5倍 ](javascript:;)[ 0.75倍 ](javascript:;)[ 1.0倍 ](javascript:;)[ 1.5倍 ](javascript:;)[ 2.0倍 ](javascript:;)

[ 超清 ](javascript:;)[ 流畅 ](javascript:;)

 Your browser does not support video tags 

**

继续观看

 GPT image 2 + Codex 强强联合：一键搭建高端网站！这个 Taste-Skill 项目太强了 

观看更多**

转载

,

GPT image 2 + Codex 强强联合：一键搭建高端网站！这个 Taste-Skill 项目太强了

**

AI煮代码汤已关注

Share点赞Wow

****Added to Top Stories[Enter comment](javascript:;)

**

   

                     [         Video Details       ](javascript:;)     

   

 

## 核心优势

传统用法里，你可能会直接对 Codex 说：

> 给我做一个干净的猫咖网站。
> 
> 

Codex 往往能做出来。页面能打开，布局也完整，按钮、标题、图片区域都有。但问题是，它大概率看起来像“AI 默认模板”：能用，但不够有质感。

Taste-Skill 的新玩法，是把流程拆成三步：

- 先用 GPT Image 2 生成专业级网站设计图。

- 再让 Codex 仔细分析图像里的布局、字体、间距、配色和交互。

- 最后输出 HTML、CSS、JS，或者适配 React、Vue、Svelte 等框架。

这套流程的价值在于：

- 页面不再完全依赖文字提示词想象。

- 视觉目标更明确，减少“模板味”。

- 布局、排版、色彩这些细节更容易被保留下来。

- 最终结果更接近真实产品级界面。

## Skills 一览

这个仓库不是只有一个技能，而是一整套前端生成工具箱。

代码输出类：

- taste-skill：默认全能技能，适合大多数场景。不锁定单一风格，提供高端前端输出，平衡美观与实用性。

- gpt-taste：针对 GPT / Codex 优化的激进版本，更偏现代视觉和动效。如果你想要更强的视觉冲击力，可以试这个。

- image-to-code-skill：图像优先流水线技能。先让AI生成网站参考图像，分析图像后，再精确实现匹配的前端代码。这是整个项目最核心的“图像转代码”技能。

- redesign-skill：重构升级技能。适合改造已有项目，先审计当前UI的问题（布局、间距、层级、样式等），再针对性优化提升，而非从零重写。

- minimalist-skill：极简主义风格。受Notion、Linear启发，强调留白、克制配色、清晰结构，适合编辑类产品界面。

- soft-skill：柔和高级风格。营造平静、昂贵感，使用柔和对比、大面积留白、高级字体和弹簧物理动效，适合需要优雅气质的品牌。

- brutalist-skill：实验性更强，偏粗暴风格、高对比、瑞士字体，适合想做点不一样的项目。

- output-skill：输出完整性技能。防止AI输出半成品或占位符，确保生成完整的代码。

- stitch-skill：兼容Google Stitch的技能，支持导出DESIGN.md格式的设计系统文件。

图像生成类：

- **imagegen-frontend-web**：生成桌面端网站设计稿。

- **imagegen-frontend-mobile**：生成移动端界面。

- **brandkit**：生成品牌视觉套件，包括配色方案、字体应用和 Logo 方向等品牌身份素材。

## 安装使用

1. 一键安装所有技能

```
`npx skills add https://github.com/Leonxlnx/taste-skill
`
```

2. 安装单个技能

```
`npx skills add https://github.com/Leonxlnx/taste-skill --skill "imagegen-frontend-mobile"
`
```

3. 手动加载方式

- 进入仓库的`skill`文件夹，找到对应技能的`SKILL.md`文件；

- 直接复制整个内容，粘贴到ChatGPT、Codex、Cursor、Claude Code等AI对话中即可使用。

4. 关键使用提示词

> 使用taste-skill等相关技能，做一个专业的猫咖网站。要求严格遵守先生成图片，然后分析，然后生成代码的顺序。
> 
> 

5. 参数调节（仅 taste-skill 支持）

属性

说明

说明(1-10)

`DESIGN_VARIANCE`设计变化度

低=居中干净，高=不对称现代

`MOTION_INTENSITY`动效强度

低=简单悬停，高=复杂滚动/磁吸动效

`VISUAL_DENSITY`视觉密度

低=留白多，高=信息密集如仪表盘

> 使用 taste-skill，DESIGN_VARIANCE 设为 9（更现代不对称），MOTION_INTENSITY 设为 8（强动效），VISUAL_DENSITY 设为 2（大留白）
> 
> 

## 写在最后

GPT Image 2、Codex 和 Taste-Skill 组合在一起，真正有意思的地方，是它把 AI 前端生成的流程，从“直接写代码”改成了“先建立审美目标，再用代码还原目标”。

这一步看似简单，其实很关键。因为很多网站不好看，并不是缺组件，也不是缺 CSS 技巧，而是从一开始就没有一个清晰的视觉目标。Taste-Skill 给 AI 补上的，正是这个目标。

如果你经常用 Codex 做网页、原型、落地页，这个项目值得试一下。你最想用它生成哪类网站？咖啡店、SaaS 工具、个人主页，还是一个你一直想做但懒得开头的小产品？欢迎在评论区留言讨论。

往期回顾

[有意思的github项目](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU0Nzg5NTc0NQ==&action=getalbum&album_id=4476374240656785408#wechat_redirect)

[AI 新鲜事](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU0Nzg5NTc0NQ==&action=getalbum&album_id=4476376783680077835#wechat_redirect)
