const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const favicon = require('koa-favicon')
const compress = require('koa-compress')
const Router = require('koa-router')
var stati = require('koa-static')
const resolve = file => path.resolve(__dirname,file)

const isProd = process.env.NODE_ENV === 'production'
	console.log(require('koa/package.json').version)
	console.log(`koa/${isProd}`)

const serverInfo = 
	`koa/${require('koa/package.json').version}`+
	`vue-server-renderer/${require('vue-server-renderer/package.json').version}`


const app = new Koa()
const router = new Router()

let renderer
//如果是生产环境
if(isProd){

	const bundle = require('./dist/vue-ssr-bundle.json')

	const template = fs.readFileSync(resolve('./dist/index.html'),'utf-8')
	renderer = createRenderer(bundle,template)
}else{
	require('./build/setup-dev-server')(app,(bundle,template)=>{
		renderer = createRenderer(bundle,template)
	})
}

function createRenderer(bundle,template){
	return require('vue-server-renderer').createBundleRenderer(bundle,{
		template,
		cache:require('lru-cache')({
			max:100,
			maxAge:1000*60*15
		})
	})
}

const serve = (path,cache) => stati(resolve(path),{
	maxage:cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(compress({threshold: 0}))

app.use(favicon(__dirname + '/public/favicon.ico'));

router.use('/dist',serve('./dist',true))
router.use('/pulbic',serve('./public',true))
router.use('/manifest.json',serve('./manifest.json'))
router.use('/service-worker.js',serve('./dist/service-worker.js'))

router.url('*',function(ctx,next){
	if(!renderer){
		return ctx.body = 'waiting for compilation ... refresh in a moment' 
	}

	const s = Date.now()

	ctx.type = 'text/html'
	ctx.set("Server" ,serverInfo)

	  const errorHandler = err => {
    if (err && err.code === 404) {res.status(404).end('404 | Page Not Found')
 		ctx.status = 404
 		return ctx.body = '404| pageNot found'
    } else {
      // Render Error Page or Redirect
      ctx.status = 500
 		return ctx.body = '500 | Internal Server Error'
     
      console.error(`error during render : ${ctx.url}`)
      console.error(err)
    }
  }

	renderer.renderToStream({url:ctx.url})
	.on('error',errorHandler)
	.on('end',()=>console.log(`whole request:${Date.now()-s}ms`))
	.pipe(ctx.res)

})

app.use(router.routes()).use(router.allowedMethods())
const port = process.env.PORT || 8080
app.listen(port,()=>{
	console.log(`server started at localhost:${port}`)
})



