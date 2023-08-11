<script setup lang="ts">
import { useHelper } from '@/utils/helper'
import { enterFullscreen, exitFullscreen } from '@/utils/screen'

const userList = ref<Auth.User[]>([])
const state = reactive({
  page: 1,
  count: 0,
  limit: 15,
  page_count: 0,
  loading: 0,
  loading_index: -1,
  show_dialog: false,
  is_screen: false,
  eidt_index: 0, // 编辑用户索引
  select_list: [] as number[], // 批量选中
  create_user: false,
  only_trashed: false
})

const newUser = reactive({
  account: '',
  email: '',
  nickname: '',
  password: '',
  gender: 0,
  avatar: '',
  description: ''
})

const formModel = computed(() => {
  return state.create_user ? newUser : userList.value[state.eidt_index]
})

const maxHeight = computed(() => {
  return state.is_screen ? 'calc(100vh - 120px)' : 'calc(100vh - 265px)'
})

const methods = {
  /**
   * 获取数据
   */
  getData: async () => {
    state.loading = 1
    const res = await useUserApi.all(state.page, state.limit, 'level != 1', state.only_trashed)
    if (res.code === 200) {
      userList.value = res.data.data
      state.count = res.data.count
      state.page_count = res.data.page
    }
    if (res.code === 204) {
      userList.value = []
    }
    state.loading = 0
  },

  /**
   * 获取回收站数据
   */
  getTrash: () => {
    state.only_trashed = !state.only_trashed
    methods.getData()
  },

  /**
   * 上传头像
   */
  handleUpload: () => {
    const uploadRef = document.querySelector('#uploadRef') as HTMLInputElement
    uploadRef.click()
  },

  /**
   * 表格全屏
   */
  toggleScreen: () => {
    state.is_screen = !state.is_screen
    if (state.is_screen) {
      enterFullscreen()
    } else {
      exitFullscreen()
    }
  },

  /**
   * 更新用户信息
   */
  updateUser: async () => {
    state.loading = 2
    // const res = await useUserApi.update.apply(null, Object.values(userForm))
    const res = await useUserApi.update(
      userList.value[state.eidt_index].id,
      userList.value[state.eidt_index].account,
      userList.value[state.eidt_index].nickname,
      userList.value[state.eidt_index].email,
      userList.value[state.eidt_index].gender,
      userList.value[state.eidt_index].avatar,
      userList.value[state.eidt_index].description
    )
    netMessage(res)
    state.show_dialog = false
    state.loading = 0
  },

  /**
   * 批量选中
   */
  handleSelect: (e: Auth.User[]) => {
    state.select_list = e.map((item) => item.id)
  },

  /**
   * 编辑用户
   * @param index 编辑用户索引
   */
  handleEdit: (index: number) => {
    state.create_user = false
    state.eidt_index = index
    state.show_dialog = true
  },

  handleAdd: () => {
    state.create_user = true
    state.show_dialog = true
  },

  /**
   * 创建用户
   */
  handleCreate: async () => {
    state.loading = 2
    const res = await useUserApi.create(
      newUser.account,
      newUser.nickname,
      newUser.email,
      newUser.password,
      newUser.gender,
      newUser.avatar,
      newUser.description
    )
    netMessage(res)
    state.loading = 0
    if (res.code === 200) {
      userList.value.unshift(res.data)
      state.show_dialog = false
    }
  },

  handleSave: () => {
    if (state.create_user) {
      methods.handleCreate()
    } else {
      methods.updateUser()
    }
  },

  handleRemove: async (ids: number[]) => {
    const res = state.only_trashed ? await useUserApi.delete(ids) : await useUserApi.remove(ids)
    userList.value = userList.value.filter((item) => !res.data.ids.includes(item.id))
    netMessage(res)
  },

  /**
   * 禁用账户
   */
  handleDisable: async (index: number) => {
    state.loading_index = index
    const status = userList.value[index].status === 1 ? 0 : 1
    const res = await useUserApi.update(
      userList.value[index].id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      status
    )
    state.loading_index = -1
    netMessage(res, '操作成功')
    if (res.code === 200) {
      userList.value[index].status = status
    }
  },

  /**
   * 恢复数据
   * @param ids 用户id列表
   * @param index 操作对象序号
   */
  handleRestore: async (ids: number[], index: number) => {
    if (index === -1) {
      state.loading = 4
    } else {
      state.loading_index = index
    }
    const res = await useUserApi.restore(ids)
    netMessage(res)
    userList.value = userList.value.filter((item) => !res.data.ids.includes(item.id))
    state.loading_index = -1
    state.loading = 0
  }
}

