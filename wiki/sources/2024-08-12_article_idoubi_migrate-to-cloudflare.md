---
type: source
source_type: article
source_path: raw/sources/articles/idoubi/2024-08-12_idoubi_migrate-to-cloudflare.md
source_url: https://idoubi.ai/blog/migrate-to-cloudflare
source_title: 我把网站迁移到 cf，省了几万块
author: 艾逗笔（idoubi）
publish_date: 2024-08-12
ingested_at: 2026-05-06
domains: [domain/infra, domain/indie-dev]
mentions: [Cloudflare, Vercel, AWS, Netlify, Railway, Zeabur, Render, Firebase, Heroku, Coolify, Dokku, SST, Workers, Pages, R2, D1, neon, supabase]
status: ingested
---

# 我把网站迁移到 cf，省了几万块

## 一句话摘要

Vercel 月账单 5000 刀逼出的迁移指南——对比 10+ 部署平台后选 Cloudflare（成本砍 90%），但要付出 edge 运行时改造的代价。

## 关键事实

- Vercel 坑：超时限制 / 单功能计费 / Image CDN $$$ / 函数 $0.18/GB·hr
- Cloudflare 优势：DNS 11ms 全球最快 + Workers + Pages + R2 + D1
- 改造代价：所有 route.ts 改 edge / pg 客户端换 neon 或 supabase / fs 和 http 依赖重写

## 作者观点

- Vercel 本质是 AWS 套壳，长期成本不可控
- Cloudflare 是"赛博菩萨"，新项目应直上 Cloudflare

## 我的判断

- 这是 wiki 里**少数与 AI 无直接关系但极有参考价值**的文章——独立开发者基础设施选型直接影响生死
- 与 [[2024-11-09_article_idoubi_get-paied-all-over-the-world]] 是同一时期的"扫盲系列"——2024 年中期 idoubi 把基础设施 + 财务两块短板补齐

## 关联

- [[独立开发]]
