<script setup lang="ts">
const props = defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="center">
    <div class="load-container">
      <div class="loader-bounce"></div>
    </div>
    <span v-if="text">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.load-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.loader-bounce {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.loader-bounce::before {
  content: '';
  width: 50px;
  height: 5px;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow 0.5s linear infinite;
  @include useTheme {
    background: getVal(textColor);
  }
}
.loader-bounce::after {
  content: '';
  width: 50px;
  height: 50px;
  background: $theme-color;
  animation: animate 0.5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}
@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {
  0%,
  100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}
</style>
