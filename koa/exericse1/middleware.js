const Koa = require('koa')
const app = new Koa()
const port = process.argv[2]

function responseTime () {
 return async function(ctx,next){
 	var time = new Date()
 	await next()
 	var ms = new Date() - time
 	ctx.set('X-Response-Time', `${ms}ms`)
 }
}

function upperCase() {
	return async function(ctx,next){
		await next()
		var body = ctx.body;

		ctx.body = body.toLocaleUpperCase()
	}
}

app.use(responseTime())

app.use(upperCase())

app.use(async (ctx,next) => {
	ctx.body = 'hello koa'
})

app.listen(port)