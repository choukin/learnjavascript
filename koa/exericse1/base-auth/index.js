const Koa = require('koa')
const auth = require('koa-basic-auth')

const app = module.exports = new Koa()

function authenticate () {
	return async (ctx,next)=>{
		try {
			await next()
		}catch(e){
			if(e.status === 401 ){
				ctx.status = 401
				ctx.set('WWW-Authenticate','Basic')
				ctx.body = 'can\'t has that '
			}else{
				throw err
			}
		}
	}
}

// 添加错误处理中间件

app.use(authenticate())

// 添加身份认证中间件
app.use(auth({name:'tj',pass:'tobi'}))

app.use( async function(ctx){
	ctx.body = 'secret'
})

if(!module.parent) app.listen(3000)


