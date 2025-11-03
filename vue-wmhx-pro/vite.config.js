import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './', 
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // 移除API代理配置，因为Vue应用不再需要调用Flask API
  build: {
    rollupOptions: {
      output: {
        // 配置静态资源使用原始文件名，不添加哈希值
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})