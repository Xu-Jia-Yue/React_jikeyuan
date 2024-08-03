import axios from 'axios'
import { getLocalToken } from './token'
// 自定义创建axios实例
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 1000,
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 把 token 添加到请求头
    const token = getLocalToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    // 发送请求出现错误回调
    return Promise.reject(err)
  }
)

// 添加相应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应前回调
    return response.data
  },
  (err) => {
    // 响应出错回调
    return Promise.reject(err)
  }
)

export default request
