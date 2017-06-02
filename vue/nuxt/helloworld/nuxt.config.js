module.exports = {
	loading: 'components/loading.vue',
	build: {
		analyze: true,
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
	}
}