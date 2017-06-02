'use strict'

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




const app = new Koa()
const router = new Router()





 app.use(stati(__dirname+'/assets'))


// app.use(ctx => {

// 	if(ctx.req.method == 'GET' && ctx.req.url === '/'){
// 	renderer.renderToString(
// 		require('./assets/app')(),
// 		function(err,html){
// 			if(err){
// 				console.error(err)
// 				 ctx.status= 500
// 				  ctx.body='serer Error'
// 			}
// 			console.log(loayout.replace('<div id="app"></div>',html))
// 			ctx.body = loayout.replace('<div id="app"></div>',html)
// 			console.log(ctx.body)
// 		}
// 		)
// }
// })


router.use('/dist',stati('./dist',true))
router.use('/pulbic',stati('./public',true))
router.use('/manifest.json',stati('./manifest.json'))
router.use('/service-worker.js',stati('./dist/service-worker.js'))

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
app.listen(3000);
