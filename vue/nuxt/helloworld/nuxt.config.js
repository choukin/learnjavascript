const {join} = require('path')
const axios = require('axios')
module.exports = {
	router: {
      middleware :['user-agent']
	},
	loading: false,//'components/loading.vue',
	css:[
	  //'hover.css/css/hover-min.css',
	  //'bulma/bulma.sass',
	  join(__dirname,'css/main.css')
	],
	build: {
		vendor: ['axios','mini-toastr','vue-notifications'],
		extractCSS: true,
		analyze: false,
		ssr: {
			cache: require('lru-cache')({
				max: 1000,
				maxAge: 1000* 60 * 15
			})
		}
	},
	head: {
		titleTemplate: '%s - Nuxt.js',
		meta: [
		  {charset: 'utf-8'},
		  {name: 'viewport',content:'width=device-width, initial-scale=1'},
		  {hid:'description',name:'description',content:'Meta description'}
		]
	},
	plugins: [
	  	// ssr false 只在客户端启用
		{src:'~plugins/vue-notifications.js',ssr:false}
	],
	generate: {
		routes: function (callback) {
	      axios.get('https://jsonplaceholder.typicode.com/users')
	      .then((res) => {
	        var routes = res.data.map((user) => {
	          return '/users/' + user.id
	        })
	        routes.push('/')
	        routes.push('/userss')
	        routes.push('/about')
	        callback(null, routes)
	      })
	      .catch(callback)
	    },
		minify: {
		  collapseBooleanAttributes: true,
		  collapseWhitespace: true,
		  decodeEntities: true,
		  minifyCSS: true,
		  minifyJS: true,
		  processConditionalComments: true,
		  removeAttributeQuotes: false,
		  removeComments: false,
		  removeEmptyAttributes: true,
		  removeOptionalTags: true,
		  removeRedundantAttributes: true,
		  removeScriptTypeAttributes: false,
		  removeStyleLinkTypeAttributes: false,
		  removeTagWhitespace: false,
		  sortAttributes: true,
		  sortClassName: true,
		  trimCustomFragments: true,
		  useShortDoctype: true
	}
 }
	
}