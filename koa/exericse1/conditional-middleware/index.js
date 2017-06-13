const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()

// 传递任何一个中间件给这个中间件
// 如果满足条件，中间件不会被执行
// 一个中间件可以包裹另一个中间件
function ignoreAssets(nw) {
	return async function(ctx, next) {
		if(/(\.js|\.css|\.ico)$/.test(ctx.path)){
			await next()
		}else{
			await nw.call(this, ctx,next)
		}
	}
}

// 请求
// $ curl http://localhost:3000/
// $ curl http://localhost:3000/style.css
// $ curl http://localhost:3000/some.html
app.use(ignoreAssets(logger()))

app.use(async ctx => {
	ctx.body = 'Hello World'
})

app.listen(3000)