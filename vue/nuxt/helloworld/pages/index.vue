<template>
<div class="container">	
<h1>Hello</h1>
<nuxt-link to="/about">About page</nuxt-link>
<h1>Cached components</h1>
<p>Look at the source code and see how the timestamp is not reloaded before 10s after refreshig the page</p>
<p>Timestamp:{{date}}</p>
</div>		
</template>
<script>
	export default {
		name:'date',
		head: {
			title: 'Home page',
			meta:[
				{hid:'description', name:'description', content: 'HOme page description'}
			]
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
</style>