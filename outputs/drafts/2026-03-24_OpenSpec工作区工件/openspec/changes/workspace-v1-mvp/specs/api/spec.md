# API Specification

## Overview

本规范根据我这次实际验证过的 HTTP 接口行为整理，重点覆盖商品、购物车和订单主链路。

## ADDED Requirements

### Requirement: 商品上架

系统 SHALL 支持创建商品，并在创建成功时返回商品对象。

#### Scenario: 成功创建商品

Given 服务已启动
When 发送 `POST /api/products` 携带 `{ name, priceCents, stock }`
Then 返回状态码 `201`
And 返回体包含 `id`
And 返回体包含 `name`、`priceCents`、`stock`

### Requirement: 购物车加购

系统 SHALL 支持把商品加入购物车。

#### Scenario: 成功加入购物车

Given 商品已经存在
When 发送 `POST /api/cart/items` 携带 `{ productId, quantity }`
Then 返回状态码 `200`
And 返回购物车对象
And 购物车中包含对应商品项

### Requirement: 订单创建

系统 SHALL 支持根据购物车创建订单。

#### Scenario: 成功创建订单

Given 用户购物车中已有商品
And 商品库存充足
When 发送 `POST /api/orders` 携带 `{ userId }`
Then 返回状态码 `201`
And 返回订单对象
And 返回订单状态 `PENDING_PAYMENT`
And 返回正确的 `totalCents`

### Requirement: 库存不足错误

系统 MUST 在库存不足时拒绝创建订单。

#### Scenario: 创建订单时库存不足

Given 用户购物车中的商品数量超过库存
When 发送 `POST /api/orders` 携带 `{ userId }`
Then 返回状态码 `409`
And 返回错误码 `OUT_OF_STOCK`
And 返回错误信息 `库存不足`
