<script setup lang="ts">
const adminStore = useAdminStore()
const siteStore = useSiteStore()
const router = useRouter()
const route = useRoute()

const breadList = computed(() => {
  return route.matched.filter((item) => item.name)
})

const methods = {
  /**
   * 折叠菜单
   */
  handleCollapse: () => {
    siteStore.sideCollapse = !siteStore.sideCollapse
  },

  /**
   * 移动端侧栏
   */
  leftAside: () => {
    siteStore.asideLeft = !siteStore.asideLeft
    siteStore.sideCollapse = false
  },

  /**
   * 全屏切换
   */
  toggleScreen: () => {
    toggleFullscreen()
  },

  /**
   * 下拉菜单命令
   */
  handleCommand: (command: string | number | object) => {
    if (command === 'logout') {
      ElMessageBox.confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        autofocus: false
      })
        .then(() => {
          router.push('/')
          adminStore.clear()
          ElMessage({
            type: 'success',
            message: '退出登录'
          })
        })
        .catch(() => {})
    }

    if (command === 'goHome') {
      router.push('/')
    }
    if (command === 'userConfig') {
      router.push({ name: 'admin-config-user' })
    }
  }
}
</script>

<template>
  <div v-if="adminStore.login" class="toolbar wh-100 flex-yc flex-sb">
    <div class="header-left flex">
      <div class="side-btn curp">
        <Icon name="indent" class="trf hovc collbtn" @click="methods.handleCollapse" />
        <Icon name="indent" class="trf hovc leftbtn" @click="methods.leftAside" />
      </div>

      <div class="ml-3 flex-yc">
        <Icon name="mapmarker" class="mr-1" />
        <el-breadcrumb class="bread-menu-wrapper" separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
            <el-dropdown v-if="item.children.length">
              <span style="outline: unset" class="curp">{{ item.meta?.title }}</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="(route, subIndex) in item.children" :key="subIndex">
                    <Icon :name="`${route.meta?.icon}`" />
                    <span @click="router.push(route.path)">{{ route.meta?.title }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span v-else>{{ item.meta?.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="flex-yc">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="siteStore.theme === 'light' ? '夜间模式' : '日间模式'"
        placement="bottom"
      >
        <Icon
          class="mr-2 curp trf hovc"
          size="18px"
          @click="siteStore.changeTheme"
          :name="siteStore.theme === 'light' ? 'moono' : 'certificate'"
        />
      </el-tooltip>

      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <Icon class="mr-2 curp trf hovc" name="arrowsalt" @click="methods.toggleScreen" />
      </el-tooltip>

      <el-dropdown @command="methods.handleCommand">
        <el-avatar
          v-if="adminStore.login"
          class="avatar curp"
          :size="25"
          :src="
            adminStore.login.user.avatar
              ? adminStore.login.user.avatar
              : '/assets/images/avatar.svg'
          "
        />

        <template #dropdown>
          <el-dropdown-menu>
            <div class="px-2">
              <h3>{{ adminStore.login.user.nickname }}</h3>
              <span class="mt-1">{{ adminStore.login.user.account }}</span>
            </div>

            <el-dropdown-item divided command="userConfig">
              <Icon name="user3" class="mr-1" />
              <span>个人设置</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <Icon name="lock" class="mr-1" />
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item command="goHome">
              <Icon name="home" class="mr-1" />
              <span>回到前台</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <Icon name="signout" class="mr-1" />
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar {
  @include useTheme {
    color: getVal(textColor);
  }

  .avatar {
    outline: unset;
  }

  .collbtn {
    @include respond-to('xs') {
      display: none;
    }
  }
  .leftbtn {
    display: none;
    @include respond-to('xs') {
      display: block;
    }
  }
}
</style>
