const Koa = require('koa')
const app = module.exports = new Koa()

// 错误处理

async function errorHandl(ctx, next){
	try{
		await next()
	}catch(err){
      // 有的错误会设定 status 如果没有设置 500
      ctx.status = err.status || 500
      ctx.type = 'html'
      ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>'

      // 把错误委托给 内置错误处理
      ctx.app.emit('error', err, ctx)
	}
}

app.use(errorHandl)

//  处理响应
app.use(async (ctx)=>{
	throw new Error('boom boom')
})

app.on('error',function(err){
	if(process.env.NODE_ENV != 'test'){
		console.log('sent error s% to the cloud', err.message)
		console.log(err)
	}
})

if(!module.parent) app.listen(3000)