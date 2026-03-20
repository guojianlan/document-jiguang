#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
import shutil
import sys
import unicodedata
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parent.parent

SOURCE_DIRS = {
    "article": ROOT / "01_Sources" / "Articles",
    "link": ROOT / "01_Sources" / "Links",
    "video": ROOT / "01_Sources" / "Videos",
    "pdf": ROOT / "01_Sources" / "PDFs",
    "document": ROOT / "01_Sources" / "Documents",
    "unknown": ROOT / "00_Inbox",
}

NOTE_DIR = ROOT / "02_Notes" / "SourceNotes"

VIDEO_HOSTS = {
    "youtube.com",
    "www.youtube.com",
    "youtu.be",
    "bilibili.com",
    "www.bilibili.com",
    "vimeo.com",
    "www.vimeo.com",
    "loom.com",
    "www.loom.com",
}

ARTICLE_HOST_HINTS = {
    "substack.com",
    "medium.com",
    "zhuanlan.zhihu.com",
    "mp.weixin.qq.com",
    "arxiv.org",
}

PDF_EXTS = {".pdf"}
VIDEO_EXTS = {".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm"}
DOCUMENT_EXTS = {
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".csv",
    ".txt",
    ".md",
    ".rtf",
}


@dataclass
class IntakeResult:
    source_type: str
    note_path: Path
    stored_path: Path | None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Classify a URL or local file into the knowledge base and create a source note."
    )
    parser.add_argument("input", help="A URL or local file path")
    parser.add_argument("--title", help="Optional note title")
    parser.add_argument("--topic", help="Optional topic name")
    parser.add_argument(
        "--date",
        default=str(date.today()),
        help="Date prefix for generated note files, default: today",
    )
    parser.add_argument(
        "--copy-file",
        action="store_true",
        help="Copy local files into 01_Sources/<Type> instead of just referencing their original path",
    )
    return parser.parse_args()


def is_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def classify_url(value: str) -> str:
    parsed = urlparse(value)
    host = parsed.netloc.lower()
    path = parsed.path.lower()

    if any(host == video_host or host.endswith("." + video_host) for video_host in VIDEO_HOSTS):
        return "video"
    if path.endswith(".pdf"):
        return "pdf"
    if any(host == hint or host.endswith("." + hint) for hint in ARTICLE_HOST_HINTS):
        return "article"
    return "link"


def classify_path(path: Path) -> str:
    ext = path.suffix.lower()
    if ext in PDF_EXTS:
        return "pdf"
    if ext in VIDEO_EXTS:
        return "video"
    if ext in DOCUMENT_EXTS:
        return "document"
    return "unknown"


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).strip().lower()
    ascii_only = normalized.encode("ascii", "ignore").decode("ascii")
    candidate = re.sub(r"[^a-z0-9]+", "-", ascii_only).strip("-")
    if candidate:
        return candidate[:80]

    fallback = re.sub(r"[^\w\u4e00-\u9fff]+", "-", value.strip().lower()).strip("-")
    fallback = fallback.replace(" ", "-")
    return fallback[:80] or "untitled"


def infer_title(input_value: str, source_type: str) -> str:
    if is_url(input_value):
        parsed = urlparse(input_value)
        query = parse_qs(parsed.query)
        host = parsed.netloc.lower()
        if host in {"youtube.com", "www.youtube.com"} and query.get("v"):
            return f"youtube-{query['v'][0]}"
        if host == "youtu.be":
            short_id = parsed.path.strip("/")
            if short_id:
                return f"youtube-{short_id}"

        tail = Path(parsed.path).stem or Path(parsed.path).name or parsed.netloc
        tail = tail.replace("-", " ").replace("_", " ").strip()
        return tail or f"{source_type} source"
    return Path(input_value).stem


