<script setup lang="ts">
import axios from 'axios'
import { useHelper } from '@/utils/helper'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'
import type { RendererType } from 'lottie-web'

export interface Props {
  name: string
  auto?: boolean
  loop?: boolean
  renderer?: RendererType
  width?: string | number
  height?: string | number
  data?: any
}

const lottieRef = ref()
const props = withDefaults(defineProps<Props>(), {
  name: '',
  auto: true,
  loop: true,
  renderer: 'svg',
  width: '1rem',
  height: '1rem',
  data: {}
})

const lottieData = ref<AnimationItem>()

nextTick(async () => {
  await method.init()
  lottieData.value && lottieData.value.play()
})

const method = {
  init: async () => {
    const data = await axios.get(`/assets/json/lottie/${props.name}.json`)
    if (useHelper.is.empty(data)) return
    lottieData.value = lottie.loadAnimation({
      container: lottieRef.value,
      autoplay: props.auto,
      loop: props.loop,
      renderer: props.renderer,
      animationData: data.data
    })
  }
}
</script>

<template>
  <div class="lottie-wrapper">
    <span class="disib" ref="lottieRef"></span>
  </div>
</template>

<style lang="scss" scoped>
.lottie-wrapper {
  width: v-bind('props.width');
  height: v-bind('props.height');
}
</style>
