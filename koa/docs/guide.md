# 指南

本指南包含的主题与 API 没有直接关联，例如编写中间件的最佳实践和应用程序结构建议，在这些例子中，我们使用异步函数作为中间件。当然你也可以使用常规函数和Generator函数来实现，只不过和异步实现方式稍有不同。

## 编写中间件

Koa 中间件是简单的函数，返回含有签名(ctx,next)的中间件函数，当中间件由上游中间件运行时，必须手动调用 next() 来运行下游中间件。

例如，如果你想知道，一个在相应头添加 X-Response-Time 字段的中间件，在koa接收请求后需要消耗多长时间才执行完成，中间件代码如下：

```js
 async function responseTime(ctx,next){
   const start = new Date.now()
   await next()
   const ms = Date.now() - start;
   ctx.set('X-response-Time',`${ms}ms`)
 }
 app.use(responseTIme)

```
如果你是一个前端开发者，你可以认为next()签名的代码是 “捕获”阶段，而 next() 后面的代码是 “冒泡”阶段。下面的代码错略的说明了，我们如何正确地使用异步函数实现的堆栈来实现请求和响应流。

```js
 var Koa = require('koa')
 var app = new Koa()

 app.use( async (ctx,next){
   const start = new Date.now() // 1
   await next()// 2
   const ms = Date.now() - start; // 12
   ctx.set('X-response-Time',`${ms}ms`) // 13
 })

  app.use( async (ctx,next){
   const start = new Date.now() // 3
   await next() // 4 
     
   console.log('%s %s %s %sms', //11
	ctx.method,
	ctx.originalUrl,
	ctx.status,
	ms
   )
 })

  app.use( async (ctx,next){
   await next() // 5
   if(!ctx.body)return // 9
   ctx.set('Content-Length',ctx.body.length) // 10
 })

  app.use( async (ctx,next){
   await next() //6
   if(ctx.path !== '/') return // 7
   ctx.body = 'Hello World' // 8
 })

 app.listen(3000)
```
1. 创建一个时间跟踪持续时间
2. 等待下一个中间件的控制
3. 创建另一个时间去跟踪响应时间
4. 等待下一个中间件的控制
5. 等待下一个中间件的控制
6. 等待一个 Koa 的空操作中间件
7. 忽略设置 body 内容除非请求路径是 '/'
8. 设置response 为 "Hello World"
9. 没有响应内容不设置 _Content-Length_
10. 设置 _Content-Length_
11. 输出日志
12. 获取时间差
13. 在响应前设置 响应头字端 _X-Response-Time_
14. 交给Koa 处理响应

请注意，最后一个中间件(第6步)等待一个空操作，它实际上是等待 Koa 内的一个空操作Promise。这样会使每个中间件的API 都一致，并且可以放在其他中间件前面或后面。如果你删除了最下游中间件里的next() ，还是可以正常运行，但是这样不符合让中间件 API 一致性的习惯。

例如,这样写也是可以的：

``` js
 app.use(async function(ctx, next){
   if(ctx.path !== '/') return ;
   ctx.body = 'Hello World'
 })
```

接下来你将看到创建Koa 中间件的最佳实践。

## 中间件的最佳实践
这一节讲解实现中间件的最佳实践，比如中间件的接收选项，为了方便调试给中间件命名，等等。

### 中间件选项
在创建公共中间件时，遵循将将中间件包裹在一个接收可选项的方法里，允许用户进行扩展是很有用的。即使你的中间件不接收任何选项，这仍然是一个保持统一的好办法。

