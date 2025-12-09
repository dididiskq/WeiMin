import { createRouter, createWebHashHistory  } from 'vue-router';
import Home from '../views/Home.vue';
import AboutUs from '../views/AboutUs.vue';
import InstituteIntroduction from '../views/InstituteIntroduction.vue';
import ExpertTeam from '../views/ExpertTeam.vue';
import CooperationOrganizations from '../views/CooperationOrganizations.vue';
import MainBusiness from '../views/MainBusiness.vue';
import BrandActivities from '../views/BrandActivities.vue';
import LatestNews from '../views/LatestNews.vue';
import BrandActivitiesDetail from '../views/BrandActivitiesDetail.vue';
import ContactUs from '../views/ContactUs.vue';
import MainBusinessService from '../views/MainBusinessService.vue';
import ProjectCases from '../views/ProjectCases.vue';
import IntellectualProperty from '../views/IntellectualProperty.vue';

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
    path: '/institute-introduction',
    name: 'InstituteIntroduction',
    component: InstituteIntroduction
  },
  {
    path: '/expert-team',
    name: 'ExpertTeam',
    component: ExpertTeam
  },
  {
    path: '/cooperation-organizations',
    name: 'CooperationOrganizations',
    component: CooperationOrganizations
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
    path: '/latest-news',
    name: 'LatestNews',
    component: LatestNews
  },
  {
    path: '/brand-activities-detail',
    name: 'BrandActivitiesDetail',
    component: BrandActivitiesDetail
  },

  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/main-business-service',
    name: 'MainBusinessService',
    component: MainBusinessService
  },
  {
    path: '/project-cases',
    name: 'ProjectCases',
    component: ProjectCases
  },
  {
    path: '/intellectual-property',
    name: 'IntellectualProperty',
    component: IntellectualProperty
  }

   

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