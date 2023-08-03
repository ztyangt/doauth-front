<template>
  <div class="install-view wh-100 flex-center p-2">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.install-view {
  min-height: 100vh;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8f98e5,
    #8196e8,
    #7194ec,
    #6684ee,
    #6272ed,
    #635fea,
    #6a48e4
  );
  background-size: 300%;
  animation: bgmove 20s infinite;
}

@keyframes bgmove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
