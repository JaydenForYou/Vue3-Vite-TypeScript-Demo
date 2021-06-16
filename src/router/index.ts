/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：vue3-vite-demo
 * 文件名称：index.ts
 * 创建日期：2021年06月16日
 * 创建作者：fuzzy
 */

import {createRouter, createWebHashHistory, Router} from 'vue-router'
// @ts-ignore
import {getSession} from '@/utils/storage.ts'
import {store} from "@/store"

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes: any = [
  {
    path: '/',
    name: "index",
    component: () => import('@/components/HelloWorld.vue'),
    meta: {
      isLogin: false
    }
  }
]

export const router: Router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

// 登录状态保持和限制
router.beforeEach((to, from, next) => {
  const isLogin = getSession("token")
  if (isLogin && store.state.isLogin) {
    next()
  } else {
    if (to.meta.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})
