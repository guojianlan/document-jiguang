---
source_type: github_repo
source_url: https://github.com/shareAI-lab/learn-claude-code
fetched_at: 2026-05-07
fetched_by: sub-agent
purpose: 为"Claude Code 内部 12 组件"文章提供代码层证据
---

# learn-claude-code 12 节课提取（代码 + 关键判断）

仓库定位：把 Claude Code 拆成 12 个递进式的 harness 机制。每章在前一章基础上加**一个**机制，循环本身（s01）始终不变。作者反复强调的核心命题：

> Agency 来自模型训练，不是来自 harness 编排。harness 工程师的工作不是写智能，而是为模型构建栖居的世界。

## 仓库整体结构

```
learn-claude-code/
├── agents/                         # 12 节课的 Python 参考实现
│   ├── s01_agent_loop.py          (120 行)
│   ├── s02_tool_use.py            (150 行)
│   ├── s03_todo_write.py          (211 行)
│   ├── s04_subagent.py            (187 行)
│   ├── s05_skill_loading.py       (227 行)
│   ├── s06_context_compact.py     (256 行)
│   ├── s07_task_system.py         (243 行)
│   ├── s08_background_tasks.py    (234 行)
│   ├── s09_agent_teams.py         (403 行)
│   ├── s10_team_protocols.py      (484 行)
│   ├── s11_autonomous_agents.py   (586 行)
│   ├── s12_worktree_task_isolation.py (782 行)
│   └── s_full.py                  (740 行) — 总纲
├── docs/{en,zh,ja}/               # 12 节课的心智模型文档（3 语言）
├── skills/                        # s05 的 SKILL.md 示例（pdf, code-review, mcp-builder, agent-builder）
└── web/                           # Next.js 交互式学习平台
```

12 章命名跟 longjing-agent 文章列的有差异：作者后半段不是 "Hook / 上下文 / 权限 / MCP / 记忆"，而是 **任务系统 → 后台执行 → 团队协作 → 协议握手 → 自治 → worktree 隔离**。换句话说，repo 把"多 agent 协作"当成 Claude Code 后半部分的真正主线，而不是 hook/MCP。

12 章对应表（含每章工具数）：

| 课 | 名 | 格言 | 工具数 |
|---|---|---|---|
| s01 | Agent Loop | One loop & Bash is all you need | 1 |
| s02 | Tool Use | 加一个工具，只加一个 handler | 4 |
| s03 | TodoWrite | 没有计划的 agent 走哪算哪 | 5 |
| s04 | Subagent | 大任务拆小，每个小任务干净的上下文 | 5 |
| s05 | Skills | 用到什么知识，临时加载什么知识 | 5 |
| s06 | Context Compact | 上下文总会满，要有办法腾地方 | 5 |
| s07 | Task System | 大目标拆成小任务，排好序，记在磁盘上 | 8 |
| s08 | Background Tasks | 慢操作丢后台，agent 继续想下一步 | 6 |
| s09 | Agent Teams | 任务太大一个人干不完 | 9 |
| s10 | Team Protocols | 队友之间要有统一的沟通规矩 | 12 |
| s11 | Autonomous Agents | 队友自己看看板，有活就认领 | 14 |
| s12 | Worktree + Task | 各干各的目录，互不干扰 | 16 |

学习路径分四阶段：**循环 → 规划与知识 → 持久化 → 团队**。

---

## S01 最小智能体（The Agent Loop）

**定位**：一个 while 循环 + 一个 bash 工具 = 一个 agent。不到 30 行代码就是 Claude Code 的全部内核。

**核心代码**（`agents/s01_agent_loop.py`）：

```python
def agent_loop(messages: list):
    while True:
        response = client.messages.create(
            model=MODEL, system=SYSTEM, messages=messages,
            tools=TOOLS, max_tokens=8000,
        )
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            return
        results = []
        for block in response.content:
            if block.type == "tool_use":
                output = run_bash(block.input["command"])
                results.append({"type": "tool_result", "tool_use_id": block.id,
                                "content": output})
        messages.append({"role": "user", "content": results})
```

**关键判断**：

- 退出条件**只**是 `stop_reason != "tool_use"`，不是任何外部规划逻辑。模型自己决定何时停。
- 后面 11 章都在这个循环上**叠加机制**，循环本身始终不变。"循环属于 agent，机制属于 harness。"
- bash 一个工具就够 agent 干活——理由是 LLM 训练数据里有海量 shell 命令，bash 是模型能调用的最大行动空间。

