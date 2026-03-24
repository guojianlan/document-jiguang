#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash scripts/validate_svg_asset.sh <svg-path> [--png <png-output>] [--width <pixels>] [--size <max-px>] [--skip-layout-check]

Purpose:
  Render an SVG into a PNG preview so the asset can be visually checked after generation.

Notes:
  - SVG should remain the source of truth.
  - PNG is a derived preview or distribution artifact.
  - On macOS, this script can fall back to Quick Look (`qlmanage`) when no dedicated SVG renderer is installed.
  - By default, a layout check runs after render to catch obvious text overflow / overlap risks.
EOF
}

svg_path=""
png_output=""
max_size="1600"
export_width=""
skip_layout_check="0"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --png)
      [[ $# -ge 2 ]] || { echo "Missing value for --png" >&2; exit 1; }
      png_output="$2"
      shift 2
      ;;
    --size)
      [[ $# -ge 2 ]] || { echo "Missing value for --size" >&2; exit 1; }
      max_size="$2"
      shift 2
      ;;
    --width)
      [[ $# -ge 2 ]] || { echo "Missing value for --width" >&2; exit 1; }
      export_width="$2"
      shift 2
      ;;
    --skip-layout-check)
      skip_layout_check="1"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -z "$svg_path" ]]; then
        svg_path="$1"
        shift
      else
        echo "Unexpected argument: $1" >&2
        usage >&2
        exit 1
      fi
      ;;
  esac
done

if [[ -z "$svg_path" ]]; then
  usage >&2
  exit 1
fi

if [[ ! -f "$svg_path" ]]; then
  echo "SVG not found: $svg_path" >&2
  exit 1
fi

svg_abs="$(cd "$(dirname "$svg_path")" && pwd)/$(basename "$svg_path")"
tmp_dir="$(mktemp -d "${TMPDIR:-/tmp}/svg-preview.XXXXXX")"
preview_png="$tmp_dir/$(basename "$svg_abs").png"
renderer=""
svg_width=""
svg_height=""
target_width=""
target_height=""

read_svg_meta() {
  read -r svg_width svg_height < <(
    python3 - "$svg_abs" <<'PY'
import re, sys
from pathlib import Path

txt = Path(sys.argv[1]).read_text()
m = re.search(r'<svg[^>]*width="(\d+)"[^>]*height="(\d+)"', txt)
if not m:
    raise SystemExit(1)
print(m.group(1), m.group(2))
PY
  ) || return 1
}

read_svg_meta || {
  echo "Failed to parse SVG root size: $svg_abs" >&2
  exit 1
}

if [[ -n "$export_width" ]]; then
  target_width="$export_width"
  target_height="$(python3 - "$svg_width" "$svg_height" "$export_width" <<'PY'
import sys
root_w = int(sys.argv[1])
root_h = int(sys.argv[2])
target_w = int(sys.argv[3])
print(round(root_h * target_w / root_w))
PY
)"
else
  target_width="$svg_width"
  target_height="$svg_height"
fi

render_with_resvg_js() {
  node "$(cd "$(dirname "$0")" && pwd)/render_svg_png.js" "$svg_abs" "$preview_png" >/dev/null
}

render_with_magick() {
  magick "$svg_abs" "$preview_png"
}

render_with_rsvg() {
  rsvg-convert "$svg_abs" -o "$preview_png"
}

find_chrome() {
  local candidates=(
    "${CHROME_BIN:-}"
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "$(command -v google-chrome 2>/dev/null || true)"
    "$(command -v chromium 2>/dev/null || true)"
    "$(command -v chromium-browser 2>/dev/null || true)"
  )

  for candidate in "${candidates[@]}"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then
      echo "$candidate"
      return 0
    fi
  done

  return 1
}

render_with_chrome() {
  local chrome_bin chrome_script
  chrome_bin="$(find_chrome)" || return 1
  chrome_script="$(cd "$(dirname "$0")" && pwd)/render_svg_png_chrome.js"

  if [[ -n "$export_width" ]]; then
    CHROME_BIN="$chrome_bin" node "$chrome_script" "$svg_abs" "$preview_png" --width "$export_width" >/dev/null 2>&1 && return 0
    sleep 1
    CHROME_BIN="$chrome_bin" node "$chrome_script" "$svg_abs" "$preview_png" --width "$export_width" >/dev/null 2>&1
  else
    CHROME_BIN="$chrome_bin" node "$chrome_script" "$svg_abs" "$preview_png" >/dev/null 2>&1 && return 0
    sleep 1
    CHROME_BIN="$chrome_bin" node "$chrome_script" "$svg_abs" "$preview_png" >/dev/null 2>&1
  fi
}

render_with_qlmanage() {
  qlmanage -t -s "$max_size" -o "$tmp_dir" "$svg_abs" >/dev/null 2>&1
  [[ -f "$preview_png" ]]
}

if render_with_chrome; then
  renderer="chrome-headless"
elif [[ -d "$(cd "$(dirname "$0")/.." && pwd)/node_modules/@resvg/resvg-js" ]]; then
  render_with_resvg_js
  renderer="resvg-js"
elif command -v magick >/dev/null 2>&1; then
  render_with_magick
  renderer="magick"
elif command -v rsvg-convert >/dev/null 2>&1; then
  render_with_rsvg
  renderer="rsvg-convert"
elif command -v sips >/dev/null 2>&1; then
  sips -s format png "$svg_abs" --out "$preview_png" >/dev/null
  renderer="sips"
elif command -v qlmanage >/dev/null 2>&1; then
  render_with_qlmanage || {
    echo "Quick Look failed to render preview for: $svg_abs" >&2
    exit 1
  }
  renderer="qlmanage"
else
  echo "No SVG renderer found. Install dependencies with 'npm install' or provide ImageMagick/librsvg." >&2
  exit 1
fi

echo "SVG: $svg_abs"
echo "Renderer: $renderer"
echo "Preview PNG: $preview_png"
echo "Target Size: ${target_width}x${target_height}"

if [[ "$skip_layout_check" != "1" ]] && command -v node >/dev/null 2>&1; then
  layout_script="$(cd "$(dirname "$0")" && pwd)/check_svg_layout.js"
  if [[ -f "$layout_script" ]]; then
    if ! node "$layout_script" "$svg_abs"; then
      echo "Layout check failed for: $svg_abs" >&2
      echo "Tip: text-heavy layouts should prefer Satori templates and data-driven rendering." >&2
      exit 1
    fi
  fi
fi

if [[ -n "$png_output" ]]; then
  png_dir="$(dirname "$png_output")"
  mkdir -p "$png_dir"
  png_abs_path="$(cd "$png_dir" && pwd)/$(basename "$png_output")"
  cp "$preview_png" "$png_abs_path"
  echo "Exported PNG: $png_abs_path"

  if [[ "$renderer" == "qlmanage" ]]; then
    echo "Note: PNG was exported from a Quick Look preview. SVG remains the source of truth." >&2
  fi
fi
