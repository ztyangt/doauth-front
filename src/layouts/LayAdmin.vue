<template>
  <el-container class="layout-admin">
    <AdminSide />

    <el-container>
      <el-header>
        <AdminHeader />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-admin {
  min-height: 100vh;
  @include useTheme {
    background-color: getVal(bgColor);
  }

  .el-header {
    @include useTheme {
      background-color: getVal(pureColor);
    }
  }
}
</style>
