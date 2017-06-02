import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// Vue.http.options.crossOrigin = true
// Vue.http.options.credentials = true
const API_ROOT = 'https://cnodejs.org/api/v1/'

// 主题首页／新建主题
export const Topics = Vue.resource(API_ROOT + 'topics')
// 主题详情
export const TopicDetail = Vue.resource(API_ROOT + 'topic{/id}', {mdrender: false})
// 编辑主题
export const TopicUpdate = Vue.resource(API_ROOT + 'topics/update')
// 收藏主题
export const TopicCollect = Vue.resource(API_ROOT + 'topic_collect/collect')
// 取消主题
export const DeTopicCollect = Vue.resource(API_ROOT + 'topic_collect/de_collect')
// 用户收藏的主题
export const UserTopicCollect = Vue.resource(API_ROOT + 'topic_collect{/loginname}')
// 评论
// 新建评论
export const TopicReplies = Vue.resource(API_ROOT + 'topic{/topic_id}/replies')
// 评论点赞
export const ReplyUps = Vue.resource(API_ROOT + 'reply{/reply_id}/ups')

// 用户
// 用户详情
export const Userinfo = Vue.resource(API_ROOT + 'user{/loginname}')
// 验证token
export const AccessToken = Vue.resource(API_ROOT + 'accesstoken')
// 消息通知
// 未读消息
export const messageCount = Vue.resource(API_ROOT + 'message/count')
// 获取已读和未读消息
export const messages = Vue.resource(API_ROOT + 'messages')
// 标记全部已读
export const markAll = Vue.resource(API_ROOT + 'message/mark_all')

