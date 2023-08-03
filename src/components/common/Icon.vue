<template>
  <i
    class="iconfont"
    :class="'icon-' + name"
    :style="{
      color: color,
      'font-size': size
    }"
  ></i>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  size?: string
  color?: string
}>()
</script>
