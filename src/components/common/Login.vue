<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const route = useRoute()

const loginFormRef = ref<FormInstance>()
const isLoading = ref<boolean>(false)
const redirect = ref(decodeURIComponent(((route.query && route.query.redirect) as string) || '/'))

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
   * 获取重定向路由
   */
  handleRoute: () => {
    return redirect.value === '/404' || redirect.value === '/403' ? '/' : redirect.value
  },
  /**
   * 登录
   */
  handleLogin: async () => {
    const formEl = loginFormRef.value
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        isLoading.value = true
        const login = await useUserApi.login(userForm.account, userForm.password)
        isLoading.value = false
        netMessage(login)
        login.code === 200 && methods.afterLogin(login.data)
      }
    })
  },

  afterLogin: (data: Auth.Login) => {
    const adminStore = useAdminStore()
    adminStore.$patch({ user: data.user, token: data.token })
    useHelper.set.storage('DOAUTH_ADMIN', { ...data, time: 7200 })
    useSiteStore().initData()
    router.push(methods.handleRoute())
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
