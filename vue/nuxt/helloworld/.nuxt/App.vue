<template>
  <div id="__nuxt">
    
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>


import '/work/learn/learnjavascript/vue/nuxt/helloworld/css/main.css'


let layouts = {

  "_dark": () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/layouts/dark.vue'  /* webpackChunkName: "layouts/dark" */),

  "_default": () => import('/work/learn/learnjavascript/vue/nuxt/helloworld/layouts/default.vue'  /* webpackChunkName: "layouts/default" */)

}

export default {
  head: {"titleTemplate":"%s - Nuxt.js","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Meta description"}],"link":[],"style":[],"script":[]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  
  methods: {
    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = layouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      let _layout = '_' + layout
      if (typeof layouts[_layout] !== 'function') {
        return Promise.resolve(layouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        layouts[_layout] = Component
        return layouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
        console.error(e)
      })
    }
  },
  components: {
    
  }
}
</script>

