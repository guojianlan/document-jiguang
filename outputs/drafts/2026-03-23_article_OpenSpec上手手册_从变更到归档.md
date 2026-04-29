---
type: output
output_type: article
status: draft
topic: OpenSpec
audience: 想快速跑通 OpenSpec 最小实践闭环的开发者
created_at: 2026-03-23
---

# OpenSpec 上手手册：从一次变更开始，把 AI 编程跑成可验证流程

![OpenSpec 变更结构图](../../07_Attachments/2026-03-23_openspec-change-architecture.png)

如果把 OpenSpec 理解成一套工程工具，它最适合的上手方式不是先记所有概念，而是先跑通一条完整闭环。

这条闭环不复杂：

`初始化 -> 创建变更 -> 写 Proposal / Design / Spec / Tasks -> 验证 -> 归档`

真正难的地方，不是命令，而是你要知道每一步为什么存在。

## 一、先明确：OpenSpec 管的是变更，不是页面

在 OpenSpec 里，一次工作最好从一个 change 开始，而不是从一个散乱需求开始。

因为 change 天然回答了三个问题：

- 这次改的是什么
- 这次改动的边界在哪里
- 这轮工作结束之后，应该沉淀什么

所以第一次练手，最好选一个边界清楚的任务，例如：

- 给后台系统加登录超时提醒
- 给评论功能加审核状态
- 给订单接口补统一错误码

不要一开始就选“重构整个后台”。

## 二、初始化项目

先在项目根目录执行：

```bash
openspec init
```

如果你不想进入交互式配置，也可以直接：

```bash
openspec init --tools none
```

初始化完成后，你会看到类似这样的结构：

```text
your-project/
├── .openspec/
├── openspec/
│   ├── AGENTS.md
│   ├── project.md
│   ├── changes/
│   └── specs/
```

这个结构里最关键的是两件事：

- `changes/` 是进行中的改动
- `specs/` 是当前已经成立的事实

## 三、创建一个新的 change

命令行方式可以这样做：

```bash
openspec new change add-session-timeout-warning
```

名称尽量使用 `kebab-case`，并且直接体现改动意图。  
像 `feature1`、`update2` 这种命名，在后期几乎没有可维护性。

创建完成后，你会得到一个新的变更目录。接下来真正重要的不是马上写代码，而是先把四类工件补齐。

## 四、先写 Proposal，不要急着进实现

Proposal 要解决的不是“把需求描述得更漂亮”，而是先把边界收住。

一份合格的 `proposal.md`，至少应该回答：

- 为什么做
- 具体改什么
- 不改什么
- 用什么标准算完成

如果这一步写不清楚，AI 在后面实现时就会不断替你补充隐含假设。  
这通常不是惊喜，而是返工的开始。

## 五、再写 Design，把实现路径先定下来

`design.md` 是很多团队最容易省掉、也最容易后悔省掉的一层。

它不要求你写成大论文，但至少要说明：

- 模块边界怎么拆
- 数据怎么流动
- 是否会影响现有接口
- 有没有关键权衡

如果 proposal 负责定义“为什么改”，design 负责定义“准备怎么改”。  
这一步存在的意义，是防止 AI 在实现阶段自己发明架构。

## 六、Spec 才是 OpenSpec 的硬核部分

Spec 不只是“写功能说明”，而是把行为契约写出来。

常见写法是：

- `Requirement` 定义能力
- `Scenario` 定义行为和边界

例如：

```md
## ADDED Requirements

### Requirement: 登录超时前给出提醒

系统 SHALL 在用户会话即将超时时给出可见提醒。

#### Scenario: 正常提醒

Given 用户处于已登录状态
And 会话还有 2 分钟到期
When 系统检测到会话接近超时
Then 页面显示提醒信息
And 用户可以选择继续会话

#### Scenario: 已过期不再提醒

Given 用户会话已经失效
When 页面发起受保护操作
Then 系统直接进入未登录处理流程
```

这段 spec 的价值不在于语言多正式，而在于它把行为写成了可验证场景。

一旦场景清楚，AI 的实现空间就会更收敛，后续测试也更容易设计。

## 七、Tasks 不是装饰，它决定执行顺序

很多人会在写完 proposal、design、spec 之后，直接跳去实现。  
但 `tasks.md` 其实很关键。

因为它在做一件很现实的事：

把抽象变更，拆成一串能执行、能回看、能验收的动作。

比较稳的 tasks，通常具备三个特点：

- 每一项都足够具体
- 有明显前后依赖关系
- 做完之后能判断是否完成

这一步的本质，是把 change 从“想法集合”变成“施工清单”。

## 八、为什么一定要 validate

一旦引入规格文档，另一个常见问题就出现了：  
写了很多，但格式混乱、场景缺失、结构不完整。

所以 OpenSpec 才把验证做成显式动作：

```bash
openspec validate add-session-timeout-warning
```

这一步不是形式主义，而是在确认：

- 必需章节是否存在
- Delta 格式是否正确
- Requirement 和 Scenario 是否成形

如果你不做 validate，那么这些 Markdown 很可能只是“看起来认真”，却无法真正参与后续流程。

## 九、最后的关键动作不是提交代码，而是 archive

很多团队的问题，不是不会推进 change，而是不会结束 change。

OpenSpec 通过 `archive` 提供了一个非常清楚的收口动作：

```bash
openspec archive
```

它的意义不是简单归档文件，而是把这轮变更沉淀回主规格，让项目重新回到“当前事实明确”的状态。

没有 archive，变更永远悬在半空。  
做了 archive，项目才真正完成了一轮演进。

## 十、第一次上手最容易犯的错

### 1. 把 change 命名得过于模糊

名字越模糊，后续越难回看。

### 2. Proposal 写成泛泛而谈的需求背景

如果没有范围，AI 一定会补范围。

### 3. Spec 只有 Requirement，没有 Scenario

没有场景，行为边界就不清楚。

### 4. Validate 之前就直接实现

这会让后续返工更贵。

### 5. 改完之后不 archive

这样会让项目里同时堆着太多“半完成状态”的变更。

## 十一、最小实践建议

第一次不要追求复杂项目，只要跑通这条主链路就够了：

1. `openspec init`
2. `openspec new change <name>`
3. 写 `proposal.md`
4. 写 `design.md`
5. 写 `specs/`
6. 写 `tasks.md`
7. `openspec validate <name>`
8. 实现
9. `openspec archive`

你真正要学会的，不是某个命令，而是这条链路背后的判断：

先对齐，再实现；先约束，再加速；先验证，再沉淀。

这才是 OpenSpec 对 AI 编程最有价值的部分。

## 参考来源

- [[2026-03-23_link_openspec-practical-guide]]
- [[2026-03-23_link_openspec-e4-bd-bf-e7-94-a8-e6-89-8b-e5-86-8c]]