---

## S02 工具箱（Tool Use）

**定位**：循环不动，新工具只是注册到 dispatch map（`{name: handler}`）里。

**核心代码**（`agents/s02_tool_use.py`）：

```python
TOOL_HANDLERS = {
    "bash":       lambda **kw: run_bash(kw["command"]),
    "read_file":  lambda **kw: run_read(kw["path"], kw.get("limit")),
    "write_file": lambda **kw: run_write(kw["path"], kw["content"]),
    "edit_file":  lambda **kw: run_edit(kw["path"], kw["old_text"], kw["new_text"]),
}

# 循环内只多一行 dispatch：
handler = TOOL_HANDLERS.get(block.name)
output = handler(**block.input) if handler else f"Unknown tool: {block.name}"
```

**关键判断**：

- 作者直接写在文件 docstring 里："**The loop didn't change at all. I just added tools.**" —— 这是整个仓库最重要的一句话。
- 工具设计原则：原子化、可组合、描述清晰。每个工具是 agent 能在环境中采取的一个行动。
- 所有文件操作都过 `safe_path()`：路径必须在 WORKDIR 内，逃逸检测。这是 harness 工程师的**权限边界**职责，不是模型的事。

---

## S03 Todo 清单（TodoWrite）

**定位**：模型自己写自己的待办，harness 在它"忘了更新 todo"时戳它一下。

**核心代码**（`agents/s03_todo_write.py`，nag 提醒机制）：

```python
def agent_loop(messages: list):
    rounds_since_todo = 0
    while True:
        # ...LLM 调用 + 工具执行...
        used_todo = False
        for block in response.content:
            if block.type == "tool_use":
                # 执行工具...
                if block.name == "todo":
                    used_todo = True
        rounds_since_todo = 0 if used_todo else rounds_since_todo + 1
        if rounds_since_todo >= 3:
            results.append({"type": "text", "text": "<reminder>Update your todos.</reminder>"})
        messages.append({"role": "user", "content": results})
```

TodoManager 的硬约束：最多 20 个 todo、同一时刻最多一个 `in_progress`、状态只能是 `pending/in_progress/completed`。

**关键判断**：

- "**没有计划的 agent 走哪算哪**" —— 强制规划能让多步任务完成率翻倍。
- nag 提醒（3 轮没碰 todo 就注入 `<reminder>`）是 harness 用来"轻推"模型的标准手法，不是 prompt 工程，是循环内插值。
- TodoManager 是 Python 内存对象。下一章（s07）会把它升级为磁盘上的依赖图。

---

## S04 子智能体（Subagent）

**定位**：spawn 一个子 agent，给它**全新的 messages=[]**，干完只返回最后一条 text 给父。父的上下文不被污染。

**核心代码**（`agents/s04_subagent.py`）：

```python
def run_subagent(prompt: str) -> str:
    sub_messages = [{"role": "user", "content": prompt}]  # fresh context
    for _ in range(30):  # safety limit
        response = client.messages.create(
            model=MODEL, system=SUBAGENT_SYSTEM, messages=sub_messages,
            tools=CHILD_TOOLS, max_tokens=8000,
        )
        sub_messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "tool_use":
            break
        results = []
        for block in response.content:
            if block.type == "tool_use":
                handler = TOOL_HANDLERS.get(block.name)
                output = handler(**block.input)
                results.append({"type": "tool_result", "tool_use_id": block.id,
                                "content": str(output)[:50000]})
        sub_messages.append({"role": "user", "content": results})
    # Only the final text returns to the parent -- child context is discarded
    return "".join(b.text for b in response.content if hasattr(b, "text")) or "(no summary)"
```

**关键判断**：

- 子 agent 的工具集**不包含 `task`**——禁止递归 spawn，避免无限分叉。
- 文件 docstring 关键句："**Process isolation gives context isolation for free.**" 子进程模式天然带来上下文隔离。
- 父子共享文件系统但**不共享对话历史**。子 agent 的全部探索过程被丢弃，只有摘要回到父。这是上下文管理的核心招数。

---

## S05 技能加载（Skills）

**定位**：两层 skill 注入。Layer 1 在 system prompt 里只放 skill 名 + 一句描述（约 100 token/skill）；Layer 2 模型调用 `load_skill` 才把完整正文塞进 tool_result。

**核心代码**（`agents/s05_skill_loading.py`）：

