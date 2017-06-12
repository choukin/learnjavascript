const Koa = require('koa')

const app = new Koa()
const port = process.argv[2]

function errorHandler() {
   return async (ctx, next)=>{
   	  try{
   	  	await next()
   	  }catch(error){
   	  	 ctx.status = 500
   	  	 ctx.body = error.message
   	  }
   } 
}

app.use(errorHandler())

app.use(async (ctx,next)=>{
	if(ctx.path === '/error') throw new Error('ooops');
	ctx.body = 'OK'
})

app.listen(port)