const Koa = require('koa')
const koaBody = require('koa-body')
const app = module.exports = new Koa()

app.use(koaBody({
	jsonLimit:'1kb'
}))


// .name 转成大写
// koa-body 接收 application/json 请求

app.use(async function(ctx){
	const body = ctx.request.body
    if(!body.name) ctx.throw(400, '.name required')
    ctx.body = {name: body.name.toUpperCase()}	
})

if(!module.parent) app.listen(3000)