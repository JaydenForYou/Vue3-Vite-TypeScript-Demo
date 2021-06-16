/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：Vue3-Vite-Demo-TypeScript
 * 文件名称：index.ts
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */
import {createStore, Store} from "vuex"

export const store: Store<any> = createStore({
  state: {
    isLogin: false
  },
  getters: {
    isLogin: (state: any) => state.isLogin
  },
  mutations: {
    setLogin(state: any, payload: boolean) {
      state.isLogin = payload
    }
  },
  actions: {
    setLoginStatus({commit}: any, flag: boolean) {
      commit("setLogin", flag)
    }
  }
})
