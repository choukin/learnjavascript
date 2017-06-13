/**
* 一个 app.use() 方法只能接收一个 async 函数
* 如果想把多个async 函数合并成一个 async 函数
* 可以使用 ‘koa-compose‘ 实现
* 它允许你只使用app.use() 一次
* 我们的代码最终看起来是这样的：
* 
* app.use(compose([
*   async function(){},
*   async function(){},
*   async function(){}
*  ]))
*/

const compose = require('koa-compose')
const Koa = require('koa')
const app = module.exports = new Koa()

// x-reponse-time

async function responseTime(ctx, next){
	const start = new Date()
	await next()
	const ms = new Date() - start
	ctx.set('X-Response-Time',ms + 'ms')
}

// logger
async function logger(ctx, next){
	const start = new Date()
	await next()
	const ms = new Date() - start
	if('test' != process.env.NODE_ENV){
		console.log('%s %s - %s', ctx.method,ctx.url,ms)
	}
}

// response
async function respond(ctx,next){
	await next()
	if('/' != ctx.url) return ;
	ctx.body = 'Hello World'
}

// 中间件组合
 const all = compose([
      responseTime,
      logger,
      respond
 	])

app.use(all)

if(!module.parent) app.listen(3000)
