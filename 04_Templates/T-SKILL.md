---
name: your-skill-name
description: Use this skill when the user needs a repeatable workflow with stable inputs and outputs.
---

# Skill Name

## 何时使用

当用户出现哪些典型请求时，应触发这个 skill。

## 输入

- 输入类型 1
- 输入类型 2

## 输出

- 输出类型 1
- 输出类型 2

## 工作流

1. 第一步：判断输入是否满足 skill 适用条件
2. 第二步：如有脚本或模板，优先复用
3. 第三步：按固定结构产出结果
4. 第四步：如有必要，更新相关文档或下游文件

## 资源加载规则

- 当需要固定命令时，优先使用 `scripts/`
- 当需要领域细节时，按需读取 `references/`
- 当需要输出模板时，优先复用 `assets/` 或仓库模板

## 边界

- 哪些情况不适合使用这个 skill
- 哪些信息不足时需要先补上下文

## 交付要求

- 输出必须结构化
- 保持和仓库现有命名、模板、工作流一致
