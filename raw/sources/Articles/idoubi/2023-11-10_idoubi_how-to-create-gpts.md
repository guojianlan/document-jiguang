Title: 艾逗笔 - 独立开发者、全栈工程师

URL Source: https://idoubi.ai/blog/how-to-create-gpts

Markdown Content:
gpts 是在 2023/11/06 OpenAI 第一届开发者大会上发布的一个重量级特性。允许普通用户通过自然语言对话的方式，创建自己的 gpts 应用。

gpts 应用不但可以组合使用 ChatGPT 集成的 Web Browsing 在线检索 / DALL·E 3 图像生成 / Code Interpreter 数据分析等能力，甚至还支持上传私有文档作为对话上下文 / 通过 Actions 调用第三方 API 等，大大扩展了 ChatGPT 自身的能力，为大模型对话打开了新的模式。

gpts 目前已经逐步开放给 ChatGPT Plus 用户使用，可以在 [https://chat.openai.com/gpts/discovery](https://chat.openai.com/gpts/discovery) 查看和管理 gpts 应用。

OpenAI 雄心勃勃，大有把 gpts store 做成 AI 时代 Apple Store 之势。对于我们普通用户而言，其中也有很多的机会，需要趁早学习 gpts 应用开发。

本文以“知了阅读”这个 gpts 应用为例，详细讲解如何创建 / 调试 / 发布一个 gpts 应用，并通过第三方 API 调用，完善 gpts 应用的自定义输出和联网能力。

1.   打开 gpts 可视化创建地址

[https://chat.openai.com/gpts/editor](https://chat.openai.com/gpts/editor)

1.   描述你想要创建的应用

gpts 应用可以采用对话的形式创建，在输入框描述你想要创建的应用信息，可以自己指定应用名称，或者让 GPT Builder 根据你的描述给你生成一个应用名称。对名称满意了，你回复“ok”或者“好的”之类的肯定词，GPT Builder 就会保存你选中的应用名称，继续下一步创建流程。

![Image 1: 20240105110856](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105110856.png)

1.   生成应用 logo

保存应用名称后，GPT Builder 会为你的应用生成一个 Logo。你可以通过对话的方式不断调整，直到你对 Logo 满意为止。输入肯定词，让 GPT Builder 保存 Logo 进入下一步。

![Image 2: 20240105110916](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105110916.png)

1.   设置应用提示词

你可以告诉 GPT Builder，你要创建的这个应用，应该针对用户的输入做出怎样的响应，GPT Builder 会根据你的描述，为应用生成提示词。

![Image 3: 20240105110929](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105110929.png)

通过对话继续输入应用描述，帮住 GPT Builder 生成更加精准的提示词。最后提示 GPT Builder 完成应用的创建。

![Image 4: 20240105110937](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105110937.png)

1.   应用配置与预览

左侧切换到 Configure 栏，可以看到 GPT Builder 根据你之前的描述，为你的应用生成了 Name / Description / Instructions 等信息，你可以在这个页面继续调整应用信息。

右侧为应用生成了一个预览的页面，你可以在对话框输入内容进行应用调试。

![Image 5: 20240105110950](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105110950.png)

在应用预览页面，输入文字 / 链接等内容，进行应用调试，可以根据输出结果不断调整左侧 Instructions 框内的提示词，让应用输出更加符合要求的结果。

这里需要专业的 Prompt Engineering 知识，可以查看 OpenAI 官方的 [prompt-engineering 文档](https://platform.openai.com/docs/guides/prompt-engineering) 或者参考一些提示词编写的教程。

*   以下为输入纯文字内容时，gpt 输出的摘要效果👇

![Image 6: 20240105111004](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111004.png)

*   以下为输入文章链接时，gpt 输出的摘要效果👇

![Image 7: 20240105111010](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111010.png)

从调试结果可以看到，gpt 无法直接联网获取到输入链接对应的文章内容，无论提示词如何调整，都不能得到期望输出的摘要内容。这种场景，只能借助第三方 API 的能力。

为了在 gpts 应用实现对输入链接的摘要功能，我们需要借助第三方 API 来实现。

1.   选择第三方摘要 API

知了阅读通过开放平台 [open.chatsum.ai](https://open.chatsum.ai/) 提供了链接摘要的能力，只需要 [获取一个 apikey](https://open.chatsum.ai/#/guide/apply)，输入链接即可实现多种格式的摘要输出。

在此 gpts 应用，我们主要对接 [获取文本摘要](https://open.chatsum.ai/#/article/summary) 这个接口

先来看看接口文档

![Image 8: 20240105111030](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111030.png)

POST 接口，鉴权参数需要一个 apikey，输入参数是链接 link，希望展示的输出参数是 data.summary

1.   为 gpts 应用创建 Actions

在应用编辑框左侧的 Configure 页面，进入 Actions 配置页面，添加调用第三方 API 的 Schema

```
{
  "openapi": "3.1.0",
  "info": {
    "title": "OpenSum",
    "description": "Get summaries for links",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://read.thinkwx.com/api"
    }
  ],
  "paths": {
    "/v1/article/summary": {
      "post": {
        "description": "Get article summary for given link.",
        "operationId": "GetArticleSummary",
        "parameters": [],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GetArticleSummaryRequestSchema"
              }
            }
          },
          "required": true
        },
        "deprecated": false,
        "security": [
          {
            "apiKey": []
          }
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "GetArticleSummaryRequestSchema": {
        "properties": {
          "link": {
            "type": "string",
            "title": "link",
            "description": "link of an article"
          }
        },
        "type": "object",
        "required": ["link"],
        "title": "GetArticleSummaryRequestSchema"
      }
    },
    "securitySchemes": {
      "apiKey": {
        "type": "apiKey"
      }
    }
  }
}
```

1.   gpts 应用调用第三方 API 调试

保存 Actions 之后，在右侧调试页面，输入一个链接，可以看到 gpts 会询问你是否允许 API 调用，当你点了 Allow 之后，gpts 应用就会给第三方 API 发起调用请求。

![Image 9: 20240105111042](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111042.png)

gpts 应用会结合第三方 API 的响应内容，根据自己的理解进行输出

![Image 10: 20240105111049](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111049.png)

1.   控制 gpts 应用输出格式

我们希望 gpts 应用原封不动的输出第三方 API 响应字段的内容，不要有额外的文字说明，可以调整提示词，加一段说明：

When request actions api successed, output raw text of field "data.summary" in api response json, no other content.

再次输入链接进行调试，可以看到输出内容已经是 API 返回的摘要内容了。

![Image 11: 20240105111100](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111100.png)

1.   在应用预览页面点右上角，选择一种发布方式，即可发布新创建的 gpts 应用。

![Image 12: 20240105111109](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111109.png)

1.   正式使用 gpts 应用

发布 gpts 应用成功后，复制应用的链接，自己打开或分享给他人，即可在 ChatGPT 对话框正式使用。

访问应用：[https://chat.openai.com/g/g-qjiz4E1qP-zhi-liao-yue-du](https://chat.openai.com/g/g-qjiz4E1qP-zhi-liao-yue-du)

![Image 13: 20240105111117](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111117.png)

输入链接获取文章摘要👇

![Image 14: 20240105111123](https://zknown-1251007641.cos.ap-guangzhou.myqcloud.com/images/20240105111123.png)

本文主要演示了如何从零到一创建及发布一个 gpts 应用，通过调用第三方 API 实现了联网输出摘要的功能。

gpts 有非常大的想象空间，有机会可以继续探索一下 gpts 应用与本地文档 / 邮件 / 数据库等系统的集成。

gpts store 有机会成为 AI 时代的 Apple Store，普通开发者也有机会创建出 gpts 超级应用。

All in AI, 未来可期。

*   [gpts 官方介绍](https://openai.com/blog/introducing-gpts)
*   [OpenAI 提示词编写指南](https://platform.openai.com/docs/guides/prompt-engineering)
*   [知了阅读摘要 API](https://open.chatsum.ai/#/article/summary)
