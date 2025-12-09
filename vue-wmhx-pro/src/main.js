/*
 * 应用入口文件
 * 初始化Vue应用，配置路由并挂载到DOM
 */
import { createApp, reactive } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

// 静态资源已移至public/static目录，无需通过import导入

// 创建应用实例
const app = createApp(App);

// 添加调试信息
console.log('Vue应用初始化开始');
console.log('当前环境:', import.meta.env.MODE);

// 创建响应式配置对象
const siteConfig = reactive({
  hero: {},
  expertTeam: [],
  services: [],
  newsSlider: [],
  intellectualProperty: [],
  brandActivities: [],
  projectCases: [],
  cooperationAgencies: [],
  importantLinks: []
});

// 提供全局配置
app.config.globalProperties.$siteConfig = siteConfig;

// 在开发环境中直接导入配置（方便开发）
// 在生产环境中可以通过全局方法刷新配置
let initialConfig = {};
if (import.meta.env.MODE === 'development') {
  // 开发环境直接导入
  import('./config/site_config.json').then(config => {
    initialConfig = config.default;
    // 更新响应式配置
    updateConfig(initialConfig);
  });
} else {
  // 生产环境尝试从dist/config目录加载
  loadConfigFromDist();
}

// 更新配置的辅助函数
function updateConfig(configData) {
  Object.keys(configData).forEach(key => {
    siteConfig[key] = configData[key];
  });
  console.log('配置已更新:', siteConfig);
}

// 从dist/config目录加载配置（生产环境）
function loadConfigFromDist() {
  try {
    // 尝试从config目录加载配置
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/config/site_config.json', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const configData = JSON.parse(xhr.responseText);
        updateConfig(configData);
      } else {
        console.warn('无法从dist/config加载配置，使用默认配置');
      }
    };
    xhr.onerror = function() {
      console.warn('加载配置出错，使用默认配置');
    };
    xhr.send();
  } catch (error) {
    console.error('加载配置时出错:', error);
  }
}

// 配置全局路由处理，修复导航点击问题
router.beforeEach((to, from, next) => {
  console.log(`路由导航: 从 ${from.path} 到 ${to.path}`);
  next();
});

// 立即挂载应用
console.log('立即挂载应用');
app.use(router).mount('#app');

// 添加全局方法，允许用户手动刷新配置
// 用户可以在浏览器控制台中调用 window.refreshConfig() 来刷新配置
globalThis.refreshConfig = function() {
  console.log('手动刷新配置');
  loadConfigFromDist();
  alert('配置已刷新，请刷新页面查看更新');
};

console.log('应用初始化完成。提示：修改配置文件后，可以在浏览器控制台执行 window.refreshConfig() 来刷新配置。');
