<script setup lang="ts">
import { useInstallApi } from '@/api/install'
import type { FormInstance } from 'element-plus'
import { netMessage } from '@/utils/common'

const dbRef = ref<FormInstance>()
const adminRef = ref<FormInstance>()

const router = useRouter()

const database = reactive({
  hostname: 'localhost',
  hostport: '3306',
  database: '',
  username: '',
  password: '',
  prefix: 'auth'
})

const admin = reactive({
  account: 'admin',
  nickname: '管理员',
  email: '',
  password: '',
  re_password: ''
})

const state = reactive({
  step: 0
})

const db_rules = {
  hostname: [{ required: true, message: '数据库地址不能为空', trigger: 'blur' }],
  hostport: [{ required: true, message: '数据库端口不能为空', trigger: 'blur' }],
  database: [{ required: true, message: '数据库名称不能为空', trigger: 'blur' }],
  username: [{ required: true, message: '数据库用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '数据库密码不能为空', trigger: 'blur' },
    { min: 6, message: '数据库密码不能少于6位', trigger: 'blur' },
    { max: 18, message: '数据库密码不能多于18位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '数据库密码只能包含数字字母或下划线', trigger: 'blur' }
  ],
  prefix: [
    { required: true, message: '数据表前缀不能为空', trigger: 'blur' },
    { pattern: /^[a-zA-Z]+$/, message: '数据表前缀只可以输入数字母', trigger: 'blur' }
  ]
}
const admin_rules = {
  account: [
    { required: true, message: '账户名不能为空', trigger: 'blur' },
    { min: 5, message: '账户名不能少于5位', trigger: 'blur' },
    { max: 18, message: '账户名不能多于18位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '账户名只能包含数字字母或下划线', trigger: 'blur' }
  ],
  nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码不能少于6位', trigger: 'blur' },
    { max: 18, message: '密码不能多于18位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能包含数字字母或下划线', trigger: 'blur' }
  ]
}

const methods = {
  /**
   * 下一步
   */
  handleNext: async () => {
    if (state.step === 0) {
      methods.initDB(dbRef.value)
    }
    if (state.step === 1) {
      methods.install(adminRef.value)
    }
    if (state.step === 3) {
      router.push('/')
    }
  },

  /**
   * 初始化数据库
   */
  initDB: async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        // 连接数据库
        const connect = await useInstallApi.connect(
          database.hostname,
          database.hostport,
          database.database,
          database.username,
          database.password,
          database.prefix
        )
        netMessage(connect)
        if (connect.code === 200) {
          // 初始化数据库
          const initdb = await useInstallApi.init()
          netMessage(initdb)
          state.step = 1
        }
      }
    })
  },

  /**
   * 安装程序
   */
  install: async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        if (admin.password !== admin.re_password) {
          return ElMessage.warning('两次输入的密码不一致，请检查！')
        }
        // 创建管理员账户
        const res = await useInstallApi.admin(
          admin.account,
          admin.nickname,
          admin.email,
          admin.password
        )
        netMessage(res)
        // 安装上锁
        res.code === 200 && methods.installLock()
      }
    })
  },

  /**
   * 安装完成上锁
   */
  installLock: async () => {
    const lock = await useInstallApi.lock()
    netMessage(lock, '安装成功')
    lock.code === 200 && (state.step = 3)
  },

  /**
   * 返回上一步
   */
  goPrev: async () => {
    await useInstallApi.rmconfig()
    state.step = 0
  }
}
</script>

<template>
  <el-card class="box-card p-2">
    <template #header>
      <div class="card-header flex-center">
        <lottie-item name="auth" width="80px" height="80px" />
        <h1 class="center">DoAuth域名授权管理系统</h1>
      </div>
    </template>
    <el-steps :active="state.step" finish-status="success" align-center>
      <el-step title="数据库配置" />
      <el-step title="管理员账户" />
      <el-step title="完成安装" />
    </el-steps>

    <el-form
      ref="dbRef"
      :model="database"
      :rules="db_rules"
      label-width="110px"
      class="mt-4"
      label-position="right"
      require-asterisk-position="right"
      v-if="state.step === 0"
    >
      <el-form-item label="数据库地址" prop="hostname">
        <el-input v-model="database.hostname" placeholder="请输入数据库地址" clearable />
      </el-form-item>
      <el-form-item label="数据库端口" prop="hostport">
        <el-input v-model="database.hostport" placeholder="请输入数据库端口号" clearable />
      </el-form-item>
      <el-form-item label="数据库名称" prop="database">
        <el-input v-model="database.database" placeholder="请输入数据库名称" clearable />
      </el-form-item>
      <el-form-item label="数据库用户名" prop="username">
        <el-input v-model="database.username" placeholder="请输入数据库用户名" clearable />
      </el-form-item>
      <el-form-item label="数据库密码" prop="password">
        <el-input
          v-model="database.password"
          type="password"
          placeholder="请输入数据库密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="数据表前缀" prop="prefix">
        <el-input v-model="database.prefix" placeholder="请输入数据表前缀" clearable />
      </el-form-item>
    </el-form>

    <el-form
      ref="adminRef"
      :model="admin"
      :rules="admin_rules"
      label-width="100px"
      class="mt-4"
      label-position="right"
      require-asterisk-position="right"
      v-else-if="state.step === 1"
    >
      <el-form-item label="账户名" prop="account">
        <el-input v-model="admin.account" placeholder="请输入管理员账户名称" clearable />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="admin.nickname" placeholder="请输入管理员昵称" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="admin.email" placeholder="请输入邮箱" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="admin.password" placeholder="请输入管理员密码" clearable show-password />
      </el-form-item>
      <el-form-item label="重复密码" prop="re_password">
        <el-input
          v-model="admin.re_password"
          placeholder="请重复管理员密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>

    <div v-else-if="state.step === 3" class="install-success center my-4">
      <lottie-item class="disib" name="install" width="200px" height="200px" />
      <div class="w-100 center">
        <span>恭喜您，程序已安装成功！</span>
      </div>
    </div>

    <div class="flex-center px-4">
      <el-button @click="methods.goPrev" v-if="state.step === 1" plain class="w-50 mt-4" round>
        返回上一步
      </el-button>
      <el-button @click="methods.handleNext" type="primary" class="w-50 mt-4" round>
        {{ state.step !== 3 ? '下一步' : '返回首页' }}
      </el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 1.6rem;
  color: $base-primary;
}
.box-card {
  width: 100%;
  max-width: 900px;
  @include blurBg;
}
</style>
