<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 品牌活动详情页面内容 -->
    <main class="page-content">
      <!-- 品牌活动部分 -->
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
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import homeConfig from '../config/home.config.js';
import { useConfig } from '../services/configService.js';

// 品牌活动相关数据和方法
const { config } = useConfig();
const activities = ref([]);

// 页面加载时获取数据
onMounted(() => {
  // 获取品牌活动数据
  try {
    // 配置已通过useConfig自动加载
    activities.value = config.value.brandActivities || homeConfig.brandActivities;
  } catch (error) {
    console.error('加载配置失败:', error);
    activities.value = homeConfig.brandActivities;
  }
});

onUnmounted(() => {
  console.log('品牌活动页面已卸载');
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

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  color: #1e293b;
  margin-bottom: 1rem;
  position: relative;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: #0f7cd6;
  margin: 0 auto;
}

/* 品牌活动样式 */
.brand-activities {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.activity-header {
  background-color: #3b82f6;
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
  color: #3b82f6;
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

/* 通用样式 */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.no-activities {
  text-align: center;
  padding: 3rem 0;
  color: #64748b;
  font-size: 1.1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-content {
    padding: 6rem 0 3rem;
  }
  
  .section {
    padding: 0 1rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .section-divider {
    width: 60px;
  }
  
  /* 品牌活动响应式 */
  .activity-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
  }

  .activity-header {
    width: 100%;
    text-align: center;
  }
  
  .no-activities {
    padding: 2rem 0;
  }
}
</style>