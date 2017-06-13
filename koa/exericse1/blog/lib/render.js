/**
 * 依赖的模块
 */
const views = require('koa-views')

const path = require('path')

// 设置 映射 views 里的html
// 使用 swig 模版引擎

module.exports = views(path.join(__dirname,'/../views'),{
	map:{html:'swig'}
})