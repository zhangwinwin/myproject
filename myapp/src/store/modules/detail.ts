import * as types from '../mutationType'
import {
  TopicDetails
} from '../interface/detail'
import { ActionTree, MutationTree, GetterTree } from "vuex"
import { topicsDetial } from '../../api/api'

interface state {
  detail: TopicDetails
}
const state: state = {
  detail: {}
}

const actions: ActionTree<TopicDetails, any> = {
  /**
   * 获取文章详情
   * @param {TopicDetails} {commit}
   * @param {number} id 参数id
   */
  async getDetail({ commit }, id){
    commit(types.COM_LOADING_STATUS, true)
    const data = await topicsDetial(id)
    commit(types.COM_LOADING_STATUS, false)
    commit(types.GET_TOPICS_DETAIL, data)
  }
}

const getters: GetterTree<TopicDetails, any> = {}

const mutations: MutationTree<state> = {
  [types.GET_TOPICS_DETAIL](state, res) {
    state.detail = res.data
  }
}

export default{
  state,
  actions,
  getters,
  mutations
}
