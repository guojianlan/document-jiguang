---
source_type: wechat_article
source_url: https://mp.weixin.qq.com/s?src=11&timestamp=1778123903&ver=6705&signature=vk4EvqVv548lMve3*dqkgpMdt2boFBxUWtdJqhP*N-WH9H0qyUKVgAIulO*WsCbh0KZn7zMmL5g2Q8XWrQJTBbPB54GCsCGAdXxIUc5xHSStpZ5NBv3oLDtWrvSOBsy5&new=1
title: 爆火的 Vibe Coding 怎么玩？Claude Code 狂飙模式+自动测试实操，不懂代码的设计师必看！
author: 萤柳
account: 会设计
publish_date: 2026-03-13
fetched_at: 2026-05-07
---

# 爆火的 Vibe Coding 怎么玩？Claude Code 狂飙模式+自动测试实操，不懂代码的设计师必看！

哈喽大家好，我是萤柳！

直接写过怎么安装 Claude code 和 Codex，包括怎么接入 API 等。

没看过的朋友可以看这两篇：Claude Code 打通 Figma 实测，2 分钟搞定产品UI界面（附保姆级安装教程）

我用 Codex 免费打通 Figma，自动生成全套设计规范，1 分钟把UI设计稿变成网页

那么我们现在就可以愉快地开始 vibe coding了！

我们就做一些自己用的工具，练下手感吧！

Claude code 和 Codex都可以，建议用 Codex，免费额度挺多的。

我这里用的是 Claude Code，因为充了钱，要不然我也用 Codex。

话不多说，直接开始实操几个案例。

## 一、做个人简介卡片

直接输入你的需求，其实没有多么专业的提示词，把你的需求说清楚就可以了，提示词如下：

- 

```
你是一个有着丰富经验的前端网站设计师，我是一个产品经理，我希望创建一个简单的个人介绍页面，用户填写个人信息后能生成一张好看的卡片，并可以下载导出。用户输入的内容包括姓名、职位/头衔、公司、个人简介、邮箱、电话等内容。生成的卡片要足够美观，绿色清新风格的 UI。你直接生成网站代码，并让我能够在网站上测试。 复述我的需求，提出你的问题
```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UNRm1dXS0HfT5THMzmJACTvjnC1LWEWkvehSsNHZ27a26W8AEdibbRIgj9c3M4Np2xfbgbEiadCE9hoUGTjUgO5lXCcRcOor6ZuU/640?wx_fmt=png&from=appmsg#imgIndex=0)

然后它哐哐哐的就给你做出了一个页面，还是蛮好看的。

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UOib19UgS69hqjMSTv3R1oeWibj4NIQ1R46KfpNtzUc4kicsCCB6XCb1Yv6H1ibVlYCN8q4FhCAib1rFugHeozkNqqaJ4uqL9aYBhA4/640?wx_fmt=png&from=appmsg#imgIndex=1)

这时候填入信息，就可以直接下载这个卡片的图片了。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UPNYt6lEAgQ1LZMibETbXkF4Je4zQwHA08GQR3aKVbORLnvsACoA3hbia9icAicnpYNIXawQUCQeicQvJJdfIYetYHEY1XCgGnc5C4A/640?wx_fmt=png&from=appmsg#imgIndex=2)

这种图片就能轻轻松松做出来了。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UNibUNINgGcGfvflMkb9FLP4Vw8mJL9Ivn3WhnGSqA1UpAiaxIqa4gpp8HPY3YHDnkdxT4xgDsmWY5tKT7vzS4SGeB0mibquvYSJY/640?wx_fmt=png&from=appmsg#imgIndex=3)

## 二、课堂点名器

第一步：开启狂飙 (YOLO) 模式

因为在用Claude code的时候，会经常问你确认一些东西，所以我们可以先开启狂飙（YOLO）模式，，让它解放我们的双手。

直接输入下面这行代码，然后回车：

- 

```
claude —allow-dangerously-skip-permissions
```

