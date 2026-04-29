# Tasks: workspace-v1-mvp

## 1. 建立变更边界

- [x] 明确本次只覆盖商品、购物车、订单与验证主链路
- [x] 明确搜索、推荐、真实支付网关和外部数据库不在本次范围内

## 2. 对齐实现结构

- [x] 对照 `src/http/server.js` 确认 HTTP 路由与状态码
- [x] 对照 `src/services/catalog.js` 确认商品与库存逻辑
- [x] 对照 `src/services/cart.js` 确认加购逻辑
- [x] 对照 `src/services/order.js` 确认下单编排逻辑
- [x] 对照 `src/repo/memoryRepo.js` 确认当前数据存储方式

## 3. 补齐 Spec 工件

- [x] 补写 Proposal
- [x] 补写 Design
- [x] 补写 Domain Spec
- [x] 补写 API Spec

## 4. 执行验证

- [x] 运行完整测试套件 `npm test`
- [x] 单独运行集成测试
- [x] 单独运行单元测试
- [x] 启动本地服务
- [x] 手动验证成功链路
- [x] 手动验证库存不足失败场景

## 5. 回填写作材料

- [x] 生成实战验证记录
- [x] 把验证记录接入文章正文
- [x] 把正文中的 Proposal / Spec 段落替换成对本地工件的直接引用
