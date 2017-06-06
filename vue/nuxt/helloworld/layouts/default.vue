<template>
	<div>
	<img src="logo.png" alt="">
		<nuxt/>
		<visits/>
	</div>
</template>
<script>
	import Visits from '~components/Visits'
	export default {
		components:{Visits}
	}
</script>
<style scoped>
	img{
		position: fixed;
		top:300px;
		left:20px;
		z-index: 1000;
	}
</style>