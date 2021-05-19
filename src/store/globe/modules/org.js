import { http } from '../../../lib/http'

// 定义action type
export const GET_ORG_ROOT = 'GET_ORG_ROOT'
export const GET_ORG_CHILD = 'GET_ORG_CHILD'
export const SEARCH_ORG_LIST = 'SEARCH_ORG_LIST'
export const GET_SUPER_ORG = 'GET_SUPER_ORG'
export const GET_ORG_PARENTS = 'GET_ORG_PARENTS'
export const FIND_PARENT_TREE = 'FIND_PARENT_TREE'

export const GET_DEPART_ROOT = 'GET_DEPART_ROOT'
export const GET_DEPART_CHILD = 'GET_DEPART_CHILD'
export const SEARCH_DEPART_LIST = 'SEARCH_DEPART_LIST'

// 指定对应api
export const api = {
  [GET_ORG_ROOT]: `/gridcloud-usercenter/orgManage/viewSuperviseOrg`, //组织机构根结点
  [GET_ORG_CHILD]: `/gridcloud-usercenter/orgManage/viewOrgChildren`, //组织机构子结点
  [SEARCH_ORG_LIST]: `/gridcloud-usercenter/orgManage/findSuperviseOrg`, //模糊搜索组织机构列表
  [GET_SUPER_ORG]: `/gridcloud-usercenter/deptManage/viewUpperDept`, //获取上级部门
  [GET_ORG_PARENTS]: `/gridcloud-usercenter/orgManage/view/allParent`, //获取当前组织机构所有上级机构列表
  [FIND_PARENT_TREE]: `/gridcloud-usercenter/orgManage/find/tree`, //获取当前组织机构所有上级机构树

  [GET_DEPART_ROOT]: `/gridcloud-usercenter/deptManage/viewShareDept`, //部门根结点
  [GET_DEPART_CHILD]: `/gridcloud-usercenter/deptManage/viewDeptChildren`, //部门子节点
  [SEARCH_DEPART_LIST]: `/gridcloud-usercenter/deptManage/findShareDept`, //模糊搜索部门
}

const state = {
  currentOrg: {}, //当前选中组织机构
}

const actions = {
  getOrgRoot({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[GET_ORG_ROOT], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getOrgChild({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[GET_ORG_CHILD], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getOrgParents({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[GET_ORG_PARENTS], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  searchOrgList({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[SEARCH_ORG_LIST], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getSuperOrg({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[GET_SUPER_ORG], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  findParentTree({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[FIND_PARENT_TREE], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },

  getDepartRoot({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[GET_DEPART_ROOT], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getDepartChild({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[GET_DEPART_CHILD], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  searchDepartList({ commit }, payload) { //eslint-disable-line
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[SEARCH_DEPART_LIST], payload)
        if (rst.code === 200) {
          resolve(rst.data)
        } else {
          reject(rst.msg)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
}

// 根据commit更新store
const mutations = {
  updateOrg(state, org) {
    state.currentOrg = org
  },
}

const getters = {
  currentOrg(state) {
    return state.currentOrg
  },
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
