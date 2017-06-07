module.exports = {
	head:{
		title: 'TODOMVC made with Nuxt.js',
		mate:[
		{charset:'utf-8'},
		{name: 'viewport',content: 'width=device-width,initail-scale=1'},
		{name:'description', content: 'TODOMVC project made with Nuxt.js'}
		],
		link:[
			{rel:'icon',type:'image/x-icon',href:'favicon.ico'}
		]
	},
	css:[
	{src:'todomvc-app-css/index.css'}
	],
	router: {
		linkActiveClass:'selected'
	}
	


}