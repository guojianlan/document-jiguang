---
source_type: wechat_article
source_url: https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488739&idx=1
title: Figma 终于出了官方 MCP！无缝接入 Cursor / Codex，一键还原设计稿
author: 萤柳
account: 会设计
publish_date: 2026-03-25
fetched_at: 2026-05-07
---

哈喽大家好，我是萤柳！

今天 Figma 官方终于宣布了可以使用 AI 代理直接在 Figma 画布上进行设计的更新。

但关注我的老粉都知道，其实早在官方发公告前，我就已经带大家提前享受过这个底层接口了！

没看过的朋友可以看这两篇：

[我用 Codex 免费打通 Figma，自动生成全套设计规范，1 分钟把UI设计稿变成网页](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488209&idx=1&sn=c2df0e8f84372aa9f11da17f2ddff800&scene=21#wechat_redirect)

[Claude Code 打通 Figma 实测，2 分钟搞定产品UI界面（附保姆级安装教程）](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488151&idx=1&sn=02a4ea38279b55fe6cf70e6e95edec4d&scene=21#wechat_redirect)

今天这篇，不敲黑框框命令行，也不改底层配置文件。

带大家体验一下，官方原生加持下的 Cursor 接入（其他工具也一样）

如果看过前面两篇的操作，不用原生Cursor或者VS code 可以不用看这篇，操作差不多是一样的。

都是可以一键设计稿转代码、自动提取设计规范、读取设计规范生成UI等操作。

可以先来看下官方视频：

![]()

已关注

Follow

ReplayShareLike

Close

**观看更多**

更多

*退出全屏*

萤柳设计已关注

Share Video

，时长00:37

0/0

00:00/00:37

切换到横屏模式

继续播放

进度条，百分之0

[Play](javascript:;)

00:00

00:37

00:37

[倍速](javascript:;)

*全屏*

倍速播放中

[0.5倍](javascript:;)[0.75倍](javascript:;)[1.0倍](javascript:;)[1.5倍](javascript:;)[2.0倍](javascript:;)

[超清](javascript:;)[流畅](javascript:;)

继续观看

Figma 终于出了官方 MCP！无缝接入 Cursor / Codex，一键还原设计稿！

观看更多

转载

,

Figma 终于出了官方 MCP！无缝接入 Cursor / Codex，一键还原设计稿！

萤柳设计已关注

Share点赞Wow

Added to Top Stories[Enter comment](javascript:;)

[Video Details](javascript:;)

*切换到竖屏全屏**退出全屏*/ Your browser does not support video tags

话不多说，直接上教程！

# 一、 开启 Figma MCP

打开 Figma 任意文件，按快捷键 Shift + D 切换到Dev Mode（开发者模式）

或者直接点击底部的开发者模式按钮，如下图。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UP731w9s1gPXGlibOQK9PkU0y9t8noqibUcc23Ly9XA7cib7iaUS7JrHG93fv3WQoGEyBbqPqQcGVxqZbNbArBLia6bEauicn9YASiaKo/640?wx_fmt=png&from=appmsg#imgIndex=0)

找到崭新的MCP区域，点击【+】按钮，点击【Cursor】或者你想用 VS Xode 等工具都可以，再点击【+Add】

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UN8NoHOJDyNCZ4zvhHQKaMibkefEax1HODkyreJenicj0XYg7BgekYwMK1JIMpxia1p4zUZRdq2hgEOwud8meC6GpW6zqx6YvVlyo/640?wx_fmt=png&from=appmsg#imgIndex=1)

# 二、Cursor连接Figma

点击 Install 安装，如下图

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UPVL8vF4l1jE5iaHE5tsJK6lz7bCRoMAK6BteDnMIaNa4g6nAIDibVqUkAicm7dNE5NcLIJv0Uzia7FajOk9mg7YehaJSnvJVey4Mk/640?wx_fmt=png&from=appmsg#imgIndex=2)

点击【Connect】连接。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UMSBchjGIWqicAwDeDOtmfoBa0icbGd78iadxCK8H1AelPhx6QMpibh9yftFZO1BR8MQyIMm5VdibL4UTWTibpjxY6xzEuaNuexicVWgY/640?wx_fmt=png&from=appmsg#imgIndex=3)

它会在浏览器弹出页面，点击 【Agree ＆Allow Access】身份验证。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UPNl6AC3xyPKQ2Hv18YYkicKvfxSga4yFWXNfaJkPGlyQWxeJ4sB8oqicVwUr5ZOKOyLmokkQyatF9JC5oPibYkPz3FoSgTSnZEzw/640?wx_fmt=png&from=appmsg#imgIndex=4)

在Cursor里看到Figma有个绿点说明成功了！重启一下Cursor就可以了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMBfrDmn6rxwBcUaX9Q7ypHk78YXKbZhURKbkVPzbZEEaxa79iaotRAU7daFJiaHk2kkeTVcibgX9cCTQO7MgSuJic2z0JYdLfAjfI/640?wx_fmt=png&from=appmsg#imgIndex=5)

继续回到figm文件中，点击右上角的【share】，再点击【copy link】复制这个文件链接。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UNndk6WuicA8ABtPFxIw7zib9NDicicNy26tTYqusyRtialMmibDxLR5jrI3XpqrGyK9EqMIZBfQmXeklRCvg3WHv3tIqyYncwg1kujE/640?wx_fmt=png&from=appmsg#imgIndex=6)

把刚刚复制的figma链接，粘贴到Cursor的New Chat中，，它会弹出Figma，点击它。

选择【Add for Myself】这样以后你不管在这个电脑上新建什么项目，AI 都能直接连 Figma，不用每次都装。

再点击【Add Plugin】就可以了。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UPv6HN8WibJKCGRq2icZ2Mw0eCVYvtyg3ctUnCuRKicrstpV590LhrzTdL3Yv6KmOLCRVKbS4DjlUdh96Vs4uXxNn08NmJaxWtDHw/640?wx_fmt=png&from=appmsg#imgIndex=7)

点击在聊天中尝试【Try in Chat】

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UP22LUxo1tMoQ0tIA7q7Ej6tnASoq398PVEYcQriaR96Sjb4Bjiaw5jSDBjbRvmiaucgjBicEPcvIEZlgLdlmTf5bd26EEhb63pxag/640?wx_fmt=png&from=appmsg#imgIndex=8)

然后大概率会出现【Run】这个按钮，但是你先别急着点它。

你点一下那个灰色按钮【Allowlist MCP Tool】。

它的意思是把这个工具加入白名单。

以后 AI 看到 Figma 链接，就会自动去拉取数据，再也不会弹这个框烦你让你点【Run】了，主打一个全自动！

![Image](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UOiceprQjQicEbLA43npUrqTLVSwUj9PoF9xGKvicDxZJNOXc0JjEtjKlPf8TbGF534TdiceWwFSo8DiaLXQ6WqDibJmYGc96dE46NII/640?wx_fmt=png&from=appmsg#imgIndex=9)

等它跑完后，我们就可以让它还原设计稿写代码了。

因为我这里没有在Cursor上面充值，所以后面就不演示了。

方法跟之前我写的这两篇差不多的：

[我用 Codex 免费打通 Figma，自动生成全套设计规范，1 分钟把UI设计稿变成网页](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488209&idx=1&sn=c2df0e8f84372aa9f11da17f2ddff800&scene=21#wechat_redirect)

[Claude Code 打通 Figma 实测，2 分钟搞定产品UI界面（附保姆级安装教程）](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488151&idx=1&sn=02a4ea38279b55fe6cf70e6e95edec4d&scene=21#wechat_redirect)

都是可以一键设计稿转代码、自动提取设计规范、读取设计规范生成UI等操作。

今天的分享就到这里，希望对你有帮助！

如果你在日常的设计工作中，也想更系统地提升自己的专业技能

学习如何将前沿的 AI 工具融入实际工作流，欢迎订阅我整理的《UI/UX 设计知识库》

在这里，我汇集了多年的行业实战经验

涵盖了从基础设计规范到高阶技巧、从主流软件教学到 AI 提效工具的详细指南。

点击下方链接即可了解详情👇👇👇

[永久买断！这套All in one的 UI / UX 设计知识库，可能是你今年最值的投资](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247486869&idx=2&sn=9417adbf542d49b8fa9bf4b87d042e05&scene=21#wechat_redirect)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/NGpZALUyrg4w6azKXTdW22JP3jaKQRSiaJynNmcEHbuIDqDx2J5KxAtw5TibPSuOAteGej8fQOjrhT3mJFCubDjw/640?wx_fmt=gif&from=appmsg#imgIndex=10)

拓展阅读：

[爆火的 Vibe Coding 怎么玩？Claude Code 狂飙模式+自动测试实操，不懂代码的设计师必看！](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488356&idx=1&sn=4dc032f1bb21783ae12d327555aabd09&scene=21#wechat_redirect)

[全网最简单的 OpenClaw 白嫖攻略：无需服务器一键“养虾”，免费百万 Token，0门槛部署](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488327&idx=1&sn=3aa3e3260bf1330ec10f7cba990e2f24&scene=21#wechat_redirect)

[我只花了5分钟，用AI开发了一个微信小程序！(附教程)](https://mp.weixin.qq.com/s?__biz=MzIxMDQxMDkxNA==&mid=2247488357&idx=1&sn=23c6f7f9e283c7b9a72b4a4db5670a1f&scene=21#wechat_redirect)

点赞转发推荐，祝您年薪亿万！
