const Koa = request('koa')
const app = module.exports = new Koa()

const tobi = {
	_id:'123',
	name:'tobi',
	species:'ferret'
}

const loki = {
	_id:'124',
	name:'loki',
	species:'ferret'
}

const users = {
	tobi: tobi,
	loki: loki
} 

// 内容协商中间件
// 检查body 是否存在，有时候你想检查类型

app.use(async (ctx, next)=>{
  await next()

  // 如果没有响应体 直接返回
  if(!ctx.body) return;

  // 检查最好的响应类型
  // 设置 req.accepts() 接收类型范围列表
  const type = ctx.accepts('json','html','xml','text')

 // 不符合类型列表
  if(!type) ctx.throw(406)
 // 接收到的是 json 
  	
})