<template>
  <div class="page-container">
    <!-- 头部组件 -->
    <Header />
    <!-- 主要内容区域 -->
    <main class="page-content">
      <!-- 服务内容区域 -->
      <section class="services-container">
        <h2 class="section-title">主营业务</h2>
        <div class="section-divider"></div>
        
        <!-- 所有服务模块合并在一个容器中 -->
        <div class="service-cards">
          <div v-for="(service, index) in services" :key="index" class="service-card">
            <div class="card-icon hover-lift">
              {{ service.id }}
            </div>
            <h4>{{ service.title }}</h4>
            <p :class="['service-description', service.description ? '' : 'placeholder']">
              {{ service.description || getDefaultDescription(service.id) }}
            </p>
          </div>
        </div>
      </section>
    </main>
    <!-- 底部组件 -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import defaultConfig from '../config/home.config';
import { useConfig } from '../services/configService';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

// 获取配置服务
const { config } = useConfig();

// 所有服务模块（统一管理1-8个服务）
const services = ref([]);

// 更新服务数据
const updateServicesData = () => {
  try {
    // 获取服务列表（优先从配置中获取，如果没有则使用默认配置）
    const allServices = config.value?.services || defaultConfig.services || [];
    
    // 确保按照ID排序，1-8依次排列
    const sortedServices = [...allServices].sort((a, b) => {
      if (!a.id || !b.id) return 0;
      return a.id.localeCompare(b.id);
    });
    
    // 只显示前8个服务模块
    services.value = sortedServices.slice(0, 8);
  } catch (error) {
    console.error('Error updating services data:', error);
    services.value = [];
  }
};

// 监听配置更新事件
const handleConfigUpdated = (event) => {
  try {
    if (event?.detail?.config) {
      config.value = event.detail.config;
      updateServicesData();
    }
  } catch (error) {
    console.error('Error handling config update:', error);
  }
};

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

// 组件挂载时初始化
onMounted(() => {
  window.addEventListener('config-updated', handleConfigUpdated);
  updateServicesData();
});

// 组件卸载时清理
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

/* 服务内容样式 */
.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 移除了服务类别的样式，因为现在所有服务都在同一个容器中 */

.category-title {
  color: #1e293b;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  border-left: 4px solid #3b82f6;
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
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  min-height: 80px;
  padding: 0.5rem 0;
}

.service-description {
  display: block;
  word-break: break-word;
}

.service-description.placeholder {
  color: #94a3b8;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .service-cards {
    grid-template-columns: 1fr;
  }
}

/* 通用标题样式 */
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 1rem;
}

.section-divider {
  width: 60px;
  height: 3px;
  background-color: #3b82f6;
  margin: 0 auto 3rem;
}
</style>