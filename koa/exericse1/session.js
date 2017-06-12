const Koa = require('koa')
const app = new Koa()
const session = require('koa-session')
const port = process.argv[2]

app.keys = ['dipper', 'keys']

const config = {
	key:'koa:sess',
	signed:true
}

app.use(session(config, app))

app.use(ctx => {
	let n = ctx.session.views || 0

	ctx.session.views = ++n

	ctx.body = n+ ' views'
})

app.listen(port)
