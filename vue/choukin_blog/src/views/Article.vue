<template>
<div v-html="topic.content" ></div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'article',
  computed: {
    ...mapGetters([
      'topic'
    ])
  },
  mounted: function () {
    this.$store.dispatch('FETCH_TOPIC', {id: this.$store.state.route.params.id})
  }
}
</script>
<style>
.not{
  text-align: center;
  font-size: 36px;
  margin-top: 20%;
}
img{
	max-width: 100%;
}
</style>
