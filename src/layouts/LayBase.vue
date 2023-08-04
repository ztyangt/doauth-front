<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    height: 1500px;
    background-color: antiquewhite;
  }
}
</style>
