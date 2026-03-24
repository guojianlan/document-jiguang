#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

function usage() {
  console.error(
    "Usage: node scripts/render_svg_png_chrome.js <input.svg> <output.png> [--width <pixels>]"
  );
}

function parseArgs(argv) {
  const args = argv.slice(2);
  let inputArg = "";
  let outputArg = "";
  let widthArg = "";

  for (let i = 0; i < args.length; i += 1) {
    const current = args[i];
    if (current === "--width") {
      widthArg = args[i + 1];
      i += 1;
      continue;
    }

    if (!inputArg) {
      inputArg = current;
      continue;
    }

    if (!outputArg) {
      outputArg = current;
      continue;
    }

    throw new Error(`Unexpected argument: ${current}`);
  }

  if (!inputArg || !outputArg) {
    usage();
    process.exit(1);
  }

  const width = widthArg ? Number.parseInt(widthArg, 10) : null;
  if (widthArg && (!Number.isFinite(width) || width <= 0)) {
    throw new Error(`Invalid width: ${widthArg}`);
  }

  return {
    inputPath: path.resolve(process.cwd(), inputArg),
    outputPath: path.resolve(process.cwd(), outputArg),
    targetWidth: width,
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

  const backgroundMatch = svg.match(
    /<rect[^>]*width="(?:100%|\d+)"[^>]*height="(?:100%|\d+)"[^>]*fill="([^"]+)"/
  );

  return {
    rootWidth: Number.parseInt(sizeMatch[1], 10),
    rootHeight: Number.parseInt(sizeMatch[2], 10),
    background: backgroundMatch ? backgroundMatch[1] : "#ffffff",
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForFile(filePath, timeoutMs) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    await delay(100);
  }
  throw new Error(`Timed out waiting for file: ${filePath}`);
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
    const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`, 5000);
    const pageTarget = targets.find(
      (target) => target.type === "page" && target.url === wrapperUrl
    );
    if (pageTarget?.webSocketDebuggerUrl) {
      return pageTarget.webSocketDebuggerUrl;
    }
    await delay(150);
  }

  throw new Error(`Timed out waiting for Chrome page target: ${wrapperUrl}`);
}

function createCdpClient(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    const listeners = new Map();
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
        on(method, handler) {
          listeners.set(method, handler);
        },
        async close() {
          for (const [, request] of pending) {
            request.reject(new Error("CDP connection closed"));
          }
          pending.clear();

          if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
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
        return;
      }

      if (message.method && listeners.has(message.method)) {
        listeners.get(message.method)(message.params);
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

async function waitForImageLoaded(client, timeoutMs) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const { result } = await client.send("Runtime.evaluate", {
      expression: `(() => {
        const img = document.getElementById("asset");
        if (!img) return { ready: false };
        const rect = img.getBoundingClientRect();
        return {
          ready: Boolean(img.complete && img.naturalWidth > 0),
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      })()`,
      returnByValue: true,
    });

    if (result?.value?.ready) {
      return result.value;
    }

    await delay(100);
  }

  throw new Error("Timed out waiting for SVG image to load");
}

async function main() {
  const { inputPath, outputPath, targetWidth } = parseArgs(process.argv);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`SVG not found: ${inputPath}`);
  }

  const chromePath = findChrome();
  const { rootWidth, rootHeight, background } = readSvgMeta(inputPath);
  const exportWidth = targetWidth || rootWidth;
  const exportHeight = Math.round((rootHeight * exportWidth) / rootWidth);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "svg-chrome-"));
  const profileDir = path.join(tmpDir, "profile");
  fs.mkdirSync(profileDir, { recursive: true });

  const wrapperPath = path.join(tmpDir, "render-wrapper.html");
  const inputUrl = `file://${inputPath}`;
  const wrapperUrl = `file://${wrapperPath}`;

  fs.writeFileSync(
    wrapperPath,
    `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: ${exportWidth}px;
      height: ${exportHeight}px;
      overflow: hidden;
      background: ${background};
    }
    img {
      display: block;
      width: ${exportWidth}px;
      height: ${exportHeight}px;
    }
  </style>
</head>
<body>
  <img id="asset" src="${inputUrl}" alt="" />
</body>
</html>`
  );

  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDir}`,
      `--window-size=${exportWidth},${exportHeight}`,
      wrapperUrl,
    ],
    {
      stdio: ["ignore", "ignore", "pipe"],
    }
  );

  let chromeExited = false;
  chrome.on("exit", () => {
    chromeExited = true;
  });

  let client;

  try {
    const activePortRaw = await waitForFile(
      path.join(profileDir, "DevToolsActivePort"),
      10000
    );
    const [portLine] = activePortRaw.trim().split("\n");
    const port = Number.parseInt(portLine, 10);
    if (!Number.isFinite(port)) {
      throw new Error("Failed to parse Chrome debugging port");
    }

    const wsUrl = await waitForTarget(port, wrapperUrl, 10000);
    client = await createCdpClient(wsUrl);

    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: exportWidth,
      height: exportHeight,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: exportWidth,
      screenHeight: exportHeight,
    });

    const bounds = await waitForImageLoaded(client, 10000);

    const { data } = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: {
        x: bounds.x || 0,
        y: bounds.y || 0,
        width: exportWidth,
        height: exportHeight,
        scale: 1,
      },
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, Buffer.from(data, "base64"));

    console.log(`Rendered: ${inputPath}`);
    console.log(`Output: ${outputPath}`);
    console.log(`Size: ${exportWidth}x${exportHeight}`);
  } finally {
    if (client) {
      await client.close().catch(() => {});
    }

    if (!chromeExited) {
      chrome.kill("SIGTERM");
      await delay(200);
      if (!chromeExited) {
        chrome.kill("SIGKILL");
      }
    }

    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
