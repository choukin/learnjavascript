<template>
<div class="content">	
<h1 class="title">Hello</h1>
<nuxt-link to="/about">About page</nuxt-link>
<h1>Cached components</h1>
<p>Look at the source code and see how the timestamp is not reloaded before 10s after refreshig the page</p>
<p>Timestamp:{{date}}</p>

<h2>Users</h2>
<ul class="users">
	<li v-for="user in users">
		<nuxt-link :to="'/users/'+user.id" class="button is-medium is-primary hvr-float-shadow">{{user.name}}</nuxt-link>
	</li>
</ul>
</div>		
</template>
<script>
import axios from 'axios'
	export default {
		name:'date',
		head: {
			title: 'Home page',
			meta:[
				{hid:'description', name:'description', content: 'HOme page description'}
			]
		},
		asyncData () {
           return axios.get('https://jsonplaceholder.typicode.com/users')
           .then((res)=>{
           	return {users:res.data}
           })
		},
		serverCacheKey () {
			return Math.floor(Date.now()/10000)
		},
		data () {
			return {date: Date.now()}
		}
	}
</script>
<style>
	.container{
		text-align: center;
		margin-top: 150px;
		font-size: 20px;
	}
	ul{
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
	}
</style>