const Koa = require('koa')
const render = require('./lib/render')
const router = require('koa-router')()
const logger = require('koa-logger')
const koaBody = require('koa-body')

const app = module.exports = new Koa()

// database

const posts = []

//中间件

app.use(logger())

app.use(render)

app.use(koaBody())

//定义路由
router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id',show)
  .post('/post',create)


 app.use(router.routes())
 
 // 文章列表
 async function list(ctx){
 	console.log('post/new')
 	await ctx.render('list', {posts:posts})
 } 

 // 显示添加页面
 async function add(ctx) {
 	console.log('post/new')
 	await ctx.render('new')
 }

 // 根据ID 显示 详情
 async function show(ctx){
   const id = ctx.params.id
   const post = posts[id];
   if(!post) ctx.throw(404,'invlid post id')
   	await ctx.render('show',{post:post})
 }

 // 添加一个post
 async function create(ctx){
 	const post = ctx.request.body
 	const id = posts.push(post) -1
 	post.created_at = new Date()
 	post.id = id
 	ctx.redirect('/')
 }

 // 监听

 if(!module.parent) app.listen(3000)
