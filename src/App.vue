<!--
  - Copyright (c) 2021 fuzzy
  - 项目名称：Vue3-Vite-Demo-TypeScript
  - 文件名称：App.vue
  - 创建日期：2021年06月17日
  - 创建作者：fuzzy
  -->

<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
