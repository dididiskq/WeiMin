import { createRouter, createWebHashHistory  } from 'vue-router';
import Home from '../views/Home.vue';
import AboutUs from '../views/AboutUs.vue';
import MainBusiness from '../views/MainBusiness.vue';
import BrandActivities from '../views/BrandActivities.vue';
import ContactUs from '../views/ContactUs.vue';

/**
 * 路由配置数组c
 * 每个对象定义一个路由规则，包含路径、名称和对应组件
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/main-business',
    name: 'MainBusiness',
    component: MainBusiness
  },
  {
    path: '/brand-activities',
    name: 'BrandActivities',
    component: BrandActivities
  },

  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },

   

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 处理锚点跳转
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const el = document.querySelector(to.hash);
          if (el) {
            resolve({
              el: to.hash,
              behavior: 'smooth'
            });
          } else {
            resolve({ top: 0 });
          }
        }, 100);
      });
    }
    // 如果有保存的位置，则恢复到该位置
    if (savedPosition) {
      return savedPosition;
    }
    // 默认滚动到页面顶部
    return { top: 0 };
  }
});

export default router;