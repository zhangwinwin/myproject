import * as types from '../mutationType'
import { ActionTree, MutationTree, GetterTree } from "vuex"
import { MessageInfo } from '../interface/message'
import { message } from '../../api/api'

interface state {
  post: Array<MessageInfo>
}
const state: state = {
  post: []
}

const actions: ActionTree<MessageInfo, any> = {
  /**
   * 获取信息列表
   * @param {any} {commit}
   * @param {any} accesstoken
   */
  async getMessageInfo({ commit, rootState }){
    commit(types.COM_LOADING_STATUS, true)
    let accesstoken = rootState.user.userInfo.accesstoken
    let {data} = await message(rootState)
    commit(types.GET_MESSAGE_LIST, data)
    commit(types.COM_LOADING_STATUS, true)
  }
}

const getters: GetterTree<state, any> = {
  getMessageInfo: state => state.post
}

const mutations: MutationTree<state> = {
  [types.GET_MESSAGE_LIST] (state, res) {
    state.post = res
  }
}

export default{
  state,
  actions,
  getters,
  mutations
}
