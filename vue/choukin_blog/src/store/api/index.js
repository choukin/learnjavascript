import {TopicDetail, TopicUpdate, TopicCollect, DeTopicCollect,
 TopicReplies, ReplyUps, messageCount, messages, markAll }
 from './resource'
import Vue from 'vue'
const API_ROOT = 'https://cnodejs.org/api/v1/'
export default {
  topics: function (options) {
    options.mdrender = true
    options.limit = 10
    return Vue.resource(API_ROOT + 'topics', options).get({})
  },
  getTopicDetail: function (id) {
    return TopicDetail.get({id: id})
  },
  newTopics: function (options) {
    // return Topics.save({}, options)
  },
  updateTopics: function (options) {
    return TopicUpdate.save(options)
  },
  topicCollect: function (options) {
    return TopicCollect.save(options)
  },
  deCollect: function (options) {
    return DeTopicCollect.save(options)
  },
  topicReplies: function (options) {
    return TopicReplies.save({topic_id: options.topic_id}, options)
  },
  replyUps: function (options) {
    return ReplyUps.save({reply_id: options.reply_id}, options)
  },
  userInfo: function (data) {
    console.log(data)
    return Vue.resource(API_ROOT + 'user{/loginname}').get({loginname: data.loginname})
  },
  accessToken: function (data) {
    return Vue.resource(API_ROOT + 'accesstoken').save(data)
  },
  messageCount: function (data) {
    return messageCount.get({accesstoken: data.accessToken})
  },
  messages: function (data) {
    data.mdrender = true
    return messages.get(data)
  },
  arkAll: function (data) {
    return markAll.save({}, data)
  }
}
