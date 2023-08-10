<script setup lang="ts">
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { user } = storeToRefs(adminStore)
</script>

<template>
  <el-card class="box-card cus-box-card flex-center pr" shadow="hover">
    <el-skeleton animated :throttle="200" :loading="user === null">
      <template #template>
        <AdminSign />
      </template>
      <template #default>
        <div class="logo flex-center br-50 overhide">
          <img
            class="wh-100 br-50"
            :src="user.avatar ? user.avatar : '/assets/images/avatar.svg'"
            :alt="user.nickname"
          />
        </div>
        <h2 class="my-2">
          欢迎您，
          <span>{{ user.nickname }}</span>
        </h2>
        <p style="white-space: pre-wrap">
          {{ user.description ? user.description : '欢迎使用DoAuth域名授权管理系统！' }}
        </p>

        <div class="user-tag">
          <span class="adminuser" v-if="user.level === 1">管理员</span>
          <span class="gender male ml-1 br disib" v-if="user.gender === 1">
            <Icon name="mars" size="10px" />
          </span>
          <span class="gender female ml-1 br disib" v-if="user.gender === 2">
            <Icon name="venus" size="10px" />
          </span>
        </div>
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
.user-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 12px;

  .adminuser {
    background-color: #fa4064;
    padding: 2px 8px;
    border-radius: 3px;
    color: #fff;
    height: 20px;
    line-height: 20px;
  }
  .gender {
    border-radius: 3px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    color: #fff;
  }
  .female {
    background-color: #ff4d94;
  }
  .male {
    background-color: #0091ff;
  }
}
</style>
