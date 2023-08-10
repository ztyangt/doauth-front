<script setup lang="ts">
import { useDark } from '@vueuse/core'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const config = reactive({
  max: 3
})

useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

onBeforeMount(async () => {
  // store初始化
  initStore()
  // 移除开屏动画
  // document.querySelector('#load-container').classList.add('hide')
  // document.querySelector('#app')?.classList.remove('hide')
})

onMounted(() => {})
</script>

<template>
  <el-config-provider :message="config" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
.hovc {
  &:hover {
    color: $theme-color !important;
  }
}
#nprogress .bar {
  background-color: $theme-color !important;
}
</style>
