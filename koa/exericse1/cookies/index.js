/*
* 这个例子简单的 设置同一个客户端浏览的次数，既作为cookie 又作为响应字符串
*/

const Koa = require('koa')
const app  = module.exports = new Koa()

app.use(async ctx =>{
	const n = ~~ctx.cookies.get('view') +1
	ctx.cookies.set('view', n)
	ctx.body = n +' views';
})

if(!module.parent) app.listen(3000)