methods.getData()
</script>

<template>
  <div class="user-list-wrapper p-2 br" :class="{ fullscreen: state.is_screen }">
    <div class="flex-sb mb-2">
      <div>
        <el-button v-if="!state.only_trashed" @click="methods.handleAdd" type="primary">
          <Icon name="plus" size="14px" class="mr-1" />新建
        </el-button>

        <el-popconfirm
          v-if="state.only_trashed"
          @confirm="methods.handleRestore(state.select_list, -1)"
          width="180"
          title="批量恢复所选用户？"
        >
          <template #reference>
            <el-button
              :loading="state.loading === 4"
              :disabled="userList.length === 0"
              type="success"
            >
              <Icon name="rotateleft1" size="14px" class="mr-1" />恢复
            </el-button>
          </template>
        </el-popconfirm>

        <el-popconfirm
          @confirm="methods.handleRemove(state.select_list)"
          width="180"
          :title="state.only_trashed ? '将选中用户彻底删除?' : '将选中用户批量移至回收站?'"
        >
          <template #reference>
            <el-button type="danger" :disabled="userList.length === 0">
              <Icon name="trash1" size="14px" class="mr-1" />删除
            </el-button>
          </template>
        </el-popconfirm>

        <el-button type="warning" plain @click="methods.getTrash">
          <Icon name="recycle1" size="14px" class="mr-1" />{{
            state.only_trashed ? '退出回收站' : '回收站'
          }}
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
      <el-table
        :data="userList"
        @selection-change="methods.handleSelect"
        empty-text=""
        class="w-100"
        :max-height="maxHeight"
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
            <span class="male cus-span" v-if="scope.row.gender === 1">男</span>
            <span class="female cus-span" v-else-if="scope.row.gender === 2">女</span>
            <span class="cus-span" v-else>密</span>
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
        <el-table-column
          fixed="right"
          label="操作"
          class-name="center"
          :width="state.only_trashed ? 140 : 200"
        >
          <template #default="scope">
            <div class="flex-center">
              <el-button
                v-if="!state.only_trashed"
                size="small"
                type="primary"
                plain
                @click="methods.handleEdit(scope.$index)"
              >
                编辑
              </el-button>
              <el-button
                @click="methods.handleDisable(scope.$index)"
                v-if="!state.only_trashed"
                size="small"
                :loading="state.loading_index === scope.$index"
                :type="scope.row.status === 1 ? 'warning' : 'success'"
                plain
              >
                {{ scope.row.status === 1 ? '禁用' : '启用' }}
              </el-button>
              <el-button
                @click="methods.handleRestore([scope.row.id], scope.$index)"
                v-if="state.only_trashed"
                size="small"
                :loading="state.loading_index === scope.$index"
                type="success"
                plain
              >
                恢复
              </el-button>
              <el-popconfirm
                @confirm="methods.handleRemove([scope.row.id])"
                width="180"
                :title="state.only_trashed ? '彻底删除该用户？' : '将该用户移至回收站?'"
              >
                <template #reference>
                  <el-button size="small" type="danger" plain> 删除 </el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="overlay trf flex-center" :class="{ hide: state.loading !== 1 }">
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

    <el-dialog v-model="state.show_dialog" width="90%" title="编辑用户信息">
      <el-form :model="formModel">
        <el-form-item label="账号">
          <el-input v-model="formModel.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formModel.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formModel.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item v-if="state.create_user" label="密码">
          <el-input v-model="formModel.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select class="w-100" v-model="formModel.gender" placeholder="请选择性别">
            <el-option label="保密" :value="0" />
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-input type="text" v-model="formModel.avatar" placeholder="请输入图片url或上传">
            <template #append>
              <Icon @click="methods.handleUpload" name="upload2"></Icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="formModel.description"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 12 }"
            placeholder="个性描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.show_dialog = false">取消</el-button>
          <el-button :loading="state.loading === 2" type="primary" @click="methods.handleSave">
            确认
          </el-button>
        </span>
      </template>

      <UploadFile v-show="false" :accept="'image/*'" @upload="formModel.avatar = $event">
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
