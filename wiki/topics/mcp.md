---
type: topic
slug: mcp
aliases: [MCP, Model Context Protocol, model-context-protocol]
domains: [domain/ai-agent, domain/infra]
sources:
  - 2025-04-11_article_idoubi_mcp-transport
  - 2025-04-12_article_idoubi_mcp-lifecycle
  - 2025-04-13_article_idoubi_mcp-architecture
  - 2025-06-16_article_idoubi_mcp-is-all-you-need
  - 2025-07-17_article_idoubi_my-mcp-book
  - 2025-12-31_article_idoubi_ai-agents-cowork
  - 2026-01-03_article_idoubi_my-ai-2025
  - 2026-01-24_article_idoubi_vibe-coding-workany
  - 2026-04-05_article_idoubi_my-vibe-coding-projects
  - 2026-03-25_article_huishe-ji_figma-official-mcp
  - 2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills
  - 2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems
related_topics: [claude-code, openspec, ai-agent, ai-workflow]
status: active
created_at: 2026-05-06
updated_at: 2026-05-07
---

# MCP（Model Context Protocol）

## 是什么

Anthropic 2024-11 发布的 LLM 工具调用协议标准——让任意 LLM（host）能通过统一的 client-server 协议，调用任意第三方工具 / 资源 / 提示词。**结构同构于 LSP**（语言服务器协议）：LSP 解耦工具与编辑器，MCP 解耦工具与 LLM。

## 核心架构

三层架构：

```
Host（Claude / Cursor / Claude Code）
   ↓
Client 进程
   ↕  （JSON-RPC over 三种 transport）
Server 进程（外部工具实现方）
```

设计原则：服务器易构建 / 高度可组合 / 服务器隐私 / 功能逐步添加（详见 [[2025-04-13_article_idoubi_mcp-architecture]]）

## 三层技术栈（来自 idoubi MCP 三件套）

| 层 | 内容 | 来源 |
|---|---|---|
| **传输** | stdio（本地）/ SSE（即将废弃）/ Streamable HTTP（云原生）/ 自定义 REST | [[2025-04-11_article_idoubi_mcp-transport]] |
| **生命周期** | 三阶段（初始化 / 操作 / 关闭）+ 8 项能力协商 + 三大错误场景 | [[2025-04-12_article_idoubi_mcp-lifecycle]] |
| **架构** | host / client / server 三层 + 资源 / 提示词 / 工具三类功能 + 4 类消息 | [[2025-04-13_article_idoubi_mcp-architecture]] |

## 时间线（关键节点）

- **2024-11**：Anthropic 发布
- **2025-01**：Cursor / Perplexity 跟进支持
- **2025-03**：Manus 爆火带动 MCP 大规模认知
- **2025-03-26**：Streamable HTTP 替代 SSE
- **2025-04**：idoubi 三件套技术深度文章（11/12/13 三天连发）
- **2025-06**：idoubi《MCP is all you need》本质论
- **2025-07**：idoubi《这就是 MCP》中文第一本系统书出版
- **2025-10**：Anthropic 推出 Agent Skills（与 MCP 互补不替代）
- **2026 初**：MCP.so 年访问 11M，被 a16z 引用做行业报告
- **2026-03-25**：Figma 官方 MCP server 发布（[[2026-03-25_article_huishe-ji_figma-official-mcp]]）——首个一线设计工具厂商主动提供官方 MCP，标志生态从"工具被动接入"到"工具主动提供"
- **2026-04-08**：DESIGN.md 作为"AI 时代设计师与工程师协作契约"被命名（[[2026-04-08_article_ai-chongdianguan_awesome-design-md-58-ui-systems]]），与 MCP 在设计/规范层面同源——MCP 是运行时协议，DESIGN.md 是设计时规约
- **2026-Q1**：MCP × Skill 配合具体落地（如 Better Icons MCP server + skill 组合，[[2026-03-17_article_huishe-ji_one-skill-remove-ai-flavor-6-design-skills]]）

## vs Function Calling（三维差异）

| 维度 | Function Calling | MCP |
|---|---|---|
| 协议层级 | 单模型范式 | 跨模型协议标准 |
| 功能种类 | 仅工具 | 资源 + 提示词 + 工具 |
| 复用 | 每个模型重新实现 | 一次实现处处可用 |

## 与 Agent Skills 的关系

idoubi 在 [[2026-01-03_article_idoubi_my-ai-2025]] 给出最清晰的区分：

- **Agent Skills**：给 Agent 看的"说明书"——Skill 文件告诉 agent "在什么场景应该怎么做"
- **MCP**：给工具写的"说明书"——MCP server 告诉 agent "我能做什么、参数是什么"

互补不替代。一个完整的 Agent 通常 = Agents.md（约定）+ Agent Skills（行为）+ MCP（工具）。

## 当前稳定结论

- MCP 是 2024-2026 年间 AI 生态最重要的基础设施级协议——idoubi 称之为"AI 时代的 HTTP 协议"，本 wiki 倾向更准确的"AI 时代的 LSP"比喻
- 双边网络效应已确立：服务器多 → host 必须支持 → 更多服务器加入
- 5 大生态位：服务器 / MCP App Store / 服务路由（如 MCP.so / OpenRouter 类比）/ 终端 chatbot 与 agent / CLI 工具

## 反例 / 待证伪

- "MCP is all you need"是营销话术，**MCP 只是工具调用层**，不能解决 reasoning / planning / context 长度等核心问题
- MCP server 数量爆炸的另一面是**质量参差**——idoubi 自己也承认 90% MCP 是噱头，需要 MCP App Store / Router 这类筛选层
- # TODO MCP server 与传统 OpenAPI / GraphQL API 的边界——什么时候应该写 MCP，什么时候直接写 REST
- # TODO MCP 的安全模型实战表现——idoubi [[2025-04-13_article_idoubi_mcp-architecture]] 提到的"用户同意 + 数据隐私"在生产环境怎么落地

## 与其他 topic 的对照

- **vs [[openspec|OpenSpec]]**：OpenSpec 是"开发流程的 spec"——人写给 AI 看的设计契约；MCP 是"运行时的 spec"——AI 调用工具时的协议契约。前者管 agent 怎么开发产品，后者管 agent 怎么调外部工具
- **vs [[claude-code|Claude Code]]**：Claude Code 是 MCP 的最重要 host 之一，原生支持 MCP server 挂载

## 相关来源

- idoubi MCP 三件套：[[2025-04-11_article_idoubi_mcp-transport]]、[[2025-04-12_article_idoubi_mcp-lifecycle]]、[[2025-04-13_article_idoubi_mcp-architecture]]
- 本质论：[[2025-06-16_article_idoubi_mcp-is-all-you-need]]
- 出书：[[2025-07-17_article_idoubi_my-mcp-book]]
- 实战横评：[[2025-12-31_article_idoubi_ai-agents-cowork]]
- 年终视野：[[2026-01-03_article_idoubi_my-ai-2025]]

## 当前可输出方向

- MCP × OpenSpec × Superpowers 三件套对比（已有 synthesis 候选）
- MCP 在中文 AI 编程社区的接入路径调研
- "MCP server 反神话"——哪些 server 真有用，哪些是噱头
- MCP 对独立开发者的"卖铲子"机会分析
