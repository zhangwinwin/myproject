import axios from 'axios'

//api路径
const HOST = 'https://cnodejs.org/api/v1'

export function fetch(url, method = 'GET'){
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: HOST + url,
    })
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export default {
  /**
   * 用户登陆
   * @param {any} accesstoken 
   * @returns
   */
  Login(accesstoken){
    return fetch(`/accesstoken?accesstoken=${accesstoken}`, 'post')
  },

  /**
   * 获取文章列表
   * @param {any} params
   * @returns
   */
  TopicsList(params){
    return fetch(`/topics/${params}`)
  },

    /**
   * 获取文章详情
   * @param {any} id 参数id
   * @returns
   */
  TopicsDetail(id){
    return fetch(`/topic/${id}`)
  },

  /**
   * 获取用户信息
   * @param {any} name 用户名
   * @returns
   */
  UserInfo(name){
    return fetch(`/user/${name}`)
  },

  /**topics 
   * 获取已读和未读消息
   * @param {any} accesstoken 
   * @returns
   */
  Message(accesstoken){
    return fetch(`/messages?mdrender=true&accesstoken=${accesstoken}`)
  },

    /**
   * 新建主题
   * @param {any} form
   * @returns
   */
  Post(form) {
    return fetch(`/topics?${form}`, 'post')
  },

  /**
   * 收藏主题
   * @param {any} form
   * @returns
   */
  Collection(form){
    return fetch(`/topic_collect/collect?${form}`, 'post')
  },

  /**
   * 取消收藏主题
   * @param {any} Topic_id
   * @returns
   */
  CancelCollection(form){
    return fetch(`/topic_collect/de_collect?${form}`, 'post')
  },

  /**
   * 点赞或取消点赞
   * @param {any} id
   * @returns
   */
  Like(id){
    return fetch(`/reply/${id}/ups`, 'post')
  },
}