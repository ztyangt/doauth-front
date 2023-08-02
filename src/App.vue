<script setup lang="ts">
import { useHelper } from '@/utils/helper'

const config = reactive({
  max: 3
})

onBeforeMount(() => {
  const theme = useHelper.get.cookie('theme')
  console.log('theme: ', theme)
})
</script>

<template>
  <el-config-provider :message="config"> </el-config-provider>
  <RouterView />
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
