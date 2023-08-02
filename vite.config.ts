import { fileURLToPath, URL } from 'node:url'

import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },

  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      // 自动导入
      imports: ['vue', 'vue-router'],
      // 生成全局类型
      dts: 'types/unplugin/auto-imports.d.ts',
      // element-plus - 自动按需引入
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      dts: 'types/unplugin/components.d.ts',
      // 自动导入的位置
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    ElementPlus({
      useSource: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "~/assets/styles/theme.scss" as *;
        @use "~/assets/styles/base.scss" as *;
        @use "~/assets/styles/element.scss" as *; 
        `
      }
    }
  },
  build: {
    // minify: 'esbuild',
    // minify: 'terser',
    // // 打包后的文件
    outDir: 'dist',
    assetsDir: 'static'
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
})
