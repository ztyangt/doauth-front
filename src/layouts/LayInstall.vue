<template>
  <div class="install-view wh-100 flex-center p-2">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.install-view {
  min-height: 100vh;
  background-image: linear-gradient(to right top, #6a48e4, #748ff2, #7386f4, #747df5);
  background-size: 400%;
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
