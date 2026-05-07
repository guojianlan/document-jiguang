---
source_url: https://blog.workmn.com/post/observability-loop-sentry-posthog
source_type: article
author: 用户本人（藏经阁郭大爷）
site: blog.workmn.com
publish_date: 2025-12-30
fetched_at: 2026-05-07
word_count: ~3500
tags: [前端工程, 可观测性, Sentry, PostHog]
---

# Sentry + PostHog 闭环实战：用"统一事件封装 + 关联键 + 导出链路三件套"把线上问题变成可定位、可验证、可回归

（注：本篇是导出链路 / 可观测性方法论的实战篇，正文 WebFetch 时被部分总结。以下为提取要点。）

## 核心概念

把 Sentry（错误信号）与 PostHog（行为信号）通过"三件套"串成闭环：

- **统一事件封装**：单一 `track()` 入口，schema 标准化、PII 脱敏、采样逻辑
- **关联键**：release / route / locale / session_id，复杂链路再加 trace_id / doc_id / export_format / slide_count_bucket
- **导出链路三件套**：clicked → completed / failed 模式，闭环可算失败率、可按维度分桶

## 验证

对照基线版本：导出失败率、p95 延迟、Crash-free session 率、MTTD/MTTR；不靠主观感觉。