当下面显示：bypass permissions on，说明启动成功。

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMyichq8KZMPJwUHO6fW6VbuIcJ1sgOtKsggcG6PREByv7xoZe4UnJ6GApwq1L6xscFx8mhu4bV5JZYs2aribZ1ibAumPsPenctDw/640?wx_fmt=png&from=appmsg#imgIndex=4)

那是不是每次都需要输入这行代码才能开启狂飙模式呢？是的，但是可以通过输入下面的代码实现，输入claude就自动开启狂飙模式：

- 
- 

```
请帮我在终端配置一个别名，使得输入claude时自动执行claude --dangerously-skip-permissions命令
这样一输入claude就会自动启动狂飙模式。
```

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMDYMyoFj7YtYPQQshudnAFClWtPNz50NGnljnUsZhiaQNrWkjEqLPYb7nxWG217kNGa7ZUFziaqEgaPeDJdJbwIOpbCfibe0IcUQ/640?wx_fmt=png&from=appmsg#imgIndex=5)

第二步：安装MCP插件

我们需要再安装一个MCP插件叫 chrome-devtools 这个MCP插件相当于给你的 AI 专门配备了一个 Chrome 浏览器。

它能代替你阅读长网页、实时获取网页信息、检查网页内容甚至是一个测试工程师。

怎么安装？

在MAC电脑里面的终端，输入下面这行代码：

- 

```
claude mcp add chrome-devtools -s user -- npx chrome-devtools-mcp@latest
```

Windows的代码：

- 

```
claude mcp add chrome-devtools -s user -- cmd /c npx chrome-devtools-mcp@latest
```

第三步：开始vibe coding

接下来就开始做课堂点名器了，输入下面的提示词：

- 
- 
- 
- 
- 
- 
- 

```
我想做一个课堂点名器，或者是说叫做签到系统，需要的功能列表：
  1. 支持csv导入名单
  2. 需要记忆每次点到记录，如果是迟到也是需要记录
  3. 如果有迟到等记录需要加重点到姓名出现的概率
  4. 可以导出记录csv等，根据时间参数
  5. 使用酷炫地球3d旋转动画效果来
技术选型：目前使用html/css/javascript实现，存储使用localstorage 或者 indexedDB
```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UMfBu78hEXJcDH4LTGPYSN7ScdqFt2Ztmnibuiaw5UAZzt2UV2G0ynpg3nbwoKIjjmxncwsOctLcIHFMHF8Yxicrc79vO0Qt3icAYI/640?wx_fmt=png&from=appmsg#imgIndex=6)

再用Plan mode进行规划，Plan mode，是针对比较复杂的初始化场景，让 claudecode 先规划好要怎么做，然后再执行编码的一个模式，针对比较复杂的需求，可以通过 plan mode 先规划后执行。

按住 shift+tab(windows 电脑按住 alt+M)切换到 plan mode。

告诉它基于需求和流程开始规划。

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UPowLJoibG4Bw7Dsib4Pkkkibc5o5MrbQB9UVDKFia3icBxPAyDXMEN9LVfsOBJuE61GCD6jWD4RRgMYhnCVDKCmKaxv4tibArucUFFg/640?wx_fmt=png&from=appmsg#imgIndex=7)

在我们等待的过程中，可以先新建一个测试文件，网站生成好后需要导入这个表。

点击【新建文件】-备注文件名【names.csv】-【输入需要点名的名字】-【ctrl+s保存】

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UNAt8Njic7mIpP0HTLgBazYneBgk5QQPMA2s3JZmm5PmHuwgSq9MAWgL635dcBjmIb8zdTDYjGuVrYWusGzsLiaOVRL6EggIolsE/640?wx_fmt=png&from=appmsg#imgIndex=8)

下图这样说明开发完了，可以点击它下面给的地址打开看效果。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UPUs2A0Ph6gpiaeoXMk7hkfzfUuD2BibN6tAZDNIjekya8tW4ZUrbALj2INjOuSnagL62n6tgaKJpvyPLdSLSt2OghibwHgErVjhs/640?wx_fmt=png&from=appmsg#imgIndex=9)

网站如果功能都完成得很好，那就不需要调试。

如果功能不完善，就要用刚刚我们安装的MCP去自动调试测试：

