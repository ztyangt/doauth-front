<script setup lang="ts"></script>

<template>
  <div class="admin-index-wrapper">
    <el-row :gutter="10">
      <el-col :span="24" :md="8" class="mb-2">
        <user />
      </el-col>
      <el-col :span="24" :md="16" class="mb-2">
        <sign />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  height: 100%;
}
</style>
