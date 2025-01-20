import axios from 'axios'

import { useSysStore } from '@/store/sys'
import router from '@/router'

import { LOGIN_PATH } from '@/global/constant'

// 封装axios请求
const http = axios.create({
  baseURL: '', // 基础URL
  timeout: 10000 // 请求超时时间
})

const pendingRequests = {}

/**
 * Request 类用于创建和管理 HTTP 请求，包括拦截器的设置和请求方法的实现。
 * @extends EventEmitter
 */
class Request {
  /**
   * 构造函数，初始化 Request 实例并设置拦截器。
   */
  constructor() {
    this.confBaseUrl = `${import.meta.env.WEB_API_URL}/apiConfig/getApiUrls`
    this.confType = import.meta.env.APP_SERVICE_TYPE

    // 阿里云响应数据结构 - 内部信息全由后端配置而来
    this._conf = null

    this.initApiUrls()

    this.interceptors()
  }

  /**
   * 获取apiUrls的副本【尽量不要直接使用 request._conf 】
   *
   * @returns {*}
   */
  getApiUrls() {
    return Object.assign({}, this._conf)
  }

  /**
   * 从阿里云初始化 ApiUrls
   */
  async initApiUrls() {
    if (!this._conf) {
      const {
        data: { data }
      } = await axios
        .get(this.confBaseUrl, { params: { serverType: this.confType } })
        .catch(err => {
          console.log(err)
          ElMessage.error('获取ApiUrls失败')
        })
      this._conf = data
    }
  }

  /**
   * 设置请求和响应拦截器。
   */
  interceptors() {
    const that = this
    // const sysStore = useSysStore()
    // 请求拦截器
    http.interceptors.request.use(
      // 发送请求之前
      async config => {
        await that.initApiUrls()
        const sysStore = useSysStore()

        // 设置baseURL
        if (!config.baseURL) {
          config.baseURL = that._conf.gsCoMainApiUrl
        }

        const token = sysStore.token
        // token存在，但请求头不存在，则使用token
        if (token && !config.headers.Authorization) {
          config.headers.Authorization = token
        }

        // 取消请求句柄
        const source = axios.CancelToken.source()
        config.cancelToken = source.token
        // 为请求配置添加一个唯一的标识符，例如使用请求的URL
        const requestId = config.url
        pendingRequests[requestId] = source

        return config
      },
      error => {
        // 请求错误
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    http.interceptors.response.use(
      response => {
        // 根据请求的标识符，从存储对象中删除对应的请求
        const requestId = response.config.url
        delete pendingRequests[requestId]

        // 二进制数据
        if (response.config?.responseType == 'blob') {
          return Promise.resolve(response)
        }

        const code = response.status
        // 根据自己的业务代码进行响应拦截
        if ((code >= 200 && code < 300) || code === 304) {
          // 服务器正常响应了
          const res = response.data
          // 成功的事件回调，可以略，可以全局的去做一些业务处理
          // this.emit('Success', res)
          if (res.success || res.errCode == 200 || code === 200) {
            // 临时加之后后端加success
            if ('data' in res && res.data !== null) {
              return Promise.resolve(res)
            } else {
              return Promise.resolve(res)
            }
          } else {
            ElMessage.error(res.message || res.msg)
            return Promise.resolve(false)
          }
        } else {
          // 服务器未正常响应
          console?.error(response)
          // 响应错误逻辑处理 5xx 4xx 等等
          // this.emit('Error', response)
          ElMessage.error(response.data.message || response.data.data || response.statusText)
          return Promise.resolve(false)
        }
      },
      error => {
        const sysStore = useSysStore()
        // 响应错误逻辑处理
        console?.error(error)
        // 接口异常了，全局的去针对业务做一些配置处理，不需要可以去掉
        // this.emit('Error', error)

        // 以下代码还没测试
        const resp = error.response
        if (resp && resp.status === 401) {
          ElMessage.error(error.message ?? '登录超时，请重新登录')
          // sysStore.logout()
          console.log(sysStore, LOGIN_PATH, router)
          // setTimeout(() => {
          //   router.push(LOGIN_PATH)
          // }, 1000)
        } else if (resp && resp.status === 404) {
          ElMessage.error('请求资源不存在')
        } else if (resp && resp.data && resp.data.message) {
          const errmsg = error.response.data.message.slice(0, 100)
          ElMessage.error(errmsg) // 前端暂不展示网络错误
        } else {
          // ElMessage.error(
          //   `您的网络走丢了，请稍后重试... ${resp} 错误码：${resp?.status}`,
          // );
          // 后端和测试不想看到这个错误，我就抛到控制台去
          console?.error(`您的网络走丢了，请稍后重试... ${resp} 错误码：${resp?.status}`)
        }

        // return Promise.reject(error)
        return Promise.resolve(false)
      }
    )
  }

  /**
   * 发送 GET 请求。
   * @param {string} url - 请求的 URL。
   * @param {Object} params - 请求的查询参数。
   * @returns {Promise} 返回一个 Promise 对象，它在请求成功时解析为响应数据。
   */
  get(url, params, conf) {
    const requestId = url
    if (pendingRequests[requestId]) {
      pendingRequests[requestId].cancel(`优化了重复请求 ${requestId}`)
    }
    return http.get(url, { ...conf, params })
  }

  /**
   * 发送 POST 请求。
   * @param {string} url - 请求的 URL。
   * @param {Object} data - 请求的主体数据。
   * @returns {Promise} 返回一个 Promise 对象，它在请求成功时解析为响应数据。
   */
  post(url, data, conf) {
    const requestId = url
    if (pendingRequests[requestId]) {
      pendingRequests[requestId].cancel(`优化了重复请求 ${requestId}`)
    }
    return http.post(url, data, conf)
  }

  /**
   * 发送 DELETE 请求。
   * @param {string} url - 请求的 URL。
   * @param {Object} data - 请求的主体数据。
   * @returns {Promise} 返回一个 Promise 对象，它在请求成功时解析为响应数据。
   */
  delete(url, data, conf) {
    return http.delete(url, { ...conf, data })
  }

  /**
   * 发送 PUT 请求。
   * @param {string} url - 请求的 URL。
   * @param {Object} data - 请求的主体数据。
   * @returns {Promise} 返回一个 Promise 对象，它在请求成功时解析为响应数据。
   */
  put(url, data, conf) {
    return http.put(url, data, conf)
  }

  /**
   * 发送 PATCH 请求。
   * @param {string} url - 请求的 URL。
   * @param {Object} data - 请求的主体数据。
   * @returns {Promise} 返回一个 Promise 对象，它在请求成功时解析为响应数据。
   */
  patch(url, data, conf) {
    return http.patch(url, data, conf)
  }
}

// 创建一个新的Request对象
const request = new Request()

export default request
