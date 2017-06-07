<template>
	<div>
		<header class="header">
			<div class="container">
				<h1 class="header__title">Nuxt i18n</h1>
				<nav class="header__menu">
					<nuxt-link class="header__link" :to="path('/')" exact>
					{{$t('links.home')}}
					</nuxt-link>
					<nuxt-link class="header__link" :to="path('/about')" exact>
					{{$t('links.about')}}
					</nuxt-link>
					<nuxt-link class="header__link" v-if="$i18n.locale === 'en'" :to="'/fr' + $route.fullPath" active-class="none"  exact>
					{{$t('links.french')}}
					</nuxt-link>
					<nuxt-link class="header__link" v-else-if="$i18n.locale === 'fr'" :to="'/zh' + $route.fullPath.replace(/fr\//g, '')" active-class="none"  exact>
					{{$t('links.zhcn')}}
					</nuxt-link>
					<nuxt-link v-else class="header__link" :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
					{{$t('links.english')}}
					</nuxt-link>															
				</nav>
			</div>
		</header>
		<nuxt/>
	</div>
</template>

<script>
	export default {
		methods:{
			path (url){
				return (this.$i18n.locale === 'en' ?url :'/'+ this.$i18n.locale + url)
			}
		}
	}
</script>
<style>
	*,*:before,*:after{
		padding:0;
		margin:0;
		box-sizing: border-box;
	}
	html, body {
  background-color: #fff;
  color: #2e2f30;
  letter-spacing: 0.5px;
  font-size: 18px;
  font-family: "Source Sans Pro", Arial, sans-serif;
  height: 100vh;
  margin: 0;
}
.container {
  width: 75%;
  margin: 0 auto;
}
.container:after {
  content: "";
  display: table;
  clear: both;
}
.header {
  color: #fff;
  height: 80px;
  line-height: 80px;
  background-color: #2e2f30;
}
.header__title {
  float: left;
  font-weight: 300;
  font-size: 30px;
}
.header__menu {
  float: right;
}
.header__link {
  font-size: 16px;
  color: #fff;
  border: 1px solid #fff;
  padding: 7px 12px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  margin-left: 10px;
}
.header__link:hover {
  color: #2e2f30;
  background-color: #fff;
}
.nuxt-link-active {
  color: cyan;
}
.content {
  padding: 50px 0;
  text-align: center;
}
.content__title {
  font-weight: 300;
  padding-bottom: 30px;
}
</style>