- 

```
@names.csv 这是测试数据，可以使用 chrome dev tools 进行测试所有功能，保证功能都是可以正常运行，如果有错误，可以进行修复问题，然后再次验证，直到所有问题都得到解决
```

显示下面这个页面说明测试完成了。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UNYHjSibFnULwGnj1swxY8TmLuWUHQoWLLzl9XO2lhEdLDu87PjFDOpLyumbpaTpQFNwwgf4gc5BdcKjmXFTRneVCE8EtUXUZLw/640?wx_fmt=png&from=appmsg#imgIndex=10)

直接打开网页链接可以直接看到效果。

导入名单后就能开始点名了。

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMTmjbR2sjq9dEHRqiaw1R1lQcscTm9rYBDOlJJVO8ryP2kcgLBOWYnmvR2bQFpibTBLSgOfMccQjz3rWUOCdLVdiakmUlmUcKrz0/640?wx_fmt=png&from=appmsg#imgIndex=11)

如果你觉得页面不好看，可以发一个风格的图片给它进行修改。

先调用skill，就是我之前给大家分享过的那个skill👇👇👇

嫌 AI 写的界面太丑？装上这个开源插件，秒变资深设计师 (附保姆级教程)

再把你觉得好看的参考图发给它。

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UMFd0LqrMNLZ4kpMQQwvoTpDzmaISWBTiaxNbxXHPw6PM7thWqqdmLFxxBhvztSeXK7cYyZ1ufZyvMiaa1C86SYYsG1DpaUoXt2o/640?wx_fmt=png&from=appmsg#imgIndex=12)

这样就稍微比之前的好看一点，但其实还是很丑，可能用的是千问的模型。

还是Claude Code的原生最强模型Claude Opus 4.6，生成得好看。

可以看这篇对比感受一下Claude Code 打通 Figma 实测，2 分钟搞定产品UI界面（附保姆级安装教程）

![](https://mmbiz.qpic.cn/mmbiz_png/4ZNIrm7H9UPViaNicrAlcnsbs4VK4W8ibNtYxhzibtUf8afP1ibCibiaooFBEiboJOVwxMEtCZKmj5hElbKicjmdCIaWFEjQ7qqZ2E9OOFSuLuA38hkc/640?wx_fmt=png&from=appmsg#imgIndex=13)

我把一模一样的提示词和参考图发给Gemini，UI效果会更高级更精致一些~

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UMFF9y9at4PB45UI24s7Y1aGw838xp4XwQxGlNa21rfWf9I0GgjvOQ7EwAFvMiaXr1ZhmIjticNN8OsUjaOIicpe6mu23HH0QxUpk/640?wx_fmt=png&from=appmsg#imgIndex=14)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/4ZNIrm7H9UOiaP8iaeUFRqibsJibD8aicTJOodicjuk7P7TzQQ7lHFjIdNdy5ykeFwofDW3QciaeXzcYGkY0Za9bEGPHzXTiazG5jZnCWLWCkuodQIc/640?wx_fmt=png&from=appmsg#imgIndex=15)

今天的分享就到这里，希望对你有帮助！

如果你在日常设计工作中也想提升自己的效率，想系统地学习怎么把 AI 融入到 UI/UX 设计流程里，欢迎来看看我整理的《AI+UI/UX设计知识库》。

里面有基础的 AI 绘画和设计工具教程，还有很多像今天这样实打实的工作流拆解和实战案例。

我把这些年踩过的坑、总结出的经验都沉淀在里面了。

感兴趣的朋友可以点击下方链接获取详情，期待能在里面和你一起交流进步👇👇👇

永久买断！这套All in one的 UI / UX 设计知识库，可能是你今年最值的投资

![](https://mmbiz.qpic.cn/sz_mmbiz_gif/NGpZALUyrg4w6azKXTdW22JP3jaKQRSiaJynNmcEHbuIDqDx2J5KxAtw5TibPSuOAteGej8fQOjrhT3mJFCubDjw/640?wx_fmt=gif&from=appmsg#imgIndex=16)

点赞转发推荐，祝您年薪亿万！
