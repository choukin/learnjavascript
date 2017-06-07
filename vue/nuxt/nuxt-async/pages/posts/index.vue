<template>
	<div class="container">
		<h1>blog</h1>
	
	<ul>
		<li v-for="post in posts">
			<nuxt-link :to="{name:'posts-id',params:{id:post.id}}">{{post.title}}
			</nuxt-link>	
		</li>
	</ul>
	<p><nuxt-link to="/">Back to home page</nuxt-link></p>
	</div>
</template>
<script>
  import axios from 'axios'
  export default {
    asyncData ({req, params}) {
      return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
          return {posts: res.data.slice(0, 5)}
        })
    }
  }
</script>
