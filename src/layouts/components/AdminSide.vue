<script setup lang="ts">
import { adminRoutes } from '@/router/admin'

const siteStore = useSiteStore()
const adminStore = useAdminStore()
const nowRoute = useRoute()

const asideWidth = computed(() => {
  return !siteStore.sideCollapse ? '200px' : '60px'
})

const asideLeft = computed(() => {
  return siteStore.asideLeft ? '0' : '-200px'
})

// 默认展开菜单
const openeds = computed(() => {
  const result = nowRoute.matched[1].name
  if (result) return [result as string]
  else return ['admin-auth']
})
</script>

<template>
  <el-aside class="sidebar trf">
    <div class="logo flex-center my-2 pt-2 pb-4">
      <img
        v-if="siteStore.siteConfig"
        :src="siteStore.siteConfig?.logo"
        :alt="siteStore.siteConfig?.site_name"
      />
      <span v-show="!siteStore.sideCollapse" class="ml-1 trf">{{
        siteStore.siteConfig?.site_name
      }}</span>
    </div>

    <el-scrollbar view-class="scroll-wrapper">
      <el-menu :collapse="siteStore.sideCollapse" :default-openeds="openeds" router>
        <template v-for="(route, index) in adminRoutes.children" :key="index">
          <el-sub-menu
            v-if="route.children && !(route.meta.admin && adminStore.user?.level !== 1)"
            :index="route.name"
            :class="{ expand: nowRoute.matched[1].name === route.name }"
          >
            <template #title>
              <Icon :name="`${route.meta.icon}`" class="mr-1" />
              <span>{{ route.meta.title }}</span>
            </template>

            <template v-for="(subRoute, subindex) in route.children" :key="subindex">
              <el-menu-item
                v-if="!(subRoute.meta.admin && adminStore.user?.level !== 1)"
                :class="{ 'route-is-active': nowRoute.name === subRoute.name }"
                :index="`${adminRoutes.path}/${route.path}/${subRoute.path}`"
              >
                <Icon :name="`${subRoute.meta.icon}`" class="mr-1" />
                <span>{{ subRoute.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>

          <template v-else>
            <el-menu-item
              v-if="!(route.meta.admin && adminStore.user?.level !== 1)"
              class="top-menu"
              :class="{ 'route-is-active': nowRoute.name === route.name }"
              :index="`${adminRoutes.path}/${route.path}`"
            >
              <Icon :name="`${route.meta.icon}`" class="mr-1" />
              <span>{{ route.meta.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
  <div class="overlay" v-show="siteStore.asideLeft" @click="siteStore.asideLeft = false"></div>
</template>

<style lang="scss" scoped>
.scroll-wrapper {
  height: 100px;
}
.overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(5px);
  z-index: 9;
  @include useTheme {
    background-color: rgba(getVal(pureColor), 40%);
  }
}
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: v-bind(asideWidth);
  @include useTheme {
    background-color: getVal(themeBg);
  }
  @include respond-to('xs') {
    width: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px;

    left: v-bind(asideLeft);
  }
}
.el-menu {
  border: unset;
  @include useTheme {
    --el-menu-bg-color: getVal(themeBg);
  }
  .el-sub-menu .route-is-active,
  .top-menu.route-is-active {
    color: #fff;
    background-color: adjust-hue($theme-color, 10);
  }
  .el-sub-menu.expand {
    @include useTheme {
      background-color: getVal(themeBg1);
    }
  }
}
.el-menu-item,
:deep(.el-sub-menu__title) {
  color: #fff;
  &:hover {
    background-color: $theme-color;
  }
}
.logo {
  height: 90px;
  flex-shrink: 0;
  @include useTheme {
    border-bottom: 1px solid rgba(#fff, 0.3);
  }

  img {
    width: 40px;
    height: 40px;
  }
  span {
    color: #fff;
    font-size: 1.5rem;
    display: inline-block;
    line-height: 40px;
    padding-top: 2px;
    font-family: webfont_9y7Fpx5jLQvb_400, '阿里妈妈灵动体 VF Thin', webfont-notdef;
    --wght: 700;
    --wdth: 88.41;
    --slnt: 4.48;
    --SRIF: 0.3;
    font-variation-settings:
      'wght' var(--wght),
      'wdth' var(--wdth),
      'slnt' var(--slnt),
      'SRIF' var(--SRIF);
  }
}
</style>
