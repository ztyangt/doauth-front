<script setup lang="ts">
const siteStore = useSiteStore()

const tagStatus: ('success' | 'info' | 'warning' | 'danger')[] = ['success', 'warning', 'danger']
</script>

<template>
  <el-card class="box-card cus-box-card center" shadow="hover">
    <el-skeleton animated :throttle="200" :loading="siteStore.siteConfig === null">
      <template #template>
        <AdminSign />
      </template>
      <template #default>
        <div class="logo w-100 center">
          <img class="" src="/assets/images/logo.svg" alt="doauth" />
        </div>
        <h2 class="my-2">{{ siteStore.siteConfig?.json.site_name }}</h2>
        <p>{{ siteStore.siteConfig?.json.description }}</p>
        <div class="tags my-2">
          <el-tag
            v-for="(tag, index) in siteStore.siteConfig?.json.tags"
            :key="index"
            class="mx-1"
            effect="dark"
            :type="tagStatus[index % siteStore.siteConfig?.json.tags.length]"
          >
            {{ tag }}
          </el-tag>
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
