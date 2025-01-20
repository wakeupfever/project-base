/**
 * 对路由进行守卫扩展
 * @param {vue-router} router 路由实例对象
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

import { useSysStore } from '@/store/sys'
import { useDictionaryStore } from '@/store/dictionary'

import whiteList from './whiteList'

import { LOGIN_PATH, MAIN_PAGE_PATH } from '@/global/constant.js'
// import { getInfoByToken } from '@/api/sys/login'

// 用户鉴权
export const useAuthentication = router => {
  router.beforeEach(async (to, from, next) => {
    const sysStore = useSysStore()
    NProgress.start()
    // 实现逻辑
    // 1. 判断地址是否带有token：有 - 存储到pinia中
    // 2. 判断项目中token是否存在：存在 - 获取登录用户，不存在 - 看是否是白名单
    if ((!sysStore.token || sysStore.token.length < 20) && to.query.token) {
      sysStore.setToken(to.query.token)
    }
    if (sysStore.token) {
      if (to.path === LOGIN_PATH) {
        // 如果路由想进登录页，但存在token，则免登录，直接进主页
        next(MAIN_PAGE_PATH)
      } else {
        // 进入非登录页
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 白名单，则继续
        next()
      } else {
        // 不在白名单，则跳转到登录页
        next(LOGIN_PATH)
      }
    }
  })
  // eslint-disable-next-line no-unused-vars
  router.afterEach((to, from) => {
    // console.log(to, from)
    NProgress.done()
  })
}

// 获取用户信息
export const setUserInfo = router => {
  router.beforeEach(async (to, from, next) => {
    const sysStore = useSysStore()
    if (!sysStore.hasUserInfo && sysStore.token) {
      // 如果token存在，但用户信息不存在，则获取用户信息
      const userInfo = await sysStore.getUserInfo()
      if (userInfo) {
        next()
      } else {
        next(LOGIN_PATH)
        return
      }
    }
    next()
  })
}

// 获取字典
export const setDictionary = router => {
  router.beforeEach(async (to, from, next) => {
    const dictionaryStore = useDictionaryStore()
    const sysStore = useSysStore()

    if (!dictionaryStore.serverDictionaryData.length && sysStore.token) {
      await dictionaryStore.getServerDictionary()
      next()
    }
    next()
  })
}

// 获取企业信息
export const getCompanyList = router => {
  router.beforeEach(async (to, from, next) => {
    const sysStore = useSysStore()

    if (!sysStore.companyList.length && sysStore.token) {
      await sysStore.getCompanyList()
      next()
    }
    next()
  })
}
