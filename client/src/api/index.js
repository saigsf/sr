import Axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
import apiConfig from '../../config/api.config'
import { getCookie } from '@/plugins/util'
import router from '@/router/index'
import { Message } from 'element-ui'
// import promise from 'es6-promise'
// promise.polyfill()

Axios.defaults.withCredentials = false
// Axios.defaults.headers.common['Authorization'] = getCookie('token')
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 配置请求头

Axios.defaults.timeout = 10000

// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  // console.dir(config)
  // 顶部加载进度条启动
  iView.LoadingBar.start()
  // 消息头重写
  config.headers.Authorization = getCookie('token')
  return config
}, function (error) {
  // Do something with request error
  iView.LoadingBar.error()
  return Promise.reject(error)
})

// 添加一个返回拦截器
Axios.interceptors.response.use(function (response) {
  // 对返回的数据进行一些处理，比如说把loading动画关掉
  console.dir(response)
  // 顶部进度条结束
  iView.LoadingBar.finish()
  if (response && response.data) {
    if (response.data.code === 1) {
      return response
    } else if (response.data.code === 0) {
      Message({
        message: response.data.msg,
        type: 'error'
      })
    } else if (response.data.code === 301) {
      Message({
        message: response.data.msg,
        type: 'error'
      })
    } else if (response.data.code === 500) {
      Message({
        message: response.data.msg,
        type: 'error'
      })
    } else {
      return response
    }
  }
}, function (err) {
  console.dir(err)
  // 对返回的错误进行一些处理
  iView.LoadingBar.error()
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '拒绝访问'
        break
      case 403:
        router.replace({ path: '/login' })
        err.message = '未授权，请重新登录'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  Message({
    message: err.message,
    type: 'error'
  })
  return Promise.resolve(err)
})

// 基地址
let base = apiConfig.baseURl // 接口代理地址参见：config/index.js中的proxyTable配置
// let base = 'http://localhost:3000' // 接口代理地址参见：config/index.js中的proxyTable配置

// 通用方法
export const POST = (url, params) => {
  return Axios.post(`${base}${url}`, Qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(res => res.data)
}

export const GET = (url, params) => {
  return Axios.get(`${base}${url}`, { params: params }).then(res => res.data)
}

export const PUT = (url, params) => {
  return Axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return Axios.delete(`${base}${url}`, { params: params }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return Axios.patch(`${base}${url}`, params).then(res => res.data)
}
export const FILEUPLOAD = (url, params) => {
  return Axios.post(`${base}${url}`, params).then(res => res.data)
}
