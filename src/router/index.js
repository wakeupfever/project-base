import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import routes from '~pages'

// import { useAuthentication, setUserInfo, setDictionary, getCompanyList } from './intercept'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...setupLayouts(routes),
    { path: '/', redirect: '/overview' },
    { path: '/:path(.*)*', redirect: '/' }
  ]
})

// // 路由鉴权
// useAuthentication(router)

// // 设置用户信息
// setUserInfo(router)

// // 设置字典
// setDictionary(router)

// // 读取企业数据
// getCompanyList(router)

export default router