```python
class SkillLoader:
    def _load_all(self):
        for f in sorted(self.skills_dir.rglob("SKILL.md")):
            text = f.read_text()
            meta, body = self._parse_frontmatter(text)  # YAML frontmatter
            name = meta.get("name", f.parent.name)
            self.skills[name] = {"meta": meta, "body": body, "path": str(f)}

    def get_descriptions(self) -> str:  # Layer 1: 短描述进 system prompt
        lines = []
        for name, skill in self.skills.items():
            desc = skill["meta"].get("description", "No description")
            lines.append(f"  - {name}: {desc}")
        return "\n".join(lines)

    def get_content(self, name: str) -> str:  # Layer 2: 完整 body 进 tool_result
        skill = self.skills.get(name)
        return f"<skill name=\"{name}\">\n{skill['body']}\n</skill>"
```

SKILL.md 的标准格式（来自 `skills/pdf/SKILL.md`）：

```markdown
---
name: pdf
description: Process PDF files - extract text, create PDFs, merge documents.
  Use when user asks to read PDF, create PDF, or work with PDF files.
---

# PDF Processing Skill
You now have expertise in PDF manipulation. Follow these workflows:
...
```

**关键判断**：

- "**Don't put everything in the system prompt. Load on demand.**" —— 这是 Anthropic Skill 机制最核心的一句话，作者直接当 docstring 写在文件里。
- description 字段的写法很重要：要写"什么时候用我"（"Use when user asks to..."），让模型自己判断该不该 load_skill。这跟 ingest skill 的 frontmatter 设计同源。
- skill body 通过 `<skill>` XML 标签包裹注入，模型对 XML 块敏感。

---

## S06 上下文压缩（Context Compact）

**定位**：三层压缩流水线让 agent 能跑无限会话。Claude Code 真正实现"长任务"的关键。

**核心代码**（`agents/s06_context_compact.py`）：

```python
# Layer 1: micro_compact —— 每轮静默执行，把超过最近 3 个的非 read_file 工具结果替换成占位符
def micro_compact(messages: list) -> list:
    tool_results = [...]  # 收集所有 tool_result
    if len(tool_results) <= KEEP_RECENT:  # KEEP_RECENT = 3
        return messages
    to_clear = tool_results[:-KEEP_RECENT]
    for _, _, result in to_clear:
        tool_name = tool_name_map.get(tool_id, "unknown")
        if tool_name in PRESERVE_RESULT_TOOLS:  # {"read_file"} 不压
            continue
        result["content"] = f"[Previous: used {tool_name}]"
    return messages

# Layer 2: auto_compact —— token 估算超 50000 时，全量摘要替换
def auto_compact(messages: list) -> list:
    transcript_path = TRANSCRIPT_DIR / f"transcript_{int(time.time())}.jsonl"
    # 先存全量到 .transcripts/，再调 LLM 生成摘要
    response = client.messages.create(
        messages=[{"role": "user", "content":
            "Summarize this conversation for continuity. Include: "
            "1) What was accomplished, 2) Current state, 3) Key decisions made."
            + conversation_text}],
        max_tokens=2000,
    )
    summary = ...
    return [{"role": "user", "content": f"[Conversation compressed. Transcript: {transcript_path}]\n\n{summary}"}]

# Layer 3: compact 工具 —— 模型主动调用，立刻触发 auto_compact
```

**关键判断**：

- 三层是**频率 × 强度**的搭配：micro 每轮跑（cheap）、auto 阈值触发（middle）、compact 工具模型主动调（manual）。这不是"一种压缩"，是三种压缩组合成一个流水线。
- `read_file` 结果**不被压缩**——理由是它们是引用材料，压了会让 agent 重读。这是个反直觉但正确的判断。
- "agent 能策略性地遗忘并永远工作下去" —— 压缩前把全量存到 `.transcripts/`，让回溯可能。
- token 估算用 `len(str(messages)) // 4`，简单但够用。

---

## S07 任务系统（Task System）

**定位**：把 s03 的内存清单升级为**磁盘上的依赖图**。每个任务一个 JSON 文件，带 `blockedBy` 边。这是 s07 之后所有协作机制（s08/s09/s12）的协调骨架。

**核心代码**（`agents/s07_task_system.py`）：

