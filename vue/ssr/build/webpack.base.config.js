const path = require('path')
const vueConfig = require('./vue-loader.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	devtool:isProd
	?false
	:'#cheap-module-eval-source-map',
	//输入项的配置
	entry:{
		app:'./src/entry-client.js',
		vendor:[
			'es6-promise/auto',
			'firebase/app',
			'firebase/database',
			'vue',
			'vue-router',
			'vuex',
			'vuex-router-sync'
		]
	},
	  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
	resolve:{//配置查找模块的路径和扩展名和别
		alias:{
			'public':path.resolve(__dirname,'../public')
		}
	},
	module:{// 加载器的配置
		noParse:/es6-promise\.js/,
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:vueConfig
			},
			{
				test:/\.js$/,
				loader:'buble-loader',
				exclude:/node_modules/,
				options:{
					objectAssign:'Object.assign'
				}
			},
			{
				test:/\.(png|jpg|gif|svg)$/,
				loader:'url-loader',
				options:{
					limit:10000,
					name:'[name].[ext]?[hash]'
				}
			}
		]
	},
	performance:{//配置如何展示性能提示
		maxEntrypointSize:300000,
		hints:isProd?'warning':false
	},
	plugins:isProd?[]:[//插件列表
		new FriendlyErrorsPlugin()
	]
}