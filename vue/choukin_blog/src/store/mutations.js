import Vue from 'vue'

export const SET_TOPICS = (state, { data }) => {
  if (data.success) {
    Vue.set(state, 'topics', data.data)
    if (data.data.length >= state.pageCount) {
      Vue.set(state, 'pageNo', state.pageNo)
    }
  }
  Vue.set(state, 'success', data.success)
}

export const SET_TOPIC = (state, { data }) => {
  Vue.set(state, 'success', data.success)
  if (data.success) {
    Vue.set(state, 'topic', data.data)
  }
}
export const SET_USERINFO = (state, { data }) => {
  Vue.set(state, 'success', data.success)
  if (data.success) {
    Vue.set(state, 'userinfo', data.data)
  }
}

export const CHECK_TOKEN = (state, { data }) => {
  Vue.set(state, 'success', data.success)
  if (data.success) {
    Vue.set(state, 'accessToken', data.accessToken)
    Vue.set(state, 'loginname', data.loginname)
  }
}

export const SET_ACCESSTOKEN = (state, { accessToken }) => {
  Vue.set(state, 'accessToken', accessToken)
}

export const CLEAN_LOGINNAME = (state) => {
  Vue.set(state, 'loginname', '')
}

export const SET_PAGENO = (state, pageNo) => {
  Vue.set(state, 'pageNo', pageNo)
}

export const SET_TAB = (state, tab) => {
  Vue.set(state, 'tab', tab)
}

export const SET_SUCCESS = (state, success) => {
  Vue.set(state, 'success', success)
}

export const SET_MESSAGE = (state, message) => {
  Vue.set(state, 'message', message)
  Vue.set(state, 'success', true)
}

export const SET_MESSAGE_LIST = (state, messagedata) => {
  Vue.set(state, 'messagelist', messagedata)
  Vue.set(state, 'success', true)
}
