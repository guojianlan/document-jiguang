---
type: output
output_type: article
status: draft
topic: OpenSpec
audience: 想把 AI 编程纳入真实软件工程流程的开发者 / 技术负责人
created_at: 2026-03-23
---

# OpenSpec 实战指南：我怎么维护一个可跑、可验、可继续演进的电商案例

![OpenSpec 实战指南封面图](../../07_Attachments/2026-03-23_openspec-practical-cover.png)

这篇文章我不想再把它写成一份“概念介绍”。

我这次做的，不是只写一篇方法总结，而是把一套 OpenSpec 风格的电商系统从变更工件、系统实现到测试验证重新梳理了一遍。

对我来说，维护这种实战案例最怕两件事：

- 文档写得很完整，但代码根本没对上
- 文章写得很热闹，但实际没有跑过

所以这篇实战指南，我会只写我这次真正核对过、跑通过、并且愿意用第一人称负责的那部分内容。

## 一、我这次到底拿什么来做 OpenSpec 实战

这次我手上维护的是一套完整的系统。

```text
system/
├── openspec/
│   └── changes/
│       └── v1-mvp/
│           ├── proposal.md
│           ├── design.md
│           ├── tasks.md
│           └── specs/
│               ├── api/spec.md
│               └── domain/spec.md
└── app/
    ├── src/
    ├── __tests__/
    └── package.json
```

我这次真正花时间维护的，不是“把 OpenSpec 解释一遍”，而是把这套系统里的上下两层接起来：

- 上层是变更工件
- 下层是 Node.js 电商实现
- 中间用测试、接口返回和目录映射把它们对齐

只有这样，这篇文章才配叫“实战指南”，而不是“二次转述”。

## 二、我先维护 Proposal，不先维护代码

我现在越来越不相信一种做法：需求大概对了，就让 AI 先把代码长出来。

我在维护这个案例时，最先回看的不是 `server.js`，而是这轮 change 的 `proposal.md`。原因很简单，Proposal 不是背景材料，它是在帮我钉住这轮 change 的边界。

这个案例的 Proposal 里，有三组信息我会优先确认。

第一组，是为什么要做。

- 这是一个用来验证 OpenSpec 落地方式的实战案例
- 它要解决的是“人与 AI 缺少统一沟通语言，代码和文档容易脱节”的问题

第二组，是这次 change 到底包含什么。

- 商品列表查询与上架
- 购物车管理
- 下单结算与库存扣减
- 支付模拟
- 基础身份识别
- 内存存储与文件持久化扩展

第三组，是这次 change 不打算解决什么。

- 搜索与推荐
- 真实支付网关
- 后台管理界面
- 分布式部署

Proposal 里还给了很关键的一层约束，也就是 SLO：

- 核心接口 p99 < 100ms
- 支持 50 RPS
- 核心逻辑测试覆盖率 > 80%

对我来说，这一步的意义不是“先补文档”，而是先确认这轮 change 的工程目标。  
如果这一层不稳，后面的 Design、Spec、实现和测试都会开始飘。

## 三、我会把 Design 当成防止 AI 乱长代码的护栏

![OpenSpec 实战架构图](../../07_Attachments/2026-03-23_openspec-practical-architecture.png)

当 Proposal 把 Why 和 Scope 定下来之后，我接着看的就是 `design.md`。

这个案例的设计其实不复杂，但它有一个我很认同的点：先把依赖方向写清楚，再让实现开始。

这版 `design.md` 对应的是一个很标准的四层结构：

- `http/`：处理请求、参数、状态码和响应格式
- `services/`：编排业务用例
- `domain/`：承载纯业务规则
- `repo/` 与 `persist/`：承载存储实现

这也是我这次在正文里刻意保留下来的一个判断：

**OpenSpec 真正有价值的地方，不是多写几份 Markdown，而是先把系统如何分层、依赖往哪边走写成 change 的一部分。**

我回头对照实现目录时，会特别关心下面这组映射关系：

```text
openspec/changes/v1-mvp/design.md         -> 分层与数据流
openspec/changes/v1-mvp/specs/api/spec.md -> 接口契约
openspec/changes/v1-mvp/specs/domain/spec.md -> 领域约束
openspec/changes/v1-mvp/tasks.md          -> 实施与验证清单

src/http/server.js                        -> 开发态 HTTP 入口
src/services/catalog.js                   -> 商品能力
src/services/cart.js                      -> 购物车能力
src/services/order.js                     -> 下单编排
src/repo/memoryRepo.js                    -> 内存存储
src/http/server.prod.js                   -> 生产扩展草稿
src/persist/fileStore.js                  -> 文件持久化
__tests__/unit.spec.js                    -> 单元验证
__tests__/integration.spec.js             -> 集成验证
__tests__/performance.spec.js             -> 性能基线
```

