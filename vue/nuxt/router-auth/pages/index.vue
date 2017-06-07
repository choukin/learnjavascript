<template>
	<div class="container">
		<h1>请登陆查看隐私内容</h1>
		<form v-if="!$store.state.authUser" @submit.prevent="login" >
			<p class="error" v-if="formError">{{formError}}</p>
			<p><i>TOLOGIN use <b>demo</b></i></p>
			<p>Username <input type="text" v-model="formUsername" name="username"></p>
			<p>Password <input type="password" v-model="formPassword" name="password"> </p>
			<button type="submit">Login</button>
		</form>
		<div v-else>
			Hello{{$store.state.authUser.username}}
			<pre>I am the secret content, I am shown only when the use is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">Logout</button>
		</div>
		<p><nuxt-link to="/secret">Super secret page</nuxt-link></p>
		<p>
		<button @click="increment">{{counter}}</button><br>
		<nuxt-link to="/about">About</nuxt-link>
		</p>
	</div>
</template>
<script>
import {mapState} from 'vuex'
	export default {
		data () {
			return {
				formUsername: '',
				formPassword: '',
				formError: null
			}
		},
		fetch ({store}){
			store.commit('increment')
		},
		computed: mapState([
 			'counter'
			]),
		methods:{
			increment (){
				this.$store.commit('increment')
			},
			login(){
				this.$store.dispatch('login',{
					username:this.formUsername,
					password: this.formPassword
				})
				.then(() => {
					this.formUsername = ''
					this.formPassword = ''
					this.formError = null
				}).catch((e)=>{
					this.formError = e.message
				})
			},
			logout(){
				this.$store.dispatch('logout')
			}
		}
	}
</script>
<style>
	.container{
		padding:100px;
		
	}
	.error{
			color: red;
		}
</style>