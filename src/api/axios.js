import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import { Toast } from 'vant'

Vue.use(Toast)

// 响应时间
axios.defaults.timeout = 100000
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 配置接口地址
axios.defaults.baseURL = process.env.VUE_APP_API

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data)
  }
  let token = localStorage.getItem('token')
  if (token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = token
  }
  // config.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEwMDAsImx0IjoidmVyaWZ5Y29kZSIsImxkIjoiYXBwIiwiY3QiOiJhcHAiLCJydCI6IjAwMDAwIiwiaWF0IjoxNTU3ODg2NjgxLCJleHAiOjE4NTU0NDE0NDk4NzQ4MSwidHRsIjoiMTg1NTQyNTg3MTAwODAwMDAwIn0.1JPP2kN-S7O-9eYa4Y2Coso1JsUhUK47x7F_pShILCk'
  return config
}, (error) => {
  Toast('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (res.status !== 200) {
    Toast('系统异常')
    return Promise.reject(res)
  } else if (res.data.code !== 0) {
    let info = '系统异常'
    switch (res.data.code) {
      case 10000:
        window.history.replaceState(null, null, "/home")
        router.push('/login')
        info = '您登录信息已过期'
        break;
      case 10001:
        window.history.replaceState(null, null, "/home")
        router.push('/login')
        info = '您登录信息已过期'
        break;
      case 11000:
        return Promise.resolve(res)
    }
    if (res.data.msg) {
      info = res.data.msg
    }
    Toast(info)
    return Promise.reject(res)
  }
  return Promise.resolve(res)
}, (error) => {
  Toast('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
