#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const React = require("react");
const satoriImport = require("satori");

const satori = satoriImport.default || satoriImport;

function usage() {
  console.error(
    "Usage: node scripts/render_satori_visual.js <template.js> <data.json> <output.svg>"
  );
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveFontPath(candidate) {
  if (!candidate) {
    return null;
  }

  const resolved = path.isAbsolute(candidate)
    ? candidate
    : path.resolve(process.cwd(), candidate);

  return fs.existsSync(resolved) ? resolved : null;
}

function getDefaultFonts() {
  const candidates = [
    {
      name: "Arial Unicode",
      path: "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
      weight: 400,
      style: "normal",
    },
    {
      name: "Arial",
      path: "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
      weight: 700,
      style: "normal",
    },
    {
      name: "Arial",
      path: "/System/Library/Fonts/Supplemental/Arial.ttf",
      weight: 400,
      style: "normal",
    },
  ];

  return candidates
    .map((font) => {
      const resolvedPath = resolveFontPath(font.path);
      if (!resolvedPath) {
        return null;
      }

      return {
        name: font.name,
        data: fs.readFileSync(resolvedPath),
        weight: font.weight,
        style: font.style,
      };
    })
    .filter(Boolean);
}

async function main() {
  const [, , templateArg, dataArg, outputArg] = process.argv;

  if (!templateArg || !dataArg || !outputArg) {
    usage();
    process.exit(1);
  }

  const templatePath = path.resolve(process.cwd(), templateArg);
  const dataPath = path.resolve(process.cwd(), dataArg);
  const outputPath = path.resolve(process.cwd(), outputArg);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Data not found: ${dataPath}`);
  }

  const template = require(templatePath);
  const data = loadJson(dataPath);

  if (!template || typeof template.render !== "function" || !template.size) {
    throw new Error("Template must export { size, render }");
  }

  const fonts = getDefaultFonts();
  if (fonts.length === 0) {
    throw new Error("No usable font files found for Satori rendering");
  }

  const element = template.render({
    React,
    data,
  });

  const svg = await satori(element, {
    width: template.size.width,
    height: template.size.height,
    fonts,
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, svg, "utf8");

  console.log(`Template: ${templatePath}`);
  console.log(`Data: ${dataPath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Size: ${template.size.width}x${template.size.height}`);
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
