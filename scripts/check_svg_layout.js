#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

function usage() {
  console.error(
    "Usage: node scripts/check_svg_layout.js <input.svg> [--json] [--tolerance <px>]"
  );
}

function parseArgs(argv) {
  const args = argv.slice(2);
  let inputArg = "";
  let json = false;
  let tolerance = 2;

  for (let i = 0; i < args.length; i += 1) {
    const current = args[i];

    if (current === "--json") {
      json = true;
      continue;
    }

    if (current === "--tolerance") {
      const value = Number.parseInt(args[i + 1], 10);
      if (!Number.isFinite(value) || value < 0) {
        throw new Error(`Invalid tolerance: ${args[i + 1]}`);
      }
      tolerance = value;
      i += 1;
      continue;
    }

    if (!inputArg) {
      inputArg = current;
      continue;
    }

    throw new Error(`Unexpected argument: ${current}`);
  }

  if (!inputArg) {
    usage();
    process.exit(1);
  }

  return {
    inputPath: path.resolve(process.cwd(), inputArg),
    json,
    tolerance,
  };
}

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error("Chrome executable not found");
}

function readSvgMeta(inputPath) {
  const svg = fs.readFileSync(inputPath, "utf8");
  const sizeMatch = svg.match(/<svg[^>]*width="(\d+)"[^>]*height="(\d+)"/);
  if (!sizeMatch) {
    throw new Error(`Failed to parse SVG root size: ${inputPath}`);
  }

  return {
    svg,
    rootWidth: Number.parseInt(sizeMatch[1], 10),
    rootHeight: Number.parseInt(sizeMatch[2], 10),
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function waitForTarget(port, wrapperUrl, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`, 5000);
      const pageTarget = targets.find(
        (target) => target.type === "page" && target.url === wrapperUrl
      );
      if (pageTarget?.webSocketDebuggerUrl) {
        return pageTarget.webSocketDebuggerUrl;
      }
    } catch (_error) {
      // Chrome may not have opened the debugging port yet.
    }
    await delay(150);
  }

  throw new Error(`Timed out waiting for Chrome page target: ${wrapperUrl}`);
}

function createCdpClient(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    let nextId = 1;

    socket.addEventListener("open", () => {
      resolve({
        async send(method, params = {}) {
          const id = nextId;
          nextId += 1;

          const payload = JSON.stringify({ id, method, params });
          const response = await new Promise((resolveSend, rejectSend) => {
            pending.set(id, { resolve: resolveSend, reject: rejectSend });
            socket.send(payload);
          });

          if (response.error) {
            throw new Error(response.error.message || `CDP error in ${method}`);
          }

          return response.result || {};
        },
        async close() {
          for (const [, request] of pending) {
            request.reject(new Error("CDP connection closed"));
          }
          pending.clear();

          if (
            socket.readyState === WebSocket.OPEN ||
            socket.readyState === WebSocket.CONNECTING
          ) {
            socket.close();
          }
        },
      });
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data.toString());
      if (message.id && pending.has(message.id)) {
        const request = pending.get(message.id);
        pending.delete(message.id);
        request.resolve(message);
      }
    });

    socket.addEventListener("error", (event) => {
      reject(event.error || new Error("WebSocket connection failed"));
    });

    socket.addEventListener("close", () => {
      for (const [, request] of pending) {
        request.reject(new Error("CDP connection closed"));
      }
      pending.clear();
    });
  });
}

function makeWrapperHtml(svg) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    body {
      width: max-content;
      height: max-content;
      overflow: hidden;
    }
    svg {
      display: block;
    }
  </style>
</head>
<body>
${svg}
</body>
</html>`;
}

async function main() {
  const { inputPath, json, tolerance } = parseArgs(process.argv);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`SVG not found: ${inputPath}`);
  }

  const chromePath = findChrome();
  const { svg, rootWidth, rootHeight } = readSvgMeta(inputPath);
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "svg-layout-"));
  const profileDir = path.join(tmpDir, "profile");
  fs.mkdirSync(profileDir, { recursive: true });

  const wrapperPath = path.join(tmpDir, "layout-wrapper.html");
  const wrapperUrl = `file://${wrapperPath}`;
  fs.writeFileSync(wrapperPath, makeWrapperHtml(svg), "utf8");

  const port = 9224 + Math.floor(Math.random() * 400);
  const chromeArgs = [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--window-size=${rootWidth},${rootHeight}`,
    wrapperUrl,
  ];

  const chrome = spawn(chromePath, chromeArgs, {
    stdio: "ignore",
  });

  let client;
  try {
    const wsUrl = await waitForTarget(port, wrapperUrl, 15000);
    client = await createCdpClient(wsUrl);

    await client.send("Page.enable");
    await client.send("Runtime.enable");

    const { result } = await client.send("Runtime.evaluate", {
      expression: `(() => {
        const root = document.querySelector("svg");
        if (!root) {
          return { error: "No root svg found" };
        }

        const rootRect = root.getBoundingClientRect();
        const selectors = Array.from(root.querySelectorAll("text, foreignObject"))
          .filter((node) => {
            const text = (node.textContent || "").replace(/\\s+/g, " ").trim();
            if (!text) return false;
            const rect = node.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })
          .map((node, index) => {
            const rect = node.getBoundingClientRect();
            const text = (node.textContent || "").replace(/\\s+/g, " ").trim();
            return {
              id: index,
              tag: node.tagName.toLowerCase(),
              text,
              x: rect.x - rootRect.x,
              y: rect.y - rootRect.y,
              width: rect.width,
              height: rect.height
            };
          });

        const overflowIssues = [];
        const overlapIssues = [];
        const tolerance = ${JSON.stringify(tolerance)};

        function intersection(a, b) {
          const left = Math.max(a.x, b.x);
          const top = Math.max(a.y, b.y);
          const right = Math.min(a.x + a.width, b.x + b.width);
          const bottom = Math.min(a.y + a.height, b.y + b.height);
          return {
            width: Math.max(0, right - left),
            height: Math.max(0, bottom - top),
          };
        }

        for (const item of selectors) {
          const overflows = {
            left: item.x < -tolerance,
            top: item.y < -tolerance,
            right: item.x + item.width > rootRect.width + tolerance,
            bottom: item.y + item.height > rootRect.height + tolerance,
          };

          if (overflows.left || overflows.top || overflows.right || overflows.bottom) {
            overflowIssues.push({
              item,
              overflows,
            });
          }
        }

        for (let i = 0; i < selectors.length; i += 1) {
          for (let j = i + 1; j < selectors.length; j += 1) {
            const a = selectors[i];
            const b = selectors[j];
            const area = intersection(a, b);
            if (area.width <= 2 || area.height <= 2) {
              continue;
            }

            const overlapArea = area.width * area.height;
            const aArea = a.width * a.height;
            const bArea = b.width * b.height;
            const ratio = overlapArea / Math.min(aArea, bArea);

            if (ratio >= 0.08) {
              overlapIssues.push({
                a,
                b,
                overlapArea,
                overlapRatio: ratio,
              });
            }
          }
        }

        return {
          root: {
            width: rootRect.width,
            height: rootRect.height,
          },
          inspectedCount: selectors.length,
          overflowIssues,
          overlapIssues,
        };
      })()`,
      returnByValue: true,
    });

    const value = result?.value;
    if (!value || value.error) {
      throw new Error(value?.error || "Failed to inspect svg layout");
    }

    const issueCount = value.overflowIssues.length + value.overlapIssues.length;

    if (json) {
      console.log(JSON.stringify(value, null, 2));
    } else {
      console.log(`SVG: ${inputPath}`);
      console.log(`Inspected text blocks: ${value.inspectedCount}`);
      console.log(`Overflow issues: ${value.overflowIssues.length}`);
      console.log(`Overlap issues: ${value.overlapIssues.length}`);

      for (const issue of value.overflowIssues.slice(0, 5)) {
        console.log(
          `- Overflow: "${issue.item.text.slice(0, 48)}" @ (${Math.round(
            issue.item.x
          )}, ${Math.round(issue.item.y)}) ${Math.round(issue.item.width)}x${Math.round(
            issue.item.height
          )}`
        );
      }

      for (const issue of value.overlapIssues.slice(0, 5)) {
        console.log(
          `- Overlap: "${issue.a.text.slice(0, 28)}" <-> "${issue.b.text.slice(
            0,
            28
          )}" ratio=${issue.overlapRatio.toFixed(2)}`
        );
      }
    }

    process.exitCode = issueCount > 0 ? 2 : 0;
  } finally {
    if (client) {
      await client.close().catch(() => {});
    }
    chrome.kill("SIGKILL");
  }
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
