import { createRouter, createWebHashHistory  } from 'vue-router';
import Home from '../views/Home.vue';
import InstituteIntroduction from '../views/InstituteIntroduction.vue';
import ExpertTeam from '../views/ExpertTeam.vue';
import ServiceContent from '../views/ServiceContent.vue';
import BrandActivities from '../views/BrandActivities.vue';
import ContactUs from '../views/ContactUs.vue';
import LatestNews from '../views/LatestNews.vue';
import ProjectCase from '../views/ProjectCase.vue';
import IntellectualProperty from '../views/IntellectualProperty.vue';
import CooperationAgencies from '../views/CooperationAgencies.vue';

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
    path: '/service-content',
    name: 'ServiceContent',
    component: ServiceContent
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
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {    path: '/project-case',    name: 'ProjectCase',    component: ProjectCase  },
    {    path: '/intellectual-property',    name: 'IntellectualProperty',    component: IntellectualProperty  },  
    {    path: '/cooperation-agencies',    name: 'CooperationAgencies',    component: CooperationAgencies  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 每次导航时滚动到页面顶部
    return { top: 0 };
  }
});

export default router;