---
name: markdown-publish-preview
description: Use this skill when the user wants to preview a local Markdown article as rich HTML with embedded local images, then copy it into editors such as Feishu Docs for publishing tests.
---

# Markdown Publish Preview

## 何时使用

当用户出现下面这些请求时，使用这个 skill：

- 想把 Markdown 文章复制到飞书文档
- 发现 Markdown 里的本地图片路径复制过去只会变成链接
- 想先把文章渲染成 HTML，再从浏览器复制富文本内容

## 输入

- 一个本地 Markdown 文件路径

## 输出

- 一个本地 HTML 预览服务
- 浏览器可访问的预览地址
- 如有需要，带平台选择器、对应复制预览区，以及“复制当前平台正文”按钮
- 如有需要，给出飞书复制测试建议

## 标准流程

### 1. 启动本地预览服务

```bash
node scripts/serve_markdown_publish_preview.js "<markdown-path>" --open
```

如果你只是要按仓库当前配置重启服务，优先用：

```bash
bash scripts/restart_markdown_publish_preview.sh "<markdown-path>" --open
```

如需固定端口，优先读取仓库根目录 `.env` 中的：

```bash
MARKDOWN_PUBLISH_PREVIEW_PORT=4312
```

如果你正在修改预览服务本身，而不是单纯使用它，优先用监听模式：

```bash
npm run preview:md:watch -- "<markdown-path>" --open
```

### 2. 在浏览器中检查

重点看：

- 标题和正文结构是否正常
- 本地图片是否已经显示
- 优先使用“复制当前平台正文”按钮，或在正文区域直接按复制快捷键
- 平台切换后，页面下方的复制预览是否同步变化
- 复制到飞书后图片是否跟着进入
- 代码块是否保住基本视觉层次，且没有多余背景色叠加

### 3. 判断下一步

- 如果飞书能接收：继续用浏览器复制方案
- 如果飞书仍然拒绝：切换为“图片单独上传 + 正文复制”方案

## 资源

- [Markdown发布预览说明.md](/Users/apple/Desktop/project/document/99_System/Markdown发布预览说明.md)

## 边界

- 这个 skill 解决的是“本地 Markdown 富文本预览”
- 它不保证飞书一定接收所有内嵌图片
- 如果目标平台有更严格的粘贴策略，需要换成上传式流程
