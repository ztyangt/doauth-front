<script setup lang="ts">
const config = reactive({
  max: 3
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
