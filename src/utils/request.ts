/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：Vue3-Vite-Demo-TypeScript
 * 文件名称：request.ts
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */

import axios from 'axios'
// @ts-ignore
import {clearSession, getSession} from '@/utils/storage.ts'
import {router} from '@/router'
import {ElMessage, ElMessageBox} from "element-plus";


// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 token
    if (getSession('token')) {
      config.headers.common.Authorization = getSession('token')
    }
    // config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === -1) {
        clearSession() // 清除浏览器全部临时缓存
        router.push('/login') // 去登录页面
        ElMessageBox.alert(res.msg, '提示', {})
          .then(() => {
          })
          .catch(() => {
          })
        return Promise.reject(service.interceptors.response)
      }
      return response.data
    } else {
      return Promise.reject(service.interceptors.response)
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') !== -1) {
      ElMessage.error('网络超时')
    } else if (error.message === 'Network Error') {
      ElMessage.error('网络连接错误')
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText)
      else ElMessage.error('接口路径找不到')
    }
    return Promise.reject(error)
  }
)

// 导出 axios 实例
export default service
