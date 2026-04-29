#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const defaultPreviewPort = 4312;

loadRepoEnv();

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function loadRepoEnv() {
  const envPath = path.join(repoRoot, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const exportPrefix = trimmed.startsWith("export ") ? "export " : "";
    const content = exportPrefix ? trimmed.slice(exportPrefix.length) : trimmed;
    const separatorIndex = content.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = content.slice(0, separatorIndex).trim();
    const rawValue = content.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    process.env[key] = stripWrappingQuotes(rawValue);
  }
}

function readConfiguredPort() {
  const candidate = Number(process.env.MARKDOWN_PUBLISH_PREVIEW_PORT);
  if (Number.isInteger(candidate) && candidate > 0) {
    return candidate;
  }
  return defaultPreviewPort;
}

function parseArgs(argv) {
  const args = {
    port: readConfiguredPort(),
    open: false,
    file: "",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--port" && argv[i + 1]) {
      args.port = Number(argv[i + 1]);
      i += 1;
    } else if (arg === "--open") {
      args.open = true;
    } else if (!arg.startsWith("--") && !args.file) {
      args.file = arg;
    }
  }

  return args;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isCopyMode(mode) {
  return mode === "feishu" || mode === "generic";
}

function inferMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeMap = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };
  return mimeMap[ext] || "application/octet-stream";
}

function toDataUrl(targetPath) {
  const buffer = fs.readFileSync(targetPath);
  const mime = inferMime(targetPath);
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n")) {
    return { frontmatter: "", body: raw };
  }

  const closing = raw.indexOf("\n---\n", 4);
  if (closing === -1) {
    return { frontmatter: "", body: raw };
  }

  return {
    frontmatter: raw.slice(4, closing),
    body: raw.slice(closing + 5),
  };
}

function resolveAsset(linkTarget, fileDir) {
  if (/^(https?:|data:)/i.test(linkTarget)) {
    return linkTarget;
  }

  const cleanTarget = linkTarget.split("#")[0].split("?")[0];
  const absolute = path.isAbsolute(cleanTarget)
    ? cleanTarget
    : path.resolve(fileDir, cleanTarget);

  if (!fs.existsSync(absolute)) {
    return escapeHtml(linkTarget);
  }

  let assetPath = absolute;
  const ext = path.extname(absolute).toLowerCase();

  // Prefer a sibling PNG when the markdown points to an SVG but the publish target
  // only accepts raster formats such as Feishu Docs.
  if (ext === ".svg") {
    const siblingPng = absolute.slice(0, -4) + ".png";
    if (fs.existsSync(siblingPng)) {
      assetPath = siblingPng;
    }
  }

  const assetExt = path.extname(assetPath).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(assetExt)) {
    return toDataUrl(assetPath);
  }

  return escapeHtml(linkTarget);
}

