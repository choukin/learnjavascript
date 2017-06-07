<template>
	<div>
		<p>
			<button @click="$store.commit('increment')">{{$store.state.counter}}</button><br>
			<nuxt-link to="/">HOME</nuxt-link>
		</p>
	</div>
</template>