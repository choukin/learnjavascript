const Koa = require('koa')
const app = new Koa()
const router  = require('koa-router')()
const port = process.argv[2]

// app.use( async (ctx,next) => {
// 	if(ctx.path === '/'){
// 		ctx.body = 'hello koa'
// 	}else if(ctx.path === '/404'){
// 		ctx.body = 'page not found'
// 	}else if (ctx.path === '/500'){
// 		ctx.body = 'internal server error'
// 	}
// })

router.get('/', async (ctx, next) => {
	ctx.body = 'hello koa'
})

router.get('/404', async (ctx,next) => {
	ctx.body = 'page not found'
})

router.get('/500', async (ctx,next) => {
	ctx.body = 'internal server error'
})

app.use(router.routes())

app.listen(port)