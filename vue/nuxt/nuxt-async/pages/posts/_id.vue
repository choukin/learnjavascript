<template>
	<div class="container">
		<h1>{{post.title}}</h1>
		<pre>{{post.body}}</pre>
		<p><nuxt-link to="/posts">back to the list</nuxt-link></p>
	</div>
</template>
<script>
  import axios from 'axios'
  export default {
    async asyncData ({params}) {
      let {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      return {post: data}
    },
    head () {
      return {
        title: this.post.title
      }
    }
  }
</script>
