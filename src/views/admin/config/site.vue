<script setup lang="ts">
import { storeToRefs } from 'pinia'

const siteStore = useSiteStore()
const { siteConfig } = storeToRefs(siteStore)

const methods = {
  handleSave: async () => {
    siteStore.loading = true
    const res = await useConfigApi.save('site_config', null, JSON.stringify(siteStore.siteConfig))
    netMessage(res)
    siteStore.loading = false
  }
}
</script>

<template>
  <el-card class="box-card cus-box-card" shadow="hover">
    <el-form v-if="siteConfig" style="max-width: 800px">
      <el-form-item label="站点名字">
        <el-input v-model="siteConfig.site_name" placeholder="站点名字" />
      </el-form-item>
      <el-form-item label="站点logo">
        <el-input v-model="siteConfig.logo" placeholder="请输入图片url或上传" />
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
    <el-button class="mt-2" type="primary" @click="methods.handleSave" :loading="siteStore.loading">
      提交保存
    </el-button>
  </el-card>
</template>

<style lang="scss" scoped></style>
