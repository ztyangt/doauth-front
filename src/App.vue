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
  <RouterView />
</template>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.hovc {
  &:hover {
    color: $theme-color;
  }
}
</style>
