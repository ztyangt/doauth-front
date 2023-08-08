<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const loginFormRef = ref<FormInstance>()
const isLoading = ref<boolean>(false)

const userForm = reactive({
  account: '',
  password: ''
})

const rules = reactive<FormRules>({
  account: [
    {
      required: true,
      message: '账号或邮箱不能为空',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})

const methods = {
  /**
   * 登录
   */
  handleLogin: async () => {
    const formEl = loginFormRef.value
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        isLoading.value = true
        const login = await useCommApi.login(userForm.account, userForm.password)
        isLoading.value = false
        netMessage(login)
        login.code === 200 && methods.afterLogin(login.data)
      }
    })
  },

  afterLogin: (data: Auth.Login) => {
    const adminStore = useAdminStore()
    adminStore.$patch({ login: data })
    useHelper.set.storage('admin', { ...data, time: 7200 })
    router.push('/admin')
  }
}
</script>

<template>
  <el-form ref="loginFormRef" :model="userForm" class="login-body" :rules="rules">
    <el-form-item prop="account">
      <el-input v-model="userForm.account" placeholder="请输入账号或邮箱" clearable />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter="methods.handleLogin"
        clearable
        show-password
        v-model="userForm.password"
        type="password"
        placeholder="请输入登录密码"
      />
    </el-form-item>

    <el-button
      type="primary"
      round
      @click="methods.handleLogin"
      :loading="isLoading"
      class="w-100 mt-4"
    >
      {{ isLoading ? '登录中' : '登录' }}
    </el-button>
  </el-form>
</template>

<style lang="scss" scoped></style>
