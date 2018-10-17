import Axios from 'axios'
import Qs from 'qs'
import iView from 'iview'
import apiConfig from '../../config/api.config'
// import bus from '@assets/js/bus.js'

Axios.defaults.withCredentials = true
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/json' // 配置请求头

// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  console.dir(config)
  // bus.$emit('goto', '/login')
  iView.LoadingBar.start()
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
  iView.LoadingBar.finish()
  return response
}, function (error) {
  // 对返回的错误进行一些处理
  console.log(error)
  iView.LoadingBar.error()
  return Promise.reject(error)
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
