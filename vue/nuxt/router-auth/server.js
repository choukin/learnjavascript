const Nuxt = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '9000'
// 封装req.body
app.use(bodyParser.json())

// Session 创建 req.session

app.use(session({
	secret:'super-secret-key',
	resave:false,
	saveUninitlized: false,
	cookie: {maxAge: 60000}
}))

app.post('/api/login',function(req,res){
	if(req.body.username === 'demo' && req.body.password == 'demo'){
		req.session.authUser = {username: 'name'}
		return res.json({username:'demo'})
	}
	res.status(401).json({error:'bad credentials'})
})

app.post('/api/logout',function(req,res){
	delete req.session.authUser
	res.json({ok: true})
})
// 初始化nuxt.js
const isProd = process.env.NODE_ENV === 'production'
let config = require('./nuxt.config.js')
// const nuxt = New Nuxt({dev: !isProd})
config.dev = isProd
const nuxt = new Nuxt(config)
const promise = (isProd ? Promise.resolve() : nuxt.build())
promise.then(()=>{
	app.use(nuxt.render)
	// if(config.dev){
	// 	nuxt.build()
	// 	.catch((error) => {
	// 		process.exit(1)
	// 	})
	// }
	app.listen(port, host)
	console.log('server is listening on http://localhost:3000')
}).catch((error) => {
	console.error(error)
	process.exit(1)
})

// 生产模式不需要 build
// const promise = (isProd ? Promise.resolve() : nuxt.build())

// promise.then(() => {
// 	app.use(nuxt.render)
// 	app.listen(3000)
// 	console.log('server is listening on http://localhost:3000')
// })
// .catch((error) => {
// 	console.error(error)
// 	process.exit(1)
// })








