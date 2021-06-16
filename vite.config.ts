/*
 * Copyright (c) 2021 fuzzy
 * 项目名称：Vue3-Vite-Demo-TypeScript
 * 文件名称：vite.config.ts
 * 创建日期：2021年06月17日
 * 创建作者：fuzzy
 */

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import {resolve} from 'path'
import {loadEnv} from './src/utils/viteBuild.js'

const {VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH} = loadEnv()

const alias = {
  '/@': resolve('/src'),
  '@': resolve('/src'),
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name: any) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`
        },
        resolveComponent: (name: any) => {
          return `element-plus/lib/${name}`
        },
      }]
    })
  ],
  root: process.cwd(),
  resolve: {alias},
  base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
  },
  server: {
    host: '0.0.0.0',
    port: VITE_PORT,
    open: VITE_OPEN,
    proxy: {
      '/api/v1': {
        target: 'http://leslie.free.vipnps.vip/api/v1',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
  },
})