```python
class TaskManager:
    def create(self, subject, description=""):
        task = {"id": self._next_id, "subject": subject,
                "status": "pending", "blockedBy": [], "owner": ""}
        self._save(task)
        return json.dumps(task, indent=2)

    def _clear_dependency(self, completed_id):
        # 完成任务时，自动从所有其他任务的 blockedBy 中移除自己
        for f in self.dir.glob("task_*.json"):
            task = json.loads(f.read_text())
            if completed_id in task.get("blockedBy", []):
                task["blockedBy"].remove(completed_id)
                self._save(task)

    def update(self, task_id, status=None, add_blocked_by=None, ...):
        task = self._load(task_id)
        if status:
            task["status"] = status
            if status == "completed":
                self._clear_dependency(task_id)  # 自动解锁后续
        ...
```

**关键判断**：

- 磁盘 JSON 是**故意**选择，不是图省事。理由：context compact（s06）一跑内存清单就没了，但磁盘任务图能跨会话存活。"任务图比任何一次对话都长命。"
- 状态机 `pending → in_progress → completed`，外加 `blockedBy` 边构成 DAG。任务图随时回答三问：什么能做、什么被卡、什么做完。
- 完成任务时**自动**遍历所有任务清理依赖——这是图调度器的标配，但放到 agent harness 里很关键，因为 agent 不会显式触发"解锁"。

---

## S08 后台任务（Background Tasks）

**定位**：慢命令丢后台线程，agent 继续想下一步。下次 LLM 调用前从队列排空通知，作为 user 消息注入。

**核心代码**（`agents/s08_background_tasks.py`）：

```python
class BackgroundManager:
    def run(self, command: str) -> str:
        task_id = str(uuid.uuid4())[:8]
        self.tasks[task_id] = {"status": "running", "command": command}
        thread = threading.Thread(
            target=self._execute, args=(task_id, command), daemon=True)
        thread.start()
        return f"Background task {task_id} started"

    def _execute(self, task_id, command):
        r = subprocess.run(command, shell=True, ..., timeout=300)
        with self._lock:
            self._notification_queue.append({
                "task_id": task_id, "result": output[:500]})

# 主循环每次 LLM 调用前排空队列
def agent_loop(messages):
    while True:
        notifs = BG.drain_notifications()
        if notifs:
            messages.append({"role": "user",
                "content": f"<background-results>\n{notif_text}\n</background-results>"})
        response = client.messages.create(...)
```

**关键判断**：

- **循环保持单线程**，只有子进程 I/O 被并行化。这是个重要克制——避免 race condition。
- 通知通过"下一轮 LLM 调用前注入 user 消息"送达，而不是中断当前推理。模型保持连贯思考。
- daemon 线程意味着主进程退出时后台任务自动死亡，没有清理负担。

---

## S09 Agent 团队（Agent Teams）

**定位**：从一次性 subagent 升级到**持久化队友**。每个队友有身份、状态、独立的 agent loop 线程，通过 JSONL 邮箱通信。

**核心代码**（`agents/s09_agent_teams.py`，MessageBus）：

```python
class MessageBus:
    def send(self, sender, to, content, msg_type="message", extra=None):
        msg = {"type": msg_type, "from": sender,
               "content": content, "timestamp": time.time()}
        if extra: msg.update(extra)
        with open(self.dir / f"{to}.jsonl", "a") as f:
            f.write(json.dumps(msg) + "\n")

    def read_inbox(self, name):  # append-only + drain-on-read
        path = self.dir / f"{name}.jsonl"
        msgs = [json.loads(l) for l in path.read_text().strip().splitlines() if l]
        path.write_text("")  # drain
        return json.dumps(msgs, indent=2)

# 每个队友在每次 LLM 调用前检查收件箱
def _teammate_loop(self, name, role, prompt):
    messages = [{"role": "user", "content": prompt}]
    for _ in range(50):
        inbox = BUS.read_inbox(name)
        if inbox != "[]":
            messages.append({"role": "user",
                "content": f"<inbox>{inbox}</inbox>"})
        # ...LLM call + tool execute...
```

**关键判断**：

- 邮箱用 **JSONL append-only + drain-on-read**——简单、并发安全、可审计。所有消息留痕在 `.team/inbox/<name>.jsonl`。
- 队友 = 配置文件中的一个条目 + 一个守护线程 + 一个 inbox 文件。三件套。
- 这套机制是**教学实现**（README 范围说明里明确写了），不是 Claude Code 真实实现。但抽象正确：identity + lifecycle + channel。

---

## S10 团队协议（Team Protocols）

**定位**：所有协调（关机、计划审批）都用**同一个 request-response 模式**：发起方生成 request_id，响应方引用 request_id 回复。FSM 是 `pending → approved | rejected`。

