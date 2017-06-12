const Koa = require('koa')
const app = new Koa()
const render = require('koa-ejs')
const path = require('path')

const port = process.argv[2]

render(app, {
	root:path.join(__dirname,'views'),
	viewExt:'ejs',
	layout:'template'
})

app.use(async (ctx) => {
	var user = {
		name:{
			first:'Tobi',
			last:'Holow'
		},
		species:'ferret',
		age: 3
	}
	await ctx.render('user',{user:user})
})

app.listen(port)