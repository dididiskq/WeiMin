<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 最新资讯页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
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
    </main>

    <!-- 引入页脚组件 -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import contentManager from '../utils/contentManager';

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

// 页面加载时获取新闻内容
onMounted(() => {
  newsContent.value = contentManager.getNewsContent();
  
  // 监听内容变化
  contentManager.onContentChange(() => {
    newsContent.value = contentManager.getNewsContent();
  });
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

/* 调整新闻容器的间距 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

/* 新闻列表样式 */
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

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: #64748b;
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
  
  .no-results {
    padding: 2rem 0;
  }
}
</style>