<script setup lang="ts">
const config = reactive({
  max: 3
})

onBeforeMount(() => {
  // store初始化
  initStore()
})

onMounted(() => {})
</script>

<template>
  <el-config-provider :message="config"> </el-config-provider>
  <router-view />
</template>

<style lang="scss">
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
.hovc {
  &:hover {
    color: $theme-color;
  }
}
#nprogress .bar {
  background-color: $theme-color !important;
}
</style>
