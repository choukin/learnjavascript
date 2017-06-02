import api from './api'

export const FETCH_TOPICS = ({ commit, dispatch, state }, {tab, pageNO}) => {
  const page = state.pageNo
  const limit = state.pageCount
  return api.topics({tab, page, limit}).then(data => {
    commit('SET_TOPICS', { data: data.data })
  })
}

export const FETCH_TOPIC = ({commit, dispatch, state}, {id}) => {
  return api.getTopicDetail(id).then(data => {
    commit('SET_TOPIC', { data: data.data })
  })
}

export const FETCH_USERINFO = ({commit, dispatch, state}, {loginname}) => {
  return api.userInfo({loginname: loginname}).then(data => {
    commit('SET_USERINFO', { data: data.data })
  })
}

export const CHECK_TOKEN = ({commit, dispatch, state}, {accessToken}) => {
  return api.accessToken({accesstoken: accessToken}).then(data => {
    if (data.status === 200) {
      data.data.accessToken = accessToken
      commit('CHECK_TOKEN', { data: data.data })
      return api.messageCount({accessToken})
    }
  }).then(data => {
    if (data.status === 200) {
      commit('SET_MESSAGE', data.data.data)
      return api.messages({accesstoken: accessToken})
    } else {
      throw new Error('test')
    }
  }).then(data => {
    if (data.status === 200) {
      commit('SET_MESSAGE_LIST', data.data.data)
    } else {
      throw new Error('test')
    }
  }).catch(function (e) {
    console.log(e)
    commit('SET_ACCESSTOKEN', {accesstoken: ''})
  })
}
