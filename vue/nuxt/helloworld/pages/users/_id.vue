<template>
	<div class="content">
		<h3 class="title">{{name}}</h3>
		<h4>@{{username}}</h4>
		<p>Email:{{email}}</p>
		<p><nuxt-link to="/">list of user</nuxt-link></p>
	</div>
</template>
<script>
	import axios from 'axios'

	export default {
		validate ({params}){
			return !isNaN(+params.id)
		},
		head: {
			title: 'Home page',
			meta:[
				{hid:'description', name:'description', content: 'HOme page description'}
			]
		},
		asyncData ({params,error}){
			return axios.get(`https://jsonplaceholder.typicode.com/users/${+params.id}`)
			.then((res)=> res.data)
			.catch(() => {
				error({message:'User not found', statusCode:404})
			})
		}
	}
</script>
<style>
	.user{
		text-align: center;
		margin-top: 100px;
		font-family: sans-serif;
	}
</style>