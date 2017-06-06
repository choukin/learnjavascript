'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _4e24c8e5 = () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _3c1d3d30 = () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/pages/userss.vue' /* webpackChunkName: "pages/userss" */)

const _2e6cee20 = () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/pages/about.vue' /* webpackChunkName: "pages/about" */)

const _ac7c2974 = () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/pages/users/_id.vue' /* webpackChunkName: "pages/users-id" */)

const _4c6e279d = () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/pages/_slug.vue' /* webpackChunkName: "pages/slug" */)



const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
  		{
			path: "/",
			component: _4e24c8e5,
			name: "index"
		},
		{
			path: "/userss",
			component: _3c1d3d30,
			name: "userss"
		},
		{
			path: "/about",
			component: _2e6cee20,
			name: "about"
		},
		{
			path: "/users/:id?",
			component: _ac7c2974,
			name: "users-id"
		},
		{
			path: "/:slug",
			component: _4c6e279d,
			name: "slug"
		}
    ]
  })
}
