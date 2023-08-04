<script setup lang="ts">
const adminStore = useAdminStore()
const siteStore = useSiteStore()

const methods = {
  /**
   * 折叠菜单
   */
  handleCollapse: () => {
    siteStore.sideCollapse = !siteStore.sideCollapse
  },

  /**
   * 全屏切换
   */
  toggleScreen: () => {
    toggleFullscreen()
  }
}
</script>

<template>
  <div class="toolbar wh-100 flex-yc flex-sb">
    <div class="side-btn curp">
      <Icon name="indent" class="trf hovc" @click="methods.handleCollapse" />
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
      <el-dropdown>
        <el-avatar
          v-if="adminStore.login"
          class="avatar curp"
          :size="25"
          :src="adminStore.login.user.avatar"
        />

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <Icon name="user3" class="mr-1" />
              <span>个人设置</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <Icon name="lock" class="mr-1" />
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
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
  .avatar {
    outline: unset;
  }
}
</style>
