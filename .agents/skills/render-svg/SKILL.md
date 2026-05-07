---
name: render-svg
description: Generate or refine SVG visual assets (covers, cognition diagrams, social cards) and validate layout. Use when the user wants visual assets for an article, asks to render with Satori templates, or needs to fix overflowing/overlapping text in an SVG.
---

# render-svg

## 何时使用

当用户出现下面这些请求时，使用这个 skill：

- 已经有文章或发布版，想补封面图、结构图、图卡
- 已经有社交媒体切图文案，想批量生成 SVG 图卡
- 想把某篇文章变成"正文 + 配图 + 传播图卡"的完整内容包
- 想继续复用同一视觉语言，批量做同类文章配图
- 文本密度高、容易越界的结构图（优先使用 Satori 模板 + 数据生成）
- SVG 资产生成后做布局校验、PNG 预览验证
- 平台分发需要 PNG，且必须锁定 SVG 根尺寸

如果用户还没有稳定正文或观点主线，不要先做大量视觉资产。

## 输入

- 发布版正文
- 发布建议
- 社交媒体切图文案
- 可选视觉方向或品牌偏好

## 输出

至少产出其中 2 类：

- SVG 封面图
- SVG 认知图 / 结构图
- SVG 图卡
- 对应的 `.preview.png` 预览文件
- 必要时导出的 PNG 分发文件
- 图卡使用建议或发布搭配建议

## 标准流程

### 1. 先判断资产类型

优先判断当前需要的是：

- 封面图
- 认知图 / 结构图
- 社交图卡
- 一整组视觉资产

### 2. 先绑定正文观点

视觉资产必须服务正文表达，先提炼：

- 这篇文章最核心的一句话
- 最适合做图的 1 到 3 个框架
- 最值得切图传播的句子

### 3. 先生成 SVG

默认优先产出：

- 可编辑 SVG 源文件
- 命名进入 `raw/attachments`

如果是结构图、认知图、全文总览图这类文本密度高的资产，优先改用：

- `Satori` 模板
- 结构化数据
- 再生成 SVG

说明见：

- [Satori视觉资产说明.md](/Users/apple/Desktop/project/document/99_System/Satori视觉资产说明.md)

### 4. 再做 PNG 预览验证

每次生成或修改 SVG 后，必须执行：

```bash
bash scripts/validate_svg_asset.sh "raw/attachments/xxx.svg" --png "raw/attachments/xxx.preview.png"
```

如果已经进入发布阶段，横版图默认可直接按统一宽度导出，例如：

```bash
bash scripts/validate_svg_asset.sh "raw/attachments/xxx.svg" --png "raw/attachments/xxx.png" --width 1440
```

重点检查：

- 文字是否裁切
- 中英文是否换行异常
- 卡片留白是否均衡
- 强调层级是否清楚

导出原则：

- 优先使用仓库内固定 SVG 渲染器
- 不依赖当前机器的浏览器窗口尺寸来决定最终结果
- 最终 PNG 必须由目标宽度和原始比例直接导出
- 如果需要跨机器稳定复现，优先选择稳定字体方案，不要完全依赖系统字体

### 5. 再决定是否导出 PNG

如果用户要发平台、交给设计或直接分发，再额外导出 PNG。

如果目标是飞书文档、公众号编辑器、小红书图文等实际发布场景，默认优先交付 PNG。

默认区分：

- `.svg`：源文件
- `.preview.png`：校验预览
- `.png`：明确要分发时再导出

## 常用命令

```bash
# Satori 模板渲染
npm run render:satori

# 单文件布局校验
node scripts/check_svg_layout.js <file.svg>

# 仓库级 SVG 校验
npm run check:svg

# SVG → PNG 导出（锁定宽度）
bash scripts/validate_svg_asset.sh <file.svg> --png <out.png> --width 1440
```

## 资源加载规则

优先读取：

- [publish-article](/Users/apple/Desktop/project/document/.agents/skills/publish-article/SKILL.md)
- [SVG图卡生成与校验规范.md](/Users/apple/Desktop/project/document/.agents/skills/publish-article/references/SVG图卡生成与校验规范.md)
- [SVG资产生成与校验说明.md](/Users/apple/Desktop/project/document/99_System/SVG资产生成与校验说明.md)
- [文章发布包装流程.md](/Users/apple/Desktop/project/document/05_Workflows/文章发布包装流程.md)

## 边界

- 这个 skill 解决的是"视觉资产生产与验证"，不是来源研究
- 如果观点还没稳定，不要硬做很多图
- PNG 不是默认源文件，SVG 才是长期可复用资产
- 视觉资产服务正文表达，不追求装饰热闹
- 跨机器一致性优先选稳定字体方案，不依赖系统字体
- 对外发布正文（飞书、公众号）默认引用 PNG，不直接引用 SVG

## 交付要求

- 所有视觉资产都必须落盘
- SVG 生成后必须至少验证一次（hook 已自动触发，但可手动复查）
- 预览文件建议使用 `.preview.png`
- 需要分发时再导出正式 PNG
- 若已经进入实际发布阶段，正文和发布说明默认应引用 PNG
