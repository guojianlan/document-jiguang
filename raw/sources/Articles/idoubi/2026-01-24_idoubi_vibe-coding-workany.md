Title: 艾逗笔 - 独立开发者、全栈工程师

URL Source: https://idoubi.ai/blog/vibe-coding-workany

Markdown Content:
我 Vibe Coding 一周，做了个桌面 Agent

## 我 Vibe Coding 一周，做了个桌面 Agent

2026/01/24

复盘一下我vibe coding 一周，开发 WorkAny 的过程，很有意思。😂

1.   上周三在香港办卡，临时起意想做个桌面 Agent 项目，对标 cowork，晚上回到广州开始写代码

2.   初期目标是快速发布，没时间去研究哪个 Agent 框架好用了，看很多人在用 claude agent sdk，先用这个吧

![Image 1](https://cdn.shipany.ai/imgs/722c6bf9fff1552547bde8cc9da92697.png)

1.   第一时间想到用 tauri，喜欢小而美，总觉得 electron 很重，不想用

2.   不想自己写代码了，决定让 claude code 来写。之前的 claude 账号都被封了，用不上原版 cc，装了个 cc-switch，接上 OpenRouter 的 API 开始写

3.   截了个 chatbot 的交互截图，让 cc 参考着先把基本的对话流程跑通，用 claude agent sdk，接上 OpenRouter，cc 很快写完了第一版

![Image 2](https://cdn.shipany.ai/imgs/d1cadba2213dce0714a48eb6763bafc4.png)

1.   tauri 本质是用 rust 的壳子套了个前端界面，不熟悉 rust，让 cc 用 hono 写API，rust 只做壳子，不做业务功能。API 作为 sidecar 打包进 app

![Image 3](https://cdn.shipany.ai/imgs/183758342ed6e045dfe0f6f353c7e8a1.png)

1.   让 cc 在 API 引入 sqlite 实现本地存储，持久化任务数据，创建本地工作目录，保存任务输出文件

2.   写了半天，看 OpenRouter 消耗了 110 刀，有点肉疼。买了个美国住宅 ip，付费上了原版 claude pro

3.   截了个 Manus 的任务详情图，让 cc 参考写完工具调用的逻辑，中间是 chatbot 对话，右边用一个虚拟计算机的容器展示输入输出

![Image 4](https://cdn.shipany.ai/imgs/42776ca1aa41394031d60b2103e9cd0b.png)

1.   让 cc 接入 shadcn/ui，把样式做得好看一点，支持切换皮肤

![Image 5](https://cdn.shipany.ai/imgs/dc8116554ed9688ab5ca2bdbae9fe16b.png)

1.   又写了一天，关键时候 claude pro 限频了，很影响心情，补差价上了 claude max 顶配版

2.   让 cc 把自定义模型配置，mcp、skills 调用的逻辑都实现了，跑了几个生成 PPT、Excel、Doc、 网页的 case，效果不错

![Image 6](https://cdn.shipany.ai/imgs/6cd581712abf842adf33761962ffdfe6.png)

1.   让 cc 把输出文件夹和中间过程的 artifacts 都在右边展示出来，写了个 artifact preview 容器，渲染各种类型的文件，可视化预览

![Image 7](https://cdn.shipany.ai/imgs/a5425a4a9fea67455e86c64ff4318e5b.png)

1.   有些任务需要跑脚本完成，考虑到用户电脑可能没装代码运行环境，让 cc 引入 sandbox 来运行代码

![Image 8](https://cdn.shipany.ai/imgs/3342937a35bb590afa22ca12f126ae1b.png)

1.   考虑到扩展性，需要支持不同类型的 Agent runtime 和 sandbox，让 cc 写了两个抽象类，统一接口调用。Agent runtime 支持 claude code、codex、deepagents，sandbox 支持 boxlite、codex-sandbox、claude-sandbox

![Image 9](https://cdn.shipany.ai/imgs/d5f337ca80d5800a2a05c1845918c7d3.png)

1.   觉得 cc 写的代码有点乱，让 cc 引入 eslint 和 prettier 做了下格式化，把逻辑太多的文件做模块化拆分。再参考 ShipAny 的目录结构，调整了一下项目结构

![Image 10](https://cdn.shipany.ai/imgs/23ca0b2f6e10f68b9ddce26a61088f20.png)

1.   让 cc 写打包脚本，构建不同操作系统的安装包。把安装包发给一些朋友，开始内测了。根据内测用户的反馈，再让 cc 继续优化逻辑，解决问题，迭代功能

![Image 11](https://cdn.shipany.ai/imgs/462d86cd77fc41a38f01f3b83768da74.png)

1.   有些用户电脑没装 node，没有 claude code，安装软件后跑不起来，让 cc 在构建脚本支持 flag 参数，把 node 和 cc 作为 sidecar 打包进 app，让用户能够开箱即用

2.   Mac 用户安装 app 后提示文件损坏或有安全提示，让 cc 在构建脚本里面加上签名处理，用我的 Apple 开发者账户对打包的 Mac app 做签名

3.   node 和 cc 都打包进 app 的版本，安装包 100 多 m，有点重。让 cc 在构建脚本实现默认不打包，在用户启动 app 的时候引导安装 node 和 cc，精简版安装包才 20 多 m，小巧精致

![Image 12](https://cdn.shipany.ai/imgs/e330c13b3bee72559b20dccb7075ef9d.png)

1.   app 基本功能实现得差不多了，让 cc 在 ShipAny 模板基础上写一个 WorkAny 的官网，放上演示图，部署上线

![Image 13](https://cdn.shipany.ai/imgs/f8519d6c62fdb46ad50fd356c6be254b.png)

1.   WorkAny 开源发布，MVP 版本上线，用户拉源码本地构建，配个 API 直接用

![Image 14](https://cdn.shipany.ai/imgs/41b76b1ca7ca472a5643fd1009f34bcc.png)

1.   让 cc 写了个 github 构建脚本，在代码推送到 main 分支时，自动触发 github action 构建，一次性打包 Windows、Linux、Mac 三大平台的安装包，自动发布到 release，用户无需自行构建了

![Image 15](https://cdn.shipany.ai/imgs/54a245817c0541e95cc484de8940befe.png)

1.   根据用户的反馈，问题丢给 cc 去修，想到什么新功能也告诉 cc 加上，自己只做测试，不写代码，看都不看一眼。🌚

![Image 16](https://cdn.shipany.ai/imgs/85488be558f38dbe9d94c02ae033daf0.png)

* * *

1.   第一次尝试全自动驾驶 vibe coding 做项目，爽感非常强烈，WorkAny 的代码 100% 由 cc 老弟完成，我只负责指挥，日常开三个窗口，让三个 cc 老弟同时干活，效率拉满

![Image 17](https://cdn.shipany.ai/imgs/4331a754d17e109685fd06b06581eb02.png)

1.   AI 时代技术平权，人人都是建筑师，理解用户需求、好的产品 sense 和审美是做出好产品的关键

![Image 18](https://cdn.shipany.ai/imgs/7635a1a0eacd77a47b8d11237c576109.png)

1.   技术广度和全局视野是最大的优势，可以精准提需求，指哪打哪，遇到问题能快速定位，防止 AI 走偏失控

2.   以前总觉得手洗的衣服比洗衣机洗的干净，现在可以放心交给洗衣机了，又干净又快，能穿就行

3.   优秀的程序员不会被 AI 淘汰，法拉利老了还是法拉利。🌝

欢迎试用 WorkAny，感谢反馈与支持。

[https://workany.ai](https://workany.ai/)

![Image 19](https://cdn.shipany.ai/imgs/01e072d332de8394fc61be51d651a349.png)
