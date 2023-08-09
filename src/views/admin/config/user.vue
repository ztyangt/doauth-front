<script setup lang="ts">
import { storeToRefs } from 'pinia'

const adminStore = useAdminStore()
const { user } = storeToRefs(adminStore)

const fileTarget = ref()
const loading = ref(false)

const methods = {
  /**
   * 保存配置数据
   */
  handleSave: async () => {
    if (user.value) {
      loading.value = true
      const res = await useUserApi.update(
        user.value.id,
        user.value.email,
        user.value.nickname,
        user.value.gender,
        user.value.description,
        user.value.avatar
      )
      netMessage(res)
      loading.value = false
    }
  },

  /**
   * 上传文件
   * @param target 目标文件
   */
  handleUpload: (target: string) => {
    fileTarget.value = target
    const uploadRef = document.querySelector('#uploadRef') as HTMLInputElement
    uploadRef.click()
  },

  /**
   * 上传成功后
   */
  uploadSuccess: (val: string) => {
    setNestedValue(user, fileTarget.value, val)
  }
}
</script>

<template>
  <el-card class="box-card cus-box-card" shadow="hover">
    <template #header>
      <h3>站点信息</h3>
    </template>
    <el-form v-if="user" style="max-width: 800px">
      <el-form-item label="昵称">
        <el-input v-model="user.nickname" placeholder="请输入你的昵称" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" placeholder="请输入你的邮箱" />
      </el-form-item>
      <el-form-item label="头像">
        <el-input type="text" v-model="user.avatar" placeholder="请输入图片url或上传">
          <template #append>
            <Icon @click="methods.handleUpload('avatar')" name="upload2"></Icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="user.gender" placeholder="请选择性别">
          <el-option label="保密" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="user.description"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 12 }"
          placeholder="个性描述"
        />
      </el-form-item>
    </el-form>
    <el-button class="mt-2" type="primary" @click="methods.handleSave" :loading="loading">
      提交保存
    </el-button>
    <UploadFile v-show="false" :accept="'image/*'" @upload="methods.uploadSuccess">
      <el-button type="primary" id="uploadRef">点击上传</el-button>
    </UploadFile>
  </el-card>
</template>

<style lang="scss" scoped></style>
