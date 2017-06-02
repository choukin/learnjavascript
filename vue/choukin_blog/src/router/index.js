import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'

Vue.use(Router)

// const home = resolve => require(['../views/Home.vue'], resolve)
const login = resolve => require(['../views/Login.vue'], resolve)
const logout = resolve => require(['../views/Logout.vue'], resolve)

const article = resolve => require(['../views/Article.vue'], resolve)
const user = resolve => require(['../views/User.vue'], resolve)
const apps = resolve => require(['../views/apps.vue'], resolve)
const notFound = resolve => require(['../views/NotFound.vue'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/good/1'
    },
    {
      path: '/home/:tab/:pageNo(\\d+)?',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/article/:id',
      name: 'article',
      component: article
    },
    {
      path: '/apps',
      name: 'apps',
      component: apps
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: user
    },
    {
      path: '*',
      name: 'notfound',
      component: notFound
    }
  ]
})
