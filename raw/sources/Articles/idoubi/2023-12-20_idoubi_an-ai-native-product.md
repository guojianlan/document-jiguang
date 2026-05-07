Title: 艾逗笔 - 独立开发者、全栈工程师

URL Source: https://idoubi.ai/blog/an-ai-native-product

Markdown Content:
给大家介绍一下知了 zKnown 这款产品。👇

知了 zKnown 是一款 AI-Native 构建的，致力于信息降噪 / 阅读提效的个人知识助手产品。

之前的产品名称叫“知了阅读”，我们从文章摘要的功能切入，用 AI 的方式，快速总结文章的关键信息，帮助用户做读前筛选，提高阅读效率。

在后续的产品迭代中，我们支持了多模态内容输入和语意化检索等功能，产品定位也从最初的“阅读提效工具”转变成了现在的“个人知识助手”。

我们进行了品牌升级，从“知了阅读”进化到了“知了 zKnown”，也启用了新的 Logo。

![Image 1: logo](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/zknown-logo.png)

知了 zKnown 目前包含“智能摘要 + 内容剪藏 + 语意化检索”三大核心功能。

1.   智能摘要

知了 zKnown 利用 AI 大模型的总结归纳能力，使用 Prompt Engineering 技巧，为用户输入的内容快速生成摘要，帮助用户做读前筛选，提高阅读效率。

摘要输出形式包括：

*   一句话总结
*   关键信息点
*   关键问题解答
*   TOC（Table Of Contents） 大纲
*   结构化思维导图
*   智能分类
*   自动化标签

1.   内容剪藏

用户可以随时分享在其他平台看到的内容到知了 zKnown 微信助手。知了 zKnown 首先利用 AI 能力，为用户分享的内容生成摘要，再把内容原文 + 摘要一起保存到用户个人知识库，方便后续管理。

知了 zKnown 目前支持的内容平台包括👇

*   微信公众号
*   知乎专栏
*   今日头条
*   飞书文档
*   36Kr
*   少数派
*   掘金
*   即刻
*   微博
*   小红书

1.   语意化检索

知了 zKnown 使用大模型 embedding 和向量相似度匹配等技术，实现了对知识库内容的语意化检索。包括两个维度的检索功能：

*   单篇内容检索问答
*   个人知识库全量内容检索问答

用户可以对知了 zKnown 摘要过的单篇内容进行问答。知了 zKnown 会将内容原文分块存储在向量数据库，再根据提问进行相似度匹配，并带上匹配到的内容请求 AI 大模型问答。单篇内容问答可以帮助用户更好的理解内容。

用户可以对个人知识库的全部内容进行检索问答。知了 zKnown 根据向量相似度匹配，首先定位到与问题匹配的引用原文，再带上匹配到的内容请求 AI 大模型问答。个人知识库检索问答可以帮助用户更快的唤醒记忆/溯源内容。

*   个人日常使用

1.   添加「知了助手」企业微信账号为好友👇

![Image 2](https://blogcdn.idoustudio.com/doc/20230911094022.png)

1.   转发一篇文章给「知了助手」看摘要👇

![Image 3](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231218234604.png)

*   在群里使用

1.   添加「知了阅读」个人微信账号为好友👇

![Image 4](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219095005.png)

1.   给「知了阅读」发送“绑定”，扫描回复的绑定二维码，绑定账号

2.   邀请「知了阅读」进微信群

3.   群里用户分享链接，「知了阅读」自动输出图文摘要

![Image 5](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219100037.png)

![Image 6: 20231230120815](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231230120815.png)

*   微信助手

知了 zKnown 目前提供两个微信助手，分别是「知了助手」企业微信账号和「知了阅读」个人微信账号。

可以在微信会话列表置顶助手账号，随时转发文章给助手看摘要，随时发送文字给助手记笔记。

![Image 7](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219162809.png)

*   H5 网页

点击摘要回复的链接，进入知了 zKnown 的 H5 网页。

可以在 H5 网页查看摘要详情 / 思维导图 / 管理个人知识库等。

![Image 8](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219163222.png)

*   PC 网页

电脑浏览器打开 [https://readknown.cn/dashboard](https://readknown.cn/dashboard)，微信扫码登录，进入知了 zKnown 的管理后台。

可以在 PC 网页管理知识库 / 管理笔记 / 查看摘要 / 检索问答知识库等。

![Image 9: 20231219163455](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219163455.png)

*   桌面客户端

知了 zKnown 支持 Mac / Windows / Ubuntu 三个系统的桌面客户端，功能与 PC 网页版完全一致。

![Image 10: 20231219163925](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219163925.png)

*   移动客户端

知了 zKnown 的移动客户端支持上下滑动切换摘要内容，左右滑动切换不同维度的摘要形式，让用户像刷短视频一样刷摘要。

![Image 11](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164129.png)

*   随时随地记笔记

![Image 12: 20231230120911](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231230120911.png)

*   分享内容看摘要

![Image 13: 20231230120924](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231230120924.png)

*   查看摘要详情

![Image 14: 20231219164456](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164456.png)

*   查看摘要导图

![Image 15: 20231219164549](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164549.png)

*   管理收藏夹

![Image 16: 20231219164721](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164721.png)

*   管理笔记

![Image 17: 20231219164810](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164810.png)

*   探索内容广场

![Image 18: 20231219164846](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164846.png)

*   知识库检索问答

![Image 19: 20231219164940](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20231219164940.png)

互联网的世界充斥着大量有价值的信息，我们深知凭一己之力很难完成对足够多信息的获取与摘要。

因此我们开放了知了 zKnown 的摘要能力，以 API 的形式提供给第三方应用接入，

希望跟第三方应用一起，在更多的场景实现信息摘要功能，持续为用户提供有价值的服务。

*   知了 zKnown 产品官网：[https://readknown.cn](https://readknown.cn/)
*   知了 zKnown 产品使用手册：[https://open.readknown.cn/#/guide/about](https://open.readknown.cn/#/guide/about)
*   知了 zKnown 摘要 API 接入指引：[https://open.readknown.cn/#/guide/apply](https://open.readknown.cn/#/guide/apply)
*   知了 zKnown 常见问题解答：[https://open.readknown.cn/#/guide/qa](https://open.readknown.cn/#/guide/qa)
