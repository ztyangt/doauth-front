<script setup lang="ts">
const email_config = ref<Auth.EmailConfigJson | null>(null)

const receive = ref('')
const email_loading = ref(false)
const save_loading = ref(false)

const methods = {
  /**
   * 获取邮件配置
   */
  getConfig: async () => {
    const res = await useConfigApi.one('email_config')
    res.code === 200 && (email_config.value = res.data.json)
  },
  /**
   * 保存配置数据
   */
  handleSave: async () => {
    save_loading.value = true
    const res = await useConfigApi.save(
      'email_config',
      undefined,
      JSON.stringify(email_config.value)
    )
    netMessage(res)
    save_loading.value = false
  },

  /**
   * 邮件服务测试
   */
  testEmail: async () => {
    if (email_config.value) {
      email_loading.value = true
      const res = await useCommApi.email(
        email_config.value.host,
        parseInt(email_config.value.port),
        email_config.value.account,
        email_config.value.password,
        email_config.value.subject,
        email_config.value.nickname,
        '当您收到这封邮件，代表您的邮件服务配置成功！',
        receive.value
      )
      netMessage(res)
      email_loading.value = false
    } else {
      ElMessage.warning('请先完善邮件配置表单！')
    }
  }
}

methods.getConfig()
</script>

<template>
  <el-card class="box-card cus-box-card" shadow="hover">
    <template #header>
      <h3>邮件配置</h3>
    </template>
    <el-form v-if="email_config">
      <el-row :gutter="15">
        <el-col :span="24" :md="12" :lg="8">
          <el-form-item label="服务地址">
            <el-input v-model="email_config.host" placeholder="邮件服务器地址" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :md="12" :lg="8">
          <el-form-item label="服务端口">
            <el-input type="text" v-model="email_config.port" placeholder="邮件服务端口" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :md="12" :lg="8">
          <el-form-item label="发信账号">
            <el-input v-model="email_config.account" placeholder="发信邮件账号" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :md="12" :lg="8">
          <el-form-item label="服务密码">
            <el-input v-model="email_config.password" placeholder="邮件服务密码" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :md="12" :lg="8">
          <el-form-item label="邮件主题">
            <el-input v-model="email_config.subject" placeholder="邮件主题" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :md="12" :lg="8">
          <el-form-item label="邮件昵称">
            <el-input v-model="email_config.nickname" placeholder="邮件昵称,请输入英文" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="flex-sb w-100">
        <el-input v-model="receive" placeholder="接收者邮箱" />
        <el-button class="ml-2" type="warning" @click="methods.testEmail" :loading="email_loading">
          邮件服务测试
        </el-button>
      </div>
    </el-form>

    <el-button class="mt-2" type="primary" @click="methods.handleSave" :loading="save_loading">
      提交保存
    </el-button>
  </el-card>
</template>

<style lang="scss" scoped></style>
