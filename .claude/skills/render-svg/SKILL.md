---
name: render-svg
description: Generate or refine SVG visual assets (covers, cognition diagrams, social cards) and validate layout. Use when the user wants visual assets for an article, asks to render with Satori templates, or needs to fix overflowing/overlapping text in an SVG.
---

# render-svg

入口 skill，主体规范在仓库内的长期 skill：

- [skills/article-visual-assets/SKILL.md](/Users/apple/Desktop/project/document/skills/article-visual-assets/SKILL.md)

## 何时使用

- 已有正文或发布版，需要补封面、认知图、结构图、SVG 图卡
- 文本密度高、容易越界的结构图（优先使用 Satori 模板 + 数据生成）
- SVG 资产生成后做布局校验、PNG 预览验证
- 平台分发需要 PNG，且必须锁定 SVG 根尺寸

如果正文核心观点还没稳定，不要先做大量视觉资产。

## 标准流程

按 [skills/article-visual-assets/SKILL.md](/Users/apple/Desktop/project/document/skills/article-visual-assets/SKILL.md) 执行：

1. 判断资产类型（封面 / 认知图 / 社交图卡 / 整组）
2. 先绑定正文观点
3. 选生成方式：手写 SVG vs Satori 模板（文本密度高、跨机一致性要求高优先 Satori）
4. 跑 PNG 预览验证
5. 跑布局校验（文字越界、重叠）
6. 发现问题先修 SVG 或模板，不要靠改预览样式绕过
7. 平台分发再导 PNG，宽度锁 1440 等统一规格，比例与 SVG 根尺寸一致

## 命令

```bash
# Satori 模板渲染（具体调用方式见 scripts/render_satori_visual.js）
npm run render:satori

# 单文件布局校验
node scripts/check_svg_layout.js <file.svg>

# 仓库级 SVG 校验
npm run check:svg

# SVG → PNG 导出（锁定宽度）
bash scripts/validate_svg_asset.sh <file.svg> --png <out.png> --width 1440
```

## 边界

- 视觉资产服务正文表达，不追求装饰热闹
- 跨机器一致性优先选稳定字体方案，不依赖系统字体
- 对外发布正文（飞书、公众号）默认引用 PNG，不直接引用 SVG
- 每次生成或修改 SVG 后至少完成一次渲染验证（hook 已自动触发，但可手动复查）
