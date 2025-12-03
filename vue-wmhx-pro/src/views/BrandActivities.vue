<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 品牌活动页面内容 -->
    <main class="page-content">
      <!-- 最新资讯部分 -->
      <section id="最新资讯" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">最新资讯</h2>
          <div class="section-divider"></div>
        </div>
        
        <!-- 资讯列表 -->
        <div class="news-container">
          <div 
            v-for="news in filteredNews" 
            :key="news.id" 
            class="news-item hover-lift"
          >
            <div class="news-image-wrapper">
              <img :src="news.image" alt="news.title" class="news-image">
            </div>
            <div class="news-content">
              <div class="news-meta">
                <span class="news-date">{{ news.date }}</span>
                <span class="news-category">{{ news.category }}</span>
              </div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-summary">{{ news.summary }}</p>
              <!-- 增加更多文字内容 -->
              <div v-if="news.content" class="news-preview-content">
                <p v-for="(paragraph, idx) in previewParagraphs(news)" :key="idx">{{ paragraph }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 没有结果提示 -->
        <div v-if="filteredNews.length === 0" class="no-results">
          <p>暂无相关资讯</p>
        </div>
      </section>

      <!-- 品牌活动部分 -->
      <section id="品牌活动" class="section fade-in" style="margin-top: 4rem;">
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import contentManager from '../utils/contentManager';
import homeConfig from '../config/home.config.js';
import { useConfig } from '../services/configService.js';

// 最新资讯相关数据和方法
const newsContent = ref([]);

// 获取新闻预览段落（用于卡片显示更多文字）
const previewParagraphs = (news) => {
  if (!news.content) return [];
  // 提取前2个段落作为预览内容
  const paragraphs = news.content.split('\n\n').filter(p => p.trim()).slice(0, 2);
  return paragraphs;
};

// 计算新闻列表（按日期排序，最新的在前）
const filteredNews = computed(() => {
  let result = [...newsContent.value];
  
  // 按日期排序（最新的在前）
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return result;
});

// 品牌活动相关数据和方法
const { config } = useConfig();
const activities = ref([]);

// 页面加载时获取数据
onMounted(() => {
  // 获取新闻内容
  newsContent.value = contentManager.getNewsContent();
  
  // 监听内容变化
  contentManager.onContentChange(() => {
    newsContent.value = contentManager.getNewsContent();
  });

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
  background: #0f7cd6; /* 与导航栏一致的蓝色 */
  margin: 0 auto;
}

/* 最新资讯样式 */
.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.news-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.news-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-item:hover .news-image {
  transform: scale(1.05);
}

.news-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #64748b;
}

.news-title {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-summary {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
}

/* 预览内容样式 */
.news-preview-content {
  margin-top: 0.5rem;
}

.news-preview-content p {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0.75rem;
  text-align: justify;
  font-size: 0.95rem;
}

/* 品牌活动样式 */
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

/* 通用样式 */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.no-results,
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
  
  /* 最新资讯响应式 */
  .news-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .news-item {
    border-radius: 6px;
  }
  
  .news-image-wrapper {
    height: 180px;
  }
  
  .news-content {
    padding: 1.25rem;
  }
  
  .news-title {
    font-size: 1.15rem;
    margin-bottom: 0.75rem;
    /* 处理长标题 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .news-summary {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
  
  .news-preview-content p {
    font-size: 0.85rem;
    line-height: 1.6;
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
  
  .no-results,
  .no-activities {
    padding: 2rem 0;
  }
}
</style>