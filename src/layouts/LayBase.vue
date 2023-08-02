<script setup lang="ts"></script>

<template>
  <!-- <div class="home-wrapper">
    <IndexHeader />
    <main><router-view></router-view></main>
    <IndexFooter />
  </div> -->
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
