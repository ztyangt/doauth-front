<script setup lang="ts">
import { storeToRefs } from 'pinia'

const siteStore = useSiteStore()
const { siteConfig } = storeToRefs(siteStore)

const tagStatus: ('success' | 'info' | 'warning' | 'danger')[] = ['success', 'warning', 'danger']
</script>

<template>
  <el-card class="box-card cus-box-card" shadow="hover">
    <el-skeleton animated :throttle="200" :loading="siteConfig === null">
      <template #template>
        <el-skeleton />
      </template>
      <template v-if="siteConfig" #default>
        <!-- <div class="logo w-100">
          <img class="" :src="siteConfig.logo" :alt="siteConfig.site_name" />
        </div> -->
        <div class="flex-sb">
          <div>
            <h2 class="my-2">{{ siteConfig.site_name }}</h2>
            <p style="white-space: pre-wrap">{{ siteConfig.sysdesc }}</p>
            <div class="tags my-2">
              <el-tag
                v-for="(tag, index) in siteConfig.tags"
                :key="index"
                class="mr-2"
                effect="dark"
                :type="tagStatus[siteConfig?.tags.length % index]"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
          <lottie-item class="disib" name="install" width="200px" height="200px" />
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<style lang="scss" scoped>
.logo {
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
