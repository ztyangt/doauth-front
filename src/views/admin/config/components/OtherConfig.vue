<script setup lang="ts">
const config = reactive({
  openRegister: true
})
const methods = {
  handleChange: async (e) => {
    const res = await useConfigApi.save('allow_register', e ? '1' : '0')
    netMessage(res, '设置成功')
  }
}
</script>

<template>
  <el-card class="box-card cus-box-card" shadow="hover">
    <template #header>
      <h3>其他设置</h3>
    </template>

    <div class="config-card p-2">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="是否允许用户自行注册账号？"
        placement="top"
      >
        <span class="config-tip">
          <Icon name="questioncircle1" size="12px" />
          开放注册
        </span>
      </el-tooltip>

      <div class="config-title my-2">开放注册</div>
      <el-switch
        @change="methods.handleChange"
        v-model="config.openRegister"
        active-text="开放"
        inactive-text="禁止"
      />
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.config-tip {
  font-size: 12px;
  @include useTheme {
    color: getVal(mutedColor);
  }
}
.config-card {
  @include useTheme {
    box-shadow: getVal(shadow);
  }
}
</style>
