<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 专家团队页面内容 -->
    <main class="page-content">
      <!-- 专家团队部分 -->
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">专家团队</h2>
          <div class="section-divider"></div>
        </div>
        <div class="section-content">
          <!-- 北京航天航空大学 -->
          <div class="subsection">
            <h3 class="subsection-title">北京航天航空大学</h3>
            <div class="cooperation-image-container">
              <img src="/static/hezuo.png" alt="合作图片" class="cooperation-image">
            </div>
          </div>
          
          <!-- 工程技术专家 -->
          <div class="subsection">
            <h3 class="subsection-title">工程技术</h3>
            <div v-for="(expert, index) in expertTeam" :key="index" class="engineering-expert">
              <div class="expert-photo-section">
                <div class="expert-photo-container" :style="{ backgroundColor: expert.backgroundColor }">
                  <div class="expert-photo"></div>
                </div>
                <h3 class="expert-name">{{ expert.name }}</h3>
              </div>
              <div class="expert-details">
                <p class="expert-position">{{ expert.position }}</p>
                <p class="expert-description">{{ expert.description }}</p>
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
import { ref } from 'vue'
import { useConfig } from '@/services/configService.js'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// 专家团队相关数据
const { config } = useConfig()
const expertTeam = ref(config.value.expertTeam || [])
</script>

<style scoped>
/* 页面头部样式 */
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

/* 主要内容区域样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 20px;
}

/* 区块头部样式 */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #1e293b;
  position: relative;
  display: inline-block;
}

.section-divider {
  width: 80px;
  height: 3px;
  background: #3b82f6;
  margin: 0 auto;
}

/* 专家团队样式 */
.section-content {
  max-width: 1200px;
  margin: 0 auto;
}

.subsection {
  margin-bottom: 60px;
}

.subsection-title {
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
  color: #1e293b;
}

/* 合作图片样式 */
.cooperation-image-container {
  width: 100%;
  height: auto;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cooperation-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 工程技术专家样式 */
.engineering-expert {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 40px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 左侧照片和姓名区域 */
.expert-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.expert-photo-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.expert-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}

.expert-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  text-align: center;
}

/* 右侧详情区域 */
.expert-details {
  flex: 1;
  padding-top: 10px;
}

.expert-position {
  font-size: 1rem;
  margin-bottom: 12px;
  color: #64748b;
  font-weight: 500;
}

.expert-description {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-content {
    padding: 6rem 0 3rem;
  }

  .section {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .subsection-title {
    font-size: 1.5rem;
  }

  .engineering-expert {
    flex-direction: column;
    align-items: center;
  }

  .expert-details {
    text-align: center;
  }
}
</style>