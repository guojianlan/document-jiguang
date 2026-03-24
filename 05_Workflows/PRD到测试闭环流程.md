# PRD到测试闭环流程

这个流程用于把一个软件类 PRD 推进到“形成实现计划、写入文件、执行测试、输出结果”的可运行闭环。

它和“业务闭环设计流程”的区别是：

- `业务闭环设计流程` 更偏方法论，回答“能不能闭环、怎么设计”
- `PRD到测试闭环流程` 更偏执行，回答“拿到 PRD 之后系统怎么跑”

当前仓库提供的 Python 引擎位于：

- [business_loop](/Users/apple/Desktop/project/document/business_loop)

系统说明见：

- [PRD到测试闭环系统说明](/Users/apple/Desktop/project/document/99_System/PRD到测试闭环系统说明.md)
- [业务闭环面板说明](/Users/apple/Desktop/project/document/99_System/业务闭环面板说明.md)

## 适用场景

- 需要把 PRD 变成一条可重复执行的软件交付链
- 需要在真实项目里跑“读 PRD -> 搜索上下文 -> 生成实现计划 -> 写文件 -> 跑测试”
- 需要把小模型用于搜索摘要，把更强模型用于实现规划
- 需要把每次运行的产物、状态和日志落盘

## 标准链路

默认按下面顺序执行：

1. 初始化项目画像
2. 读取 PRD 或自然语言需求
3. 解析需求、约束和验收条件
4. 在项目里本地搜索相关上下文
5. 用研究模型压缩搜索结果
6. 用策略模型生成实现计划
7. 如果业务规则不清，自动停止并等待人工确认
8. 在允许的目录中写入或替换文件
9. 执行测试命令
10. 输出运行结果、事件日志和阶段产物

## 初始化项目

在第一次接入一个仓库或目录时，先执行初始化。

初始化会在目标项目根目录下创建：

- `.business-loop/project.json`
- `.business-loop/memory.md`

其中：

- `project.json` 用来声明这个仓库是做什么的、允许写哪些目录、默认跑什么测试
- `memory.md` 用来持续记录稳定业务规则、边界和人工审核口径

示例：

```bash
python3 -m business_loop.cli init-project \
  --project-root /path/to/repo \
  --name "crm-system" \
  --purpose "用于管理客户、商机和销售流程" \
  --business-domain "CRM" \
  --stack "Python FastAPI Vue" \
  --allowed-write-root app \
  --allowed-write-root tests \
  --test-command "python3 -m unittest discover -s tests"
```

## 两种运行方式

### 1. 直接给 PRD

```bash
python3 -m business_loop.cli run \
  --prd path/to/prd.md \
  --project-root /path/to/repo
```

### 2. 直接给自然语言需求

```bash
python3 -m business_loop.cli run \
  --project-root /path/to/repo \
  --request "新增客户列表筛选功能，并补对应测试"
```

系统会把这个需求先包装成临时 PRD，再继续往下执行。

### 3. 用本地面板运行

```bash
python3 -m business_loop.cli serve-panel --open
```

或者：

```bash
bash scripts/start_business_loop_panel.sh
```

## 自动停止规则

当前系统已经支持几类“停下等待人工”的情况：

1. 当前需求里没有可执行的 `需求` 列表
2. 项目配置要求必须提供 `验收`，但当前 PRD 没有
3. 策略模型判断业务规则不一致、缺失或无法安全决策
4. 没有测试命令且项目配置要求不能盲跑
5. 计划写入的文件不在允许目录内

出现这些情况时，运行状态会标记为 `blocked`。

## 旧版最小链路

下面保留旧版的最小链路描述，便于理解：

1. 读取 PRD
2. 解析需求、约束和验收条件
3. 在项目里本地搜索相关上下文
4. 用研究模型压缩搜索结果
5. 用策略模型生成实现计划
6. 在项目目录中写入或替换文件
7. 执行测试命令
8. 输出运行结果、事件日志和阶段产物

## 当前实现边界

当前版本已经支持：

- Markdown PRD 解析
- 本地仓库搜索
- 双模型分工
- 文件写入
- 测试执行
- 运行日志与阶段产物落盘
- mock provider 和 OpenAI provider

当前版本暂未覆盖：

- 自动 patch 合并
- 多 agent 并行协同
- 长链路任务队列
- 自动回滚复杂文件变更
- 面向任意大型代码库的上下文切片优化

## 推荐运行方式

### 1. 先用 mock 模式跑通

先验证系统链路本身，不要一开始就接真实模型。

### 2. 再接入 OpenAI provider

推荐把模型拆成两层：

- 搜索摘要：优先用更轻量的模型
- 实现规划：优先用更强的模型

### 3. 最后接真实测试命令

测试命令最好显式传入，例如：

- `python3 -m unittest discover -s tests`
- `pytest -q`
- `npm test`

## 推荐输入格式

为了让 PRD 解析更稳定，建议至少包含这些章节：

- 标题
- 背景或简介
- `## 需求`
- `## 约束`
- `## 验收`

如果后续要长期复用，建议优先使用：

- [T-PRD-交付需求.md](/Users/apple/Desktop/project/document/04_Templates/T-PRD-交付需求.md)

## 最小命令

```bash
python3 -m business_loop.cli run \
  --project-root path/to/project \
  --request "新增一个文本导出按钮，并补测试" \
  --strategy-provider mock \
  --research-provider mock \
  --mock-plan path/to/mock-plan.json \
  --test-command "python3 -m unittest discover -s tests"
```

## OpenAI 模式示例

```bash
export OPENAI_API_KEY=your_key

python3 -m business_loop.cli run \
  --prd path/to/prd.md \
  --project-root path/to/project \
  --strategy-provider openai \
  --research-provider openai \
  --strategy-model gpt-5.4 \
  --research-model gpt-5.4-mini \
  --test-command "python3 -m unittest discover -s tests"
```

## 运行产物

每次运行都会在输出目录下生成：

- `run.json`
- `events.jsonl`
- `parse_prd/`
- `research/`
- `plan/`
- `implement/`
- `test/`
- `finalize/`
- `backups/`

## 协作原则

- 先跑 mock，确认链路完整
- 再接真实模型，避免一开始把问题混在一起
- 小模型优先做搜索压缩和上下文摘要
- 强模型优先做实现规划
- 测试命令尽量由人显式提供，而不是完全交给模型猜
- 真正进入真实项目之前，先限定允许写入的目录和可接受的测试命令
