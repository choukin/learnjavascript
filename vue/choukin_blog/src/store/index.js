import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import marked from 'marked'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pageNo: 1,
    pageCount: 10,
    tab: 'good',
    message: '0',
    success: false,
    accessToken: '',
    loginname: '',
    topics: [],
    topic: {
      content: ''
    },
    userinfo: {
    },
    messagelist: {
    }
  },
  actions,
  mutations,
  getters: {
    topics: state => {
      return state.topics
    },
    topic: state => {
      if (state.topic) {
        state.topic.content = marked(state.topic.content, { sanitize: true })
      }
      return state.topic
    },
    route: state => {
      return state.route
    },
    userinfo: state => {
      return state.userinfo
    },
    accesstoken: state => {
      return state.accessToken
    },
    loginname: state => {
      return state.loginname
    },
    pageCount: state => {
      return state.pageCount
    },
    pageNo: state => {
      return Number(state.pageNo)
    },
    tab: state => {
      return state.tab
    },
    success: state => {
      return state.success
    },
    message: state => {
      return state.message
    },
    messagelist: state => {
      return state.messagelist
    }
  }
})

export default store
