# Satori 视觉资产说明

这个说明用于约束仓库里“文本较多、容易超框”的视觉资产如何用 `Satori` 生成。

从现在开始，`Satori` 不只是“可以考虑”的方案，而是下面这类资产的默认首选方案：

- 步骤型流程图
- 文本较多的结构图
- 多卡片并排、标题和说明都较长的认知图
- 高传播图卡组里的方法卡、规则卡、对比卡

如果一张图的主要复杂度来自文字排版，而不是矢量插画，就不要再默认先手写 SVG `text`，而应优先从 `Satori` 起步。

## 适用场景

优先用于下面这些图：

- 全文结构图
- 方法链路图
- 文本较多的认知图
- 容器内有多段标题和说明文案的图卡

如果一张图包含很多文字，而且继续手写 SVG `text` 很容易超出色块，就应优先考虑 `Satori`。

## 为什么引入 Satori

原生 SVG 的 `text` 对下面这些问题不友好：

- 自动换行
- 多段文字的盒子布局
- 中英文混排后的宽度变化
- 改一句文案就要重新手调 `x/y`

`Satori` 的思路不是继续硬写 `<text>`，而是：

`结构化数据 -> HTML/CSS 风格模板 -> SVG -> PNG`

这样更像在做“模板化内容卡片”，而不是手工画字。

## 当前最小流程

### 1. 准备结构化数据

例如：

- 标题
- 副标题
- 步骤列表
- 误区列表
- 建议列表
- 总结句

建议把数据单独存成 `.json`，不要直接写死在 SVG 里。

### 2. 准备 Satori 模板

模板默认放在：

- `04_Templates/Visuals`

模板负责：

- 画布尺寸
- 卡片布局
- 容器宽高
- 字号、间距、边距
- 不同模块的视觉层级

### 3. 生成 SVG

当前脚本：

```bash
node scripts/render_satori_visual.js \
  04_Templates/Visuals/full-structure-map.satori.js \
  raw/attachments/xxx.data.json \
  raw/attachments/xxx.svg
```

也可以通过 npm 脚本入口：

```bash
npm run render:satori -- \
  04_Templates/Visuals/full-structure-map.satori.js \
  raw/attachments/xxx.data.json \
  raw/attachments/xxx.svg
```

### 4. 先做布局检查，再导出 PNG

从现在开始，文本型 SVG 在导出 PNG 前，建议至少再跑一次布局检查：

```bash
node scripts/check_svg_layout.js raw/attachments/xxx.svg
```

如果这一步报出明显的 `overflow` 或 `overlap`，优先回到模板或数据层修，而不是继续手改 SVG 坐标。

### 5. 导出 PNG

继续复用仓库现有导出命令：

```bash
bash scripts/validate_svg_asset.sh "raw/attachments/xxx.svg" --png "raw/attachments/xxx.png" --width 1440
```

## 当前约定

- 对于文本密度高的结构图，`数据文件 + Satori 模板` 是默认首选源信息
- 生成出的 `.svg` 仍然保留在 `raw/attachments`
- 实际发布优先引用 `.png`
- 横版发布图默认宽度仍为 `1440`
- 如果 `check_svg_layout.js` 已经能识别出明显越界或重叠，则不应把该 SVG 视为完成

## 当前已接入示例

全文结构图：

- 数据：[2026-03-23_ai-vibecoding-full-structure-map.data.json](/Users/apple/Desktop/project/document/raw/attachments/2026-03-23_ai-vibecoding-full-structure-map.data.json)
- 模板：[full-structure-map.satori.js](/Users/apple/Desktop/project/document/04_Templates/Visuals/full-structure-map.satori.js)
- 脚本：[render_satori_visual.js](/Users/apple/Desktop/project/document/scripts/render_satori_visual.js)

## 边界

- `Satori` 解决的是“文本排版和模板化生成”，不是最终 PNG 分发
- 特别复杂的矢量装饰、手工路径插画，不一定适合都塞进 Satori
- 如果图中主要难点不是文字，而是复杂图形，仍可保留手写 SVG
