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
  base: '/',
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
      imports: ['vue', 'vue-router'],
      dirs: ['src/api', 'src/utils', 'src/stores'],
      dts: 'types/unplugin/auto-imports.d.ts',
      // element-plus - 自动按需引入
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),
    Components({
      dts: 'types/unplugin/components.d.ts',
      dirs: ['src/components', 'src/views/**/components', 'src/layouts/components'],
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
        @use "~/assets/styles/element/var.scss" as *; 
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
  server: {
    host: '0.0.0.0',
    port: 4000
  },
  esbuild: {
    // drop: ['console', 'debugger']
  }
})
