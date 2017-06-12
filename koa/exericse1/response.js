const Koa = require('koa')
const app = new Koa()
const port = process.argv[2]
const filename = process.argv[3]
const fs = require('fs')

app.use(async (ctx, next) => {
	if(ctx.path === '/json'){
		ctx.body = {foo:'bar'}
	}else if(ctx.path === '/stream'){
		ctx.body = fs.createReadStream(filename)
	}
})

app.listen(port)