下面是我们设计的 _logger_ 中间件接收指定 _format_ 字符串参数，并且返回中间件自己：
```js
  function logger(format) {
     format = format|| ':method ":url"'
     return async function(ctx, next){
	  	const str = format
	  	  .replace(':method', ctx.method)
	  	  .replace(':url', ctx.url);
	  	console.log(str)
	  	await next();
	  } 	
  }

  app.use(logger())
  app.use(logger(':method :url'))
```
### 给中间件命名
中间件的名称是可选的，但是给中间件定义一个名称对调试是有帮助的。
```js
  function loggers (format) {
    return async function logger(ctx, next){

    }
  }
```
### 通过 koa-compose 合并多个中间件
有时候，为了重用和导出，你想把多个中间件合并成一个中间件。你可以使用 [koa-compose](https://github.com/koajs/compose)

```js
  const compose = require('koa-compose')
  async function random(ctx,next){
    if('/random' === path.path){
     ctx.body = Math.floor(Math.random * 10)
    }else{
     await next()
    }
  }

  async function backwards(ctx, next){
	  if('/backwards' == ctx.path){
	    ctx.body = 'sdrawkcab'
	  }else{
	    await next();
	  }
  }
  async function pi(ctx, next){
	   if('/pi' == ctx.path){
	   ctx.body = String(Math.PI)
	   }else{
	    await next()
	   }
  }

  const all = compose([reandom,backwards,pi])
  app.use(all)
```
## 响应中间件
 中间件，决定响应一个请求，并且想要绕过下游的中间件可以干脆省略 next()，通常在路由中间件中这么做，但是如果想让所有中间件中执行。例如，下面的代码在 第二个中间件中响应请求，但是所有的中间件都执行了，给了下游第三个中间件一个操作响应的机会。

 ```js
 app.use(async function(ctx, next){
 	console.log('>> one')
 	await next()
 	console.log('<< one')
 })
 app.use(async function(ctx, next){
 	console.log('>> two')
 	ctx.body = 'two'
 	await next()
 	console.log('<< two')
 })
 app.use(async function(ctx, next){
 	console.log('>> three')
 	await next()
 	console.log('<< three')
 })  
 ```
 如果在第二个中间件中省略 _next()_ ,并且仍然在第二个中间件响应请求，这样，第三个中间件（以及其他下游中间件）会被忽略
  ```js
 app.use(async function(ctx, next){
 	console.log('>> one')
 	await next()
 	console.log('<< one')
 })
 app.use(async function(ctx, next){
 	console.log('>> two')
 	ctx.body = 'two'
 	console.log('<< two')
 })
 app.use(async function(ctx, next){
 	console.log('>> three')
 	await next()
 	console.log('<< three')
 })  
```
当下游最远的中间件执行 _next()_ 时，它只是等待一个空函数，这样可以让中间件在堆栈中的任何位置进行组合。

## 异步操作
异步函数和 promise 形式是 Koa 的基础，允许你编写非阻塞的代码。例如，下面的中间件，从 ./docs 中读取文件名称，然后在并行读取每个 markdown 文件的内容，最后，合并结果到响应体里。
```js
  const fs = require('fs-promise')

  app.use(async function(ctx,next){
    const paths = await fs.readdir('docs')
    const files = await Promise.all(paths.map(path => fs.readFile(`docs/${path}`,'utf8')))
    ctx.type = 'markdown'
    ctx.body = files.join('')
  })
``` 
## 调试 Koa
Koa 以及许多与其搭配使用的库，支持在调试的时设置由 [debug](https://github.com/visionmedia/debug)提供的 DEBUG 环境变量，_debug_ 提供简单的条件日志记录。
例如，要查看所有koa特定的调试信息，只需要通过 DEBUG=koa* ，并且在启动时，除了其他信息外您将看到所使用的中间件列表。
```shell
$ DEBUG=koa* node --harmony examples/simple
  koa:application use responseTime +0ms
  koa:application use logger +4ms
  koa:application use contentLength +0ms
  koa:application use notfound +0ms
  koa:application use response +0ms
  koa:application listen +0ms
```
由于javascript 不允许在运行时定义函数名称，你可以将中间件的名称设置为 _._name_.当你无法控制中间件的名称时，这很有用，例如：
```javascript
  const path = rquire('path')
  const serve = require('koa-static')
  const publicFiles = serve(path.join(__dirname, 'public'))
  publicFiles._name = 'static /public';
  app.use(publicFiles);
```
现在，当你调试的时候，你看到的不是 ‘serve’，你将看到：
```js
  koa:application use static /public + 0ms
```

