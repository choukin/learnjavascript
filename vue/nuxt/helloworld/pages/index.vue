<template>
<div class="content">	
<h1 class="title">{{ $route.params.slug || 'Home' }}</h1>
<pre>{{userAgent}}</pre>
<ul>
	<li><nuxt-link to="/">Home</nuxt-link>	</li>
	<li v-for="slug in slugs"><nuxt-link :to="{name: 'slug', params:{slug}}">{{slug}}</nuxt-link></li>
</ul>
<nuxt-link to="/about">About page</nuxt-link>
<nuxt-link to="/userss">users</nuxt-link>
<h1>Cached components</h1>
<p>Look at the source code and see how the timestamp is not reloaded before 10s after refreshig the page</p>
<p>Timestamp:{{date}}</p>

<h2>Users</h2>
<ul class="users">
	<li v-for="user in users">
		<nuxt-link :to="'/users/'+user.id" class="button is-medium is-primary hvr-float-shadow">{{user.name}}</nuxt-link>
	</li>
</ul>
<button type="button" class="button is-medium" @click="showLoginError()">showLoginError</button>
</div>		
</template>
<script>
let miniToastr
if(process.browser){
	miniToastr = require('mini-toastr')
}
import axios from 'axios'
	export default {
		name:'date',
		head: {
			title: 'Home page',
			meta:[
				{hid:'description', name:'description', content: 'HOme page description'}
			]
		},
		asyncData ({store,route,userAgent}) {
           return axios.get('https://jsonplaceholder.typicode.com/users')
           .then((res)=>{
           	return {users:res.data,
           		userAgent,
           		slugs:[
           			'foo',
           			'bar',
           			'baz'
           		]
           	}
           })
		},
		serverCacheKey () {
			return Math.floor(Date.now()/10000)
		},
		data () {
			return {date: Date.now()}
		},
		mounted () {
			if(miniToastr){
			miniToastr.init()
		}
			//this.notifications()
		},
		notifications:{
			showLoginError: {
				title:'Welcome!',
				message:'Hello from nuxt.js',
				type:'info'
			}
		}

	}
</script>
<style>
	/*.container{
		text-align: center;
		margin-top: 150px;
		font-size: 20px;
	}*/
	/*ul{
		list-style-type: none;
	}
	.users li a {
		display: inline-block;
		width: 200px;
		border:1px #ddd solid;
		padding:10px;
		text-align: left;
		color: #222;
		text-decoration: none;

	}
	.users li a:hover{
		color:orange;
	}*/
</style>