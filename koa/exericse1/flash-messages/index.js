// 简单的闪现信息提示
const Koa = require('koa')
const rawBody = require('raw-body')
const session = require('koa-session')

const app = module.exports = new Koa()

// 签名的 cookie
app.keys = ['key1', 'key2']

app.use(session(app))

app.use(async (ctx,next)=>{
	if(ctx.method != 'GET' || ctx.path != '/messages') return await next()

     // 获取session 里的 messages
    const messages = ctx.session.messages || []

    ctx.body = messages

    //  删除已经使用了的信息
    delete ctx.session.messages
		
})

app.use(async (ctx, next)=>{
	if(ctx.method !== 'POST' || ctx.path != '/messages') return await next()
	// 请求字符串是 flash 信息
	const message = await rawBody(ctx.req,{
		encoding:'utf8'
	}) 	

	// 把信息放入 session中
	ctx.session.messages = ctx.session.messages || []
	ctx.session.messages.push(message)
	ctx.status  = 204
})

if(!module.parent) app.listen(3000)