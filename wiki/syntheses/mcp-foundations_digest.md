---
type: synthesis
form: digest
created_at: 2026-05-06
based_on_sources:
  - 2025-04-11_article_idoubi_mcp-transport
  - 2025-04-12_article_idoubi_mcp-lifecycle
  - 2025-04-13_article_idoubi_mcp-architecture
  - 2025-06-16_article_idoubi_mcp-is-all-you-need
  - 2025-07-17_article_idoubi_my-mcp-book
  - 2025-12-31_article_idoubi_ai-agents-cowork
  - 2026-01-03_article_idoubi_my-ai-2025
based_on_entities: [MCP, Anthropic, Claude Code, Superpowers, OpenSpec]
based_on_concepts: [AI 工作流, AI Agent]
publishability: 1
triggered_by: ingest 2026-05-06 of idoubi MCP 三件套 + 本质论 + 横评
---

# MCP 基础：三件套技术骨架 + 与 OpenSpec / Superpowers / Skills 的关系

## TL;DR

- **MCP = AI 时代的 LSP**（不是 HTTP）——LSP 解耦工具与编辑器，MCP 解耦工具与 LLM，结构同构
- 完整技术栈三件套：**传输层**（stdio / Streamable HTTP）+ **生命周期**（三阶段 + 8 项能力协商）+ **架构**（host/client/server 三层 + 资源/提示词/工具三类）
- MCP 与 [[OpenSpec]] / [[Superpowers]] / Agent Skills **互补不替代**——四者分管不同关注点
- 双边网络效应已确立，但 **"MCP is all you need" 是营销话术**——MCP 只解工具调用，不解 reasoning / planning

## 三件套技术骨架（来自 艾逗笔 2025-04 三天连发）

### 传输层（[[2025-04-11_article_idoubi_mcp-transport]]）

| Transport | 场景 | 特点 |
|---|---|---|
| **stdio** | 本地进程 | 换行分隔，无依赖，最快最安全；单进程限制 |
| **SSE**（即将废弃）| 远程 HTTP | 双通道（SSE + POST），多客户端但 serverless 不友好 |
| **Streamable HTTP**（2025-03-26 新增）| 云原生 | 单通道 + 会话管理 + 断点恢复 |
| **自定义 REST** | 分布式代理 | 无状态短连接 |

关键性质：**协议与传输解耦**——任何双向通信通道都能跑

### 生命周期（[[2025-04-12_article_idoubi_mcp-lifecycle]]）

```
[初始化]
  client 发 initialize（带版本 + 能力）
  → server 响应（同上）
  → client 发 initialized 通知
[操作]
  根据协商能力请求列表 / 读资源 / 调工具
  例：tools/list → tools/call
[关闭]
  stdio：关 stdin → SIGTERM → SIGKILL
  HTTP：关连接
```

**8 项可协商能力**：roots / sampling / prompts / resources / tools / logging / experimental / 其他扩展

**三大错误场景**（必须处理）：超时 / 版本不匹配 / 能力协商失败

### 架构（[[2025-04-13_article_idoubi_mcp-architecture]]）

```
Host（Claude / Cursor / Claude Code）
  ↓
Client 进程 (1:1)
  ↕ JSON-RPC
Server 进程（外部工具）
```

**4 大设计原则**：服务器易构建 / 高度可组合 / 服务器隐私（不读整个对话）/ 功能逐步添加

**3 类功能**：资源（数据）/ 提示词（模板）/ 工具（函数）

**4 类消息**：请求 / 响应 / 通知 / 批处理

**安全机制**：用户同意 + 数据隐私 + 工具安全 + LLM 采样控制

## MCP 类比的三种说法对比

| 类比 | 出处 | 准确度 | 我的判断 |
|---|---|---|---|
| **AI 时代的 HTTP 协议** | idoubi [[2025-06-16_article_idoubi_mcp-is-all-you-need]] | ⭐⭐ | 弱——HTTP 是端到端通信，MCP 是工具调用 |
| **秦始皇统一六国** | 同上 | ⭐⭐⭐ | 强（描述生态统一作用），弱（带政治隐喻）|
| **AI 时代的 LSP** | idoubi [[2025-04-13_article_idoubi_mcp-architecture]] 暗示 | ⭐⭐⭐⭐⭐ | **最准**——LSP 解耦 IDE 与语言工具，MCP 解耦 LLM 与工具，结构完全同构 |

