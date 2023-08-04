<script setup lang="ts">
const siteStore = useSiteStore()
const asideWidth = computed(() => {
  return !siteStore.sideCollapse ? '200px' : '60px'
})
const asideLeft = computed(() => {
  return siteStore.asideLeft ? '0' : '-200px'
})
</script>

<template>
  <el-aside class="sidebar trf">
    <RouterLink to="/" class="logo curp flex-center my-2 pt-2 pb-4">
      <img src="/favicon.svg" alt="DoAuth" />
      <span v-show="!siteStore.sideCollapse" class="ml-1 trf">DoAuth</span>
    </RouterLink>

    <el-scrollbar view-class="scroll-wrapper">
      <el-menu :collapse="siteStore.sideCollapse" :default-openeds="['1', '2']">
        <el-menu-item index="1">
          <Icon name="home" class="mr-1" />
          <span> 首页</span>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <Icon name="vimeosquare" class="mr-1" />
            <span>授权管理</span>
          </template>
          <el-menu-item index="2-1">
            <Icon name="plussquareo" class="mr-1" />
            <span>新增授权</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <Icon name="sliders1" class="mr-1" />
            <span>授权列表</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <Icon name="minussquareo" class="mr-1" />
            <span>授权策略</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <Icon name="delicious" class="mr-1" />
            <span> 软件管理</span>
          </template>
          <el-menu-item index="3-1">
            <Icon name="plussquareo" class="mr-1" />
            <span>新增软件</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <Icon name="gg1" class="mr-1" />
            <span>软件列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="4">
          <Icon name="crosshairs" class="mr-1" />
          <span>盗版追踪</span>
        </el-menu-item>

        <el-sub-menu index="5">
          <template #title>
            <Icon name="cog1" class="mr-1" />
            <span>系统设置</span>
          </template>
          <el-menu-item index="5-1">
            <Icon name="user3" class="mr-1" />
            <span>个人设置</span>
          </el-menu-item>
          <el-menu-item index="5-2">
            <Icon name="cogs1" class="mr-1" />
            <span>网站设置</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="6">
          <Icon name="questioncircle" class="mr-1" />
          <span>使用帮助</span>
        </el-menu-item>
        <el-menu-item index="7">
          <Icon name="refresh1" class="mr-1" />
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
  <div class="overlay" v-show="siteStore.asideLeft" @click="siteStore.asideLeft = false"></div>
</template>

<style lang="scss" scoped>
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
  display: flex;
  flex-direction: column;
  width: v-bind(asideWidth);
  z-index: 99;
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
}
.el-menu-item,
:deep(.el-sub-menu__title) {
  color: #fff;
  &:hover {
    background-color: $theme-color;
  }
}
.logo {
  flex-shrink: 0;
  @include useTheme {
    border-bottom: 1px solid rgba(#fff, 0.5);
  }

  img {
    width: 40px;
    height: 40px;
  }
  span {
    color: #fff;
    font-size: 1.6rem;
    display: inline-block;
    height: 40px;
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
