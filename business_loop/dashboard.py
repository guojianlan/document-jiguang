from __future__ import annotations

import json
import threading
import webbrowser
from datetime import datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from .engine import BusinessLoopEngine
from .models import LoopLevel
from .providers import build_provider
from .workspace import (
    initialize_project,
    list_registered_projects,
    load_project_memory,
    load_project_profile,
    register_project,
    save_project_memory,
    synthesize_prd_from_request,
    update_project_profile,
)


def serve_panel(host: str = "127.0.0.1", port: int = 8765, open_browser: bool = False) -> None:
    app = DashboardApp()
    handler = app.build_handler()
    server = ThreadingHTTPServer((host, port), handler)
    url = f"http://{host}:{port}"
    if open_browser:
        webbrowser.open(url)
    print(f"Business loop panel running at {url}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


class DashboardApp:
    def __init__(self) -> None:
        self.jobs: dict[str, dict[str, object]] = {}
        self.lock = threading.Lock()

    def build_handler(self):
        app = self

        class Handler(BaseHTTPRequestHandler):
            def do_GET(self) -> None:  # noqa: N802
                try:
                    parsed = urlparse(self.path)
                    if parsed.path in {"/", "/index.html"}:
                        self._send_html(PANEL_HTML)
                        return
                    if parsed.path == "/api/projects":
                        self._send_json({"projects": list_registered_projects()})
                        return
                    if parsed.path == "/api/projects/detail":
                        params = parse_qs(parsed.query)
                        project_root = _required_query(params, "project_root")
                        profile = load_project_profile(project_root)
                        memory = load_project_memory(project_root)
                        self._send_json(
                            {
                                "project_root": str(Path(project_root).resolve()),
                                "profile": _profile_payload(profile),
                                "memory": memory,
                                "runs": _list_project_runs(project_root),
                            }
                        )
                        return
                    if parsed.path == "/api/runs/status":
                        params = parse_qs(parsed.query)
                        run_dir = _required_query(params, "run_dir")
                        self._send_json(app.get_run_status(run_dir))
                        return
                    self.send_error(HTTPStatus.NOT_FOUND, "Not found")
                except Exception as exc:  # noqa: BLE001
                    self._send_json({"ok": False, "error": str(exc)}, status=400)

            def do_POST(self) -> None:  # noqa: N802
                try:
                    parsed = urlparse(self.path)
                    body = self._read_json()
                    if parsed.path == "/api/projects/init":
                        payload = app.init_project(body)
                        self._send_json(payload)
                        return
                    if parsed.path == "/api/projects/register":
                        payload = app.register_existing_project(body)
                        self._send_json(payload)
                        return
                    if parsed.path == "/api/projects/profile":
                        payload = app.update_project(body)
                        self._send_json(payload)
                        return
                    if parsed.path == "/api/projects/memory":
                        payload = app.save_memory(body)
                        self._send_json(payload)
                        return
                    if parsed.path == "/api/runs":
                        payload = app.start_run(body)
                        self._send_json(payload)
                        return
                    self.send_error(HTTPStatus.NOT_FOUND, "Not found")
                except Exception as exc:  # noqa: BLE001
                    self._send_json({"ok": False, "error": str(exc)}, status=400)

            def log_message(self, format: str, *args) -> None:  # noqa: A003
                return

            def _read_json(self) -> dict[str, object]:
                content_length = int(self.headers.get("Content-Length", "0"))
                raw = self.rfile.read(content_length) if content_length else b"{}"
                return json.loads(raw.decode("utf-8"))

            def _send_json(self, payload: dict[str, object], status: int = 200) -> None:
                data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
                self.send_response(status)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

            def _send_html(self, body: str) -> None:
                data = body.encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

        return Handler

    def init_project(self, body: dict[str, object]) -> dict[str, object]:
        project_root = _required_body(body, "project_root")
        purpose = _required_body(body, "purpose")
        name = str(body.get("name") or Path(project_root).resolve().name)
        profile_path, memory_path = initialize_project(
            project_root=project_root,
            project_name=name,
            purpose=purpose,
            business_domain=str(body.get("business_domain") or ""),
            stack=str(body.get("stack") or ""),
            allowed_write_roots=list(body.get("allowed_write_roots") or ["."]),
            default_test_commands=list(body.get("default_test_commands") or []),
            stop_on_ambiguity=bool(body.get("stop_on_ambiguity", True)),
            require_acceptance_criteria=bool(body.get("require_acceptance_criteria", False)),
            notes=str(body.get("notes") or ""),
        )
        return {
            "ok": True,
            "profile_path": str(profile_path),
            "memory_path": str(memory_path),
            "projects": list_registered_projects(),
        }

    def register_existing_project(self, body: dict[str, object]) -> dict[str, object]:
        project_root = _required_body(body, "project_root")
        profile = load_project_profile(project_root)
        if profile is None:
            raise ValueError("目标目录尚未初始化，请先执行初始化。")
        register_project(project_root)
        return {"ok": True, "projects": list_registered_projects()}

    def update_project(self, body: dict[str, object]) -> dict[str, object]:
        project_root = _required_body(body, "project_root")
        allowed_write_roots = body.get("allowed_write_roots")
        default_test_commands = body.get("default_test_commands")
        path = update_project_profile(
            project_root,
            project_name=body.get("project_name"),
            purpose=body.get("purpose"),
            business_domain=body.get("business_domain"),
            stack=body.get("stack"),
            allowed_write_roots=list(allowed_write_roots) if allowed_write_roots is not None else None,
            default_test_commands=list(default_test_commands) if default_test_commands is not None else None,
            stop_on_ambiguity=body.get("stop_on_ambiguity"),
            require_acceptance_criteria=body.get("require_acceptance_criteria"),
            notes=body.get("notes"),
        )
        profile = load_project_profile(project_root)
        return {"ok": True, "profile_path": str(path), "profile": _profile_payload(profile)}

    def save_memory(self, body: dict[str, object]) -> dict[str, object]:
        project_root = _required_body(body, "project_root")
        content = str(body.get("content") or "")
        path = save_project_memory(project_root, content)
        return {"ok": True, "memory_path": str(path)}

    def start_run(self, body: dict[str, object]) -> dict[str, object]:
        project_root = Path(_required_body(body, "project_root")).resolve()
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        output_root = Path(body.get("output_root") or (project_root / ".business-loop" / "runs")).resolve()
        run_dir = output_root / timestamp
        profile = load_project_profile(project_root)

        request_text = body.get("request")
        prd_path_raw = body.get("prd_path")
        request_file = body.get("request_file")
        if not prd_path_raw and not request_text and not request_file:
            raise ValueError("需要提供 PRD 路径、需求文本或需求文件之一。")

        strategy_provider = build_provider(
            kind=str(body.get("strategy_provider") or "mock"),
            model=str(body.get("strategy_model") or "gpt-5.4-mini"),
            mock_plan_path=body.get("mock_plan"),
        )
        research_kind = str(body.get("research_provider") or "mock")
        research_provider = None if research_kind == "none" else build_provider(
            kind=research_kind,
            model=str(body.get("research_model") or "gpt-5.4-mini"),
            mock_plan_path=None,
        )

        if prd_path_raw:
            prd_path = Path(str(prd_path_raw)).resolve()
        elif request_file:
            request_text = Path(str(request_file)).resolve().read_text(encoding="utf-8")
            prd_path = synthesize_prd_from_request(request_text, project_root, run_dir, profile)
        else:
            prd_path = synthesize_prd_from_request(str(request_text), project_root, run_dir, profile)

        with self.lock:
            self.jobs[str(run_dir)] = {
                "run_dir": str(run_dir),
                "project_root": str(project_root),
                "status": "processing",
                "error": "",
            }

        thread = threading.Thread(
            target=self._run_engine,
            kwargs={
                "project_root": project_root,
                "run_dir": run_dir,
                "strategy_provider": strategy_provider,
                "research_provider": research_provider,
                "level": str(body.get("level") or "L2"),
                "prd_path": prd_path,
                "test_commands": list(body.get("test_commands") or []),
            },
            daemon=True,
        )
        thread.start()
        return {"ok": True, "run_dir": str(run_dir), "status": "processing"}

    def _run_engine(
        self,
        project_root: Path,
        run_dir: Path,
        strategy_provider,
        research_provider,
        level: str,
        prd_path: Path,
        test_commands: list[str],
    ) -> None:
        try:
            engine = BusinessLoopEngine(
                project_root=project_root,
                output_dir=run_dir,
                strategy_provider=strategy_provider,
                research_provider=research_provider,
                level=LoopLevel(level),
            )
            run = engine.run(prd_path=prd_path, test_commands=test_commands)
            status = run.status.value
            error = ""
        except Exception as exc:  # noqa: BLE001
            status = "failed"
            error = str(exc)
        with self.lock:
            self.jobs[str(run_dir)] = {
                "run_dir": str(run_dir),
                "project_root": str(project_root),
                "status": status,
                "error": error,
            }

    def get_run_status(self, run_dir: str) -> dict[str, object]:
        run_path = Path(run_dir).resolve()
        run_json = run_path / "run.json"
        if run_json.exists():
            payload = json.loads(run_json.read_text(encoding="utf-8"))
            payload["blockers"] = _read_blockers(run_path)
            return payload
        with self.lock:
            payload = self.jobs.get(str(run_path), {"run_dir": str(run_path), "status": "unknown"})
        payload["blockers"] = _read_blockers(run_path)
        return payload


def _profile_payload(profile) -> dict[str, object] | None:
    if profile is None:
        return None
    return {
        "project_name": profile.project_name,
        "purpose": profile.purpose,
        "business_domain": profile.business_domain,
        "stack": profile.stack,
        "allowed_write_roots": profile.allowed_write_roots,
        "default_test_commands": profile.default_test_commands,
        "stop_on_ambiguity": profile.stop_on_ambiguity,
        "require_acceptance_criteria": profile.require_acceptance_criteria,
        "notes": profile.notes,
    }


def _list_project_runs(project_root: str | Path) -> list[dict[str, object]]:
    runs_root = Path(project_root).resolve() / ".business-loop" / "runs"
    if not runs_root.exists():
        return []
    items: list[dict[str, object]] = []
    for run_dir in sorted(runs_root.iterdir(), reverse=True):
        if not run_dir.is_dir():
            continue
        run_json = run_dir / "run.json"
        if run_json.exists():
            payload = json.loads(run_json.read_text(encoding="utf-8"))
            items.append(
                {
                    "run_dir": str(run_dir),
                    "status": payload.get("status"),
                    "created_at": payload.get("created_at"),
                    "updated_at": payload.get("updated_at"),
                    "prd_title": payload.get("metadata", {}).get("prd_title", ""),
                }
            )
        else:
            items.append({"run_dir": str(run_dir), "status": "processing"})
    return items


def _read_blockers(run_dir: Path) -> list[str]:
    candidates = [
        run_dir / "validate" / "blockers.json",
        run_dir / "plan" / "blockers.json",
        run_dir / "test" / "blockers.json",
    ]
    for path in candidates:
        if path.exists():
            payload = json.loads(path.read_text(encoding="utf-8"))
            return list(payload.get("blockers", []))
    return []


def _required_query(params: dict[str, list[str]], key: str) -> str:
    values = params.get(key)
    if not values or not values[0]:
        raise ValueError(f"Missing query parameter: {key}")
    return values[0]


def _required_body(body: dict[str, object], key: str) -> str:
    value = body.get(key)
    if value is None or not str(value).strip():
        raise ValueError(f"Missing required field: {key}")
    return str(value).strip()


PANEL_HTML = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Business Loop Panel</title>
  <style>
    :root {
      --bg: #f4efe7;
      --panel: #fffaf3;
      --ink: #1f2933;
      --muted: #6b7280;
      --line: #dbcdb7;
      --brand: #1f6f78;
      --accent: #f2b880;
      --good: #1d7a46;
      --warn: #b56a1d;
      --bad: #b53f3f;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "SF Pro Text", "PingFang SC", "Noto Sans SC", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(circle at top left, rgba(242, 184, 128, 0.24), transparent 30%),
        linear-gradient(180deg, #f8f4ee, var(--bg));
    }
    .shell {
      display: grid;
      grid-template-columns: 320px 1fr;
      min-height: 100vh;
    }
    .sidebar, .main { padding: 20px; }
    .sidebar {
      border-right: 1px solid var(--line);
      background: rgba(255, 250, 243, 0.88);
      backdrop-filter: blur(10px);
    }
    .main {
      display: grid;
      gap: 16px;
      grid-template-rows: auto auto 1fr;
    }
    h1, h2, h3 { margin: 0 0 10px; }
    .muted { color: var(--muted); }
    .card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 16px;
      box-shadow: 0 10px 30px rgba(78, 64, 43, 0.06);
    }
    .project-item {
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: 150ms ease;
      background: rgba(255,255,255,0.65);
    }
    .project-item.active {
      border-color: var(--brand);
      box-shadow: inset 0 0 0 1px var(--brand);
    }
    .row {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    label {
      display: grid;
      gap: 6px;
      font-size: 14px;
    }
    input, textarea, select {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 10px 12px;
      font: inherit;
      background: #fffdf8;
      color: var(--ink);
    }
    textarea { min-height: 110px; resize: vertical; }
    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 12px;
    }
    button {
      border: none;
      border-radius: 999px;
      padding: 10px 16px;
      font: inherit;
      cursor: pointer;
      color: white;
      background: var(--brand);
    }
    button.secondary {
      background: #c97b39;
    }
    button.ghost {
      background: #7a8a99;
    }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 999px;
      background: #edf5f6;
      color: var(--brand);
      font-size: 13px;
      font-weight: 600;
    }
    .status.blocked { background: #fff1e0; color: var(--warn); }
    .status.failed { background: #fdeaea; color: var(--bad); }
    .status.done, .status.ready_for_review { background: #eaf6ee; color: var(--good); }
    .split {
      display: grid;
      gap: 16px;
      grid-template-columns: 1.2fr 0.8fr;
    }
    .list { display: grid; gap: 10px; }
    .run-item {
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 12px;
      cursor: pointer;
    }
    pre {
      white-space: pre-wrap;
      word-break: break-word;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 12px;
      margin: 0;
      max-height: 360px;
      overflow: auto;
    }
    .banner {
      border-left: 4px solid var(--accent);
      padding: 12px 14px;
      background: #fff7ee;
      border-radius: 10px;
      margin-top: 10px;
    }
    @media (max-width: 980px) {
      .shell { grid-template-columns: 1fr; }
      .split { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <div class="card">
        <h1>业务闭环面板</h1>
        <p class="muted">一个面板里管理多个项目，初始化业务身份，直接输入需求并运行到闭环或阻断。</p>
      </div>
      <div class="card" style="margin-top: 16px;">
        <h2>项目列表</h2>
        <div id="projectList" class="list"></div>
      </div>
      <div class="card" style="margin-top: 16px;">
        <h2>新增 / 初始化项目</h2>
        <label>项目根目录<input id="initRoot" placeholder="/path/to/repo" /></label>
        <label>项目名称<input id="initName" placeholder="crm-system" /></label>
        <label>项目用途<textarea id="initPurpose" placeholder="这个仓库是做什么的"></textarea></label>
        <label>业务域<input id="initDomain" placeholder="CRM / 内容系统 / 电商" /></label>
        <label>技术栈<input id="initStack" placeholder="Python FastAPI Vue" /></label>
        <label>允许写入目录，多行<textarea id="initWriteRoots" placeholder="app&#10;tests"></textarea></label>
        <label>默认测试命令，多行<textarea id="initTests" placeholder="python3 -m unittest discover -s tests"></textarea></label>
        <label>长期备注<textarea id="initNotes" placeholder="这里写不能越过的业务边界"></textarea></label>
        <div class="actions">
          <button onclick="initProject()">初始化项目</button>
          <button class="ghost" onclick="registerExisting()">登记已有项目</button>
        </div>
      </div>
    </aside>
    <main class="main">
      <section class="card">
        <h2 id="projectTitle">未选择项目</h2>
        <p id="projectPurpose" class="muted">先在左侧选择或初始化一个项目。</p>
        <div id="projectMeta" class="row"></div>
      </section>

      <section class="split">
        <div class="card">
          <h2>启动运行</h2>
          <label>自然语言需求<textarea id="runRequest" placeholder="例如：新增客户列表筛选功能，并补对应测试"></textarea></label>
          <label>或直接指定 PRD 路径<input id="runPrdPath" placeholder="/path/to/prd.md" /></label>
          <div class="row">
            <label>策略 provider
              <select id="strategyProvider">
                <option value="mock">mock</option>
                <option value="openai">openai</option>
              </select>
            </label>
            <label>研究 provider
              <select id="researchProvider">
                <option value="mock">mock</option>
                <option value="openai">openai</option>
                <option value="none">none</option>
              </select>
            </label>
            <label>策略模型<input id="strategyModel" value="gpt-5.4-mini" /></label>
            <label>研究模型<input id="researchModel" value="gpt-5.4-mini" /></label>
          </div>
          <label>Mock plan 路径<textarea id="mockPlanPath" placeholder="/path/to/mock-plan.json"></textarea></label>
          <label>本次附加测试命令，多行<textarea id="runTests" placeholder="留空则优先使用项目默认测试命令"></textarea></label>
          <div class="actions">
            <button onclick="startRun()">开始运行</button>
            <button class="secondary" onclick="refreshProject()">刷新项目数据</button>
          </div>
          <div id="runMessage" class="banner" style="display:none;"></div>
        </div>

        <div class="card">
          <h2>项目记忆</h2>
          <label>维护长期业务规则<textarea id="memoryEditor" placeholder="这里维护长期规则、口径、审批要求"></textarea></label>
          <div class="actions">
            <button onclick="saveMemory()">保存项目记忆</button>
          </div>
        </div>
      </section>

      <section class="split">
        <div class="card">
          <h2>最近运行</h2>
          <div id="runsList" class="list"></div>
        </div>
        <div class="card">
          <h2>运行详情</h2>
          <div id="runStatus" class="status">idle</div>
          <div id="blockers" class="banner" style="display:none;"></div>
          <pre id="runDetails">选择一次运行后，这里会显示阶段、状态和阻断信息。</pre>
        </div>
      </section>
    </main>
  </div>

  <script>
    let selectedProjectRoot = "";
    let selectedRunDir = "";
    let pollTimer = null;

    async function api(path, options = {}) {
      const response = await fetch(path, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Request failed");
      }
      return response.json();
    }

    function splitLines(value) {
      return value
        .split("\\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    async function loadProjects() {
      const data = await api("/api/projects");
      const list = document.getElementById("projectList");
      list.innerHTML = "";
      for (const item of data.projects) {
        const el = document.createElement("div");
        el.className = "project-item" + (item.project_root === selectedProjectRoot ? " active" : "");
        const profile = item.profile || {};
        el.innerHTML = `
          <strong>${profile.project_name || item.project_root}</strong>
          <div class="muted" style="margin-top:6px;">${profile.purpose || "未初始化"}</div>
          <div class="muted" style="margin-top:6px;font-size:12px;">${item.project_root}</div>
        `;
        el.onclick = () => selectProject(item.project_root);
        list.appendChild(el);
      }
    }

    async function selectProject(projectRoot) {
      selectedProjectRoot = projectRoot;
      await loadProjects();
      await refreshProject();
    }

    async function refreshProject() {
      if (!selectedProjectRoot) return;
      const data = await api(`/api/projects/detail?project_root=${encodeURIComponent(selectedProjectRoot)}`);
      const profile = data.profile || {};
      document.getElementById("projectTitle").textContent = profile.project_name || selectedProjectRoot;
      document.getElementById("projectPurpose").textContent = profile.purpose || "未初始化项目";
      document.getElementById("projectMeta").innerHTML = `
        <div><strong>业务域</strong><div class="muted">${profile.business_domain || "未设置"}</div></div>
        <div><strong>技术栈</strong><div class="muted">${profile.stack || "未设置"}</div></div>
        <div><strong>允许写入</strong><div class="muted">${(profile.allowed_write_roots || []).join(", ") || "未设置"}</div></div>
        <div><strong>默认测试</strong><div class="muted">${(profile.default_test_commands || []).join(" | ") || "未设置"}</div></div>
      `;
      document.getElementById("memoryEditor").value = data.memory || "";
      renderRuns(data.runs || []);
    }

    function renderRuns(runs) {
      const list = document.getElementById("runsList");
      list.innerHTML = "";
      if (!runs.length) {
        list.innerHTML = '<div class="muted">这个项目还没有运行记录。</div>';
        return;
      }
      for (const item of runs) {
        const el = document.createElement("div");
        el.className = "run-item";
        el.innerHTML = `
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center;">
            <strong>${item.prd_title || "未命名运行"}</strong>
            <span class="status ${item.status}">${item.status}</span>
          </div>
          <div class="muted" style="margin-top:8px;">${item.run_dir}</div>
        `;
        el.onclick = () => loadRun(item.run_dir);
        list.appendChild(el);
      }
    }

    async function loadRun(runDir) {
      selectedRunDir = runDir;
      const data = await api(`/api/runs/status?run_dir=${encodeURIComponent(runDir)}`);
      renderRunDetails(data);
      if (pollTimer) clearInterval(pollTimer);
      if (["processing", "new"].includes(data.status)) {
        pollTimer = setInterval(async () => {
          const latest = await api(`/api/runs/status?run_dir=${encodeURIComponent(runDir)}`);
          renderRunDetails(latest);
          if (!["processing", "new"].includes(latest.status)) {
            clearInterval(pollTimer);
          }
        }, 2500);
      }
    }

    function renderRunDetails(data) {
      const status = document.getElementById("runStatus");
      status.className = `status ${data.status || ""}`;
      status.textContent = data.status || "unknown";
      const blockersEl = document.getElementById("blockers");
      const blockers = data.blockers || [];
      if (blockers.length) {
        blockersEl.style.display = "block";
        blockersEl.innerHTML = `<strong>已阻断</strong><br>${blockers.join("<br>")}`;
      } else {
        blockersEl.style.display = "none";
        blockersEl.innerHTML = "";
      }
      document.getElementById("runDetails").textContent = JSON.stringify(data, null, 2);
    }

    async function initProject() {
      const payload = {
        project_root: document.getElementById("initRoot").value.trim(),
        name: document.getElementById("initName").value.trim(),
        purpose: document.getElementById("initPurpose").value.trim(),
        business_domain: document.getElementById("initDomain").value.trim(),
        stack: document.getElementById("initStack").value.trim(),
        allowed_write_roots: splitLines(document.getElementById("initWriteRoots").value),
        default_test_commands: splitLines(document.getElementById("initTests").value),
        notes: document.getElementById("initNotes").value.trim(),
      };
      const result = await api("/api/projects/init", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await loadProjects();
      selectedProjectRoot = payload.project_root;
      await refreshProject();
      showRunMessage(`项目已初始化：${result.profile_path}`);
    }

    async function registerExisting() {
      const projectRoot = document.getElementById("initRoot").value.trim();
      const result = await api("/api/projects/register", {
        method: "POST",
        body: JSON.stringify({ project_root: projectRoot }),
      });
      await loadProjects();
      selectedProjectRoot = projectRoot;
      await refreshProject();
      showRunMessage(`已登记已有项目。当前已登记 ${result.projects.length} 个项目。`);
    }

    async function saveMemory() {
      if (!selectedProjectRoot) {
        showRunMessage("请先选择项目。");
        return;
      }
      await api("/api/projects/memory", {
        method: "POST",
        body: JSON.stringify({
          project_root: selectedProjectRoot,
          content: document.getElementById("memoryEditor").value,
        }),
      });
      showRunMessage("项目记忆已保存。");
    }

    async function startRun() {
      if (!selectedProjectRoot) {
        showRunMessage("请先选择项目。");
        return;
      }
      const payload = {
        project_root: selectedProjectRoot,
        request: document.getElementById("runRequest").value.trim(),
        prd_path: document.getElementById("runPrdPath").value.trim(),
        strategy_provider: document.getElementById("strategyProvider").value,
        research_provider: document.getElementById("researchProvider").value,
        strategy_model: document.getElementById("strategyModel").value.trim(),
        research_model: document.getElementById("researchModel").value.trim(),
        mock_plan: document.getElementById("mockPlanPath").value.trim(),
        test_commands: splitLines(document.getElementById("runTests").value),
      };
      const result = await api("/api/runs", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showRunMessage(`运行已启动：${result.run_dir}`);
      await refreshProject();
      await loadRun(result.run_dir);
    }

    function showRunMessage(message) {
      const banner = document.getElementById("runMessage");
      banner.style.display = "block";
      banner.textContent = message;
    }

    loadProjects();
  </script>
</body>
</html>
"""
