const app = require('express')()
const session = require('express-session')
const Nuxt = require('nuxt')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(session({
	secret: 'super-secret-key',
	resave: false,
	saveUninitialized: false,
	cookie:{maxAge:60000}

}))

app.put('/api/todos',function(req, res){
	req.session.todos = req.body.todos
	res.json(req.session.todos)
})

const isProd = process.env.NODE_ENV === 'production'
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
const promise = (isProd?Promise.resolve():nuxt.build())

promise.then(() => {
	app.use(nuxt.render)
	app.listen(3000)
	console.log('server is listening on http://localhost:3000')
}).catch((error)=>{
	console.log(error)
	process.exit(1)
})