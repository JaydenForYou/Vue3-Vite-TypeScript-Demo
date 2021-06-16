import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import {router} from "@/router";

const app = createApp(App)

app.use(router).mount('#app')
