# PRD到测试闭环系统说明

这个系统是当前仓库里一套可运行的 Python 闭环引擎，用来把软件类需求从 PRD 推进到测试结果。

代码位置：

- [business_loop](/Users/apple/Desktop/project/document/business_loop)

## 当前能力

系统当前支持：

- 解析 Markdown PRD
- 提取需求、约束和验收条件
- 在本地项目里搜索相关上下文
- 使用小模型压缩搜索结果
- 使用策略模型生成实现计划
- 按计划写入文件
- 执行测试命令
- 保存运行状态、阶段产物、事件日志和备份

## 核心模块

- [cli.py](/Users/apple/Desktop/project/document/business_loop/cli.py)
  - 命令行入口
- [engine.py](/Users/apple/Desktop/project/document/business_loop/engine.py)
  - 总调度器
- [prd.py](/Users/apple/Desktop/project/document/business_loop/prd.py)
  - PRD 解析
- [search.py](/Users/apple/Desktop/project/document/business_loop/search.py)
  - 本地搜索与上下文摘要
- [providers.py](/Users/apple/Desktop/project/document/business_loop/providers.py)
  - LLM provider 抽象与 OpenAI provider
- [executor.py](/Users/apple/Desktop/project/document/business_loop/executor.py)
  - 文件写入与命令执行
- [storage.py](/Users/apple/Desktop/project/document/business_loop/storage.py)
  - 产物落盘

## 当前执行阶段

当前引擎默认会执行这些阶段：

1. `validate`
2. `parse_prd`
3. `research`
4. `plan`
5. `implement`
6. `test`
7. `finalize`

## 项目初始化

为了让同一套系统可以在不同业务仓库之间复用，当前引擎支持先初始化目标项目。

命令：

```bash
python3 -m business_loop.cli init-project \
  --project-root /path/to/repo \
  --purpose "说明这个仓库是做什么的"
```

初始化后会在目标项目根目录下生成：

- `.business-loop/project.json`
- `.business-loop/memory.md`

`project.json` 主要保存：

- 项目名称
- 项目用途
- 业务域
- 技术栈
- 允许写入的目录
- 默认测试命令
- 是否在歧义时自动停止

`memory.md` 主要用于长期维护业务规则、口径和边界。

## 歧义阻断

系统现在支持在几类情况下自动停止，并把运行状态标记为 `blocked`：

- 需求不完整，无法形成稳定执行项
- 项目要求必须有验收条件，但当前需求缺失
- 模型判断业务逻辑无法安全决策
- 测试命令缺失且项目配置要求不能盲跑
- 写入路径超出允许范围

## provider 设计

系统默认支持两种 provider：

- `mock`
  - 用于本地演示和测试
- `openai`
  - 通过 OpenAI Responses API 调用模型

推荐分工：

- `research_provider`
  - 用于压缩本地搜索结果，优先使用轻量模型
- `strategy_provider`
  - 用于生成实现计划，优先使用更强模型

## 推荐命令

### 查看帮助

```bash
python3 -m business_loop.cli --help
```

### 运行一次 mock 闭环

```bash
python3 -m business_loop.cli run \
  --project-root path/to/project \
  --request "新增一个文本导出按钮，并补测试" \
  --strategy-provider mock \
  --research-provider mock \
  --mock-plan path/to/mock-plan.json \
  --test-command "python3 -m unittest discover -s tests"
```

### 查看运行状态

```bash
python3 -m business_loop.cli status --run-dir .tmp/business-loop-runs/<run-id>
```

## mock plan 格式

`mock` 模式下可通过 `--mock-plan` 传入 JSON 文件，结构如下：

```json
{
  "summary": "实现摘要",
  "files": [
    {
      "path": "app/example.py",
      "content": "print('hello')\n",
      "reason": "新增示例文件"
    }
  ],
  "test_commands": [
    "python3 -m unittest discover -s tests"
  ],
  "notes": "本次运行说明"
}
```

## 对真实项目的建议

- 先在副本仓库里运行，不要直接在核心仓库第一次接真模型
- 先缩小允许写入的目录范围
- 先显式提供测试命令
- 先让小模型只做摘要，不直接做实施
- 先保留人工审核节点，再决定是否放开自动写入

## 测试

当前已补基础单元测试：

- [test_prd.py](/Users/apple/Desktop/project/document/tests/test_prd.py)
- [test_engine.py](/Users/apple/Desktop/project/document/tests/test_engine.py)
- [test_workspace.py](/Users/apple/Desktop/project/document/tests/test_workspace.py)

运行方式：

```bash
python3 -m unittest discover -s tests -v
```