本 wiki 推荐用 **LSP 类比**作为 MCP entity 的标准认知锚点。

## MCP × OpenSpec × Superpowers × Agent Skills 关系矩阵

四个看起来都和"AI 编程怎么干活"有关的概念，**实际上分管完全不同的关注点**：

| 工具 | 管什么 | 形态 | 与 LLM 的关系 |
|---|---|---|---|
| **[[OpenSpec]]** | 开发的 spec | 文件系统 Markdown 工件（proposal / design / spec / tasks）| 写给 LLM 看的设计契约 |
| **[[Superpowers]]** | 开发的工作流 | Claude Code / Cursor 插件，注入 7 个 skill | 在 LLM 内部跑的工程流水线 |
| **Agent Skills** | Agent 行为 | Markdown skill 文件 | 告诉 LLM "在场景 X 应该 Y" |
| **[[MCP]]** | 工具调用协议 | 进程间 JSON-RPC | 让 LLM 调用外部工具 |

**两条互补链**：

- **开发链**：[[OpenSpec]] 写 spec → [[Superpowers]] 跑实现 → 代码完成
- **运行链**：Agent Skills 告诉 agent 怎么做 → [[MCP]] 让 agent 调外部工具 → 任务完成

艾逗笔 [[2026-01-03_article_idoubi_my-ai-2025]] 给的最清晰区分：**"Skills 给 Agent 看说明书，MCP 给工具写说明书"**

## 时间线（关键节点）

```
2024-11  Anthropic 发布 MCP
2025-01  Cursor / Perplexity 跟进
2025-03  Manus 爆火带动认知（"鸡蛋悖论"破局）
2025-03-26  Streamable HTTP 替代 SSE
2025-04  idoubi 三件套（11/12/13 三天连发）
2025-06  idoubi MCP 本质论
2025-07  《这就是 MCP》中文第一本
2025-10  Anthropic Agent Skills 发布（与 MCP 互补）
2025-12  idoubi 横评 5 个 agent 全部能挂载 MCP
2026 初  MCP.so 年访问 11M，被 a16z 引用
```

## 反神话集

- "MCP is all you need" → 营销话术，MCP 只解工具调用层
- "MCP 取代 Function Calling" → 互补——FC 仍是单模型最快路径，MCP 是跨模型标准
- "MCP server 越多越好" → 90% 是噱头，需要 App Store / Router 筛选
- "装 MCP 就让 agent 变强" → 工具不是能力，agent 还需要 reasoning + planning

## 与现有 syntheses 的关系

- vs [[openspec-vibecoding_digest]]：那是 OpenSpec × Vibecoding 5 阶段；本篇把 MCP 放进同一坐标，可作为该 digest 的"运行时维度"补充
- vs [[openspec-superpowers_workflow_digest]]：那是 OpenSpec × Superpowers 文件 handshake；本篇是 OpenSpec × Superpowers × Agent Skills × MCP 四件套全图——可作为该 digest 的"扩展上下文"
- vs [[idoubi-vibecoding-journey_timeline]]：那是 idoubi 个人演进，本篇是 idoubi 知识里"技术骨架"部分的提炼

## 可输出方向

- "MCP 入门一篇看懂"——传输 + 生命周期 + 架构 + 与 OpenSpec/Superpowers 关系
- "AI 编程四件套关系图"——OpenSpec × Superpowers × Agent Skills × MCP 各管什么
- "MCP server 反神话指南"——挑出真有用的 server，分类排雷

## 待补 / 待证伪

- # TODO 找一份非 idoubi 来源的 MCP 技术深度文章，验证三件套的描述准确性
- # TODO MCP App Store / Router 的实际筛选机制——是用户评分？还是工具描述质量？
- # TODO MCP 与 OpenAI 的 Function Calling 在多模型项目里如何混用
- # TODO MCP 的安全模型（用户同意机制）在生产环境的真实落地案例
