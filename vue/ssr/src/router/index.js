import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const createListView = name =>()=>
		System.import('../views/CreateListview').then(
m=>m.createListView(name)
			)
const ItemView = () => System.import('../views/ItemView.vue')
const UserView = () => System.import('../views/UserView.vue')

export default new Router({
	mode: 'history',
	scrollBehavior:()=>({y:0}),
	routes:[
	{path:'/top/:page(\\d+)?',component:createListView('top')},
	{path:'/new/:page(\\d+)?',component:createListView('new')},
	{path:'/new/:page(\\d+)?',component:createListView('show')},
	{path:'/new/:page(\\d+)?',component:createListView('ask')},
	{path:'/new/:page(\\d+)?',component:createListView('job')},
	{path:'/item/:id(\\d+)?',component:ItemView},
	{path:'/user/:id(\\d+)?',component:UserView},
	{path:'/',redirect:'/top'}


	]
})
