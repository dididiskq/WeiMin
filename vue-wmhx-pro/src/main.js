/*
 * 应用入口文件
 * 初始化Vue应用，配置路由并挂载到DOM
 */
import { createApp } from 'vue' // 导入Vue核心函数
import './style.css' // 导入全局样式
import App from './App.vue' // 导入根组件
import router from './router' // 导入路由配置

createApp(App).use(router).mount('#app')
