---
source_url: https://blog.workmn.com/post/doubleToken
source_type: article
author: 用户本人（藏经阁郭大爷）
site: blog.workmn.com
publish_date: 2024-05-31
fetched_at: 2026-05-07
word_count: ~8000
tags: [全栈, NestJS, Next.js, JWT, 认证]
---

# 如何使用Next.js和NestJS实现双Token认证与刷新机制

（注：WebFetch 提取时已大幅压缩，以下为提取要点。完整源码见 GitHub: refreshToken）

## 项目结构

使用 pnpm workspace 管理项目，分别搭建 Next.js 前端和 NestJS 后端服务。

## 后端核心实现（NestJS）

后端采用了分层架构。"添加 authLogin 函数处理登录逻辑，校验通过后通过头部返回 accessToken 和 refreshToken"。系统通过自定义异常类统一管理错误，使用拦截器格式化响应数据，并通过守卫保护需要认证的路由。

关键技术点：
- JWT token 生成与验证
- 自定义异常处理过滤器
- 响应头返回 token 信息

## 前端核心实现（Next.js）

前端通过自定义 fetch 函数实现自动刷新机制。"前端请求接口时，如果返回 http 的状态码为 401 的时候，进入拿 refreshToken 再次获取 accessToken 的环节"。系统在收到 401 响应后自动调用刷新接口，获取新的 accessToken 后重试原请求。

## 实用建议

文章最后补充了 Nginx 配置优化建议，因为长 JWT token 可能超过默认缓冲限制，需要调整 `proxy_buffer_size` 和相关参数。
