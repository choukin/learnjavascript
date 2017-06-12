const Koa = require('koa')
const app = new Koa()
const port = process.argv[2]

app.keys = ['dipper','keys']

app.use(async (ctx,next) => {
	var view = ctx.cookies.get('view',{signed:true})||0
    ctx.cookies.set('view',++view,{signed:true})
    ctx.body = `${view} views`
})

app.listen(port)