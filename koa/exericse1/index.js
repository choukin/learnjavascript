var Koa = require('koa')
var app = new Koa()
var port = process.argv[2]

app.use(async (ctx,next) => {
	ctx.body = 'hello koa'
})
app.listen(port)