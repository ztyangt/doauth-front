<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'

const siteStore = useSiteStore()
const router = useRouter()
const route = useRoute()

const methods = {
  removeTab: (e: string) => {
    const tabIndex = siteStore.tabRoute.findIndex((item) => item.name === e)
    siteStore.tabRoute.splice(tabIndex, 1)
    if (route.name === e) {
      router.push({ name: siteStore.tabRoute[tabIndex - 1].name })
    }
  },
  clickTab: (e: TabsPaneContext) => {
    router.push({ name: String(e.paneName) })
  }
}
</script>

<template>
  <el-tabs
    v-if="siteStore.curentRoute"
    v-auto-animate
    type="card"
    class="demo-tabs"
    v-model="siteStore.curentRoute"
    @tab-click="methods.clickTab"
    @tab-remove="methods.removeTab"
  >
    <el-tab-pane
      :closable="item.name !== 'admin-index'"
      v-for="item in siteStore.tabRoute"
      :key="item.name"
      :name="item.name"
    >
      <template #label>
        <Icon :name="item.icon" class="mr-1" />
        <span>{{ item.title }}</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__nav),
:deep(.el-tabs__item) {
  border: unset !important;
  @include useTheme {
    color: getVal(textColor);
  }
}
:deep(.el-tabs__item) {
  padding: 0 20px !important;
}
:deep(.el-tabs__header) {
  margin: 0 !important;
  height: 40px;
  line-height: 40px;
}
:deep(.el-tabs__item.route-is-active) {
  background-color: rgba($theme-color, 0.2);
  padding: 0 30px 0 30px;
  -webkit-mask: url('/assets/images/tabmask.png');
  mask: url('/assets/images/tabmask.png');
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
.el-tabs {
  @include useTheme {
    border-top: 1px solid rgba(getVal(keyColor), 5%);
  }
}
</style>
