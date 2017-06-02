<template>
  <ul class="pagination">
    <li v-if="!hasPre" class="disabled"><i class="material-icons">chevron_left</i></li>
    <li v-else class="waves-effect active"><router-link :to="'/home/'+ tab +'/'+ (pageNo - 1)">
    <i class="material-icons">chevron_left</i></router-link></li>
    <li v-if="hasNext" class="waves-effect active"><router-link :to="'/home/'+ tab +'/' + (pageNo +1)"><i class="material-icons">chevron_right</i></router-link></li>
    <li v-else class="disabled"><i class="material-icons">chevron_right</i></li>
  </ul>	
</template>
<script>
export default {
  name: 'pageination',
  props: {
    pageCount: {
      type: Number,
      required: true,
      validator: function (value) {
        return value > 0
      }
    },
    pageNo: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    },
    currentCount: {
      type: Number,
      required: true
    },
    tab: {
      type: String,
      required: true
    }
  },
  computed: {
    hasPre: function () {
      if (this.pageNo === 1) {
        return false
      }
      return true
    },
    hasNext: function () {
      if (this.currentCount >= this.pageCount) {
        return true
      }
      return false
    }
  }
}
</script>
<style>
	
</style>
