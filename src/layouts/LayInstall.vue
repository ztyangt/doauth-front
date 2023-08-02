<template>
  <div class="install-view wh-100 flex-center p-2">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.install-view {
  background-color: red;
  min-height: 100vh;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #919be5,
    #879de9,
    #7c9eec,
    #7797ef,
    #748ff2,
    #7386f4,
    #747df5
  );
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
