// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// window.fetch() 的 polyfill
require('whatwg-fetch')

export const state = () => ({
	authUser:null,
	counter: 0
})

export const mutations = {
	SET_USER: function (state,user) {
			state.authUser = user
		},
	increment (state){
		state.counter++
	}	
} 

export const actions = {
	// 所以当应用完毕时，一些我们从服务器获取到的数据就会被填充到这个状态树 (store) 上
			nuxtServerInit ({commit},{ req }){
				if(req.session && req.session.authUser){
					commit('SET_USER', req.session.authUser)
				}
			},
			login ({commit},{username,password}){
				return fetch('/api/login',{
					credentials:'same-origin',
					method:'POST',
					headers:{
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password
					})
				}).then((res)=>{
					if(res.status === 401 ){
						debugger
						throw new Error('bad credentials')
					}else{
						return res.json()
					}
				}).then((authUser)=>{
					commit('SET_USER',authUser)
				})
			},
			logout ({commit}) {
				return fetch('/api/logout',{
					credentials: 'same-origin',
					method:'POST'
				}).then(()=>{
					commit('SET_USER', null)
				})
			}
}

// const store = new Vuex.store({
// 	state() =>  {
// 		authUser: null
// 	},
// 	mutations: {
// 		SET_USER: function (state,user) {
// 			state.authUser = user
// 		}
// 	},
// 	actions: {
// 		// 所以当应用完毕时，一些我们从服务器获取到的数据就会被填充到这个状态树 (store) 上
// 			nuxtServerInit ({commit},{ req }){
// 				if(req.session && req.session.authUser){
// 					commit('SET_USER', req.session.authUser)
// 				}
// 			},
// 			login ({commit},{username,password}){
// 				return fetch('/api/login',{
// 					credentials:'same-origin',
// 					method:'POST',
// 					headers:{
// 						'Content-Type': 'application/json'
// 					},
// 					body: JSON.stringify({
// 						username,
// 						password
// 					})
// 				}).then((res)=>{
// 					if(res.status === 401 ){
// 						throw new Error(res.error)
// 					}else{
// 						return res.json()
// 					}
// 				}).then((authUser)=>{
// 					commit('SET_USER',authuser)
// 				})
// 			},
// 			logout ({commit}) {
// 				return fetch('/api/logout',{
// 					credentials: 'same-origin',
// 					method:'POST'
// 				}).then(()=>{
// 					commit('SET_USER', null)
// 				})
// 			}

// 	}
// })

// export default store