<template>
 <ul class="collection">
  <template v-for="topic in topics" >  
      <li class="collection-item avatar  text-darken-2">
      <img :src="topic.author.avatar_url" alt="" class="circle">
      <router-link :to="'/article/'+ topic.id" class="title">{{topic.title}}</router-link></br>
      <router-link :to="'/user/'+ topic.author.loginname">{{topic.author.loginname}}</router-link>
         {{topic.reply_count}}/{{topic.visit_count}}
      </p>
    </li>
  </template>	
  <li>
    <pageination v-if="topics.length >= pageCount" :pageNo="pageNo" :tab="tab" :pageCount="pageCount" :currentCount="topics.length"></pageination>
  </li>
</ul> 
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pageination from '../components/Pageination'

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'topics',
      'route',
      'pageCount',
      'pageNo',
      'tab'
    ])
  },
  mounted: function () {
    this.fetchDate()
  },
  methods: {
    fetchDate: function () {
      let pageNo = this.$store.state.route.params.pageNo
      let tab = this.$store.state.route.params.tab
      if (typeof tab === 'undefined') {
        tab = 'good'
      }
      if (typeof pageNo === 'undefined') {
        pageNo = 1
        this.$store.commit('SET_SUCCESS', false)
      }
      this.$store.commit('SET_PAGENO', pageNo)
      this.$store.commit('SET_TAB', tab)
      this.$store.dispatch('FETCH_TOPICS', {tab: this.$store.state.route.params.tab, pageNo: this.$store.state.route.params.pageNo})
    }
  },
  watch: {
    'route': 'fetchDate'
  },
  components: {
    pageination: Pageination
  }
}
</script>
<style>
	main{
		padding-left:300px;
    padding-top: 30px;
	}
</style>
