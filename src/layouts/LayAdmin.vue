<template>
  <el-container class="layout-admin">
    <AdminSide />

    <el-container>
      <el-header>
        <AdminHeader />
      </el-header>

      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
