Title: 艾逗笔 - 独立开发者、全栈工程师

URL Source: https://idoubi.ai/blog/ai-cover-generator

Markdown Content:
在上一篇文章： [2024，我想开一门 AI 应用全栈开发课](https://idoubi.ai/blog/my-ai-course-in-2024/) 提到，我开始尝试知识付费。

有一些朋友加入了我的「1024 全栈开发社群」。在过去三周，我在腾讯会议在线分享了三次，以 [AI 壁纸生成器](https://aiwallpaper.shop/) 这个项目为例，演示了从零到一全栈开发 AI 应用的完整流程。

前天（2024/01/28）下午，跟朋友阿豪去逛商场，在星巴克小憩的时候，我拿出电脑，准备给他安利我的全栈开发课程讲的多么清晰，可以教会他快速上手全栈开发。

我想到了 “AI 生成微信红包封面” 这个 idea，我一直想做但没有抽出整片时间去做。

我评估了一下，实现这个产品的路径跟我之前做过的 [AI 壁纸生成器](https://aiwallpaper.shop/) 基本一致，只需要换一下生成红包封面图片的提示词，再加个微信红包的展示样式即可。

我给要写的这个 AI 红包封面生成器项目取名叫：AI Cover

边讲解边编码（有一些代码是从 [aiwallpaper](https://github.com/all-in-aigc/aiwallpaper) 开源仓库复制的），花了将近一个小时，我写完了 AI Cover 的第一个版本代码。

我截了个本地预览的图，在即刻社区发了条动态，首次宣告了这个产品👇

![Image 1](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130164249.png)

本是一次无心插柳的开发历程，没想到评论区很多人都表示有意思，很期待。

晚上回来，我把代码推送到了 github，部署到了 vercel，注册了一个域名：[aicover.design](https://aicover.design/)，打算等 DNS 解析生效的时候，正式上线推广。

昨天（2024/01/29）上午，我在即刻社区发布了 AI Cover 产品正式上线的消息。

跟我之前做过的产品比，这款产品的 MVP 版本功能要完善很多，除了最核心的输入提示词生成红包封面的功能之外，还包括了用户登录 / 付费方案 / 积分系统等。新用户给了一个 credit，可以免费生成一张红包封面图片。

![Image 2](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130170502.png)

第一个版本发布之后，来了很多人，画了各种各样的龙。

![Image 3](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130175637.png)

昨天（2024/01/29）下午，我在 Github 开源了这个 AI 红包封面生成器：[https://github.com/all-in-aigc/aicover](https://github.com/all-in-aigc/aicover)

麻雀虽小，五脏俱全。

这是一个非常完整的 web 项目，包括👇

*   nextjs 全栈开发
*   tailwindcss 前端模板
*   supabase 数据存储
*   dalle-3 图片生成
*   clerk 谷歌登录
*   aws s3 图片上传
*   stripe 支付

非常适合用来做一些小而美的网站项目。

我最近很喜欢开源，与其闭门造车做产品，不如开源让更多人看到我的创造力。

对于不懂 SEO / 不会做营销的人来说，开源也许是能想到的最好的增长方式。

把 AI Cover 开源之后，增加了很多曝光。

我在 [Twitter](https://twitter.com/idoubicc) 发的帖子截止目前，有 80k 的访问，在微博也得到了一些大 v 账号转发。

![Image 4](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130191540.png)

[aicover.design](https://aicover.design/) 网站单日 UV 超过了我之前流量最大的一个项目：[gpts.works](https://gpts.works/) 的单日最高 UV。

![Image 5](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130182731.png)

Github star 数即将破 400，成为我开源项目中 star 数第二高的项目。

![Image 6](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130191933.png)

乐观的预测，在接下来的几天也许还会有一波自然增长。对于做自己产品的人来说，是一件非常开心的事情。

根据用户反馈的一些意见，我又迭代了几版。

加了一个分类，允许用户选择查看最新 / 最热 / 随机 / 自己制作的红包封面👇

![Image 7](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130183643.png)

加了一个详情页，可以预览 / 下载红包封面👇

![Image 8](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130183304.png)

为了平衡成本，把免费生成红包封面图片的额度取消了，用户需要充值才能生成 / 下载封面图片。

![Image 9](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130183752.png)

还有几天就要过年了，定制红包封面的需求挺大，AI Cover 算是踩中了这个时机，小 🔥 了一把。

AI Cover 解决了生成红包封面的需求，但无法帮助创作者解决红包封面审核过程可能遇到的一些问题，所以没办法完成流程闭环。从这个角度来说，提供的价值比较有限，很难大范围出圈。

Any Way，好玩就够了。看大家生成的红包封面多有意思👇

![Image 10](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130184616.png)

![Image 11](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130184857.png)

![Image 12](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130185039.png)

![Image 13](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130185514.png)

![Image 14](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130185331.png)

![Image 15](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130185427.png)

关注我的公众号「艾逗笔」，发送“红包封面”，加群跟更多红包封面爱好者交流。

![Image 16](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105113843.png)

> 祝大家 2024，新年快乐，龙年大吉。

*   AI Cover 体验地址：[https://aicover.design](https://aicover.design/)
*   AI Cover 开源仓库：[https://github.com/all-in-aigc/aicover](https://github.com/all-in-aigc/aicover)
*   [从零到一全栈开发 AI 应用](https://idoubi.ai/blog/my-ai-course-in-2024/)
*   [微信红包制作流程](https://cover.weixin.qq.com/cgi-bin/mmcover-bin/readtemplate?t=page/index#/doc?page=design&index=-1)

![Image 17](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240130180846.png)
