// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'
import 'materialize-css/dist/css/materialize.min.css'
import jquery from 'jquery'
import * as mater from 'materialize-css/dist/js/materialize.js'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
export {mater, vm, jquery}