对我来说，只要这组映射是通的，AI 写出来的内容才不容易变成“会说不会落”。

## 四、我在维护 Spec 时，最重视的是把“已实现”和“待扩展”分开写

这次我回看 `specs/api/spec.md` 和 `specs/domain/spec.md` 时，一个非常明确的感受是：Spec 写得比当前开发态服务更完整。

例如 API Spec 里写了这些能力：

- `GET /api/products`
- `POST /api/products`
- `POST /api/cart/items`
- `DELETE /api/cart/items/:id`
- `POST /api/orders`
- `GET /api/orders/:id`
- `POST /api/payments/:orderId`
- 幂等性创建订单
- 标准错误响应格式

但如果我回到这次实际跑的 `src/http/server.js`，我会很诚实地把状态拆成三层。

第一层，是这次我已经跑通的主链路：

- 商品上架与列表
- 加购
- 下单
- 查询订单
- `CART_EMPTY` / `OUT_OF_STOCK` / `PRODUCT_NOT_FOUND` 的错误映射

第二层，是 Spec 已经写了，但开发态服务还没有完全落地的部分：

- 支付接口
- 删除购物车条目
- 幂等性订单创建

第三层，是在 `server.prod.js` 和 `fileStore.js` 里已经开始出现的扩展方向：

- 基础鉴权
- 文件持久化
- metrics
- idempotency check 的预留位置

我会特别强调这一点，是因为维护实战案例最怕“把设计态、规划态、已实现态混着写”。  
如果这三层不分开，文章就会看起来很完整，但一对源码就会露馅。

### 1. 领域规则，我重点看这三件事

领域 Spec 里真正有工程含金量的，不是那些名词解释，而是约束：

- 库存扣减后不能为负
- 购物车单商品数量不能超过 99
- 订单总价必须等于 `price * quantity` 的累加

这些约束我在代码里都能找到对应落点。

比如 `CartService` 里这段数量上限校验，我就会把它当成领域规则已经进入实现的证据：

```javascript
if (existing) {
  if (existing.quantity + quantity > 99) {
    throw new Error('MAX_QUANTITY_EXCEEDED')
  }
  existing.quantity += quantity
} else {
  if (quantity > 99) throw new Error('MAX_QUANTITY_EXCEEDED')
  cart.items.push({
    id: `item_${Math.random().toString(36).substr(2, 9)}`,
    productId,
    quantity
  })
}
```

再比如 `OrderService#createOrder`，它不是简单把订单对象拼出来，而是先做库存校验，再计算总价，再扣库存，最后清空购物车：

```javascript
createOrder(userId) {
  const cart = this.cartRepo.findByUserId(userId)
  if (!cart || cart.items.length === 0) {
    throw new Error('CART_EMPTY')
  }

  let totalCents = 0
  const orderItems = []

  for (const item of cart.items) {
    const product = this.productRepo.findById(item.productId)
    if (!product) throw new Error(`Product ${item.productId} not found`)
    if (product.stock < item.quantity) throw new Error('OUT_OF_STOCK')

    totalCents += product.priceCents * item.quantity
    orderItems.push({
      productId: item.productId,
      priceCents: product.priceCents,
      quantity: item.quantity
    })
  }

  // 先扣库存，再创建订单，最后清空购物车
}
```

这类代码最有价值的地方在于，它不是“和 Spec 差不多”，而是能直接映射回 Spec 里的 Requirement 和 Scenario。

### 2. 接口契约，我重点看状态码和错误语义

我维护这类案例时，最不放心的一层其实是 HTTP 语义。因为 AI 很容易把业务逻辑写对，但状态码和错误格式写得松散。

这次我在 `src/http/server.js` 里重点确认的，就是接口层有没有把领域错误翻译成稳定的对外契约：

```javascript
if (pathname === '/api/orders' && req.method === 'POST') {
  const body = await readJson(req)
  const userId = body.userId || 'user_dev'
  const order = orderService.createOrder(userId)
  return sendJson(res, 201, order)
}

if (e.message === 'CART_EMPTY') {
  return sendError(res, 'CART_EMPTY', '购物车为空', 400)
}
if (e.message === 'OUT_OF_STOCK') {
  return sendError(res, 'OUT_OF_STOCK', '库存不足', 409)
}
if (e.message === 'PRODUCT_NOT_FOUND') {
  return sendError(res, 'PRODUCT_NOT_FOUND', '商品不存在', 404)
}
```

