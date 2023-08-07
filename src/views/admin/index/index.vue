<script setup lang="ts">
const getConfig = async () => {
  const res = await useConfigApi.list()
  console.log('res: ', res)
}
</script>

<template>
  <div class="admin-index-wrapper">
    <sign />
    <el-button type="primary" @click="getConfig">获取配置列表</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
