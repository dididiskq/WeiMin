import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import InstituteIntroduction from '../views/InstituteIntroduction.vue';
import ExpertTeam from '../views/ExpertTeam.vue';
import ServiceContent from '../views/ServiceContent.vue';
import BrandActivities from '../views/BrandActivities.vue';
import ContactUs from '../views/ContactUs.vue';
import ProjectCase from '../views/ProjectCase.vue';

/**
 * 路由配置数组
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
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/project-case',
    name: 'ProjectCase',
    component: ProjectCase
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;