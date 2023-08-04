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

<script lang="ts" setup>
import { ref } from 'vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles'
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
const router = useRouter()

const logOut = () => {
  useAdminStore().clear()
  router.replace('/')
}
</script>

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
