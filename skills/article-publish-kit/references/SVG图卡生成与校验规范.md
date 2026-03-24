# SVG 图卡生成与校验规范

这个规范服务于 `article-publish-kit` skill。

## 默认策略

- 视觉资产优先生成 `SVG`
- `SVG` 是源文件，不是一次性导出结果
- 每次生成或修改 SVG 后，都要渲染一次 PNG 预览做人工校验
- 如果平台需要位图分发，再从已验证的 SVG 导出 PNG

## 标准步骤

1. 先根据正文观点生成 SVG
2. 渲染 PNG 预览检查真实显示效果
3. 修正裁切、错位、字号、换行和留白
4. 需要时再导出 PNG 给发布平台使用

## 最容易出问题的地方

- 英文单词长度超过徽标或按钮容器
- 中文标题字号过大导致右侧被裁切
- 文案行长过长，移动端截图时不耐读
- 卡片容器高度不够，正文压到底部
- 强调色太多，导致重点不明确

## 本仓库建议命令

```bash
bash scripts/validate_svg_asset.sh "07_Attachments/xxx.svg"
```

或：

```bash
bash scripts/validate_svg_asset.sh "07_Attachments/xxx.svg" --png "07_Attachments/xxx.png"
```

## 完成标准

一个 SVG 资产至少满足下面这些，才能算完成：

- 肉眼可读
- 无明显裁切
- 标题和正文层级清楚
- 与正文观点强绑定
- 如需位图分发，PNG 已从验证后的 SVG 导出
