<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 活动咨询页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">品牌活动</h2>
          <div class="section-divider"></div>
        </div>
        <div class="brand-activities">
          <div class="activity-header">
            <h3 class="activity-english-title">Activity</h3>
          </div>
          <div class="activity-list">
            <div 
              v-for="(activity, index) in activities" 
              :key="index" 
              class="activity-card"
            >
              <div class="activity-info">
                <div class="activity-date">{{ activity.date }}</div>
                <div class="activity-tag">{{ activity.tag }}</div>
              </div>
              <div class="activity-content">
                <h4 class="activity-title">{{ activity.title }}</h4>
                <p class="activity-desc">{{ activity.description }}</p>
              </div>
            </div>
            <div v-if="activities.length === 0" class="no-activities">
              暂无品牌活动信息
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
import { ref, onMounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import homeConfig from '../config/home.config.js';
import { loadConfigFromStorage } from '../services/configService.js';

// 活动数据
const activities = ref([]);

onMounted(async () => {
  // 尝试从服务端加载配置
  const savedConfig = await loadConfigFromStorage();
  
  if (savedConfig && savedConfig.brandActivities) {
    // 使用保存的配置
    activities.value = savedConfig.brandActivities;
  } else {
    // 如果没有保存的配置，使用默认配置
    activities.value = homeConfig.brandActivities;
  }
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

.brand-activities {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.activity-header {
  background-color: #10b981;
  color: white;
  padding: 0.8rem 1.5rem;
  display: inline-block;
  margin-bottom: 2.5rem;
}

.activity-english-title {
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 0.5rem;
  color: #f8fafc;
  opacity: 0.9;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.activity-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.activity-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.activity-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.activity-date {
  color: #10b981;
  font-weight: 500;
  font-size: 1rem;
}

.activity-tag {
  background-color: #e6f7ff;
  color: #0369a1;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.activity-content {
  flex: 1;
}

.activity-title {
  color: #1e293b;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
}

.activity-desc {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.7;
}

.no-activities {
  text-align: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .activity-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
  }

  .activity-icon {
    margin-bottom: 1.5rem;
  }

  .activity-header {
    width: 100%;
    text-align: center;
  }
}
</style>