**核心代码**（`agents/s10_team_protocols.py`）：

```python
shutdown_requests = {}  # 全局 tracker
plan_requests = {}

def handle_shutdown_request(teammate: str) -> str:
    req_id = str(uuid.uuid4())[:8]
    shutdown_requests[req_id] = {"target": teammate, "status": "pending"}
    BUS.send("lead", teammate, "Please shut down gracefully.",
             "shutdown_request", {"request_id": req_id})
    return f"Shutdown request {req_id} sent (status: pending)"

# 队友响应
if tool_name == "shutdown_response":
    req_id = args["request_id"]
    approve = args["approve"]
    shutdown_requests[req_id]["status"] = "approved" if approve else "rejected"
    BUS.send(sender, "lead", args.get("reason", ""),
             "shutdown_response",
             {"request_id": req_id, "approve": approve})
```

**关键判断**：

- "**一个 FSM，两种用途**" —— 同样的 `pending → approved | rejected` 状态机套用关机和计划审批。这是抽象的力量。
- 高风险操作（关机、重构）必须经过握手，避免"领导一句话队友立刻乱改代码"。
- request_id 是关联键，没有它就退化成普通消息。

---

## S11 自治 Agent（Autonomous Agents）

**定位**：队友自己扫任务看板找活干。WORK 阶段做完进 IDLE，IDLE 每 5 秒轮询 inbox + 任务板，60 秒没活就自动 shutdown。压缩后**重新注入身份块**避免遗忘自己是谁。

**核心代码**（`agents/s11_autonomous_agents.py`）：

```python
def _idle_poll(self, name, messages):
    for _ in range(IDLE_TIMEOUT // POLL_INTERVAL):  # 60s / 5s = 12 次
        time.sleep(POLL_INTERVAL)
        inbox = BUS.read_inbox(name)
        if inbox:
            messages.append({"role": "user", "content": f"<inbox>{inbox}</inbox>"})
            return True
        unclaimed = scan_unclaimed_tasks()
        if unclaimed:
            claim_task(unclaimed[0]["id"], name)
            messages.append({"role": "user",
                "content": f"<auto-claimed>Task #{unclaimed[0]['id']}: "
                           f"{unclaimed[0]['subject']}</auto-claimed>"})
            return True
    return False  # timeout -> shutdown

# 身份重注入：上下文短到 ≤3 条说明刚被压缩过
if len(messages) <= 3:
    messages.insert(0, {"role": "user",
        "content": f"<identity>You are '{name}', role: {role}, "
                   f"team: {team_name}. Continue your work.</identity>"})
    messages.insert(1, {"role": "assistant",
        "content": f"I am {name}. Continuing."})
```

**关键判断**：

- 自治 = 任务板 + IDLE 阶段 + 自动认领。领导不用逐个分配，扩展性大幅提升。
- "**身份重注入**"是个特别精彩的 hack：检测到 messages 长度短就推断刚发生了 compact，重新塞入身份块。这是把 s06 压缩和 s11 持久身份**正交组合**的关键代码。
- 60 秒空闲超时是**有意**的——agent 不该无限期等待。这是控制资源浪费的硬边界。
- 认领条件：`status==pending` AND `not owner` AND `not blockedBy`。三个条件缺一不可，避免抢活。

---

## S12 Worktree + 任务隔离（Worktree Isolation）

**定位**：control plane（`.tasks/` 任务板）+ execution plane（`.worktrees/` git worktree 目录）通过 task_id 双向绑定。每个任务独立目录，Agent 之间永不碰撞。生命周期事件流写到 `.worktrees/events.jsonl`。

**核心代码**（`agents/s12_worktree_task_isolation.py`）：

```python
def bind_worktree(self, task_id, worktree):
    task = self._load(task_id)
    task["worktree"] = worktree
    if task["status"] == "pending":
        task["status"] = "in_progress"  # 绑定 worktree 自动推进任务状态
    self._save(task)

def remove(self, name, force=False, complete_task=False):
    self._run_git(["worktree", "remove", wt["path"]])
    if complete_task and wt.get("task_id") is not None:
        self.tasks.update(wt["task_id"], status="completed")
        self.tasks.unbind_worktree(wt["task_id"])
        self.events.emit("task.completed", ...)
```

事件流示例（`.worktrees/events.jsonl`）：

```json
{"event": "worktree.remove.after",
 "task": {"id": 1, "status": "completed"},
 "worktree": {"name": "auth-refactor", "status": "removed"},
 "ts": 1730000000}
```

