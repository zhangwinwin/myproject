import * as types from '../types'
import api from '../../fetch/api'

const state = {
  post: {}
}

const actions = {
  /**
   * 获取信息列表
   * @param {any} {commit}
   * @param {any} accesstoken
   */
  getMessageInfo({ commit, rootState }){
    commit(types.COM_LOADING_STATUS, true)
    let accesstoken = rootState.user.userInfo.accesstoken
    api.Message(accesstoken).then(res => {
      commit(types.GET_MESSAGE_LIST, res.data)
      commit(types.COM_LOADING_STATUS, true)
    })
  }
}

const getters = {
  getMessageInfo: state => state.post
}

const mutations = {
  [types.GET_MESSAGE_LIST](state, res){
    state.post = res
  }
}

export default{
  state,
  actions,
  getters,
  mutations
}