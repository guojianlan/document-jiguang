from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path

from .dashboard import serve_panel
from .engine import BusinessLoopEngine
from .models import LoopLevel
from .providers import build_provider
from .workspace import initialize_project, load_project_profile, synthesize_prd_from_request


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="PRD-to-test business loop engine")
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init-project", help="Initialize a project directory for business loop runs")
    init_parser.add_argument("--project-root", required=True, help="Project root to initialize")
    init_parser.add_argument("--name", required=False, help="Project display name")
    init_parser.add_argument("--purpose", required=True, help="What the project or repository is for")
    init_parser.add_argument("--business-domain", default="", help="Business domain for this project")
    init_parser.add_argument("--stack", default="", help="Tech stack summary")
    init_parser.add_argument(
        "--allowed-write-root",
        action="append",
        default=[],
        help="Relative directory allowed for agent writes. May be passed multiple times.",
    )
    init_parser.add_argument(
        "--test-command",
        action="append",
        default=[],
        help="Default test command for this project. May be passed multiple times.",
    )
    init_parser.add_argument("--notes", default="", help="Project-specific notes or business rules")
    init_parser.add_argument(
        "--require-acceptance-criteria",
        action="store_true",
        help="Stop runs when the PRD has no acceptance criteria section.",
    )

    panel_parser = subparsers.add_parser("serve-panel", help="Start the local visual dashboard")
    panel_parser.add_argument("--host", default="127.0.0.1", help="Host for the local panel")
    panel_parser.add_argument("--port", type=int, default=8765, help="Port for the local panel")
    panel_parser.add_argument("--open", action="store_true", help="Open the browser automatically")

    run_parser = subparsers.add_parser("run", help="Run a PRD delivery loop")
    run_parser.add_argument("--prd", help="Path to the PRD markdown file")
    run_parser.add_argument("--request", help="Natural-language request to be wrapped into a temporary PRD")
    run_parser.add_argument("--request-file", help="File containing the request text")
    run_parser.add_argument("--project-root", default=".", help="Project root to search and modify")
    run_parser.add_argument("--output-root", help="Directory for run artifacts")
    run_parser.add_argument(
        "--strategy-provider",
        default="mock",
        choices=["mock", "openai"],
        help="Provider used for implementation planning",
    )
    run_parser.add_argument(
        "--research-provider",
        default="mock",
        choices=["mock", "openai", "none"],
        help="Provider used to compress repository search results",
    )
    run_parser.add_argument("--strategy-model", default="gpt-5.4-mini", help="Model used by the strategy provider")
    run_parser.add_argument("--research-model", default="gpt-5.4-mini", help="Model used by the research provider")
    run_parser.add_argument("--level", default="L2", choices=["L0", "L1", "L2", "L3"])
    run_parser.add_argument(
        "--test-command",
        action="append",
        default=[],
        help="Test command to run after implementation. May be passed multiple times.",
    )
    run_parser.add_argument(
        "--mock-plan",
        help="Optional JSON file used by the mock provider to generate deterministic file writes",
    )

    status_parser = subparsers.add_parser("status", help="Show a run status file")
    status_parser.add_argument("--run-dir", required=True, help="Run output directory")
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    if args.command == "run":
        run_loop(args)
        return
    if args.command == "init-project":
        init_project(args)
        return
    if args.command == "status":
        show_status(args)
        return
    if args.command == "serve-panel":
        serve_panel(host=args.host, port=args.port, open_browser=args.open)
        return
    parser.error(f"Unsupported command: {args.command}")


def run_loop(args: argparse.Namespace) -> None:
    if not args.prd and not args.request and not args.request_file:
        raise SystemExit("One of --prd, --request, or --request-file is required.")
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    project_root = Path(args.project_root).resolve()
    profile = load_project_profile(project_root)
    output_root = Path(args.output_root).resolve() if args.output_root else project_root / ".business-loop" / "runs"
    run_dir = output_root / timestamp
    strategy_provider = build_provider(
        kind=args.strategy_provider,
        model=args.strategy_model,
        mock_plan_path=args.mock_plan,
    )
    research_provider = None if args.research_provider == "none" else build_provider(
        kind=args.research_provider,
        model=args.research_model,
        mock_plan_path=None,
    )

    prd_path = resolve_prd_path(args, project_root, run_dir, profile)

    engine = BusinessLoopEngine(
        project_root=project_root,
        output_dir=run_dir,
        strategy_provider=strategy_provider,
        research_provider=research_provider,
        level=LoopLevel(args.level),
    )
    run = engine.run(prd_path=prd_path, test_commands=args.test_command)
    print(json.dumps({"run_dir": str(run_dir), "status": run.status.value}, ensure_ascii=False))


def show_status(args: argparse.Namespace) -> None:
    run_dir = Path(args.run_dir).resolve()
    payload = json.loads((run_dir / "run.json").read_text(encoding="utf-8"))
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def init_project(args: argparse.Namespace) -> None:
    project_root = Path(args.project_root).resolve()
    project_name = args.name or project_root.name
    profile_path, memory_path = initialize_project(
        project_root=project_root,
        project_name=project_name,
        purpose=args.purpose,
        business_domain=args.business_domain,
        stack=args.stack,
        allowed_write_roots=args.allowed_write_root or ["."],
        default_test_commands=args.test_command,
        stop_on_ambiguity=True,
        require_acceptance_criteria=args.require_acceptance_criteria,
        notes=args.notes,
    )
    print(
        json.dumps(
            {
                "project_root": str(project_root),
                "profile_path": str(profile_path),
                "memory_path": str(memory_path),
            },
            ensure_ascii=False,
        )
    )


def resolve_prd_path(
    args: argparse.Namespace,
    project_root: Path,
    run_dir: Path,
    profile,
) -> Path:
    if args.prd:
        return Path(args.prd).resolve()
    if args.request_file:
        request_text = Path(args.request_file).resolve().read_text(encoding="utf-8")
        return synthesize_prd_from_request(request_text, project_root, run_dir, profile)
    return synthesize_prd_from_request(args.request, project_root, run_dir, profile)


if __name__ == "__main__":
    main()
