# Skill 开发流程

这个流程用于把“重复问题”稳定沉淀成 skill。

## 目标

不是把任何问题都做成 skill，而是把那些：

- 会反复出现
- 有稳定流程
- 值得交给其他 agent 一致执行

的能力固化下来。

## 适用时机

当出现下面任意情况时，启动这个流程：

- 同类任务重复出现
- 同类任务每次都要重复解释
- 已经有脚本、模板或参考材料可以复用
- 希望把能力交给其他 agent 时也能稳定执行

## 标准流程

### 1. 记录候选

先在 [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md) 里登记。

如果需要单独展开，再基于 [T-Skill候选卡.md](/Users/apple/Desktop/project/document/04_Templates/T-Skill候选卡.md) 建详细卡片。

### 2. 定义边界

写清楚四件事：

- 这个 skill 解决什么问题
- 不解决什么问题
- 典型输入是什么
- 典型输出是什么

如果这一步说不清，通常说明还不适合 skill 化。

### 3. 设计资源

按最小可复用原则判断要不要准备：

- `scripts/`：用于稳定执行固定命令或处理逻辑
- `references/`：用于按需加载的细节说明
- `assets/`：用于输出模板或静态资源

不要先堆很多文件，先保证最小可用。

### 4. 创建 skill 工作区

本仓库里的 skill 草稿默认放在：

- `skills/<skill-name>/`

最少应包含：

- `SKILL.md`

如果需要，再补：

- `scripts/`
- `references/`
- `assets/`

`SKILL.md` 可以从 [T-SKILL.md](/Users/apple/Desktop/project/document/04_Templates/T-SKILL.md) 开始。

### 5. 接入和验证

至少验证三件事：

- 触发条件是否明确
- 工作流是否真的可执行
- 输出是否和仓库现有结构兼容

如果 skill 无法稳定复用，就不要急着标成 `active`。

### 6. 回写文档

完成后必须同步更新：

1. [AGENTS.md](/Users/apple/Desktop/project/document/AGENTS.md)
2. [README.md](/Users/apple/Desktop/project/document/README.md)
3. [Skill候选池.md](/Users/apple/Desktop/project/document/08_Skills/Candidates/Skill候选池.md)
4. 必要时补充 `99_System` 或 `05_Workflows` 说明

## 状态流转

推荐状态流转如下：

`idea -> candidate -> incubating -> active`

如果发现不值得继续维护，则转为：

`archived`

## 当前推荐优先级

优先做那些直接服务你当前知识库主流程的 skill：

1. 来源自动摘要
2. 视频结构化拆解
3. PDF 重点提取
4. 多来源主题合并
5. 分享文档生成
