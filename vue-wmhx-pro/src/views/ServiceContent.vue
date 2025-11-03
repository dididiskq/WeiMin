<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 服务内容页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">服务内容</h2>
          <div class="section-divider"></div>
        </div>
        <div class="services-container">
          <!-- 服务类别1 -->
          <div class="service-category">
            <h3 class="category-title">核心技术服务</h3>
            <div class="service-cards">
              <div v-for="service in coreServices" :key="service.id" class="service-card hover-lift">
                <div class="card-icon"><span>{{ service.id }}</span></div>
                <h4>{{ service.title || service.name }}</h4>
                <!-- 添加额外的条件检查，确保描述字段总是显示 -->
  <p v-if="service.description && service.description.trim()" class="service-description">
    {{ service.description }}
  </p>
  <p v-else class="service-description placeholder">
    {{ getDefaultDescription(service.id) || '暂无描述信息' }}
  </p>
              </div>
            </div>
          </div>

          <!-- 服务类别2 -->
          <div class="service-category">
            <h3 class="category-title">高级解决方案</h3>
            <div class="service-cards">
              <div v-for="service in advancedServices" :key="service.id" class="service-card hover-lift">
                <div class="card-icon"><span>{{ service.id }}</span></div>
                <h4>{{ service.title || service.name }}</h4>
                <!-- 添加额外的条件检查，确保描述字段总是显示 -->
              <p v-if="service.description && service.description.trim()" class="service-description">
                {{ service.description }}
              </p>
              <p v-else class="service-description placeholder">
                {{ getDefaultDescription(service.id) || '暂无描述信息' }}
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 引入页脚组件 -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import defaultConfig from '../config/home.config';
import { useConfig } from "../services/configService";

// 使用新的配置服务
const { config } = useConfig();

// 计算属性：核心技术服务（前4个）
const coreServices = ref([]);

// 计算属性：高级解决方案（后4个）
const advancedServices = ref([]);

// 更新服务数据的函数
const updateServicesData = () => {
  try {
    // 获取服务列表（优先从配置中获取，如果没有则使用默认配置）
    const services = config.value?.services || defaultConfig.services || [];
    
    // 确保按照ID排序
    const sortedServices = [...services].sort((a, b) => {
      if (!a.id || !b.id) return 0;
      return a.id.localeCompare(b.id);
    });
    
    // 分配服务到不同类别
    coreServices.value = sortedServices.slice(0, 4);
    advancedServices.value = sortedServices.slice(4, 8);
    
    // 调试信息，仅在开发环境显示
    if (import.meta.env.DEV) {
      console.log('Services updated:', sortedServices);
      console.log('Core services:', coreServices.value);
      console.log('Advanced services:', advancedServices.value);
    }
  } catch (error) {
    console.error('Error updating services data:', error);
    // 出错时使用默认值
    coreServices.value = [];
    advancedServices.value = [];
  }
};

// 监听配置更新事件
const handleConfigUpdated = (event) => {
  try {
    if (event?.detail?.config) {
      config.value = event.detail.config;
      // 重新分配服务到不同类别
      updateServicesData();
    }
  } catch (error) {
    console.error('Error handling config update:', error);
  }
};

// 组件挂载时初始化
onMounted(() => {
  // 配置已通过useConfig自动加载
  // 监听全局配置更新事件
  window.addEventListener('config-updated', handleConfigUpdated);
  
  // 初始化服务数据
  updateServicesData();
  
  // 调试信息，仅在开发环境显示
  if (import.meta.env.DEV) {
    console.log('ServiceContent initialized');
  }
});

// 获取默认描述信息
const getDefaultDescription = (serviceId) => {
  try {
    if (!defaultConfig.services || !Array.isArray(defaultConfig.services)) {
      return '';
    }
    const defaultService = defaultConfig.services.find(s => s.id === serviceId);
    return defaultService?.description || '';
  } catch (error) {
    console.error('Error getting default description:', error);
    return '';
  }
};
onUnmounted(() => {
  window.removeEventListener('config-updated', handleConfigUpdated);
});
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 8rem 0 4rem;
  background-color: #f8fafc;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.service-category {
  margin-bottom: 4rem;
}

.category-title {
  color: #1e293b;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  border-left: 4px solid #10b981;
  padding-left: 1rem;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.service-card h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.service-card p {
  color: #64748b;
  font-size: 1rem; /* 增大字体 */
  line-height: 1.6;
  margin-top: 1rem;
  min-height: 80px; /* 增加最小高度 */
  padding: 0.5rem 0; /* 添加内边距 */
}

.service-description {
  display: block; /* 确保描述总是显示 */
  word-break: break-word;
}

.service-description.placeholder {
  color: #94a3b8;
  font-style: italic;
}
</style>