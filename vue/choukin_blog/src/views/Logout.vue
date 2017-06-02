<template>
</template>
<script>
export default {
  name: 'logout',
  mounted: function () {
    this.$store.commit('SET_ACCESSTOKEN', {accessToken: ''})
    this.$store.commit('CLEAN_LOGINNAME')
    this.$router.replace('/login')
  }
}
</script>
