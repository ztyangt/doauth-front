<script setup lang="ts">
import { useInstallApi } from '@/api/install'

const methods = {
  test: async () => {
    const res = await useInstallApi.check()
    console.log(res)
  }
}
</script>

<template>
  <div>
    <el-button type="primary" @click="methods.test">测试</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
