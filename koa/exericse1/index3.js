var Koa = require('koa')
var app = new Koa()
const koaBody = require('koa-body')()
const router = require('koa-router')()
var port = process.argv[2]
 

router.post('/',koaBody, ctx => {
	str = ctx.request.body.name
	ctx.body = str.toLocaleUpperCase()
})

app.use(router.routes())

app.listen(port)