<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

defineProps<{
  visible: boolean
}>()

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
  <el-dialog
    :model-value="visible"
    align-center
    destroy-on-close
    :append-to-body="true"
    width="90%"
    :show-close="true"
    class="login-wrapper"
    @close="$emit('onClose')"
  >
    <template #header>
      <div class="my-header tl">
        <div class="login-title pb-1">管理员登录</div>
        <span class="txt fs-12 disib mt-1 curp"> Doauth域名授权管理系统 </span>
      </div>
    </template>

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
  </el-dialog>
</template>

<style lang="scss">
.login-wrapper {
  max-width: 400px;
  border-radius: $base-border-radius;
  @include blurBg;

  .login-title {
    position: relative;
    font-size: 1.4rem;
    &::after {
      position: absolute;
      content: '';
      background-color: $base-primary;
      border-radius: 5px;
      box-shadow: 1px 1px 3px -1px $base-primary;
      width: 50px;
      height: 3px;
      top: auto;
      left: 0;
      bottom: 0;
      transition: 0.3s;
    }

    &:hover {
      &::after {
        width: 70px;
      }
    }
  }

  .txt {
    color: #414858;
  }
}
</style>
