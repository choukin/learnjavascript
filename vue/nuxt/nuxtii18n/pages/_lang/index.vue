<template>
	<div class="content">
		<div class="container">
			<h1 class="content_title">{{$t('home.title')}}</h1>
			<p>{{$t('home.introduction')}}</p>
		</div>
	</div>
</template>
<script>
	export default{
		head(){
			return {title: this.$t('home.title')}
		}
	}
</script>