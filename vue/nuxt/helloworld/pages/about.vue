<template>
<div>
  <p>hi from {{name}}</p>
  <twitter-head-card></twitter-head-card>
  <p><nuxt-link to="/" class="button is-medium is-info hvr-wobble-vertical">Another button</nuxt-link></p>
  <nuxt-link to="/">Home page</nuxt-link>
</div>
</template>
<script>
import TwitterHeadCard from '~components/twitter-head-card.vue'
	export default{
		layout:'dark',
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
      }, 1000)
    })
			 
		},
		components: {
			TwitterHeadCard
		}
	}
</script>