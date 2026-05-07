Title: 艾逗笔 - 独立开发者、全栈工程师

URL Source: https://idoubi.ai/blog/sora-ai-video-generator

Markdown Content:
2024/02/15，农历正月初六，OpenAI 发布了王炸级产品 Sora，可以通过文字描述生成长达 60s 的视频，画面非常流畅，真实度很高。一下子在国内互联网炸开了锅，得到了广泛传播。

去年 ChatGPT 爆火让很多人看到了 AI 变现的机会，今年 Sora 一发布就刺激到了很多人，想要在第一时间抓住这泼天的流量。于是出现了两类人：

一类是做 Sora 视频搬运的人，底层逻辑是搬运 OpenAI 官方生成的 Sora 视频，建设自己的网站或自媒体账号，吸引用户关注。等到 OpenAI 正式发布 Sora 之后，可以通过套壳充值或者广告的方式变现。

另一类人，通过制造焦虑，鼓吹 Sora 的神奇之处，号召用户买课学习，在自己都没有使用过 Sora 生成视频之前，就开始卖 Sora 提示词收会员费了，妥妥的割韭菜。

![Image 1: 20240223220503](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223220503.png)

第一类人虽然做的事情比较低级，没有什么技术含量，为了蹭热度搞流量，搬运视频也付出了劳动力，倒也无可厚非。

而第二类人的行为则是明显的欺诈，给用户传达错误信息，割韭菜收费，毫无底线。近几天被口诛笔伐，挨了不少骂。

这几天国内 AI “巨头”李某舟翻车事件，也让大家看到了 AI 这个圈子的乱象，镰刀无处不在，几颗老鼠屎，坏了一锅粥。

![Image 2: 20240223221618](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223221618.png)

Sora 刚发布的时候，我身边很多人在做 Sora 视频搬运的工作，我本来没打算蹭这个热度。

只是前几天，刚好看上了 sora.fm 这个域名，打算写一个 Sora 视频生成器，通过输入文字快速生成 AI 视频。

熟悉我的人都知道，我之前写过很多个 generator，

比如 AI 壁纸生成器：[https://aiwallpaper.shop](https://aiwallpaper.shop/)

![Image 3: 20240223212917](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223212917.png)

AI 红包封面生成器：[https://aicover.design](https://aicover.design/)

![Image 4: 20240223212945](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223212945.png)

这一次写 Sora AI Video Generator，一方面是因为有现成的代码模板可以复用，另一方面也是想趁着 Sora 的热度搞点流量，希望能带动我其他几款产品的用户增长。

我在 2024/02/21 上线了网站 [Sora.FM](https://sora.fm/)，同时在 Github 开源发布。

![Image 5: 20240223212138](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223212138.png)

为了尽可能减少误解，我在开源 Sora.FM 的时候特意说明了，接口是 Mock 的，需要等 Sora API 发布之后才正式可用。这算是一个期货产品，未雨绸缪，为后续套壳变现做准备。

我在[复盘 AI 红包封面项目](https://idoubi.ai/blog/ai-cover-generator/)的时候提到了，开源是一种非常有效的增长手段，可以帮助产品短时间内获取大量曝光，吸引到流量。

不出意外，Sora.FM 在发布第一天访问量激增

![Image 6: 20240223213716](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223213716.png)

Github 2 天涨了 300 多 star，仓库搜索 Sora 关键词，排到了第一的位置。

![Image 7: 20240223213949](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223213949.png)

Sora.FM 开源第二天，我在 V2EX 发布了一个帖子推广这个开源项目，收到了几个质疑的评论👇

![Image 8: 20240223214425](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223214425.png)

我没有回应，因为我承认搬运视频 + 套壳是很没有技术含量的事情，对这个行业的发展没有太大的正向作用。

但是对于一个开发者来说，我觉得有意义的事情，是自己做的产品，能够被更多的人看到，更多的人用上。

我能保证的是，不欺骗用户，不虚假宣传，技术含量虽然低了点，但作为一个开发模板，多多少少能对其他项目有一些参考意义。

今天有朋友给我转发了一个视频，有个博主在视频号拿我的 Sora.FM 进行演示，声称拿到了 openai-sora 的账号，让在视频底下留言的用户私信他。私信之后大概率是要引导付费，这一看就是妥妥的欺诈 + 割韭菜啊。

![Image 9: 20240223212351](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223212351.png)

我非常生气，在视频号底下留言澄清，还发了一条朋友圈控诉这个博主，有些好友帮忙举报了这个视频。

![Image 10: 20240223212238](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223212238.png)

结果，人家把我的留言给删了，视频还没下架。脸皮也是厚到家了。

为了不造成更多的误解，我在 Sora.FM 上加了一个提示

![Image 11: 20240223212453](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223212453.png)

这个项目这两天已经传播开了，被很多网站/视频号/知识星球引用，也不知道有多少此类投机倒把的人。

于是有了这篇文章。我希望能介绍 Sora.FM 这个项目的由来，表达我的观点和态度，希望看到的人能够理解一些事情，不要上当受骗。

也请看到这里的朋友帮我举报这个视频号，不要让这个搅屎棍再继续骗人。

![Image 12: 20240223215645](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240223215645.png)

借用《三体》里叶文洁的话：“我点燃了火，却无法控制它”。

Sora.FM 这个项目是我众多开源项目中的一个，我承认我的出发点是为了蹭 Sora 的热度搞流量，有一定的私心。

但是做产品的人，需要有最基本的原则和底线，至少要能实事求是，不虚假宣传，不欺诈用户。

有个美好的愿望，希望“天下无贼”，AI 繁荣发展，行业毒瘤消失殆尽，劣币不再驱逐良币。
