<template>
  <div class="page-container">
    <!-- 头部组件 -->
    <Header />
    <!-- 主要内容区域 -->
    <main class="page-content">
      <!-- 项目案例区域 -->
      <section class="section bg-white">
        <div class="cases-container">
          <h2 class="section-title">项目案例</h2>
          <div class="section-divider"></div>
          
          <!-- 筛选按钮 -->
          <div class="case-filters">
            <button class="filter-btn active" @click="filterCase('all')">全部</button>
            <button class="filter-btn" @click="filterCase('industry')">工业领域</button>
            <button class="filter-btn" @click="filterCase('electronic')">电子领域</button>
            <button class="filter-btn" @click="filterCase('automotive')">汽车领域</button>
          </div>

          <!-- 案例卡片 -->
          <div class="case-grid">
            <div v-for="(caseItem, index) in cases" :key="index" class="case-card">
              <div class="case-image">
                <div class="image-placeholder">📸</div>
              </div>
              <div class="case-info">
                <h3 class="case-title">{{ caseItem.title }}</h3>
                <div class="case-category">{{ caseItem.category }}</div>
                <p class="case-desc">{{ caseItem.description }}</p>
                <button class="view-details">查看详情</button>
              </div>
            </div>
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

// 使用配置服务
const { config } = useConfig();

// 项目案例数据
const cases = ref([]);

// 更新案例数据
const updateCasesData = () => {
  try {
    // 获取项目案例数据（优先从配置中获取，如果没有则使用默认配置）
    cases.value = config.value?.projectCases || defaultConfig.projectCases || [];
  } catch (error) {
    console.error('Error updating cases data:', error);
    cases.value = [];
  }
};

// 生命周期钩子：组件挂载时调用
onMounted(() => {
  updateCasesData();
  window.addEventListener('config-updated', handleConfigUpdated);
});

// 生命周期钩子：组件卸载时调用
onUnmounted(() => {
  window.removeEventListener('config-updated', handleConfigUpdated);
});

// 监听配置更新事件
const handleConfigUpdated = (event) => {
  try {
    if (event?.detail?.config) {
      config.value = event.detail.config;
      updateCasesData();
    }
  } catch (error) {
    console.error('Error handling config update:', error);
  }
};
// 筛选案例
const filterCase = (category) => {
  // 这里可以根据需要实现筛选逻辑
  console.log('筛选类别:', category);
};
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

/* 项目案例样式 */
.cases-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section.bg-white {
  background-color: #ffffff;
  margin: 2rem 0;
  padding: 4rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* 筛选按钮样式 */
.case-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active,
.filter-btn:hover {
  background-color: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

/* 案例网格样式 */
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
  transition: transform 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
}

.case-image {
  height: 180px;
  background-color: #f1f5f9;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 2rem;
}

.case-info {
  padding: 1.5rem;
}

.case-title {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.case-category {
  color: #3b82f6;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.case-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.view-details {
  display: inline-block;
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.view-details:hover {
  text-decoration: underline;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .case-grid {
    grid-template-columns: 1fr;
  }
  
  .case-filters {
    justify-content: center;
  }
}
</style>