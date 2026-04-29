# Proposal: workspace-v1-mvp

## Why

这次工作区验证的目标，不是单纯证明“代码能跑”，而是把一条更完整的 AI 工程变更链路钉住：

- 先把范围说清楚
- 再把关键行为写成可验证场景
- 再对照实现、测试和接口返回做交叉确认

我这次实际跑过测试套件和 HTTP 链路后，最强烈的感受就是：如果没有 Proposal 先把范围收住，后面的 Design、Spec、实现和测试就很容易重新散回“边做边猜”。

## What Changes

- 对工作区里的商品、购物车、订单链路进行规格化整理
- 补一轮面向 OpenSpec 的 Proposal、Design、Tasks、Spec 工件
- 用真实跑过的测试结果和接口输出回填关键 Requirement 与 Scenario

## Goals

- 让工作区的核心业务主线能够被 OpenSpec 结构表达
- 让成功 / 失败场景都能在 Spec 和实际返回之间对得上
- 让验证结果能够支撑文章里的“我跑过、我确认过”这类表述

## Scope

- In Scope:
  - Catalog：商品上架与查询
  - Cart：购物车加购
  - Order：订单创建与库存扣减
  - Validation：单元测试、集成测试、性能基线、接口返回

- Out of Scope:
  - Search
  - Recommendation
  - 真实支付网关
  - 外部数据库
  - 完整鉴权与生产部署体系

## Success Criteria

- `npm test` 通过
- `POST /api/products` 成功返回 `201`
- `POST /api/cart/items` 成功返回 `200`
- `POST /api/orders` 成功返回 `201`
- 库存不足时 `POST /api/orders` 返回 `409` 且错误码为 `OUT_OF_STOCK`
- 性能基线测试中下单接口 `p99 < 100ms`