事件类型：`worktree.create.before/after/failed`、`worktree.remove.before/after/failed`、`worktree.keep`、`task.completed`。

**关键判断**：

- **control plane 和 execution plane 分离**——任务管"做什么"，worktree 管"在哪做"，task_id 是关联键。这是 Kubernetes 风格的设计在 agent harness 里的复刻。
- `worktree_remove(name, complete_task=True)` 一次调用同时拆除目录 + 完成任务 + 发事件——这是把"工作完成"的多步骤打包成原子操作。
- 崩溃恢复：从 `.tasks/` + `.worktrees/index.json` 重建现场。"会话记忆是易失的，磁盘状态是持久的。"
- 事件流（events.jsonl）是 append-only 的生命周期日志，给后续 hook/audit 留接口。作者在 README 里明确说这是教学实现的最简版本，生产版需要完整事件总线（PreToolUse、SessionStart 等）。

---

## 整体架构观察

读完 12 章后能看出的、超出 longjing-agent 文章的几个判断：

### 1. "循环不动 + 工具箱可插拔" 只是表层

这个仓库的真正主线是**用磁盘文件做协调骨架**。s06 之后所有机制都依赖磁盘：

- s06：`.transcripts/` 存压缩前的全量
- s07：`.tasks/task_*.json` 任务图
- s09：`.team/config.json` + `.team/inbox/*.jsonl` 邮箱
- s12：`.worktrees/index.json` + `events.jsonl`

**理由**：会话上下文随时会被 compact 抹掉，跨会话/跨 agent 的协调必须落到比对话长命的存储。这个判断把 Claude Code 从"单 agent loop"重新解释为"以磁盘为协调底座的多 agent 系统"。

### 2. 后半段不是 hook/MCP，是"团队协作"

longjing-agent 文章列的"S06-S12: Hook / 上下文 / 权限 / MCP / 记忆"跟仓库实际不符。仓库后半段（s09-s12）整整四章在讲**多 agent 协调**：邮箱、协议握手、自治认领、worktree 隔离。

作者在范围说明里**明确放弃**了完整 hook 总线、权限治理、MCP 运行时——理由是"为保证学习路径清晰"。这意味着：仓库选择把"多 agent"当成 Claude Code 设计的真正深水区，hook/MCP 反而是表层封装。

### 3. 三个反复出现的设计模式

整个仓库出现至少 3 次的模式：

- **Layer 1 / Layer 2 注入**（s05 skill、s06 transcript、s11 inbox）：cheap 的元数据先放，full 的内容按需加载。
- **drain-on-read 队列**（s08 通知队列、s09 inbox）：append-only 写、每轮一次性读完清空。简单、并发安全。
- **状态机 + ID 关联**（s07 任务依赖、s10 request-response、s12 worktree-task）：所有协调用 ID 关联，状态机推进。

### 4. "Agency 来自模型"是政治宣言，不是技术细节

README 前 30% 篇幅在论证一件事：**agent 是训练出来的，不是编出来的**。作者批判"提示词水管工"（拖拽工作流、节点图、prompt 链）是"GOFAI 还魂"。

这跟仓库代码风格高度一致：12 章没有一处用 if-else 分支替模型做决策。模型决定何时调用工具、何时停、何时压缩、何时认领任务。harness 只提供工具、记忆和边界。

### 5. 仓库还有姊妹项目

README 末尾透露作者还有 [claw0](https://github.com/shareAI-lab/claw0) 项目，加了**心跳 + 定时任务**让 agent 从"用完即走"变成"常驻助手"。这个方向 longjing-agent 文章完全没提，是个独立的延伸点。

---

## 哪几章代码值得直接引文章

按信息密度排序：

1. **s01 + s02 组合**（30 行循环 + dispatch map）—— 这两章合起来就能给读者讲清楚 agent 的**全部内核**。引这一段读者就能动手写一个最小 agent。
2. **s06 三层压缩**（micro + auto + manual）—— 这是 Claude Code 真正"看不见但救命"的部分，外界很少有人完整拆过。
3. **s11 身份重注入**（`if len(messages) <= 3: insert identity`）—— 一段 5 行代码展示了 harness 工程的"组合正交机制"思维。
4. **s12 control plane / execution plane 分离** —— 这是把 K8s 设计模式落到 agent 的范例。
5. **s05 SKILL.md 两层注入** —— Anthropic 官方 Skill 机制的最简实现，对照 ingest skill frontmatter 设计同源。
