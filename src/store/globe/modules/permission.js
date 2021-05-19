/* eslint-disable no-empty-pattern */
/*
 * 描述：权限相关的状态管理模块
*/

const state = {
  applicationInfo: null,
  operatePermissions: [],
}

const mutations = {
  UPDATE_APPLICATION_INFO(state, data) {
    state.applicationInfo = data
  },
  UPDATE_OPERATE_PERMISSIONS(state, data) {
    state.operatePermissions = data
  },
}

const actions = {}

const getters = {
  applicationInfo: state => state.applicationInfo,
  operatePermissions: state => state.operatePermissions,
}

// 导出vuex模块
export default {
  // 模块开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
