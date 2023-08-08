<script setup lang="ts">
import { storeToRefs } from 'pinia'

const siteStore = useSiteStore()
const { siteConfig } = storeToRefs(siteStore)

const fileTarget = ref()
const loading = ref(false)

const methods = {
  /**
   * 保存配置数据
   */
  handleSave: async () => {
    loading.value = true
    const res = await useConfigApi.save(
      'site_config',
      undefined,
      JSON.stringify(siteStore.siteConfig)
    )
    netMessage(res)
    loading.value = false
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
    setNestedValue(siteStore.siteConfig, fileTarget.value, val)
  }
}
</script>

<template>
  <el-card class="box-card cus-box-card" shadow="hover">
    <template #header>
      <h3>站点信息</h3>
    </template>
    <el-form v-if="siteConfig" style="max-width: 800px">
      <el-form-item label="站点名字">
        <el-input v-model="siteConfig.site_name" placeholder="站点名字" />
      </el-form-item>
      <el-form-item label="站点logo">
        <el-input type="text" v-model="siteConfig.logo" placeholder="请输入图片url或上传">
          <template #append>
            <Icon @click="methods.handleUpload('logo')" name="upload2"></Icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="站点描述">
        <el-input v-model="siteConfig.description" placeholder="站点描述" />
      </el-form-item>
      <el-form-item label="站点标签">
        <el-select
          v-model="siteConfig.tags"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="站点标签"
          style="width: 100%"
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
