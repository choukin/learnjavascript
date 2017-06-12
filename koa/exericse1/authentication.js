import  Koa  from 'koa'
const app = new Koa()
const parse = require('koa-body')()
const session = require('koa-session')
const router = require('koa-router')()
const port = process.argv[2]

var form = '<form action="login" method="POST">\
   	<input type="text" name="username" value="username">\
   	<input type="password" name="password" placeholder="the password is \'password\'">\
   	<button type="submit">Login</button>\
   	</form>';

   	app.keys = ['secret1','secret2','secret3']
   	app.use(session(app))

   	router.get('/',async ctx => {
   		if(ctx.session.authenticated){
   			ctx.body = 'hello world'
   		}else{
   			ctx.status = 401
   		}
   	})

   	router.get('/login',async ctx => {
   		ctx.body = form;
   	})

   	router.post('/login',parse, async (ctx)=>{
   		var user = ctx.request.body
   		if(user.username === 'username' && user.password === 'password'){
   			ctx.session.authenticated = true
   			ctx.redirect('/')
   		}else{
   			ctx.status = 400
   		}
   	})

   	router.get('/logout', async (ctx) => {
   		ctx.redirect('/login')
   	})
   	app.use(router.routes())

   	app.listen(port)
