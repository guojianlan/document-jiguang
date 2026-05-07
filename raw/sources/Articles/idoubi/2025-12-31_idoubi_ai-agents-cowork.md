Title: 艾逗笔 - 独立开发者、全栈工程师

URL Source: https://idoubi.ai/blog/ai-agents-cowork

Markdown Content:
大家好，我是艾逗笔。

在 [《我招了 6 个 AI 员工一起干活》](https://idoubi.ai/blog/ai-agents-work-together) 一文中，我介绍了如何招聘 6 个 AI 员工，并让他们在同一个工作间一起干活。

如果按照每个员工内置的技能，各干各的，效率会比较低。作为老板，我希望 AI 员工们能掌握更多的工作技能，适应各种类型的工作任务。同时，也需要他们能够互相协作，共同完成复杂的工作任务。

招聘 AI 员工，我最希望他们帮我干的就是编程相关的活。在给他们具体的任务之前，先评估一下他们的能力。

主要的评估办法是给他们写个任务说明书，描述具体的任务要求，评估他们对任务的理解能力，执行效率，以及交付结果的质量。

### [对 Agents.md 的理解能力](https://idoubi.ai/blog/ai-agents-cowork#%E5%AF%B9-agentsmd-%E7%9A%84%E7%90%86%E8%A7%A3%E8%83%BD%E5%8A%9B)

[Agents.md](https://agents.md/) 是由 OpenAI 和 Google 联手推出的一套开放标准，目标是用一个清晰、统一的文档，取代厂家特定的配置文件，为编程 Agent 提供一种可预测的方式来理解和操作软件项目。

我先通过一个简单的网页设计任务，来评估 6 个 AI 员工的前端编码能力和 UI 审美。

先找 `Claude Code` 员工，让他帮忙写一个 `agents.md` 文件，说明一下网页设计任务的要求，让 6 个 AI 员工同时工作，各自完成任务。

`Claude Code` 给我写的 `agents.md` 文件如下：

```
# UI 竞赛：静态网页生成测试

**目标**: 根据给定的主题和参考内容，每个 Agent 独立完成一个精美的静态网页
**评估方式**: 用户最终验收，对比各 Agent 的作品质量

---

## 📋 任务说明

### 你的任务

根据用户提供的**主题**和**参考内容**，创建一个完整的静态网页项目。

### 工作目录

- **Claude Code**: `~/ai/uitest/claude-code/`
- **Gemini**: `~/ai/uitest/gemini/`
- **Codex**: `~/ai/uitest/codex/`
- **Crush**: `~/ai/uitest/crush/`
- **OpenCode**: `~/ai/uitest/opencode/`
- **KiloCode**: `~/ai/uitest/kilocode/`

---

## 📦 产出要求

### 必须包含的文件

你的工作目录/
├── index.html ← 主页面（必须）
├── style.css ← 样式文件（必须）
├── script.js ← JS交互（如果需要）
├── assets/ ← 图片、图标等资源
│ ├── images/
│ └── icons/
└── README.md ← 项目说明（必须）

## 🚀 开始流程

### 第 1 步：阅读理解

用户会发送：

【主题】: [比如：个人简历网站、产品落地页、博客首页等]
【参考内容】: [具体的文字内容、要求的功能等]

或者让你读取指定文件的内容。

### 第 2 步：确认理解

回复用户：

我理解了！我要做一个 [主题]。

我计划包含以下内容：

1. [内容1]
2. [内容2]
3. [内容3]

我计划使用的技术：

- HTML5 语义化结构
- CSS3 [具体技术，如 Flexbox、Grid、动画等]
- JavaScript [如果需要，说明用途]

预计完成时间：[X]分钟

开始制作！

### 第 3 步：开发制作

在你的工作目录下创建文件，开始编码。

### 第 4 步：自检

完成后，自己检查：

- [ ] 打开 index.html 能正常显示
- [ ] 所有链接和按钮都能工作
- [ ] 在不同屏幕尺寸下都正常
- [ ] 代码整洁、有注释
- [ ] README.md 完整

### 第 5 步：提交

告诉用户：

✅ 我已完成！

项目位置：~/ai/uitest/[你的名字]/index.html

特色功能：

- [功能1]
- [功能2]

请验收！

---

## 🎯 成功案例参考

### 示例 1：极简风格

- 大量留白
- 单一主色调
- 清晰的排版
- 精致的微动画

### 示例 2：渐变色风格

- 现代渐变背景
- 毛玻璃效果
- 卡片式布局
- 流畅的过渡动画

### 示例 3：暗黑模式

- 深色背景
- 高对比度文字
- 霓虹色点缀
- 科技感设计

---

## ⚠️ 注意事项

### 必须做到

- ✅ 文件必须保存在你的工作目录
- ✅ index.html 必须能直接打开（不依赖服务器）
- ✅ 不要使用需要编译的框架（如 React 需要 build）
- ✅ 图片等资源放在 assets/ 文件夹
- ✅ 代码必须有适当的注释

### 禁止行为

- ❌ 不要抄袭其他 Agent 的代码
- ❌ 不要使用现成的模板（要自己写）
- ❌ 不要包含过大的图片（每张 < 500KB）
- ❌ 不要使用侵权的图片和素材

---

## 🏆 竞赛精神

这是一场友好的竞赛！

**目标**:

- 展示你的最佳水平
- 创造出让用户眼前一亮的作品
- 用代码质量证明你的实力

**态度**:

- 认真对待每个细节
- 追求卓越而非仅仅完成
- 在规定时间内做到最好

---

## 准备好了吗？

等待用户发送内容，然后开始你的创作！

**记住**: 你代表的不仅是自己，更是你所使用的 AI 模型的能力。加油！🚀
```

再来创建一个 `input.md` 文件，描述我想做的网页需求：

```
【主题】极简风格博客

【参考内容】
设计一个极简主义风格的个人博客首页：

**博客信息**:

- 标题: 艾逗笔 - 独立开发者、全栈工程师
- 副标题: All in AI 应用出海，做产品最重要的是开心。
- 作者: 艾逗笔

**文章列表** (3-5 篇):

1. 标题: "我招了 6 个 AI 员工在一起干活"
   摘要: "我招聘了 6 个 AI 员工，指挥他们同时干活。"
   日期: 2025-12-29
   标签: AI, Agents

2. 标题: "我的新书《这就是 MCP》出版了"
   摘要: "MCP is all you need"
   日期: 2025-07-17
   标签: MCP, AI, Book

3. 标题: "AI 时代如何做独立开发"
   摘要: "一个人就是一个军队。"
   日期: 2025-07-03
   标签: AI, 独立开发, 一人公司

**侧边栏**:

- 关于我: 我叫艾逗笔，2015 年本科毕业于武汉大学核工程与核技术专业。大学期间，受 Adobe 公司软件影响，自学编程，进入 IT 行业，取网名艾逗笔（idoubi）以致敬，沿用至今。2018 年，我入职腾讯，从事后台开发工作，从一个非科班程序员成长为职业工程师，积累了丰富的开发经验，技术视野得到了很大提升。2023 年，我从腾讯裸辞，成为独立开发者，目前 all in AI 应用出海。
- 分类: 全栈开发(12), AI 产品(20), 技术分享(15)
- 标签: AI, 独立开发, 一人公司

**要求**:

- 极简设计，大量留白
- 黑白或单色调为主
- 优雅的排版
- 清晰的层次
- 加分项：文章卡片悬停效果
```

打开 6 个员工的工作间，同步输入指令：

`请阅读 agents.md 里的任务要求,参考 input.md 里的任务描述,开始你的工作.`

> 注意：`Codex` 和 `Gemini CLI` 能自动定位 agents.md，其他 Agent 不一定能自动定位，所以我需要显式说明，让他们读取 agents.md 和 input.md 的文件内容。

![Image 1](https://cdn.shipany.ai/imgs/a40d1a796002e77e47ef5ea7870059a4.png)

等他们都完成任务后，我分别查看了他们输出的代码和实现的网页效果。

从整体的产出质量来评估，前三名分别是：

*   `Codex` + `GPT 5.2`：

对 `agents.md` 的指令遵循良好，输出的代码质量高，实现的网页效果最好（UI 审美、JS 动效等），还能直接生成 svg 格式的图片作为网页元素（Logo、Favicon 等）。

唯一的不足是，工作效率是真的慢，别的 Agent 花 1 分钟完成任务，`Codex` 至少需要 5 分钟。可能这就是所谓的：“慢工出细活”？

![Image 2](https://cdn.shipany.ai/imgs/5d78467599913d28f874c86760508f70.png)

*   `Claude Code` + `Opus 4.5`：

综合能力最强，完美遵循 `agents.md` 的指令要求，输出的代码质量高，速度也很快。UI 审美比 `Codex` 稍微差一点。

![Image 3](https://cdn.shipany.ai/imgs/787dc178964039c794a4e95d9a7d24e3.png)

*   `Gemini CLI` + `Gemini 3`：

对 `agents.md` 的指令遵循良好，输出的代码质量高，速度最快。UI 审美一般，很强的 `AI` 味。

![Image 4](https://cdn.shipany.ai/imgs/bd43e784a9fa1eadd750b27429ce7fc9.png)

*   `Crush` + `MiniMax M2.1`：

对 `agents.md` 的指令遵循一般，输出的代码少了 `JS` 动效，UI 审美跟 `Claude Code` 持平，产出速度比 `Claude Code` 快。

*   `OpenCode` + `GLM 4.7`：

对 `agents.md` 的指令遵循一般，输出的代码少了 `JS` 动效，UI 审美比 `Claude Code` 差一点。

`OpenCode` 的 Agent 设计问题，有时候任务会报错，无法一次性完成任务。

*   `KiloCode` + `Kimi K2 Thinking`：

输入框无法粘贴多行内容，不能理解 `agents.md` 的指令要求，执行报错，无法完成任务。

是 `KiloCode` 的 Agent 设计问题，跟 `Kimi K2 Thinking` 模型无关。

### [对 Agent Skills 的调用能力](https://idoubi.ai/blog/ai-agents-cowork#%E5%AF%B9-agent-skills-%E7%9A%84%E8%B0%83%E7%94%A8%E8%83%BD%E5%8A%9B)

[Agent Skills](https://code.claude.com/docs/en/skills) 是 `Anthropic` 推出的一套开放标准，旨在将重复性工作流程打包成可复用的指令，让 Agent 能自动、可靠地完成任务，无需每次都重复提醒。

Agent Skills 的核心理念是 `渐进式暴露`，跟 `agents.md` 一样，给 Agent 提供行动参考。不同的是，`agents.md` 把任务要求写到一个文件里，Agent Skills 把任务要求拆分到文件夹的不同文件中，分层级组织提示内容，通过 `SKILL.md` 文件描述技能，当 Agent 需要执行某个技能时，再调用对应的提示文件。

我们选择上一轮能力评估前四名选手：`Codex`、`Claude Code`、`Gemini CLI`、`Crush` 来参与新一轮的能力评估，评估他们是否能熟练使用 Agent Skills 完成任务。

我们创建一个新的项目：`uitest2`，选择 [frontend-design](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) 这个 Skill，来增强 Agent 的前端设计能力，以求输出更加美观的网页效果。

先把 `frontend-design` Skill 放到每个 Agent 支持的 Skills 目录下：

*   Codex: `~/.codex/skills/`
*   Claude Code: `~/.claude/skills/`
*   Crush: `~/.config/crush/skills/`

Gemini CLI 目前没有官方支持的 Skills 目录，我们可以把 `frontend-design` Skill 放到项目的 `.agents/skills/` 目录下。

然后再创建一个新的任务描述文件：`input.md`，描述要做的项目需求。

```
【主题】SaaS 产品落地页

【参考内容】
为一款 AI 搜索引擎产品设计落地页，需要包含：

**产品名称**: ThinkAny
**Slogan**: New Era AI Search Engine, Answer quickly and directly

**Hero Section**:

- 主标题: ThinkAny - AI 搜索引擎
- 副标题: 新时代 AI 搜索引擎，搜得更快，答得更准
- CTA 按钮: "免费试用" 和 "观看演示"
- 配图: 产品截图或概念图

**功能特点** (3-4 个):

1. 智能续写 - AI 理解上下文，自动续写内容
2. 多语言支持 - 支持 20+种语言
3. SEO 优化 - 自动优化关键词和结构
4. 团队协作 - 实时协作编辑

**定价方案** (3 个套餐):

- 免费版: $0/月 - 基础功能，每月 5000 字
- 专业版: $19/月 - 完整功能，每月 50000 字
- 企业版: $99/月 - 所有功能，无限字数

**客户评价** (2-3 条):

- "ThinkAny 帮我节省了 50%的找资料时间" - John, 内容创作者
- "深度搜索功能太棒了" - Sarah, 市场经理

**底部**:

- 注册表单（邮箱订阅）
- 社交媒体链接
- 版权信息

**要求**:

- 现代化设计
- 有渐变或现代配色
- 流畅的滚动动画
- 响应式设计
- 加分项：视差滚动效果
```

在四个员工所在的工作间同步输入指令：

```
请参考 input.md 的任务描述,使用 frontend-design 这个 skill, 帮我设计网页.
创建以你的名字为名的工作目录, 开始任务.
```

![Image 5](https://cdn.shipany.ai/imgs/74785c29ac6fa6a61f4a4858df5bf1b7.png)

然后我们根据四个员工的产出结果进行评估。

*   Claude Code + Opus 4.5：

`Claude Code` 率先完成了任务，创建了 `Claude` 文件夹，调用了 `~/.claude/skills/frontend-design` 技能，生成了一个 `index.html` 文件。

打开看到的效果：

![Image 6](https://cdn.shipany.ai/imgs/33c171bf8fa08b8599298c3ac15333a9.png)

*   Gemini CLI + Gemini 3：

`Gemini CLI` 第二个完成任务，创建了 `gemini` 文件夹，调用了 `.agents/skills/frontend-design` 技能，生成了一个 `index.html` 文件。

打开看到的效果：

![Image 7](https://cdn.shipany.ai/imgs/5a84d74bc9979d8ed746384cc212309d.png)

*   Crush + MiniMax M2.1：

`Crush` 第三个完成任务，创建了 `Crush` 文件夹，调用了 `~/.config/crush/skills/frontend-design` 技能，生成了 `index.html` / `style.css` / `script.js` / `README.md` 四个文件，网页元素、样式、动效拆分很不错。

打开看到的效果：

![Image 8](https://cdn.shipany.ai/imgs/5ca69d03b1ec44fd31138194d3f4bcf7.png)

*   Codex + GPT 5.2：

`Codex` 依然是完成任务最慢的，花了 `Claude Code` 五倍的时间，创建了 `gpt-5-2` 文件夹，调用了 `~/.codex/skills/frontend-design` 技能，生成了 `index.html` / `style.css` / `script.js` / `README.md` 四个文件，网页元素、样式、动效拆分很不错。

打开看到的效果：

![Image 9](https://cdn.shipany.ai/imgs/43ea894ebc3c04da6c7ccf589b074f4a.png)

从上面的效果验收来看，我个人觉得 `Codex + GPT 5.2` 的产出质量最高，审美最好。`Crush + MiniMax M2.1` 次之。

`Gemini CLI + Gemini 3` 的产出质量一般，中英文混杂有点奇怪，而且只是单文件输出，没有做拆分。

`Claude Code + Opus 4.5` 的 UI 风格 AI 味太浓。

四者都能正常调用 `Agent Skills`，调用方式略有不同。`Gemini CLI` 是扫描当前项目所有文件，发现 Skills。

`Codex` 和 `Crush` 是扫描指定的 Skills 目录，发现可调用的 Skills。

`Claude Code` 对 Skills 的发现和调用能力最强，渐进式加载，按需引用。

### [联网搜索能力](https://idoubi.ai/blog/ai-agents-cowork#%E8%81%94%E7%BD%91%E6%90%9C%E7%B4%A2%E8%83%BD%E5%8A%9B)

AI 员工干活时，经常需要联网查询实时信息。接下来我们就来测试一下四个员工的联网搜索能力。

在工作间同步发送指令：

`广州明天天气怎么样?`

可以看到，四个员工都尝试联网查询天气信息，最后给出了自己的答案。

![Image 10](https://cdn.shipany.ai/imgs/7c57495face6c65f5a5208ce4e9c1c87.png)

*   `Claude Code` 内置 `Web Search` 能力，对用户输入的内容做了意图识别，转换成多个搜索 query，再调用联网工具搜索相关内容。从结果看，`Claude Code` 的联网搜索能力没问题，只是指代消解有点问题，把明天理解成了 `2025 年 1 月 1 日`

*   `Gemini CLI` 内置 `GoogleSearch` 工具，意图识别、指代消解都没问题，也搜索到了正确的信息。

*   `Codex` 内置了天气查询 API，根据意图识别和指代消解的结果，调用了天气查询 API，得到了正确的结果。

*   `Crush` 内置了 `agentic_fetch` 工具，但是不能正常调用，自然没法获取联网的实时信息。

对四个 AI 员工的联网搜索能力综合评估，`Gemini CLI` 胜出，毕竟爸爸是搜索大佬，内置搜索能力自然不在话下。

`Codex` 虽然没有内置搜索能力，但是意图识别很强，大概也内置了很多常用的工具，日常联网查信息没问题。

`Claude Code` 的 `Web Search` 工具不知道用的是哪家搜索服务商，基本使用没问题。

`Crush` 内置的 `agentic_fetch` 不够稳定，日常使用还需要通过第三方扩展来增强联网搜索能力。

AI 员工们内置的工具有限，能解决的问题也有限。我们可以通过挂载第三方工具的方式来增强 AI 员工们的专业技能，比如画图、tts、联网搜索等能力。

MCP 是目前挂载外部工具最好的方式，接下来我们就看看如何给 AI 员工们挂载第三方工具。

### [通过 MCP 挂载工具](https://idoubi.ai/blog/ai-agents-cowork#%E9%80%9A%E8%BF%87-mcp-%E6%8C%82%E8%BD%BD%E5%B7%A5%E5%85%B7)

我们以挂载高德地图 MCP 为例，讲解如何给 AI 员工们挂载第三方工具。

打开 [高德地图 MCP](https://lbs.amap.com/api/mcp-server/gettingstarted) 官网，申请开发者密钥，查看 MCP 服务器配置。

然后，在 AI 员工们支持的配置文件中写入高德地图的 MCP 服务器配置，key 统一用 `xxxxxx` 做脱敏处理。

*   `Claude Code` 配置 MCP

在 `~/.claude.json` 文件写入 MCP 服务器配置：

```
{
  "mcpServers": {
    "amap-maps": {
      "type": "http",
      "url": "https://mcp.amap.com/mcp?key=xxxxxx",
      "headers": {
        "Authorization": "Bearer xxxxxx"
      }
    }
  }
}
```

*   `Gemini CLI` 配置 MCP

在 `~/.gemini/settings.json` 文件写入 MCP 服务器配置：

```
{
  "mcpServers": {
    "amap-maps": {
      "httpUrl": "https://mcp.amap.com/mcp?key=xxxxxx",
      "headers": {
        "Authorization": "Bearer xxxxxx"
      }
    }
  }
}
```

*   `Codex` 配置 MCP

在 `~/.codex/config.toml` 文件写入 MCP 服务器配置：

```
[mcp_servers.amap-maps]
url = "https://mcp.amap.com/mcp?key=xxxxxx"
http_headers = { "Authorization" = "Bearer xxxxxx" }
```

*   `Crush` 配置 MCP

在 `~/.config/crush/crush.json` 文件写入 MCP 服务器配置：

```
{
  "mcp": {
    "amap-maps": {
      "type": "http",
      "url": "https://mcp.amap.com/mcp?key=xxxxxx",
      "headers": {
        "Authorization": "Bearer xxxxxx"
      }
    }
  }
}
```

*   `OpenCode` 配置 MCP

在 `~/.config/opencode/opencode.json` 文件写入 MCP 服务器配置：

```
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "amap-maps": {
      "type": "remote",
      "url": "https://mcp.amap.com/mcp?key=xxxxxx",
      "enabled": true,
      "headers": {
        "Authorization": "Bearer xxxxxx"
      }
    }
  }
}
```

打开一个新的工作间，启动 `Claude Code` / `Gemini CLI` / `Codex` / `Crush` / `OpenCode` 五个 AI 员工，在对话框同步输入：

`从广州开车去杭州怎么走？`

查看五个 Agents 的输出，可以看到他们都调用了 `amap-maps` 这个 MCP 服务器提供的若干工具，分别查询了广州和杭州两地的坐标，输出了正确的驾车路线规划。

![Image 11](https://cdn.shipany.ai/imgs/7fb9d1745bb4f2642adc23773f9447c0.png)

以此为例，我们可以根据实际的需求，给 AI 员工们挂载更多的 MCP 服务器，增强他们的专业技能。

通过上面的评估和测试，我们了解每个 AI 员工的能力和特点，他们基本上都能遵循 `agents.md` 的指令要求、调用 `Agent Skills`、挂载 `MCP Tools`，独自完成各类型的工作任务。

接下来很关键的一个问题：如何根据各个员工擅长的点，让他们分工协作，共同完成复杂度高的工作任务？

### [总分总协作模式](https://idoubi.ai/blog/ai-agents-cowork#%E6%80%BB%E5%88%86%E6%80%BB%E5%8D%8F%E4%BD%9C%E6%A8%A1%E5%BC%8F)

我们选 `Claude Code` 做架构师，告诉他项目需求，让他来设计方案，组织其他员工协同工作。

给 `Claude Code` 发送指令：

```
我有 6 个 AI 员工, 想让他们协作完成一个 todolist 项目, 你觉得至少需要多少个人配合? 怎么分工合理?
6 个 AI 员工分别是 claude code, gemini, codex, crush, opencode, kilocode.
codex 输出 ui 最好, 我想让他做前端, kilocode 不行, 我要踢掉他.
你来做架构设计, 其他4 个人,看看还需要几个人,怎么分工,怎么个工作流程?
```

`Claude Code` 给出了初步方案：

![Image 12](https://cdn.shipany.ai/imgs/1cbe620b080d505ddbe4b4d1b3116582.png)

跟 `Claude Code` 继续讨论方案，让他给出更详细的分工和流程。

```
1. 选择nextjs 做全栈开发框架.
2. 需要后端,用 api 操作数据,数据可以先存 localStorage
3. 后端选 gemini

用 nextjs15,你输出具体的操作步骤,我需要在同一个窗口给所有 agents 同时发布指令,让他们干活.
你来把控进度,最后我来验收

你把给每个人的指令写到文件里面,我只需要发送一个开始,然后每个人就自己领任务开始干活了,
你不要让我给每个人去发指令
```

讨论充分之后，`Claude Code` 创建了项目，完成了初始化，设计了架构方案和接口文档。并且把每个人的具体任务写到了 `TASKS.md` 文件中。

![Image 13](https://cdn.shipany.ai/imgs/b3cb3983aaa3e616f1b6c3155f4d0b90.png)

接下来，我只需要在工作空间，给参与工作的 AI 员工同步发送指令：

`读取 TASKS.md 文件，找到你的名字对应的任务，开始执行。完成后在文件中标记 [完成]`

然后 `Gemini` 作为后端开发，开始写 API 了。`Codex` 作为前端开发，开始写 UI 了。

`Crush` 作为系统测试，需要等前后端开发完成。`Claude Code` 作为架构师，需要最后来把控项目进度。

![Image 14](https://cdn.shipany.ai/imgs/fcfae8c27b9d9c39d94aefaec195bd51.png)

四个员工的配合工作顺序为：

![Image 15](https://cdn.shipany.ai/imgs/5cec3b82dd159279b95bd4dc22580235.png)

最终，他们协作完成了 `todolist` 项目的开发。

![Image 16](https://cdn.shipany.ai/imgs/9046611f408aec9e87b5c94de3a0793e.png)

在网页打开项目预览地址，验收他们的工作成果。完成的很不错，功能完整，UI 美观。

![Image 17](https://cdn.shipany.ai/imgs/67d27cc8cfdb98fbd0f8415252a1ae40.png)

### [其他协作模式](https://idoubi.ai/blog/ai-agents-cowork#%E5%85%B6%E4%BB%96%E5%8D%8F%E4%BD%9C%E6%A8%A1%E5%BC%8F)

按照上面的 `总分总协作模式`，五个 AI 员工配合得很好，协同完成了一个 todolist 项目。

我又问了 `Claude Code` 员工，还有没有其他协作模式。他给我推荐了几个常见的协作模式。

![Image 18](https://cdn.shipany.ai/imgs/d169a63aee13431131471072d94f3e35.png)

因为时间有限，我没有针对每个模式都设计一个案例让他们去协作完成了。大概总结了一下每种协作模式的特点和适用的场景。

![Image 19](https://cdn.shipany.ai/imgs/5d9ed97437927e8fe6bbacdea404b0a3.png)

理解清楚了这几种协作模式，我们可以让几个 AI 员工更加默契地参与我们的日常工作，帮助我们完成更多复杂的工作任务。

其中最有意思的就是 `群体自治` 模式了，几个 Agent 高度自治，协作、监督、执行，完美闭环，可能这就是 AGI 到来后的理想工作模式吧。

![Image 20](https://cdn.shipany.ai/imgs/985fa7d370b4a02d9a74879d9c74f74c.png)

在上一篇文章，有些朋友提了一些问题，我在这里统一回答一下。

1.   使用 Agent 的时候，经常需要人工确认，有什么办法关闭？

基本上每个 Agent 都支持 yolo（You Only Look Once） 模式，你只需要在每个 Agent 的配置文件写入这个配置，或者在对话框通过 `/:command` 命令开启即可。

*   比如 `Gemini CLI` 的 yolo 模式配置，在启动的时候传参控制：`gemini --yolo`
*   `Crush` 的 yolo 模式在对话框输入 `/yolo` 开启

1.   一个 `Claude Code` 多开窗口不就行了？为什么要整这个多 Agent？

不同的 Agent，有不同的实现逻辑，在某些特定的任务场景有不同的优势。比如 `Codex` 的 UI 质量最高，`Gemini CLI` 内置的联网搜索最好用，`Crush` 可以切换各种模型供应商。

尝试不同的 Agent，一方面可以体验各种新鲜的特性，另一方面也可以分散风险。比如 `Claude Code` 罢工了，至少还有别的 Agent 可以顶上。

1.   除了多个 Agent 外，还有什么方式可以组建 AI 员工团队？

Agent + Model 的排列组合，可以帮你创建各种特色的 AI 员工。

比如你可以只用 `Claude Code`，在同一个工作间，创建多个窗口，启用不同的模型，`Claude Sonnet`、`GLM-4.7`、`MiniMax M2.1` 等。

你也可以用多个 Agent，启用同一个模型，比如 `Codex` / `Crush` / `OpenCode`，都接入 `GPT-5.2` 模型。

没有固定的标准，找到适合自己的组合即可。

1.   Token 消耗是不是很大？如何降成本。

如果走 API 接入，Token 消耗很大，成本很高。

`Claude Code` / `Codex` / `Gemini CLI` 分别支持 `Claude` / `ChatGPT` / `Google` 网页版接入，可以复用网页版的充值权限，成本相对较低。

可以多个 Agent 切换使用，节约开支。

1.   这么多 Agent，怎么选择？

首选 `Claude Code`，综合实力最强，基本能完成日常的各类工作需求。

做网页比较多，对审美要求高的选择 `Codex`，速度比较慢，要有耐心。

对成本比较敏感，希望少花钱，选择 `Gemini CLI`。

如果上面几个 Agent 因为网络问题、充值问题不方便日常使用，可以考虑使用 `Crush`，`OpenCode`，接入 `OpenRouter` 等第三方 API。

1.   这些 Agent 跟 Cursor 比怎么样？

日常写代码比较多，推荐使用 `Cursor`，但是 Cursor 的 Agent 没办法用在任意终端软件。

而我们提到的这 6 个 Agent，可以在任意终端软件启用，也可以在 Cursor 的工作窗口启用，非常灵活。

本文解决了上一篇文章遗留的两个问题：

1.   如何增强 AI Agents 的专业技能

2.   如何让 AI Agents 协同工作

通过能力评估，我们了解了每个 Agent 对 `agents.md` 的理解能力，对 `Agent Skills` 的调用能力，以及自身集成的联网搜索能力。

通过 MCP 服务器的配置，我们学会了如何给 AI Agents 挂载第三方工具，增强他们的专业技能。

最后，通过一个实际的项目案例，演示了多智能体协同工作的流程，探讨了多智能体协作的常见模式。

都说 2025 是 Agent 元年，2026 大概率会迎来 Agent 的爆发。随着大模型能力的提升，Agent 能解决的问题会越来越多，协作能力会越来越强。

让我们保持足够的热情和好奇心，拥抱 Agent，逐梦 AGI。

> 2026，一起加油。
