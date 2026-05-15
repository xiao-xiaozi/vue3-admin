import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{js,vue}'],
      exclude: [
        'src/**/__tests__/**',
        'src/**/*.spec.js',
        'src/mock/**',
        'src/main.js',
      ],
      reporter: ['text', 'json-summary', 'html'],
    },
  },
})
