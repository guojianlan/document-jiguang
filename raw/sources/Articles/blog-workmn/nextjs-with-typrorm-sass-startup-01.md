---
source_url: https://blog.workmn.com/post/nextjs-with-typrorm-sass-startup-01
source_type: article
author: 用户本人（藏经阁郭大爷）
site: blog.workmn.com
publish_date: 2024-06-21
fetched_at: 2026-05-07
word_count: ~3800
tags: [全栈, Next.js, TypeORM, Shadcn-UI, SaaS, 教程系列]
---

# 使用Next.js、TypeORM和Shadcn-UI从零搭建现代化SaaS系统（第一部分）

## 项目初始化

使用 pnpm-workspace 的方式进行代码组织：

```bash
cd /Users/guojian/Desktop/project/cms/test/sass-startup
pnpm init
```

创建工作目录 apps 和 pnpm-workspace.yaml 配置文件：

```yaml
packages:
  - "apps/*"
```

## 构建前端服务

```bash
cd apps
pnpx create-next-app@latest
```

## 添加shadcn/ui框架

```bash
pnpx shadcn-ui@latest init
```

修改 src/app/page.tsx：

```typescript
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>startUp</Button>
    </main>
  );
}
```

启动项目访问 127.0.0.0:3000 可以看到该页面，表示 shadcn/ui 引入成功。

## 添加typeorm数据库

由于项目是前端驱动的MVP项目，将直接在NextJS中完成数据库连接和接口编写。

在 apps 同级目录下新建 packages 文件夹，修改 pnpm-workspace.yaml：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

创建 db 包：

```bash
cd packages
mkdir packages/db
cd db && pnpm init
```

### 创建实体文件

（base.entity.ts / user.entity.ts / index.ts 完整实现略——典型 TypeORM 三段式：BaseEntity 基类 + 业务实体 + DataSource 单例）

## NextJS引入TypeORM

在客户端 package.json 中添加依赖后，创建数据库管理类，实现连接复用与配置注入。

修改首页以测试数据库连接，使用 server component 直接调用 db.find() 取数据。

## 修复TypeORM警告

修改 next.config.mjs 以解决控制台警告：

```javascript
const nextConfig = {
    experimental:{
        serverComponentsExternalPackages: ["typeorm"],
    },
};
```

## 结束

本文搭建了一个 NextJS 与 TypeORM 结合的前端开发框架，完成了数据库引用和操作的基础封装。后续章节将继续完善登录功能和用户相关操作。
