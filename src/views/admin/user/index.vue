<script setup lang="ts">
import { useHelper } from '@/utils/helper'

const userList = ref<Auth.User[]>([])

const methods = {
  initData: async () => {
    const res = await useUserApi.all(1, 200, 'level != 1')
    res.code === 200 && (userList.value = res.data.data)
  }
}

methods.initData()
</script>

<template>
  <div class="user-list-wrapper">
    <el-table
      :data="userList"
      class="w-100"
      max-height="calc(100vh - 145px)"
      empty-text="loading..."
    >
      <el-table-column fixed type="selection" width="45" />
      <el-table-column fixed type="index" label="序号" width="60" />
      <el-table-column prop="nickname" label="昵称" width="100" show-overflow-tooltip />
      <el-table-column prop="account" label="账号" width="120" show-overflow-tooltip />
      <el-table-column class-name="avatar-item" prop="state" label="头像" width="60">
        <template #default="scope">
          <img :src="scope.row.avatar" class="avatar br" />
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200" show-overflow-tooltip />
      <el-table-column class-name="gender-item " label="性别" width="60">
        <template #default="scope">
          <span class="cus-span" v-if="scope.row.gender === 0">密</span>
          <span class="male cus-span" v-if="scope.row.gender === 1">男</span>
          <span class="female cus-span" v-if="scope.row.gender === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-item" prop="status" width="60" label="状态">
        <template #default="scope">
          <span class="danger cus-span" v-if="scope.row.status === 0">禁用</span>
          <span class="success cus-span" v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" min-width="200" label="描述" show-overflow-tooltip />

      <el-table-column prop="login_time" sortable label="上次登录" width="150">
        <template #default="scope">
          <span>{{ useHelper.time.to.date(scope.row.login_time, 'date') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" sortable width="150" label="注册时间">
        <template #default="scope">
          <span>{{ useHelper.time.to.date(scope.row.create_time, 'date') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.user-list-wrapper {
  @include useTheme {
    background-color: getVal(pureColor);
  }

  .cus-span {
    font-size: 12px;
    height: 1.2rem;
    display: inline-block;
    text-align: center;
    line-height: 1.2rem;
    border-radius: 3px;
  }
  .admin-item {
    .admin {
      color: $theme-color;
    }
  }
  .status-item {
    span {
      width: 2rem;
    }
    .success {
      color: $base-success;
      background-color: rgba($base-success, 0.1);
    }
    .danger {
      color: $base-danger;
      background-color: rgba($base-danger, 0.1);
    }
  }

  .gender-item {
    span {
      width: 1.2rem;
      color: #fff;
      background-color: rgba($theme-color, 0.7);
    }
    .male {
      background-color: #0091ff !important;
      color: #fff;
    }
    .female {
      background-color: #ff4d94 !important;
      color: #fff;
    }
  }

  .avatar-item {
    img {
      height: 2rem;
      width: 2rem;
    }
  }
}
</style>
