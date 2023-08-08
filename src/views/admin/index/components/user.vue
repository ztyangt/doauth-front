<script setup lang="ts">
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { login } = storeToRefs(adminStore)
</script>

<template>
  <el-card class="box-card cus-box-card flex-center pr" shadow="hover">
    <el-skeleton animated :throttle="200" :loading="login === null">
      <template #template>
        <AdminSign />
      </template>
      <template v-if="login" #default>
        <div class="logo flex-center br-50 overhide">
          <img
            class="wh-100 br-50"
            :src="login.user.avatar ? login.user.avatar : '/assets/images/avatar.svg'"
            :alt="login.user.nickname"
          />
        </div>
        <h2 class="my-2">
          欢迎您，

          <span>{{ login.user.nickname }}</span>
        </h2>
        <p style="white-space: pre-wrap">
          {{ login.user.description ? login.user.description : '欢迎使用DoAuth域名授权管理系统！' }}
        </p>

        <span class="adminuser" v-if="login.user.level === 1">管理员</span>
      </template>
    </el-skeleton>
  </el-card>
</template>

<style lang="scss" scoped>
.logo {
  img {
    width: 80px;
    height: 80px;
  }
}
h2 {
  font-size: 1rem;
}
.adminuser {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 12px;
  background-color: #fa4064;
  padding: 2px 8px;
  border-radius: 3px;
  color: #fff;
}
</style>
