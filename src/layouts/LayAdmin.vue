<script lang="ts" setup>
const siteStore = useSiteStore()
const route = useRoute()

watch(
  route,
  (val) => {
    const hasRoute = siteStore.tabRoute.find((item) => item.name === val.name)
    const routeData = {
      name: String(val.name),
      title: String(val.meta?.title),
      path: String(val.path),
      icon: String(val.meta?.icon)
    }
    if (!hasRoute) {
      siteStore.$patch((state) => {
        state.tabRoute.push(routeData)
      })
    }
    siteStore.curentRoute = val.name as string
  },
  { immediate: true }
)
</script>

<template>
  <el-container class="layout-admin">
    <AdminSide />

    <el-container>
      <el-header>
        <AdminHeader />
      </el-header>
      <AdminTabRoute />
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

  .el-main {
    @include respond-to('phone') {
      --el-main-padding: 10px;
    }
  }

  .el-header,
  .el-tabs {
    @include useTheme {
      background-color: getVal(pureColor);
    }
  }
}
</style>
