<template>
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img :src="userinfo.avatar_url">
              <span class="card-title teal lighten-2">{{userinfo.loginname}}</span>
            </div>
            <div class="card-content">
              <p>注册时间 {{userinfo.create_at}}</p>
            </div>
            <div class="card-action">
              <a :href="'https://github.com/'+ userinfo.githubUsername">@{{userinfo.githubUsername}}</a>
            </div>
              <div class="collection" v-if="accesstoken">
                <a href="/" class="collection-item"><span class="badge">{{message}}</span>未读消息</a>
                <a href="/" class="collection-item"><span class="new badge">{{messagelist.has_read_messages.length}}</span>已读消息</a>
                <a href="#!" class="collection-item">Alan</a>
                <a href="#!" class="collection-item"><span class="badge">14</span>Alan</a>
              </div>
          </div>
        </div>
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'userinfo',
      'route',
      'message',
      'accesstoken',
      'messagelist'
    ])
  },
  watch: {
    'route': 'fetchData'
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      this.$store.dispatch('FETCH_USERINFO', {loginname: this.$store.state.route.params.loginname})
    }
  }
}
</script>
<style>
.not{
  text-align: center;
  font-size: 36px;
  margin-top: 20%;
}
</style>
