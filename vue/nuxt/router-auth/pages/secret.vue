<template>
	<div>
		<h1>超级隐私的页面</h1>
		<router-link to="/">BACK HOME</router-link>	
	</div>
</template>
<script>
	export default{
		middleware: 'auth'
	}
</script>