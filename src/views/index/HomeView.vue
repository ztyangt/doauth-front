<script setup lang="ts"></script>

<template>
  <div>
    <lottie-item name="vip" width="120px" height="120px" />
  </div>
  <RouterLink to="/install">安装</RouterLink>
  <el-button type="primary">哈哈</el-button>
  <div class="test"></div>
</template>

<style lang="scss" scoped>
.test {
  width: 50px;
  height: 50px;
  @include useTheme {
    color: getVal(textColor);
    background-color: rgba($color: getVal(pureColor), $alpha: 0.8);
  }
}
</style>
