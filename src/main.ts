/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：Vue3-Vite-Demo-TypeScript
 * 文件名称：main.ts
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */

import {createApp} from 'vue'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import {router} from "@/router";
import {ElButton} from "element-plus";
import {store} from "@/store";

const app = createApp(App)
app.use(ElButton)
app.use(store).use(router).mount('#app')
