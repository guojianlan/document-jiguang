---
source_type: wechat_article
source_url: https://mp.weixin.qq.com/s/AQCUsRiD7EXtputcZSTSGQ
title: Github 157k Star Superpowers + Claude code 交付工程级代码
author: 智慧问数
publish_date: 2026-04-18
fetched_at: 2026-05-07
---

# Github 157k Star Superpowers + Claude code 交付工程级代码

![](https://mmbiz.qpic.cn/sz_mmbiz_png/B06kOflIwBBnQaw3lRuzQTVMXT11HJotib0wR1UyJEeh0ibBwfibPsn9tUpbTyWaUBxIWQ4LxIlicU6BAbGumUMzuccXkNNichMPPPJp8cDG2Vog/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

https://github.com/obra/superpowers

Superpowers是面向Coding Agent的完整软件开发方法论。14项核心技能，将AI从无情的代码输出机器，进化为有标准、守流程、讲规范的工程协作角色，稳定交付成熟、可靠的工程级代码。

支持：Claude Code、OpenAI Codex CLI/App、Cursor、GitHub Copilot CLI、Gemini CLI、OpenCode

### Superpowers工作流：

```
用户提出需求
    ↓
① brainstorming（头脑风暴）→ 产出设计文档
    ↓
② using-git-worktrees（创建隔离工作区）→ 新分支 + 干净测试基线
    ↓
③ writing-plans（编写实现计划）→ 2-5分钟粒度的详细任务
    ↓
④ subagent-driven-development / executing-plans（执行计划）
    ↓  每个任务：
    ├─ 分派实现者子代理
    ├─ 规格合规审查
    └─ 代码质量审查
    ↓
⑤ test-driven-development（贯穿全程）→ RED-GREEN-REFACTOR
    ↓
⑥ requesting-code-review（请求代码审查）
    ↓
⑦ finishing-a-development-branch（完成开发分支）→ 合并/PR/保留/丢弃
```

### Superpowers Marketplace 安装】（Claude code）

```
/plugin marketplace add obra/superpowers-marketplace
```

```
/plugin install superpowers@superpowers-marketplace
```

### Skills Library

## 测试类（Testing)

- test-driven-development

## 调试类（Debugging）

- systematic-debugging
- verification-before-completion

# 协作类（Collaboration）

- brainstorming
- writing-plans
- executing-plans
- dispatching-parallel-agents
- requesting-code-review
- receiving-code-review
- using-git-worktrees
- finishing-a-development-branch
- subagent-driven-development

# Meta

- writing-skills
- using-superpowers

一、 测试类 (Testing)

**1、test-driven-development**

- 描述：RED-GREEN-REFACTOR（红 - 绿 - 重构）
- 能力：先测试、后编码的逆向开发模式，用测试定义需求，再实现功能

## 二 、调试类（Debugging）

2、systematic-debugging

- 描述：4-phase root cause process（四阶段根因定位流程）
- 能力：拒绝盲目猜测、无序调试，以标准化流程实现 100% 精准定位问题根源，避免 “试错式改代码” 导致的二次问题

### 核心流程：四阶段根因定位法

<table style="width:568px;"><tbody><tr><td data-colwidth="40"><section style="line-height: 1.6em;"><span leaf=""><span textstyle="" style="font-size: 14px;">1</span></span></section></td><td data-colwidth="93"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">复现问题</span></span></section></td><td data-colwidth="435"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">先通过稳定步骤复现 Bug，确认问题真实存在（无法复现的问题无法有效调试）</span></span></section></td></tr><tr><td data-colwidth="40"><section style="line-height: 1.6em;"><span leaf=""><span textstyle="" style="font-size: 14px;">2</span></span></section></td><td data-colwidth="93"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">收集证据</span></span></section></td><td data-colwidth="435"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">提取日志、报错堆栈、数据快照、调用链路等客观信息，完全依赖事实而非经验判断；</span></span></section></td></tr><tr><td data-colwidth="40"><section style="line-height: 1.6em;"><span leaf=""><span textstyle="" style="font-size: 14px;">3</span></span></section></td><td data-colwidth="93"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">定位根因</span></span></section></td><td data-colwidth="435"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">穿透表面现象，找到导致问题的唯一核心原因（而非 “看起来相关” 的次要因素）</span></span></section></td></tr><tr><td data-colwidth="40"><section style="line-height: 1.6em;"><span leaf=""><span textstyle="" style="font-size: 14px;">4</span></span></section></td><td data-colwidth="93"><section style="line-height: 1.6em;"><span leaf=""><span textstyle="" style="font-size: 14px;">修复验证</span></span></section></td><td data-colwidth="435"><section style="line-height: 1.6em;"><span leaf="" data-pm-slice="1 1 [&quot;list&quot;,{&quot;type&quot;:&quot;ol&quot;,&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: start; white-space: normal; display: block; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;,&quot;class&quot;:&quot;list-paddingleft-1&quot;,&quot;start&quot;:null},&quot;listitem&quot;,{&quot;style&quot;:&quot;color: rgb(0, 0, 0); font: 16px / 24px ui-sans-serif, system-ui, sans-serif, \&quot;Apple Color Emoji\&quot;, \&quot;Segoe UI Emoji\&quot;, \&quot;Segoe UI Symbol\&quot;, \&quot;Noto Color Emoji\&quot;; font-size: 16px; font-weight: 400; line-height: 24px; text-align: left; white-space: normal; display: list-item; flex: 0 1 auto; flex-direction: row; justify-content: normal; align-items: normal; padding: 0px; margin: 0px; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box; background-color: rgba(0, 0, 0, 0);&quot;},&quot;para&quot;,null]"><span textstyle="" style="font-size: 14px;">针对根因制定修复方案，初步验证修复效果（最终需配合另一技能完成闭环）</span></span></section></td></tr></tbody></table>

⚠️AI 的证据收集受限于上下文窗口。在大项目中，四阶段调试易因**信息丢失**而失效。建议配合 Sentry 等**可观测性工具**，自动注入关键证据。

3、verification-before-completion

- 描述：Ensure it's actually fixed（确保问题真的被修复）
- 能力：调试环节的最终 “质检铁闸”，杜绝 “主观判断修复”“未验证即收尾” 导致的假修复、漏修复；

# 三、协作类（Collaboration）

Superpowers的**核心模块**，严格按照「**设计 → 计划 → 执行 → 审查收尾**」完整研发流水线划分，标准化多代理 / 团队协作全流程，统一动作规范、交付标准与协作模式。

## 📐设计阶段

### 4、brainstorming

### 头脑风暴 & 设计推演

- 描述：Socratic design refinement
- 能力：采用苏格拉底式提问法，层层澄清模糊需求，避免理解偏差；至少输出 2~3 套备选技术方案，结构化拆分设计内容，最终沉淀正式设计文档。

## 📋计划阶段

### 5、writing-plans

### 编写落地计划

- 描述：Detailed implementation plans
- 能力：精细化任务拆解，将需求拆分为 2-5 分钟最小粒度可执行单元，每份计划明确实现逻辑、代码范围、完整验证命令，杜绝模糊任务。

#### ⚠️潜在风险：关注“幻觉放大”风险在 writing-plans和 executing-plans 之间，增加一个人工 Quick Check（快速检查点），或者强制要求 AI 在计划中引用官方文档链接。

## ⚙️ 执行阶段

### 6、executing-plans

### 计划批量执行

- 描述：Batch execution with checkpoints
- 能力：无多子agent环境的降级执行方案，依靠人工检查点分段推进任务，批量落地计划，保证执行节奏可控、步骤不遗漏、过程可回溯。

### 7、 dispatching-parallel-agents

### 并行代理调度

- 官方描述：Concurrent subagent workflows
- 能力：拆分独立问题域，调度多个子agent并行工作，支持同时推进 3 项独立问题排查与开发，大幅提升整体交付效率。

**⚠️**物理并行受制于 API 限额，更多是逻辑隔离。其价值在于避免单点过载，非单纯追求速度，能有效防止 Agent 因上下文过载而“思维混乱”。

### 8、subagent-driven-development

### 子代理驱动开发

- 描述：Fast iteration with two-stage review
- 能力：标准化子agent协作模式，每个任务独立分配新代理；实行双层审查机制：先校验规格合规性，再审核代码质量。
- 🔁 审查与收尾

### 9、requesting-code-review

### 发起代码评审

- 描述：Pre-review checklist
- 能力：代码提交前标准化自检，指派专属代码审查子agent；按严重等级分为 关键 / 重要 / 次要 分级整改，配套统一评审模板，让代码审查有标准、可落地。

### 10、receiving-code-review

### 接收评审反馈

- 描述：Responding to feedback
- 能力：规范评审反馈应对原则，拒绝无意义的表演性妥协；以技术验证为核心，坚守 YAGNI 极简设计原则，对不合理、无效评审意见可理性有理反驳。

### 11、using-git-worktrees

### 多工作树并行开发

- 描述：Parallel development branches
- 能力：借助 Git Worktrees 隔离多分支工作区，实现多需求并行开发；保障环境独立隔离、安全验证、项目自动配置，维持干净稳定的测试基线，避免分支互相污染。

**⚠️**潜在风险：Git Worktrees 虽然通过目录隔离实现了高效的并行开发，但若缺乏严格的自动化生命周期管理（如及时清理元数据、避免路径变动），极易导致仓库引用失效、磁盘冗余及分支状态冲突等维护难题。

### 12、 finishing-a-development-branch

### 分支收尾闭环

- 描述：Merge/PR decision workflow
- 能力：开发收尾标准化流程：先完成全量测试验证，再提供合并、提 PR、保留分支、丢弃分支四种决策，最后统一清理工作环境，完成项目迭代闭环。

四、Meta

## 13、writing-skills

## 技能编写能力

- 描述：Create new skills following best practices

- 能力：标准化自定义创建、编写、迭代、完善新技能的专属能力，统一全生态技能的撰写规范、结构、约束与质量标准，保证新增技能合规、可用、无漏洞。

## 14、using-superpowers

## 技能体系使用总则

- 描述：Introduction to the skills system

- 能力：整个 Superpowers 系统的全局强制使用规则，是所有技能调用的最高行为准则，定义「什么时候必须用技能」。

tips：

Superpowers VS Everything Claude Code

```
Superpowers ："AI代理太随意，怎么让它守纪律？"
```

解决行为问题：AI 代理知道该做什么但不做（跳过测试、猜测调试、盲目同意）。它的答案是：强制流程 + 反合理化 + 铁律。

```
ECC ："AI代理能力不够，怎么给它更多工具？"
```

ECC 解决能力问题：AI 代理缺少专业工具和知识。它的答案是：更多代理 + 更多技能 + 持续学习 + 安全扫描。

两者并非互斥，但设计哲学的根本差异导致它们在以下方面走向不同方向：

差异对比：

<table style="width:563px;"><tbody><tr><td data-colwidth="121"><section><span leaf=""><span textstyle="" style="font-size: 16px;font-weight: bold;">差异&nbsp;</span></span></section></td><td data-colwidth="191"><p><span leaf=""><span textstyle="" style="font-size: 16px;font-weight: bold;">Superpowers</span></span></p></td><td data-colwidth="251"><section><span leaf=""><span textstyle="" style="font-size: 16px;font-weight: bold;">ECC</span></span></section></td></tr><tr><td data-colwidth="121"><p><span leaf=""><span textstyle="" style="font-size: 14px;">核心隐喻 &nbsp;</span></span></p></td><td data-colwidth="191"><section><span leaf=""><span textstyle="" style="font-size: 14px;">纪律教官</span></span></section></td><td data-colwidth="251"><section><span leaf=""><span textstyle="" style="font-size: 14px;">工具箱&nbsp;</span></span></section></td></tr><tr><td data-colwidth="121"><section><span leaf=""><span textstyle="" style="font-size: 14px;">对AI的假设&nbsp;</span></span></section></td><td data-colwidth="191"><p><span leaf=""><span textstyle="" style="font-size: 14px;">AI 知道该做什么但会偷懒</span></span></p></td><td data-colwidth="251"><p><span leaf=""><span textstyle="" style="font-size: 14px;">AI 需要更多工具才能做好</span></span></p></td></tr><tr><td data-colwidth="121"><section><p><span leaf=""><span textstyle="" style="font-size: 14px;">质量保证方式</span></span></p></section></td><td data-colwidth="191"><p><span leaf=""><span textstyle="" style="font-size: 14px;">流程强制（不做完不通过）</span></span></p></td><td data-colwidth="251"><p><span leaf=""><span textstyle="" style="font-size: 14px;">工具增强（给了你工具，你就能做好）</span></span></p></td></tr><tr><td data-colwidth="121"><p><span leaf=""><span textstyle="" style="font-size: 14px;">复杂度策略</span></span></p></td><td data-colwidth="191"><p><span leaf=""><span textstyle="" style="font-size: 14px;">削减（YAGNI）</span></span></p></td><td data-colwidth="251"><p><span leaf=""><span textstyle="" style="font-size: 14px;">增加（全面覆盖）</span></span></p></td></tr><tr><td data-colwidth="121"><p><span leaf=""><span textstyle="" style="font-size: 14px;">Token 策略</span></span></p></td><td data-colwidth="191"><p><span leaf=""><span textstyle="" style="font-size: 14px;">精简（每个词都有用）</span></span></p></td><td data-colwidth="251"><p><span leaf=""><span textstyle="" style="font-size: 14px;">丰富（更多上下文 = 更好决策）</span></span></p></td></tr></tbody></table>

**⚠️Superpowers**：**指令精简，但过程冗余**。为了换取确定性，它牺牲了 Token 效率（通过冗长的推理链来保证不出错）。

**⚠️ECC**：**指令复杂，但目标导向**。依赖丰富的上下文（Memory）来减少重复推理，但在简单任务上可能显得“杀鸡用牛刀”。

适用场景：

<table><tbody><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 16px;font-weight: bold;">场景</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 16px;font-weight: bold;">推荐</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 16px;font-weight: bold;">说明</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><p><span leaf=""><span textstyle="" style="font-size: 14px;">个人开发者，追求简单高效 &nbsp;</span></span></p></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Superpowers</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">自动触发，零配置，强制纪律保证质量</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><p><span leaf=""><span textstyle="" style="font-size: 14px;">团队开发，需要统一标准&nbsp;</span></span></p></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Superpowers&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">7 阶段强制流水线确保一致性</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><p><span leaf=""><span textstyle="" style="font-size: 14px;">安全敏感项目 &nbsp;</span></span></p></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">ECC&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">AgentShield 安全扫描无可替代</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">需要跨会话记忆&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">ECC&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Instinct + 记忆持久化&nbsp;</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">多语言大型项目&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">ECC&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">语言专属代理覆盖更广</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><p><span leaf=""><span textstyle="" style="font-size: 14px;">AI 代理纪律性差、常走捷径</span></span></p></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Superpowers&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">反合理化设计 + 铁律级强制&nbsp;</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">想要精细控制每个环节&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">ECC&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">命令提供手动控制&nbsp;</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Token 预算有限&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Superpowers&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">精简技能，上下文占用小 （</span></span><strong style="-webkit-font-smoothing: antialiased;" data-pm-slice="0 0 []"><span data-spm-anchor-id="5176.28103460.0.i21.6e232988QWurGT" style="-webkit-font-smoothing: antialiased;"><span leaf="">⚠️</span></span></strong><span leaf=""><span textstyle="" style="font-size: 14px;">但需要考虑14个阶段影响）</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">初学者</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">Superpowers&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">上手即用，无需学习命令&nbsp;</span></span></section></td></tr><tr><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">高级用户/定制需求&nbsp;</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">ECC</span></span></section></td><td data-colwidth="191" style="width: 772px;"><section><span leaf=""><span textstyle="" style="font-size: 14px;">&nbsp;高度可组合，可精细调整</span></span></section></td></tr></tbody></table>

最佳实践 ：对于严肃项目，以 Superpowers 为基础流程框架（保证纪律），再按需集成 ECC 的 AgentShield 安全扫描和 Instinct 持续学习能力（增强能力），取两者之长。

---

Superpowers 本质上是一套“防御性编程”的操作系统。它通过增加流程成本（Token 消耗、时间成本）来换取结果的确定性。

没有银弹，只有权衡（Trade-offs）。

追求“极速 MVP”或处理“一次性脚本”，这套方法论可能会让你感到“束手束脚”。

追求“工业级交付”或进行“核心业务重构”，这套方法论就是你的“安全气囊”。