function renderInline(text, fileDir, mode = "screen") {
  let html = escapeHtml(text);

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, target) => {
    const src = resolveAsset(target.trim(), fileDir);
    if (isCopyMode(mode)) {
      return `<img src="${src}" alt="${escapeHtml(
        alt
      )}" style="max-height:1.2em;vertical-align:middle;" />`;
    }
    return `<img class="inline-image" src="${src}" alt="${escapeHtml(alt)}" />`;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
    const href = /^(https?:|mailto:)/i.test(target)
      ? target
      : escapeHtml(target);
    if (isCopyMode(mode)) {
      return `<a href="${href}" target="_blank" rel="noreferrer" style="color:#2563eb;text-decoration:underline;">${escapeHtml(
        label
      )}</a>`;
    }
    return `<a href="${href}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
  });

  html = html.replace(/\[\[([^\]]+)\]\]/g, (_, wiki) => {
    if (isCopyMode(mode)) {
      return `<span style="color:#b45309;font-weight:600;">${escapeHtml(wiki)}</span>`;
    }
    return `<span class="wiki-link">${escapeHtml(wiki)}</span>`;
  });

  html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
  if (isCopyMode(mode)) {
    html = html.replace(
      /`([^`]+)`/g,
      '<code style="background:#f3f4f6;border:1px solid #e5e7eb;border-radius:6px;padding:1px 6px;font-size:0.9em;">$1</code>'
    );
  } else {
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  return html;
}

function isTableRow(line) {
  return /^\|.+\|$/.test(line);
}

function isTableDivider(line) {
  return /^\|(?:\s*:?-{3,}:?\s*\|)+$/.test(line);
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseTableAlignments(line) {
  return splitTableRow(line).map((cell) => {
    const trimmed = cell.trim();
    const left = trimmed.startsWith(":");
    const right = trimmed.endsWith(":");

    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return "";
  });
}

function renderMarkdownToHtml(markdownPath, mode = "screen") {
  const absolutePath = path.resolve(repoRoot, markdownPath);
  const raw = fs.readFileSync(absolutePath, "utf8");
  const { body } = parseFrontmatter(raw);
  const fileDir = path.dirname(absolutePath);
  const lines = body.split(/\r?\n/);
  const output = [];
  const paragraph = [];
  const quoteLines = [];
  const fenceLines = [];
  const tableRows = [];
  let listType = "";
  let fenceMarker = "";
  let fenceLang = "";
  let tableHeader = null;
  let tableAlignments = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const innerHtml = paragraph
      .map((line) => renderInline(line, fileDir, mode))
      .join("<br>");
    if (isCopyMode(mode)) {
      output.push(
        `<p style="font-size:18px;line-height:1.85;color:#1f2937;margin:0.85em 0;">${innerHtml}</p>`
      );
    } else {
      output.push(`<p>${innerHtml}</p>`);
    }
    paragraph.length = 0;
  };

  const flushQuote = () => {
    if (!quoteLines.length) return;
    const quoteHtml = quoteLines
      .map((line) => {
        const rendered = renderInline(line, fileDir, mode);
        if (isCopyMode(mode)) {
          return `<p style="font-size:18px;line-height:1.85;color:#374151;margin:0.2em 0;">${rendered}</p>`;
        }
        return `<p>${rendered}</p>`;
      })
      .join("");
    if (isCopyMode(mode)) {
      output.push(
        `<blockquote style="margin:18px 0;padding:2px 0 2px 16px;border-left:4px solid #d1d5db;color:#374151;background:transparent;">${quoteHtml}</blockquote>`
      );
    } else {
      output.push(`<blockquote>${quoteHtml}</blockquote>`);
    }
    quoteLines.length = 0;
  };

  const flushFence = () => {
    if (!fenceMarker) return;
    const fenceText = fenceLines.join("\n");
    if (mode === "feishu") {
      output.push(
        `<div data-copy-block="code" style="margin:20px 0;"><pre style="margin:0;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;"><code style="display:block;margin:0;padding:0;font-size:15px;line-height:1.75;font-family:'SFMono-Regular','Menlo','Monaco','Consolas',monospace;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(
          fenceText
        )}</code></pre></div>`
      );
    } else if (mode === "generic") {
      output.push(
        `<div data-copy-block="code" style="margin:20px 0;"><pre style="margin:0;padding:16px 18px;border-radius:12px;border:1px solid #e5e7eb;background:#f8fafc;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;"><code style="display:block;margin:0;padding:0;background:transparent;border:0;border-radius:0;color:#111827;font-size:15px;line-height:1.75;font-family:'SFMono-Regular','Menlo','Monaco','Consolas',monospace;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(
          fenceText
        )}</code></pre></div>`
      );
    } else {
      output.push(`<pre class="code-block">${escapeHtml(fenceText)}</pre>`);
    }
    fenceLines.length = 0;
    fenceMarker = "";
    fenceLang = "";
  };

  const flushTable = () => {
    if (!tableHeader) return;

    const renderCell = (tag, cell, index) => {
      const align = tableAlignments[index] ? ` style="text-align:${tableAlignments[index]}"` : "";
      if (isCopyMode(mode)) {
        const baseStyle =
          tag === "th"
            ? "padding:12px 14px;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;vertical-align:top;color:#111827;background:#f8fafc;font-weight:700;text-align:left;"
            : "padding:12px 14px;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;vertical-align:top;color:#1f2937;";
        const style = align
          ? `${baseStyle}${align.slice(7, -1)};`
          : baseStyle;
        return `<${tag} style="${style}">${renderInline(cell, fileDir, mode)}</${tag}>`;
      }
      return `<${tag}${align}>${renderInline(cell, fileDir, mode)}</${tag}>`;
    };

    const headerHtml = `<thead><tr>${tableHeader
      .map((cell, index) => renderCell("th", cell, index))
      .join("")}</tr></thead>`;
    const bodyHtml = tableRows.length
      ? `<tbody>${tableRows
          .map(
            (row) =>
              `<tr>${row
                .map((cell, index) => renderCell("td", cell, index))
                .join("")}</tr>`
          )
          .join("")}</tbody>`
      : "";

    if (isCopyMode(mode)) {
      output.push(
        `<div style="width:100%;overflow-x:auto;margin:22px 0;"><table style="width:100%;border-collapse:collapse;min-width:520px;font-size:16px;line-height:1.7;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">${headerHtml}${bodyHtml}</table></div>`
      );
    } else {
      output.push(`<div class="table-wrap"><table>${headerHtml}${bodyHtml}</table></div>`);
    }
    tableHeader = null;
    tableRows.length = 0;
    tableAlignments = [];
  };

  const closeList = () => {
    if (listType) {
      output.push(`</${listType}>`);
      listType = "";
    }
  };

  const ensureList = (type) => {
    if (listType === type) return;
    closeList();
    output.push(`<${type}>`);
    listType = type;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (fenceMarker) {
      const closingFenceMatch = trimmed.match(/^(```+|~~~+)$/);
      if (closingFenceMatch && closingFenceMatch[1][0] === fenceMarker[0]) {
        flushFence();
      } else {
        fenceLines.push(rawLine);
      }
      continue;
    }

    if (tableHeader) {
      if (isTableRow(trimmed)) {
        tableRows.push(splitTableRow(trimmed));
        continue;
      }
      flushTable();
    }

    const openingFenceMatch = trimmed.match(/^(```+|~~~+)\s*([A-Za-z0-9_-]+)?\s*$/);
    if (openingFenceMatch) {
      flushParagraph();
      closeList();
      flushQuote();
      fenceMarker = openingFenceMatch[1];
      fenceLang = openingFenceMatch[2] || "";
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      closeList();
      flushQuote();
      flushTable();
      continue;
    }

    const nextTrimmed = (lines[index + 1] || "").trim();
    if (isTableRow(trimmed) && isTableDivider(nextTrimmed)) {
      flushParagraph();
      closeList();
      flushQuote();
      tableHeader = splitTableRow(trimmed);
      tableAlignments = parseTableAlignments(nextTrimmed);
      index += 1;
      continue;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      closeList();
      flushQuote();
      flushTable();
      const src = resolveAsset(imageMatch[2].trim(), fileDir);
      output.push(
        isCopyMode(mode)
          ? `<figure style="margin:24px 0;"><img src="${src}" alt="${escapeHtml(
              imageMatch[1]
            )}" style="display:block;width:100%;height:auto;border-radius:10px;border:1px solid #e5e7eb;background:#ffffff;" /></figure>`
          : `<figure><img class="block-image" src="${src}" alt="${escapeHtml(
              imageMatch[1]
            )}" /></figure>`
      );
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      flushQuote();
      flushTable();
      const level = headingMatch[1].length;
      const headingHtml = renderInline(headingMatch[2], fileDir, mode);
      if (isCopyMode(mode)) {
        const fontSizeMap = { 1: 34, 2: 26, 3: 21, 4: 18, 5: 16, 6: 15 };
        output.push(
          `<h${level} style="line-height:1.25;margin-top:1.4em;margin-bottom:0.7em;color:#111827;font-weight:700;font-size:${fontSizeMap[level] || 15}px;">${headingHtml}</h${level}>`
        );
      } else {
        output.push(`<h${level}>${headingHtml}</h${level}>`);
      }
      continue;
    }

    const blockquoteMatch = trimmed.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      flushParagraph();
      closeList();
      quoteLines.push(blockquoteMatch[1]);
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      flushQuote();
      flushTable();
      ensureList("ol");
      output.push(
        isCopyMode(mode)
          ? `<li style="font-size:18px;line-height:1.85;color:#1f2937;margin:0.85em 0;">${renderInline(
              orderedMatch[1],
              fileDir,
              mode
            )}</li>`
          : `<li>${renderInline(orderedMatch[1], fileDir, mode)}</li>`
      );
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      flushQuote();
      flushTable();
      ensureList("ul");
      output.push(
        isCopyMode(mode)
          ? `<li style="font-size:18px;line-height:1.85;color:#1f2937;margin:0.85em 0;">${renderInline(
              unorderedMatch[1],
              fileDir,
              mode
            )}</li>`
          : `<li>${renderInline(unorderedMatch[1], fileDir, mode)}</li>`
      );
      continue;
    }

    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      closeList();
      flushQuote();
      flushTable();
      output.push(
        isCopyMode(mode)
          ? '<hr style="border:0;border-top:1px solid #e5e7eb;margin:28px 0;" />'
          : "<hr />"
      );
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  flushQuote();
  flushTable();
  flushFence();

  const bodyHtml = output.join("\n");
  if (isCopyMode(mode)) {
    return `<div data-copy-root="${mode}" style="font-family:'SF Pro Text','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;color:#1f2329;">${bodyHtml}</div>`;
  }
  return bodyHtml;
}

function listMarkdownFiles() {
  const roots = ["outputs", "wiki", "references"];
  const files = [];

  function walk(relativeDir) {
    const absoluteDir = path.join(repoRoot, relativeDir);
    if (!fs.existsSync(absoluteDir)) return;

    for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const relativePath = path.join(relativeDir, entry.name);
      if (entry.isDirectory()) {
        walk(relativePath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(relativePath);
      }
    }
  }

  for (const root of roots) {
    walk(root);
  }

  return files.sort();
}

function renderPage(selectedFile) {
  const files = listMarkdownFiles();
  const chosen = selectedFile && files.includes(selectedFile) ? selectedFile : files[0] || "";

  const articleHtml = chosen
    ? renderMarkdownToHtml(chosen, "screen")
    : "<p>没有找到可预览的 Markdown 文件。</p>";

  const options = files
    .map((file) => {
      const selected = file === chosen ? "selected" : "";
      return `<option value="${escapeHtml(file)}" ${selected}>${escapeHtml(file)}</option>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Markdown 发布预览</title>
  <style>
    :root {
      --bg: #ffffff;
      --panel: #ffffff;
      --text: #1f2329;
      --muted: #667085;
      --line: #e5e7eb;
      --accent: #2563eb;
      --accent-2: #b45309;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "SF Pro Text","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
      background: #f7f8fa;
      color: var(--text);
    }
    .layout {
      display: grid;
      grid-template-columns: 320px minmax(0, 1fr);
      min-height: 100vh;
    }
    .sidebar {
      border-right: 1px solid var(--line);
      background: #ffffff;
      padding: 24px 20px;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: auto;
    }
    .sidebar h1 {
      margin: 0 0 8px;
      font-size: 22px;
    }
    .sidebar p {
      margin: 0 0 16px;
      color: var(--muted);
      line-height: 1.6;
      font-size: 14px;
    }
    .picker {
      width: 100%;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background: white;
      font-size: 14px;
      color: var(--text);
    }
    .hint {
      margin-top: 16px;
      padding: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      font-size: 13px;
      line-height: 1.7;
      color: #475467;
    }
    .actions {
      display: grid;
      gap: 10px;
      margin-top: 16px;
    }
    .platform-label {
      display: block;
      margin-top: 16px;
      margin-bottom: 8px;
      font-size: 13px;
      line-height: 1.5;
      color: #475467;
      font-weight: 600;
    }
    .action-button {
      width: 100%;
      appearance: none;
      border: 0;
      border-radius: 12px;
      padding: 12px 14px;
      background: #111827;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .action-button.secondary {
      background: #eef2ff;
      color: #1e3a8a;
      border: 1px solid #c7d2fe;
    }
    .copy-status {
      min-height: 1.4em;
      font-size: 12px;
      line-height: 1.5;
      color: #475467;
    }
    .content {
      padding: 28px 36px;
    }
    .article {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 36px 40px 48px;
      box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
    }
    .path {
      margin-bottom: 24px;
      color: var(--muted);
      font-size: 13px;
      letter-spacing: 0.01em;
    }
    .article-body.hidden,
    .copy-source {
      display: none;
    }
    .article h1, .article h2, .article h3 {
      line-height: 1.25;
      margin-top: 1.4em;
      margin-bottom: 0.7em;
      color: #111827;
      font-weight: 700;
    }
    .article h1 { font-size: 34px; margin-top: 0; }
    .article h2 { font-size: 26px; }
    .article h3 { font-size: 21px; }
    .article p, .article li {
      font-size: 18px;
      line-height: 1.85;
      color: #1f2937;
      margin: 0.85em 0;
    }
    .article strong { color: #111827; }
    .article em { font-style: italic; }
    .article del { color: #6b7280; }
    .article code {
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1px 6px;
      font-size: 0.9em;
    }
    .article pre,
    .article pre.code-block {
      margin: 20px 0;
      padding: 16px 18px;
      overflow-x: auto;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      background: #111827;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      color: #e5e7eb;
      font-size: 15px;
      line-height: 1.75;
      white-space: pre;
      font-family: "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
    }
    .article a {
      color: var(--accent);
      text-decoration: underline;
      border-bottom: 0;
    }
    .article hr {
      border: 0;
      border-top: 1px solid #e5e7eb;
      margin: 28px 0;
    }
    .article ul, .article ol {
      padding-left: 1.4em;
    }
    .article li + li {
      margin-top: 0.2em;
    }
    figure {
      margin: 24px 0;
    }
    .block-image {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 10px;
      border: 1px solid var(--line);
      box-shadow: none;
      background: white;
    }
    .inline-image {
      max-height: 1.2em;
      vertical-align: middle;
    }
    .wiki-link {
      color: var(--accent-2);
      font-weight: 600;
    }
    .article blockquote {
      margin: 18px 0;
      padding: 2px 0 2px 16px;
      border-left: 4px solid #d1d5db;
      color: #374151;
      background: transparent;
    }
    .article blockquote p {
      margin: 0.2em 0;
    }
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      margin: 22px 0;
    }
    .article table {
      width: 100%;
      border-collapse: collapse;
      min-width: 520px;
      font-size: 16px;
      line-height: 1.7;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
    }
    .article th,
    .article td {
      padding: 12px 14px;
      border-bottom: 1px solid #e5e7eb;
      border-right: 1px solid #e5e7eb;
      vertical-align: top;
      color: #1f2937;
    }
    .article th:last-child,
    .article td:last-child {
      border-right: 0;
    }
    .article tr:last-child td {
      border-bottom: 0;
    }
    .article th {
      background: #f8fafc;
      color: #111827;
      font-weight: 700;
      text-align: left;
    }
    @media (max-width: 980px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar {
        position: static;
        height: auto;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }
      .content { padding: 24px 16px; }
      .article { padding: 28px 22px 40px; border-radius: 14px; }
      .article h1 { font-size: 28px; }
      .article h2 { font-size: 22px; }
      .article h3 { font-size: 19px; }
      .article p, .article li { font-size: 16px; line-height: 1.8; }
      .article table { font-size: 14px; min-width: 460px; }
    }
  </style>
</head>
<body>
  <div class="layout">
    <aside class="sidebar">
      <h1>Markdown 预览</h1>
      <p>选择一篇 Markdown，输出成尽量接近正常文档的 HTML 预览。这里不再区分多种风格，目标是减少复制到飞书时的样式污染。</p>
      <form method="get">
        <select class="picker" name="file" onchange="this.form.submit()">
          ${options}
        </select>
      </form>
      <label class="platform-label" for="platform-picker">预览与复制目标平台</label>
      <select class="picker" id="platform-picker">
        <option value="feishu" selected>飞书（推荐）</option>
        <option value="generic">通用富文本</option>
      </select>
      <div class="hint">
        推荐测试方式：<br />
        1. 先选择目标平台。<br />
        2. 页面正文始终按正常阅读样式展示。<br />
        3. 如果要定向复制，先框选正文内容，再点“复制当前选中内容”。<br /><br />
        正常的 <code>Command+C</code> 不会被页面接管；只有点击按钮时，才会按当前平台规则处理复制内容。
      </div>
      <div class="actions">
        <button class="action-button" type="button" id="copy-platform-button">复制当前选中内容</button>
        <div class="copy-status" id="copy-status">按钮会复制当前平台下你选中的正文内容；如果没有选中内容，就复制当前正文全文。</div>
      </div>
    </aside>
    <main class="content">
      <article class="article">
        <div class="path">${escapeHtml(chosen)}</div>
        <section class="article-body" id="article-body-screen" data-platform-body="screen">
          ${articleHtml}
        </section>
        <section class="copy-source" id="copy-source-feishu" data-platform-copy-root="feishu">
          ${chosen ? renderMarkdownToHtml(chosen, "feishu") : "<p>没有找到可预览的 Markdown 文件。</p>"}
        </section>
        <section class="copy-source" id="copy-source-generic" data-platform-copy-root="generic">
          ${chosen ? renderMarkdownToHtml(chosen, "generic") : "<p>没有找到可预览的 Markdown 文件。</p>"}
        </section>
      </article>
    </main>
  </div>
  <script>
    const copyButton = document.getElementById("copy-platform-button");
    const copyStatus = document.getElementById("copy-status");
    const platformPicker = document.getElementById("platform-picker");
    const screenBody = document.getElementById("article-body-screen");
    const copySources = {
      feishu: document.getElementById("copy-source-feishu"),
      generic: document.getElementById("copy-source-generic"),
    };
    const platformMeta = {
      feishu: {
        copiedMessage: "飞书版内容已写入剪贴板，现在可以直接去飞书粘贴。",
      },
      generic: {
        copiedMessage: "通用富文本版内容已写入剪贴板，现在可以粘贴到目标编辑器测试。",
      },
    };

    function getActivePlatform() {
      return platformPicker.value in copySources ? platformPicker.value : "feishu";
    }

    function getActiveCopySource() {
      return copySources[getActivePlatform()];
    }

    function updatePlatformUi() {
      copyStatus.textContent = "按钮会复制当前平台下你选中的正文内容；如果没有选中内容，就复制当前正文全文。";
    }

    function extractSelectedPayload(container) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return null;
      }

      const anchorNode = selection.anchorNode;
      const focusNode = selection.focusNode;
      if (!anchorNode || !focusNode) {
        return null;
      }

      const anchorElement = anchorNode.nodeType === Node.ELEMENT_NODE ? anchorNode : anchorNode.parentElement;
      const focusElement = focusNode.nodeType === Node.ELEMENT_NODE ? focusNode : focusNode.parentElement;
      if (!container.contains(anchorElement) || !container.contains(focusElement)) {
        return null;
      }

      const fragment = selection.getRangeAt(0).cloneContents();
      const wrapper = document.createElement("div");
      wrapper.appendChild(fragment);
      return {
        html: wrapper.innerHTML,
        text: wrapper.innerText || wrapper.textContent || "",
      };
    }

    function ensureBlockCodeStructure(root, platform) {
      const codeBlocks = root.querySelectorAll("pre");
      codeBlocks.forEach((pre) => {
        if (!pre.querySelector("code")) {
          const code = document.createElement("code");
          code.textContent = pre.textContent;
          pre.textContent = "";
          pre.appendChild(code);
        }

        const code = pre.querySelector("code");
        pre.removeAttribute("class");
        pre.removeAttribute("data-language");
        code.removeAttribute("class");
        code.removeAttribute("data-language");

        if (platform === "feishu") {
          pre.style.cssText = "margin:20px 0;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;";
          code.style.cssText = "display:block;margin:0;padding:0;font-size:15px;line-height:1.75;font-family:'SFMono-Regular','Menlo','Monaco','Consolas',monospace;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;";
        } else {
          pre.style.cssText = "margin:20px 0;padding:16px 18px;border-radius:12px;border:1px solid #e5e7eb;background:#f8fafc;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;";
          code.style.cssText = "display:block;margin:0;padding:0;background:transparent;border:0;border-radius:0;color:#111827;font-size:15px;line-height:1.75;font-family:'SFMono-Regular','Menlo','Monaco','Consolas',monospace;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;";
        }
      });
    }

    function applyCopyStyles(wrapper, platform) {
      const headingSizeMap = {
        H1: "34px",
        H2: "26px",
        H3: "21px",
        H4: "18px",
        H5: "16px",
        H6: "15px",
      };

      wrapper.querySelectorAll("*").forEach((node) => {
        node.removeAttribute("id");
        if (node.tagName !== "IMG" && node.tagName !== "A") {
          node.removeAttribute("class");
        }
      });

      wrapper.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((heading) => {
        heading.style.cssText =
          "line-height:1.25;margin-top:1.4em;margin-bottom:0.7em;color:#111827;font-weight:700;font-size:" +
          headingSizeMap[heading.tagName] +
          ";";
      });

      wrapper.querySelectorAll("p").forEach((p) => {
        p.style.cssText = "font-size:18px;line-height:1.85;color:#1f2937;margin:0.85em 0;";
      });

      wrapper.querySelectorAll("li").forEach((li) => {
        li.style.cssText = "font-size:18px;line-height:1.85;color:#1f2937;margin:0.85em 0;";
      });

      wrapper.querySelectorAll("a").forEach((a) => {
        a.style.cssText = "color:#2563eb;text-decoration:underline;";
      });

      wrapper.querySelectorAll("blockquote").forEach((quote) => {
        quote.style.cssText = "margin:18px 0;padding:2px 0 2px 16px;border-left:4px solid #d1d5db;color:#374151;background:transparent;";
      });

      wrapper.querySelectorAll("hr").forEach((hr) => {
        hr.style.cssText = "border:0;border-top:1px solid #e5e7eb;margin:28px 0;";
      });

      wrapper.querySelectorAll("img").forEach((img) => {
        if (img.closest("figure")) {
          img.style.cssText = "display:block;width:100%;height:auto;border-radius:10px;border:1px solid #e5e7eb;background:#ffffff;";
        } else {
          img.style.cssText = "max-height:1.2em;vertical-align:middle;";
        }
      });

      wrapper.querySelectorAll("figure").forEach((figure) => {
        figure.style.cssText = "margin:24px 0;";
      });

      wrapper.querySelectorAll("table").forEach((table) => {
        table.style.cssText = "width:100%;border-collapse:collapse;min-width:520px;font-size:16px;line-height:1.7;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;";
      });

      wrapper.querySelectorAll("th").forEach((th) => {
        th.style.cssText = "padding:12px 14px;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;vertical-align:top;color:#111827;background:#f8fafc;font-weight:700;text-align:left;";
      });

      wrapper.querySelectorAll("td").forEach((td) => {
        td.style.cssText = "padding:12px 14px;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;vertical-align:top;color:#1f2937;";
      });

      wrapper.querySelectorAll("code").forEach((code) => {
        if (code.closest("pre")) return;
        code.style.cssText = "background:#f3f4f6;border:1px solid #e5e7eb;border-radius:6px;padding:1px 6px;font-size:0.9em;";
      });

      ensureBlockCodeStructure(wrapper, platform);
    }

    async function copyPayload(payload) {
      const html = payload.html;
      const text = payload.text;

      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
        return;
      }

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(screenBody);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }

    copyButton.addEventListener("click", async () => {
      const selectedPayload = extractSelectedPayload(screenBody);
      let payload = selectedPayload;

      if (payload) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = payload.html;
        applyCopyStyles(wrapper, getActivePlatform());
        payload = {
          html: wrapper.innerHTML,
          text: payload.text,
        };
      } else {
        const activeCopySource = getActiveCopySource();
        payload = {
          html: activeCopySource.innerHTML,
          text: activeCopySource.innerText,
        };
      }

      copyStatus.textContent = "正在写入剪贴板...";
      try {
        await copyPayload(payload);
        copyStatus.textContent = platformMeta[getActivePlatform()].copiedMessage;
      } catch (error) {
        copyStatus.textContent = "浏览器没有完成自动复制，请先手动框选正文内容，再按 Command+C。";
      }
    });

    platformPicker.addEventListener("change", updatePlatformUi);

    updatePlatformUi();
  </script>
</body>
</html>`;
}

function openBrowser(url) {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  try {
    spawn(cmd, [url], { stdio: "ignore", detached: true }).unref();
  } catch (error) {
    console.error(`无法自动打开浏览器，请手动访问：${url}`);
  }
}

function start() {
  const args = parseArgs(process.argv.slice(2));
  const initialFile = args.file ? args.file.replace(/^\/+/, "") : "";

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://localhost:${args.port}`);
    const selectedFile = requestUrl.searchParams.get("file") || initialFile;

    try {
      const html = renderPage(selectedFile);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Render error: ${error.message}`);
    }
  });

  server.listen(args.port, () => {
    const params = [];
    if (initialFile) {
      params.push(`file=${encodeURIComponent(initialFile)}`);
    }
    const url = `http://localhost:${args.port}${params.length ? `/?${params.join("&")}` : ""}`;
    console.log(`Markdown publish preview is running at: ${url}`);
    if (args.open) {
      openBrowser(url);
    }
  });
}

start();
