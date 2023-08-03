<script setup lang="ts"></script>

<template>
  <el-aside class="sidebar" width="200px">
    <div class="logo curp flex-center my-2 p-2">
      <img src="/favicon.svg" class="mr-1" alt="DoAuth" />
      <span>DoAuth</span>
    </div>

    <el-scrollbar>
      <el-menu :default-openeds="['1', '2']">
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
</template>

<style lang="scss" scoped>
.sidebar {
  @include useTheme {
    background-color: getVal(themeBg);
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
  @include useTheme {
    color: getVal(titleColor);
  }
}
.logo {
  img {
    width: 40px;
    height: 40px;
  }
  span {
    color: #fff;
    font-size: 1.5rem;
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
