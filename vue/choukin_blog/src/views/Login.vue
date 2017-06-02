<template>
  <div class="row">
    <form class="col s12">
      <div class="row card-panel ">
        <div class="input-field">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate" v-model.trim="accesstoken">
          <label for="icon_prefix">accesstoken</label>
        </div>
        <a class="waves-effect waves-light btn" @click="fetchData">登陆</a>
      </div>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {accesstoken: ''}
  },
  computed: {
    ...mapGetters([
      'loginname'
    ])
  },
  mounted: function () {
    if (this.$store.state.loginname) {
      this.$router.replace('/user/' + this.$store.state.loginname)
    }
  },
  methods: {
    fetchData () {
      this.$store.commit('SET_SUCCESS', false)
      this.$store.dispatch('CHECK_TOKEN', {accessToken: this.accesstoken})
    }
  },
  watch: {
    loginname: function (val, oldVal) {
      if (val) {
        this.$router.replace('/user/' + val)
      }
    }
  }
}
</script>
