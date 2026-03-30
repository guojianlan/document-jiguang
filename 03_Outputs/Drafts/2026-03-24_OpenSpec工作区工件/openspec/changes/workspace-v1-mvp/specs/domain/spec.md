# Domain Specification

## Overview

本规范根据我这次对工作区实现、测试和接口结果的对照整理，重点描述商品、购物车、订单这三类核心实体以及它们的业务约束。

## ADDED Requirements

### Requirement: 商品实体

系统 SHALL 定义商品实体，包含唯一标识、名称、价格和库存。

#### Scenario: 创建有效商品

Given 需要创建新商品
When 提供 `name`、`priceCents`、`stock`
Then 商品创建成功
And 系统生成 `prod_` 前缀的唯一标识
And `priceCents >= 0`
And `stock >= 0`

### Requirement: 购物车条目

系统 SHALL 允许把商品加入指定用户购物车。

#### Scenario: 成功加入购物车

Given 商品存在
When 用户把商品加入购物车
Then 购物车中新增条目
And 条目包含 `productId`
And 条目包含 `quantity`

### Requirement: 订单创建与金额计算

系统 SHALL 在创建订单时根据购物车条目计算总价。

#### Scenario: 根据购物车计算订单总价

Given 购物车中有多个条目
When 创建订单
Then 订单总价等于所有条目的 `priceCents * quantity` 之和

### Requirement: 库存扣减

系统 MUST 在订单创建成功后扣减库存。

#### Scenario: 成功下单后库存减少

Given 商品库存充足
When 用户成功创建订单
Then 对应商品库存减少

### Requirement: 库存不足保护

系统 MUST NOT 在库存不足时创建订单。

#### Scenario: 库存不足时拒绝创建订单

Given 商品库存少于购物车数量
When 用户尝试创建订单
Then 返回库存不足错误
And 订单不应创建成功

### Requirement: 订单初始状态

系统 SHALL 在订单创建成功时把状态设置为 `PENDING_PAYMENT`。

#### Scenario: 创建订单后的默认状态

Given 用户成功创建订单
Then 订单状态为 `PENDING_PAYMENT`
