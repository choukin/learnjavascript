<template>
  <div id="app">
    <loading :isLoading="success"></loading> 
    <Navbar></Navbar>
    <main>  
    <div class="container">
    <transition :name="transitionName">
    <router-view></router-view>
    </transition>
    </div>
    </main>
    <Toaster></Toaster>        
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Toaster from './components/Toaster'
import Loading from './components/Loading'
import {mapGetters} from 'vuex'
export default {
  data: function () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {Navbar, Toaster, loading: Loading},
  computed: {
    ...mapGetters([
      'success'
    ])
  },
  watch: {
    '$route': function (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      console.log(this.transitionName)
    }
  }
}
</script>
<style>
  .slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
