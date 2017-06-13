const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const CSRF = require('koa-csrf')
const router = require('koa-router')()

const app = module.exports = new Koa()


// csrf(Cross-site request forgery) 跨站请求伪造
// csrf 需要 session

app.keys = ['session key','csrf example']

app.use(session(app))
// 格式化body
app.use(koaBody())

// csrf 防护中间件
app.use(new CSRF())



//路由
router.get('/token',token)
.post('/post',post)
app.use(router.routes())

async function token(ctx){
	ctx.body = ctx.csrf
}
async function post(ctx){
	ctx.body = {ok: true}
}

if(!module.parent) app.listen(3000)

