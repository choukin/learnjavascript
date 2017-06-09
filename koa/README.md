<img src="https://dl.dropboxusercontent.com/u/6396913/koa/logo.png" alt="koa middleware framework for nodejs" width="255px" />

  [![gitter][gitter-image]][gitter-url]
  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][coveralls-image]][coveralls-url]
  [![OpenCollective Backers][backers-image]](#backers)
  [![OpenCollective Sponsors][sponsors-image]](#sponsors)

 > SLOC Source Lines of Code 源编码行 

 用于 node.js 的表现式框架，让编写 Web 应用程序和 APIS 程序更愉快。Koa 的中间件堆栈以类堆栈的方式执行，允许你执行下游操作，然后过滤并操作上有的响应。

 几乎所有的 HTTP 服务器通用的方法都能直接集成到 Koa 的570行左右的源码中。包括内容协商，节点不一致的正常化，重定向等等。

 Koa 没有集成任何中间件。

 ## 安装
Koa 依赖 node _v7.6.0_ 或者 node 的更高版本提供 ES2015 和 异步函数的支持。

```shell
$ npm install koa
``` 

## Hello koa

```js
 const Koa = require('koa')
 const app = new Koa();

 // response 响应
 app.use(ctx => {
   ctx.body = 'Hello Koa'
 })

 app.listen(3000)

```
## 入门

 - [Kick-Off-Koa](https://github.com/koajs/kick-off-koa)- 一个命令行版本的koa教程
 - [Workshop](https://github.com/koajs/workshop)- 一个项目学习koa的基础知识， koa 是express 的继承者
 - [Introduction Screencast](http://knowthen.com/episode-3-koajs-quickstart-guide/)- 关于 koa 安装和入门的介绍

## 中间件

koa 是一个中间件框架，它可以使用两种不同的函数做完中间件。
 - async function
 - common function

下面是用两种函数实现的日志中间件的例子
### async fuctions (node v7.6+)
```js

    // 中间件一般提供两个参数 (ctx, next), ctx 是一个请求上下文
    // next 是一个调用执行下游中间件的函数，执行结束后返回一个有 then 方法的 Promise
	app.use(async (ctx,next) => {
	  const start = Date.now()
	  await next()
	  const ms = Date.now() -start;
	  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
	})

``` 

### common function
```js

  app.use((ctx, next) => {
  	const start = Date.now()
    return next().then(() => {
      const ms = Date.now() - start
      console.log(`${ctx.method} ${ctx.url} -${ms}ms`)
    })
  })	
	
```

 ### Koa v1.x 版本中间件签名
 v1.x 和 v2.x 中间件的签名已经更改，旧的签名已弃用

 <b>旧的签名支持将在 v3.x 被删除 </b>

 关于 v1.x 升级和在 v2.x 中使用 v1.x 的中间件的更多信息，请参阅[迁移指南](migration.md)

 ## Context, Request 和 Response

 每一个中间件接收一个 koa Context 对象，该对象封装了一个接收到的 http 消息，和该消息对应的响应。ctx 通常用作上下文对象的参数名称。

 ```js

  app.use((ctx, next) => {
    ctx.assert(ctx.request.accepts('xml'),406)
    // 相当于
    // if (!ctx.request.accepts('xml')) ctx.throw(406);
    await next()
  })

 ```
 Koa 提供一个 Response 对象，作为 Context 的 response 属性。
 Koa 的 Response 对象是对Node 原生请求对象 [ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) 的抽象封装，提供了一些非常有用的方法.

Koa 对node 的 response 和request 对象抽象封装而不是扩展它们提供了更清晰的接口，减少了不同中间件与Node 本身之间的冲突，并为流处理提供了更好的支持。IncomingMessage 可以通过 Context 的req属性直接访问；同时 ServerResponse 可以通过 Context 的 res 属性直接访问到。

下面是使用 Koa 的 Response 对象将文件作为响应体流式传输的示例。

```js
  app.use(async (ctx,next) => {
    await next();
    ctx.response.type = 'xml'
    ctx.response.body = fs.createReadStream('really_large.xml');
  })
```

Context 对象还提供了关于其 request 和 response 上方法的快捷方式。在上面的例子中，可以用 ctx.type 代替 ctx.response.type, 而 ctx.accepts 是 ctx.request.accets的简写方式。

了解更多关于 Request, Response 和 Context 的内容，请参考 
- [Request API Reference](https://github.com/koajs/koa/blob/master/docs/api/request.md)
- [Response API Reference](https://github.com/koajs/koa/blob/master/docs/api/response.md)
- [Context API Reference](https://github.com/koajs/koa/blob/master/docs/api/context.md)

## Koa 应用

执行 new Koa() 创建的对象被称作 Koa 应用对象。
这个应用对象是 Koa 和 node Http 服务的接口，处理中间件的注册，从 http 发送到中间件，默认错误处理，以及 context，request，和 response 对象的配置。

学习更多关于应用对象的知识，请参阅[Application API Reference](https://github.com/koajs/koa/blob/master/docs/api/index.md)。

## 文档

- [使用指南](https://github.com/koajs/koa/blob/master/docs/guide.md)
- [错误处理](https://github.com/koajs/koa/blob/master/docs/error-handling.md)
- [想使用koa 的 express 用户](https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md)
- [常见问题](https://github.com/koajs/koa/blob/master/docs/faq.md)
- [API 文档](https://github.com/koajs/koa/blob/master/docs/api/index.md)

## Babel 配置
如果你使用的不是 node v7.6 以上的版本，我们建议你使用 babel-preset-env 配置babel：
```shell
 $ npm install babel-register babel-preset-env --save
```

在你的入口文件里配置 babel-register 

```js
  require('babel-register')
```
你还需要配置 .babelrc

```js
 {
   "presets":[
   	["evn",{
   	  "targets":{
   	    "node":true
   	  }
   	}]
   ]
 }
```
## 故障排除
请查看[故障排除指南](https://github.com/koajs/koa/blob/master/docs/troubleshooting.md)和 Koa指南中的[Koa调试](https://github.com/koajs/koa/blob/master/docs/guide.md#debugging-koa)

## 运行测试

```shell
$ make test
```

## 作者

 参阅[作者](https://github.com/koajs/koa/blob/master/AUTHORS)

## 社区

 - [徽章](https://koajs.github.io/badgeboard/)和官方模块列表
 - [例子](https://github.com/koajs/examples)
 - [中间件列表](https://github.com/koajs/koa/wiki)
 - [Wiki](https://github.com/koajs/koa/wiki)
 - [G+ 社区](https://plus.google.com/communities/101845768320796750641)
 - [Reddit 社区](https://www.reddit.com/r/koajs/)
 - [邮件列表](https://groups.google.com/forum/#!forum/koajs)
 - [中文文档](https://github.com/guo-yu/koa-guid)
 - freenode 上的[koajs](https://webchat.freenode.net/?channels=#koajs)

 ## License

 MIT

[npm-image]: https://img.shields.io/npm/v/koa.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koa
[travis-image]: https://img.shields.io/travis/koajs/koa/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/koa
[coveralls-image]: https://img.shields.io/codecov/c/github/koajs/koa.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/koajs/koa?branch=master
[backers-image]: https://opencollective.com/koajs/backers/badge.svg?style=flat-square
[sponsors-image]: https://opencollective.com/koajs/sponsors/badge.svg?style=flat-square
[gitter-image]: https://img.shields.io/gitter/room/koajs/koa.svg?style=flat-square
[gitter-url]: https://gitter.im/koajs/koa?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[#koajs]: https://webchat.freenode.net/?channels=#koajs









