<script setup lang="ts">
const userList = ref<Auth.User[]>([])
const adminStore = useAdminStore()

const methods = {
  initData: async () => {
    const res = await useUserApi.all(1, 10)
    res.code === 200 && (userList.value = res.data.data)
  }
}

methods.initData()
</script>

<template>
  <div>{{ userList }}</div>
</template>

<style lang="scss" scoped></style>
