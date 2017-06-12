# 常见问题
## Koa 会替代 Express 吗？
Koa 和 Connect 更相似，但是 Express 中好多好的思想都被转移到了 Koa 中间件级别，以帮助形成更强大的基础。这使得编写中间件键，不仅仅在最终应用程序代码里更有意思，更不容易出错，对整个代码堆栈也是如此。
通常，许多中间件将重新实现类似的功能，甚至更糟糕的错误地实现功能，如签名 cookie 等其他特性通常针对于应用程序的，而不针对于中间件的。
## Koa 会替代 Connect 吗？
不会，只是不同的方式实现相似的功能，现在异步函数允许我们用较少的回调编写代码。connet 也有同样的功能，并且有人依然会喜欢Connet ，这取决于你喜欢哪一个。
## Koa 包含路由吗？
不，Koa 本身不包含路由，然而，有许多路由中间件可以供你使用：
[https://github.com/koajs/koa/wiki](https://github.com/koajs/koa/wiki)
## 为什么 Koa 不是 Express4.0?
Koa 和大家知道的 Express 差别非常大，设计基本上是截然不同的，因此，要从Express3.0 迁移到这个 Express4.0 版本将意味着重构整个应用。所以我们觉得创建一个新项目更合适。
## Koa 对象有哪些自定义属性？
Koa 使用自己的自定义对象：ctx, ctx.request, and ctx.response. 这些对象抽象封装了NODEjs _req_ 和 _res_ 对象的属性和方法的getters/setters 的方法。通常添加到这些对象里的属性必须遵循以下规则：
- 它们必须是非常常用的， and/or 完成一些有用的事。
- 如果属性作为setter 存在，那么它也将作为 getter 存在，反之亦然。

很多 _ctx.request_ 和 _ctx.response_ 的属性都委托给了 ctx.如果它是一个getter / setter，那么getter和setter都将严格对应于ctx.request或ctx.response。

在提议添加额外属性前，请先考虑上面的规则。