def copy_local_file(path: Path, source_type: str) -> Path:
    target_dir = SOURCE_DIRS[source_type]
    target_dir.mkdir(parents=True, exist_ok=True)
    target_path = target_dir / path.name

    if target_path.exists():
        stem = path.stem
        suffix = path.suffix
        counter = 2
        while True:
            candidate = target_dir / f"{stem}_{counter}{suffix}"
            if not candidate.exists():
                target_path = candidate
                break
            counter += 1

    shutil.copy2(path, target_path)
    return target_path


def build_note_content(
    source_type: str,
    title: str,
    input_value: str,
    topic: str | None,
    stored_path: Path | None,
    note_date: str,
) -> str:
    topic_value = topic or ""
    tags = {
        "article": "[source/article, status/draft]",
        "link": "[source/link, status/draft]",
        "video": "[source/video, status/draft]",
        "pdf": "[source/pdf, status/draft]",
        "document": "[source/document, status/draft]",
        "unknown": "[source/unknown, status/draft]",
    }[source_type]

    lines = [
        "---",
        "type: source_note",
        f"source_type: {source_type}",
        "status: draft",
        f"topic: {topic_value}",
        f"tags: {tags}",
        f"source_title: {title}",
        f"processed_at: {note_date}",
    ]

    if is_url(input_value):
        lines.append(f"source_url: {input_value}")
    else:
        lines.append(f"source_path: {stored_path or Path(input_value).resolve()}")

    lines.extend(
        [
            "---",
            "",
            f"# {title}",
            "",
            "## 来源信息",
        ]
    )

    if is_url(input_value):
        lines.extend(
            [
                "",
                f"- 链接：{input_value}",
                f"- 类型：{source_type}",
                "- 来源状态：待处理",
            ]
        )
    else:
        lines.extend(
            [
                "",
                f"- 原始文件：{Path(input_value).resolve()}",
                f"- 入库文件：{stored_path or '未复制，仅引用原路径'}",
                f"- 类型：{source_type}",
                "- 来源状态：待处理",
            ]
        )

    lines.extend(
        [
            "",
            "## 一句话摘要",
            "",
            "待补。",
            "",
            "## 关键信息",
            "",
            "- 待补",
            "",
            "## 我的判断",
            "",
            "- 待补",
            "",
            "## 关联主题",
            "",
            f"- [[{topic}]]" if topic else "- 待补",
            "",
            "## 下一步",
            "",
            "- 提炼摘要",
            "- 提取关键事实和观点",
            "- 判断是否并入某个主题笔记",
            "",
        ]
    )

    return "\n".join(lines)


def ensure_structure() -> None:
    for directory in SOURCE_DIRS.values():
        directory.mkdir(parents=True, exist_ok=True)
    NOTE_DIR.mkdir(parents=True, exist_ok=True)


def main() -> int:
    args = parse_args()
    ensure_structure()

    input_value = args.input.strip()
    title = args.title or infer_title(input_value, "source")

    if is_url(input_value):
        source_type = classify_url(input_value)
        stored_path = None
    else:
        local_path = Path(input_value).expanduser()
        if not local_path.is_absolute():
            local_path = (Path.cwd() / local_path).resolve()
        if not local_path.exists():
            print(f"Input file not found: {local_path}", file=sys.stderr)
            return 1
        source_type = classify_path(local_path)
        stored_path = copy_local_file(local_path, source_type) if args.copy_file and source_type != "unknown" else None

    slug = slugify(title)
    note_path = NOTE_DIR / f"{args.date}_{source_type}_{slug}.md"
    counter = 2
    while note_path.exists():
        note_path = NOTE_DIR / f"{args.date}_{source_type}_{slug}_{counter}.md"
        counter += 1

    content = build_note_content(
        source_type=source_type,
        title=title,
        input_value=input_value,
        topic=args.topic,
        stored_path=stored_path,
        note_date=args.date,
    )
    note_path.write_text(content, encoding="utf-8")

    result = IntakeResult(source_type=source_type, note_path=note_path, stored_path=stored_path)
    print(f"type: {result.source_type}")
    print(f"note: {result.note_path}")
    if result.stored_path:
        print(f"stored: {result.stored_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
