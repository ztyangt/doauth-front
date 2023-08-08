<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const login = ref(true)
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
        <div class="login-title pb-1">{{ login ? '登录' : '注册' }}</div>
        <span @click="login = !login" class="txt fs-12 disib mt-1 curp hovc trf">
          {{ login ? '没有账号？立即注册>' : '已有账号？返回登录>' }}
        </span>
      </div>
    </template>
    <div v-auto-animate>
      <Login v-if="login" />
      <Register v-else />
    </div>
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
    color: #737881;
  }
}
</style>
