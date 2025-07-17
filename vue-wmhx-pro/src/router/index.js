import { createRouter, createWebHistory } from 'vue-router';
import ServiceIntroduction from '../components/ServiceIntroduction.vue';
import Home from '../views/Home.vue';

/**
 * 路由配置数组
 * 每个对象定义一个路由规则，包含路径、名称和对应组件
 */
const routes = [
  /* 首页路由 - 对应Home组件 */
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  /* 服务介绍路由 - 对应ServiceIntroduction组件 */
  {
    path: '/services',
    name: 'ServiceIntroduction',
    component: ServiceIntroduction
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;