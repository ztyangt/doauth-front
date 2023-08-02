<script setup lang="ts">
import VanillaTilt from 'vanilla-tilt'
const tiltRef = ref()

const login = ref<boolean>(false)

onMounted(() => {
  VanillaTilt.init(tiltRef.value, {
    scale: 1.05
  })
})
</script>

<template>
  <div class="home-view flex-center">
    <div ref="tiltRef" class="main-card">
      <lottie-item class="disib" name="install" width="200px" height="200px" />
      <h1>DoAuth</h1>
      <p class="mt-1">DoAuth域名授权管理系统，保护您的源码安全!</p>

      <div class="flex-center mt-4 px-4">
        <el-button type="success" round class="w-50">授权查询</el-button>
        <el-button type="primary" round class="w-50" @click="login = true">立即使用</el-button>
      </div>
    </div>
  </div>
  <AdminLogin :visible="login" @onClose="login = false" />
</template>

<style lang="scss" scoped>
.main-card {
  width: 90%;
  max-width: 440px;
  color: #fff;
  text-align: center;
  padding: 50px 35px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}
.home-view {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to left bottom,
    #a500a5,
    #9f2eb7,
    #9745c7,
    #8e57d6,
    #8367e3,
    #7c68e2,
    #756ae1,
    #6e6bdf,
    #6a5fd1,
    #6554c3,
    #6148b6,
    #5c3da8
  );
  background-size: 400%;
  animation: bgmove 10s infinite;
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
