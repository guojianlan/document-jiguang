#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

function usage() {
  console.error("Usage: node scripts/render_svg_png.js <input.svg> <output.png>");
}

const [, , inputArg, outputArg] = process.argv;

if (!inputArg || !outputArg) {
  usage();
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputArg);
const outputPath = path.resolve(process.cwd(), outputArg);

if (!fs.existsSync(inputPath)) {
  console.error(`SVG not found: ${inputPath}`);
  process.exit(1);
}

const svg = fs.readFileSync(inputPath, "utf8");
const resvg = new Resvg(svg, {
  background: "rgba(0,0,0,0)",
});

const pngData = resvg.render();
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, pngData.asPng());

const size = pngData.width && pngData.height
  ? `${pngData.width}x${pngData.height}`
  : "unknown";

console.log(`Rendered: ${inputPath}`);
console.log(`Output: ${outputPath}`);
console.log(`Size: ${size}`);