这一步对我来说很关键。  
因为 Spec 真正落地，不只是“有接口”，而是“接口的成功与失败语义已经能稳定返回”。

## 五、我不会只看代码，我一定会把测试和手动链路都跑一遍

如果一篇实战文章只贴代码，不贴验证，我现在基本不会完全相信。

所以这次我做的不是“读完代码就写文章”，而是把这套实现直接跑起来。

### 1. 自动化测试，我实际跑到的结果

我先直接执行了：

```bash
npm test
```

这次我本地实际跑到的结果是：

```text
▶ 集成测试 (E2E)
  ✔ 完整购物流程
✔ 集成测试 (E2E)
P99 Latency: 2.37ms
▶ 性能基线测试
  ✔ 下单接口 P99 < 100ms
✔ 性能基线测试
▶ 领域与服务单元测试
  ✔ 商品上架与列表
  ✔ 购物车添加逻辑
  ✔ 下单扣减库存
  ✔ 库存不足抛错
✔ 领域与服务单元测试
ℹ tests 6
ℹ pass 6
ℹ fail 0
```

这组结果对我很重要，因为它至少说明三件事：

- 主链路不是纸面设计，而是已经被单元、集成和性能测试覆盖
- Proposal 里的 p99 < 100ms 这条 SLO，在当前样例里确实能对上
- 我在正文里写“这套系统我跑过”这句话，是有证据支撑的

### 2. 手动接口链路，我也真的打了一遍

自动化测试跑通之后，我还是会再手动打一轮接口。  
原因很简单，文章是给人看的，而不是给测试框架看的。我需要知道真实状态码、真实返回体长什么样。

我这次本地直接启动服务：

```bash
node src/http/server.js
```

然后按“上架商品 -> 加购 -> 下单”的顺序手动请求，拿到的返回如下：

```text
POST /api/products
{"name":"Proof Item","priceCents":299,"stock":5,"id":"prod_nujamhd05"}

POST /api/cart/items
{"userId":"user_dev","items":[{"id":"item_5dj0bjx1u","productId":"prod_nujamhd05","quantity":2}]}

POST /api/orders
{"id":"order_zwbk3zd4q","userId":"user_dev","status":"PENDING_PAYMENT","totalCents":598,"items":[{"productId":"prod_nujamhd05","priceCents":299,"quantity":2}]}
```

库存不足这条失败场景，我也单独打了一次：

```text
HTTP/1.1 409 Conflict
{"code":"OUT_OF_STOCK","message":"库存不足"}
```

这里我甚至故意先打错过一次 `productId`，确认服务会返回：

```json
{"code":"PRODUCT_NOT_FOUND","message":"商品不存在"}
```

我会保留这些细节，是因为维护一套案例时，真正让人放心的不是“它应该可以”，而是“成功和失败我都看过真实输出”。

## 六、我怎么理解这套案例里 OpenSpec 真正起作用的地方

很多人会把 OpenSpec 理解成“多了一层文档”。

但我这次把 `v1-mvp` 工件、Node 实现和测试一起对下来之后，我更愿意把它理解成一套变更管理骨架。

它真正帮我解决的是下面这些问题：

- Proposal 帮我收边界，不让需求在对话里越聊越散
- Design 帮我定依赖方向，不让 AI 边写边发明架构
- Spec 帮我把行为写成 Requirement 和 Scenario，让代码与测试都有共同参照
- Tasks 帮我记录这轮 change 到底核对了哪些实现、哪些验证

更重要的是，它让我在维护时能很自然地区分三件事：

- 哪些已经是当前事实
- 哪些是 change 中的设计目标
- 哪些只是下一阶段的扩展方向

我觉得这件事对 AI 编程尤其重要。  
因为 AI 最擅长的是局部生成，最容易失控的也是全局边界。  
OpenSpec 的价值，本质上就是给这种局部高产能力加上工程护栏。

## 七、结语

我这次重新整理 OpenSpec 实战，不是想证明“AI 可以写出一个电商 demo”。

真正值得保留下来的，是另一件事：

**当我把 Proposal、Design、Spec、代码、测试和真实返回放在一起维护时，AI 编程才开始像软件工程，而不只是一次次临时对话。**

如果你只是想让 AI 先把页面或接口补出来，这套方法可能会显得有点慢。  
但如果你已经开始关心边界、回归、验证、归档和后续演进，那么 OpenSpec 这种“先把 change 讲清楚，再让实现发生”的方式，反而会越用越顺手。
