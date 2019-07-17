import request from './request'

interface Form {
  accesstoken: string
  topic_id: number
}

/**
 * 用户登陆
 * @param {any} accesstoken 
 * @returns
 */
function login (accesstoken: string) {
  return request.post(`/accesstoken?accesstoken=${accesstoken}`)
}

/**
 * 获取文章列表
 * @param {any} params
 * @returns
 */
function topicsList (params: string) {
  return request.get(`/topics/${params}`)
}

/**
 * 获取文章详情
 * @param {any} id 参数id
 * @returns
 */
function topicsDetial (id: number) {
  return request.get(`topic/${id}`)
}

/**
 * 获取用户信息
 * @param {any} name 用户名
 * @returns
 */
function userInfo (name: string) {
  return request.get(`user/${name}`)
}

/** 
 * 获取已读和未读消息
 * @param {any} accesstoken 
 * @returns
 */
function message (accesstoken: string) {
  return request.get(`messages?mdrender=true&accesstoken=${accesstoken}`)
}

/**
 * 新建主题
 * @param {any} form
 * @returns
 */
function post (data: string) {
  return request.post('')
}

/**
 * 收藏主题
 * @param {any} form
 * @returns
 */
function collection (form: Form) {
  return request.post(`topic_collect/collect?${form}`)
}

/**
 * 取消收藏主题
 * @param {any} form
 * @returns
 */
function cancelCollection (form: Form) {
  return request.post(`topic_collect/de_collect?${form}`)
}

/**
 * 点赞或取消点赞
 * @param {any} id
 * @returns
 */
function like (id: number) {
  return request.post(`reply/${id}/ups`)
}

export {
  login,
  topicsList,
  topicsDetial,
  userInfo,
  message,
  post,
  collection,
  cancelCollection,
  like
}
