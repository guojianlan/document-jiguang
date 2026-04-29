# Design: workspace-v1-mvp

## Overview

这次设计不是从零画一套理想架构，而是根据我已经实际验证过的工作区实现，把最关键的工程路径整理成 OpenSpec 可消费的结构。

## Architecture

当前工作区可以概括成四层：

1. HTTP 接口层
2. 服务编排层
3. 领域模型层
4. 内存存储层

对应关系如下：

- `src/http/server.js`
  - 负责请求解析、状态码返回、错误映射
- `src/services/catalog.js`
  - 负责商品上架、查询、库存扣减
- `src/services/cart.js`
  - 负责购物车查询与加购
- `src/services/order.js`
  - 负责创建订单、计算总价、扣减库存、清空购物车
- `src/repo/memoryRepo.js`
  - 负责 Product / Cart / Order 的内存存储

## Request Flow

我这次实际打通的主链路是：

1. `POST /api/products`
2. `POST /api/cart/items`
3. `POST /api/orders`

对应编排顺序：

1. 创建商品
2. 把商品加入指定用户购物车
3. 下单时读取购物车
4. 检查库存与计算总价
5. 扣减库存
6. 创建订单
7. 清空购物车

## Error Handling

当前工作区里，我实际确认过的错误映射有这些：

- `CART_EMPTY` -> `400`
- `OUT_OF_STOCK` -> `409`
- `PRODUCT_NOT_FOUND` -> `404`

其中这次实跑重点确认的是：

- 库存不足场景下，HTTP 返回 `409`
- 返回体为 `{ "code": "OUT_OF_STOCK", "message": "库存不足" }`

## Validation Design

这次设计里，验证不作为“做完之后再补”的东西，而是直接作为工件的一部分。

我实际对照过的验证层次有三层：

- 单元测试：验证商品、购物车、下单和库存不足
- 集成测试：验证完整购物流程
- 性能基线：验证下单接口 `p99 < 100ms`

## Tradeoffs

- 当前存储为内存实现，便于快速验证主链路
- 当前用户体系使用 `user_dev` 这样的开发态用户，便于直接走流程
- 当前支付只保留订单状态 `PENDING_PAYMENT`，不扩展真实支付状态机

这些取舍让我这次更容易先把 OpenSpec 想强调的“规格、实现、验证闭环”看清楚。
