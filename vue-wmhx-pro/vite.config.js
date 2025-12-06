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
  server: {
    host: '0.0.0.0',  // 允许公网访问
    port: 5173,       // 保持原有端口
    open: false,      // 不自动打开浏览器
    allowedHosts: [   // 允许的主机列表
      'rsei.com.cn',  // 添加需要允许的域名
      'localhost'     // 保持本地访问
    ]
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