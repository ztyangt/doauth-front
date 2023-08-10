<script setup lang="ts">
import { useHelper } from '@/utils/helper'
import { enterFullscreen, exitFullscreen } from '@/utils/screen'

const userList = ref<Auth.User[]>([])
const state = reactive({
  page: 1,
  count: 0,
  limit: 15,
  page_count: 0,
  loading: true,
  show_dialog: false,
  is_screen: false
})

const userForm = reactive({
  account: '',
  nickname: '',
  email: '',
  gender: 0,
  avatar: '',
  description: ''
})

const maxHeight = computed(() => {
  return state.is_screen ? 'calc(100vh - 120px)' : 'calc(100vh - 265px)'
})

const methods = {
  /**
   * 获取数据
   */
  getData: async () => {
    state.loading = true
    const res = await useUserApi.all(state.page, state.limit, 'level != 1')
    if (res.code === 200) {
      userList.value = res.data.data
      state.count = res.data.count
      state.page_count = res.data.page
    }
    state.loading = false
  },

  /**
   * 上传文件
   */
  handleUpload: () => {
    const uploadRef = document.querySelector('#uploadRef') as HTMLInputElement
    uploadRef.click()
  },

  toggleScreen: () => {
    state.is_screen = !state.is_screen
    if (state.is_screen) {
      enterFullscreen()
    } else {
      exitFullscreen()
    }
    // toggleFullscreen()
  },

  handleEdit: (e) => {
    state.show_dialog = true
    console.log('e: ', e)
  },
  handleDisable: (e) => {
    console.log('e: ', e)
  },
  handleDelete: (e) => {
    console.log('e: ', e)
  }
}

methods.getData()
</script>

<template>
  <div class="user-list-wrapper p-2 br" :class="{ fullscreen: state.is_screen }">
    <div class="flex-sb mb-2">
      <div>
        <el-button type="primary"> <Icon name="plus" size="14px" class="mr-1" />新建 </el-button>
        <el-button type="danger"> <Icon name="trash1" size="14px" class="mr-1" />删除 </el-button>
        <el-button type="warning" plain>
          <Icon name="recycle1" size="14px" class="mr-1" />回收站
        </el-button>
      </div>
      <div>
        <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
          <Icon name="refresh" class="curp mr-2" @click="methods.getData" />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
          <Icon name="arrowsalt" class="curp" @click="methods.toggleScreen" />
        </el-tooltip>
      </div>
    </div>
    <div class="table-wrapper pr">
      <el-table :data="userList" empty-text="" class="w-100" :max-height="maxHeight">
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
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <div class="flex-center">
              <el-button size="small" type="primary" plain @click="methods.handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button
                size="small"
                type="warning"
                plain
                @click="methods.handleDisable(scope.row)"
              >
                禁用
              </el-button>
              <el-button size="small" type="danger" plain @click="methods.handleDelete(scope.row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="overlay trf flex-center" :class="{ hide: !state.loading }">
        <Loading text="加载数据中..." />
      </div>
    </div>

    <el-pagination
      class="flex-end mt-2"
      background
      v-model:current-page="state.page"
      v-model:page-size="state.limit"
      :page-sizes="[15, 20, 30, 50]"
      :pager-count="5"
      small
      layout="total, sizes, prev,slot, pager, next, jumper"
      :total="state.count"
      @size-change="methods.getData"
      @current-change="methods.getData"
    >
      <div class="page-slot">
        <span class="current-page">{{ state.page }}</span> / <span>{{ state.page_count }}</span>
      </div>
    </el-pagination>

    <el-dialog v-model="state.show_dialog" title="编辑用户信息">
      <el-form :model="userForm">
        <el-form-item label="账号">
          <el-input v-model="userForm.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userForm.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="保密" :value="0" />
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-input type="text" v-model="userForm.avatar" placeholder="请输入图片url或上传">
            <template #append>
              <Icon @click="methods.handleUpload" name="upload2"></Icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="userForm.description"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 12 }"
            placeholder="个性描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.show_dialog = false">取消</el-button>
          <el-button type="primary" @click="state.show_dialog = false"> 确认 </el-button>
        </span>
      </template>

      <UploadFile v-show="false" :accept="'image/*'" @upload="userForm.avatar = $event">
        <el-button type="primary" id="uploadRef">点击上传</el-button>
      </UploadFile>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.user-list-wrapper {
  @include useTheme {
    background-color: getVal(pureColor);
  }

  .el-pager {
    @include respond-to('xs') {
      display: none;
    }
  }
  .page-slot {
    display: none;
    @include respond-to('xs') {
      display: block;
    }
    span {
      font-size: 12px;
    }
    .current-page {
      color: $theme-color;
    }
  }

  .overlay {
    position: absolute;
    inset: 0;
    z-index: 99;
    @include useTheme {
      background-color: rgba(getVal(pureColor), 0.8);
    }
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
