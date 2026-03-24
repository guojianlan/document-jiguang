#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn, spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const serverScript = path.join(repoRoot, "scripts", "serve_markdown_publish_preview.js");
const logDir = path.join(repoRoot, ".tmp");
const pidFile = path.join(logDir, "markdown_publish_preview.pid");
const logFile = path.join(logDir, "markdown_publish_preview.log");
const defaultPort = 4312;

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
  return defaultPort;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function canSignal(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (_error) {
    return false;
  }
}

function readPortListenerPids(port) {
  const result = spawnSync("lsof", ["-tiTCP:" + String(port), "-sTCP:LISTEN"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  if (result.status !== 0 && !result.stdout) {
    return [];
  }

  return result.stdout
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 0);
}

async function stopExistingProcesses(port) {
  if (fs.existsSync(pidFile)) {
    const existingPid = Number(fs.readFileSync(pidFile, "utf8").trim());
    if (Number.isInteger(existingPid) && existingPid > 0 && canSignal(existingPid)) {
      try {
        process.kill(existingPid, "SIGTERM");
      } catch (_error) {
        // Ignore stale pid entries.
      }
      await sleep(300);
    }
    fs.rmSync(pidFile, { force: true });
  }

  for (const pid of readPortListenerPids(port)) {
    if (!canSignal(pid)) continue;
    try {
      process.kill(pid, "SIGTERM");
    } catch (_error) {
      // Ignore already-exited processes.
    }
  }

  await sleep(300);
}

function waitForPort(port, timeoutMs) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = net.createConnection({ host: "127.0.0.1", port });

      socket.once("connect", () => {
        socket.end();
        resolve();
      });

      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - startedAt >= timeoutMs) {
          reject(new Error(`Port ${port} did not start listening in time.`));
          return;
        }
        setTimeout(tryConnect, 150);
      });
    };

    tryConnect();
  });
}

async function main() {
  const port = readConfiguredPort();
  const startArgs = [serverScript, ...process.argv.slice(2), "--port", String(port)];

  fs.mkdirSync(logDir, { recursive: true });
  await stopExistingProcesses(port);

  const logFd = fs.openSync(logFile, "a");
  const child = spawn(process.execPath, startArgs, {
    cwd: repoRoot,
    detached: true,
    stdio: ["ignore", logFd, logFd],
  });

  child.unref();
  fs.closeSync(logFd);
  fs.writeFileSync(pidFile, String(child.pid));

  try {
    await waitForPort(port, 4000);
  } catch (error) {
    fs.rmSync(pidFile, { force: true });
    console.error(`Markdown 预览服务启动失败，请检查日志：${logFile}`);
    throw error;
  }

  console.log(`Markdown 预览服务已重启：http://127.0.0.1:${port}`);
  console.log(`PID: ${child.pid}`);
  console.log(`Log: ${logFile}`);
}

main().catch((error) => {
  process.exitCode = 1;
  if (error && error.message) {
    console.error(error.message);
  }
});
