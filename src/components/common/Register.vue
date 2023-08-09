<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const registerFormRef = ref<FormInstance>()
const isLoading = ref<boolean>(false)
const countdownNum = 60
const timerNum = ref(countdownNum)

const userForm = reactive({
  account: '',
  nickname: '',
  email: '',
  password: '',
  re_password: '',
  code: ''
})

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '账户名不能为空', trigger: 'blur' },
    { min: 5, message: '账户名不能少于5位', trigger: 'blur' },
    { max: 18, message: '账户名不能多于18位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '账户名只能包含数字字母或下划线', trigger: 'blur' }
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
  ],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

const methods = {
  /**
   * 注册
   */
  handleRegister: async () => {
    const formEl = registerFormRef.value
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        if (userForm.password !== userForm.re_password) {
          return ElMessage.warning('两次输入的密码不一致，请检查！')
        }
        isLoading.value = true
        const login = await methods.handleSubmit()
        isLoading.value = false
        netMessage(login)
        login.code === 200 && methods.afterLogin(login.data)
      }
    })
  },

  /**
   * 提交数据
   */
  handleSubmit: async (): Promise<RES<Auth.Login>> => {
    return await useUserApi.register(
      userForm.account,
      userForm.nickname,
      userForm.email,
      userForm.password,
      userForm.code
    )
  },

  getCode: async () => {
    if (userForm.email) {
      userForm.code = ''
      timerNum.value = -1
      const res = await methods.handleSubmit()
      if (res.code === 200) {
        timerNum.value = countdownNum - 1
        methods.countdown()
        return ElMessage.success('验证码发送成功！')
      }
      timerNum.value = 60
      netMessage(res)
    } else {
      ElMessage.warning('请先输入邮箱')
    }
  },
  /**
   * 倒计时
   */
  countdown: () => {
    let timer = setInterval(() => {
      timerNum.value--
      if (timerNum.value <= 0) {
        clearInterval(timer)
        timerNum.value = countdownNum
        return
      }
    }, 1000)
  },

  afterLogin: (data: Auth.Login) => {
    const adminStore = useAdminStore()
    adminStore.$patch({ user: data.user, token: data.token })
    useHelper.set.storage('DOAUTH_TOKEN', { token: data.token, uid: data.user.id, time: 7200 })
    router.replace('/admin')
  }
}
</script>

<template>
  <el-form ref="registerFormRef" :model="userForm" class="login-body" :rules="rules">
    <el-form-item prop="account">
      <el-input v-model="userForm.account" placeholder="请输入账号" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input v-model="userForm.nickname" placeholder="请输入昵称" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="userForm.email" placeholder="请输入邮箱" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item prop="code">
      <div class="flex-sb w-100">
        <el-input
          class="w-100"
          v-model="userForm.code"
          placeholder="请输入验证码"
          clearable
          autocomplete="off"
        />
        <el-button
          :disabled="timerNum < countdownNum"
          class="ml-1"
          plain
          @click="methods.getCode"
          >{{ timerNum === countdownNum || timerNum === -1 ? '获取验证码' : timerNum }}</el-button
        >
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter="methods.handleRegister"
        clearable
        show-password
        v-model="userForm.password"
        type="password"
        placeholder="请输入密码"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item prop="re_password">
      <el-input
        v-model="userForm.re_password"
        placeholder="请重复密码"
        clearable
        show-password
        autocomplete="off"
      />
    </el-form-item>

    <el-button
      type="primary"
      round
      @click="methods.handleRegister"
      :loading="isLoading"
      class="w-100 mt-4"
    >
      {{ isLoading ? '注册中' : '注册' }}
    </el-button>
  </el-form>
</template>

<style lang="scss" scoped></style>
