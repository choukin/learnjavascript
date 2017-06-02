<template>
<div>
  <p>hi from {{name}}</p>
  <twitter-head-card></twitter-head-card>
  <nuxt-link to="/">Home page</nuxt-link>
</div>
</template>
<script>
import TwitterHeadCard from '~components/twitter-head-card.vue'
	export default{
		head: {
 			title:'About Page',
 			meta:[
 				{hid: 'description', name:'description', content:'about page description'}
 			]
		},
		asyncData({req}){
			return new Promise((resolve) => {
      setTimeout(function () {
        resolve({name:req ? 'server' :'client'})
      }, 10000)
    })
			 
		},
		components: {
			TwitterHeadCard
		}
	}
</script>