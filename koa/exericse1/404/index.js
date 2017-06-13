const Koa = require('koa')

const app = module.exports = new Koa()
function pageNotFound(){
 return async function pageNotFound(ctx){
	ctx.status = 404
	switch(ctx.accepts('html', 'json')){
		case  "html":
		  ctx.type = 'html'
		  ctx.body = '<p>Page Not Found</p>'
		  break;
		case "json":
		  ctx.type = 'json'
		  ctx.body = {

		  	message:'Page Not Found'
		  }  
		  break;
	    default:
	      ctx.type = 'text'
	      ctx.body = 'page not found'   
	}
}
}
app.use(pageNotFound())

if(!module.parent) app.listen(3000)