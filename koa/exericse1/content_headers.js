const Koa = require('koa')
const app = new Koa()
const port = process.argv[2]


app.use(async (ctx,next)=>{
	if(ctx.is('application/json')){
		ctx.body = {message:'hi!'}
	}else {
		ctx.body = 'ok'
	}
})

app.listen(port)


