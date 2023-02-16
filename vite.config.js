import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from "unplugin-icons/vite"
import Inspect from "vite-plugin-inspect"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver()
      ],
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件 
        IconsResolver({
          prefix:'icon',
          enabledCollections: ['ep']
        }),
        // element-plus 按需自动引入组件
        ElementPlusResolver()
      ],
    }),
    Icons({
      autoInstall:true
    }),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/variable.scss";`,
      },
    },
  },
})
