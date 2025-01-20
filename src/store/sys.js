import { defineStore } from 'pinia'

/**
 * 系统级状态管理【莫动内部数据】
 *
 * @type {*}
 */
export const useSysStore = defineStore('sys', {
  state: () => ({
    token: window.sessionStorage.getItem('token'),
    userInfo: {},
    dictionaryData: [],
    companyList: [],
    oauth: {}
  }),
  getters: {
    hasUserInfo() {
      return !!this.userInfo && Object.keys(this.userInfo).length > 0
    }
  },
  actions: {
    setToken(v) {
      this.token = v
      window.sessionStorage.setItem('token', v)
    },
    setData(key, val) {
      this[key] = val
    },
    logout() {},
    async getUserInfo() {
      return {}
    },
    // 获取公司列表
    async getCompanyList() {
      this.setData('companyList', [])
    },
    getCompanyKey() {
      const d = this.companyList.reduce((pre, cur) => {
        pre[cur.value] = cur.label
        return pre
      }, {})
      return d
    }
  }
})
