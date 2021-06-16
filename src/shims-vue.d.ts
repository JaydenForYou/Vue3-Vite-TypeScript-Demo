/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：Vue3-Vite-TypeScript-Demo
 * 文件名称：shims-vue.d.ts
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
