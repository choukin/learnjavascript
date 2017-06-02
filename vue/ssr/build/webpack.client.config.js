const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const config = merge(base,{
	resolve:{
		alias:{
			'create-api':'./create-api-client.js'
		}
	},
	plugins:[
	new webpack.DefinePlugin({
		'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
		'process.env.VUE_ENV':'client'
	}),
	// extract vendor chunks for better caching
	new webpack.optimize.CommonsChunkPlugin({
		name:'vendor'
	}),
	// // generate output HTMLwebpac
	new HTMLPlugin({
		template:'src/index.template.html'
	})
	]
})

if(process.env.NODE_ENV === 'production'){
	config.plugins.push(
		//minify
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new SWPrecachePlugin({// // auto generate service worker
			cacheId:'vue-hn',
			filename:'service-worker.js',
			dontCacheBustUrlsMatchig:/./,
			staticFileGlobsIgnorePatterns:[/index\.html$/,/\.map/]
		})

		)
}

module.exports = config