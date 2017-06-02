<template>
  <ul id="slide-out" class="side-nav fixed">
    <li><a class="subheader">CNODEJS VUE2.0</a></li>
    <li><router-link to="/home/good" class="waves-effect waves-teal" ><i class="material-icons">view_list</i>首页</router-link></li>
     <li><router-link to="/home/job" class="waves-effect waves-teal" href="#">招聘</router-link></li>
     <li><router-link to="/home/share" class="waves-effect waves-teal" href="#">分享</router-link></li>
     <li><router-link to="/home/ask" class="waves-effect waves-teal" href="#">问题</router-link></li>
     <li v-if="accesstoken === ''"><router-link to="/login" class="waves-effect waves-teal" href="#">登陆</router-link></li>
     <li v-else><router-link :to="'/user/'+ loginname" class="waves-effect waves-teal" href="#">我的信息</router-link></li>
     <li v-if="accesstoken !== ''"><router-link to="/logout" class="waves-effect waves-teal" >退出</router-link></li>
  </ul>
  </template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navbar',
  computed: {
    ...mapGetters([
      'accesstoken',
      'loginname'
    ])
  }
}
</script>
