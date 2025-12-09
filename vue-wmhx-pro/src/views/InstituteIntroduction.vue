<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 为民院简介页面内容 -->
    <main class="page-content">
      <!-- 研究院简介部分 -->
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">为民院简介</h2>
          <div class="section-divider"></div>
        </div>
        <div class="about-us-layout">
          <!-- 左侧文本区域 -->
          <div class="left-text-section">
            <div class="text-block">
              <h3>关于我们介绍</h3>
              <p>为民院致力于可靠性技术创新与应用，是专注于可靠性工程的研究机构。我们拥有一支高水平的专家团队，在可靠性设计、分析、试验与评价等领域具有丰富的经验。</p>
            </div>
            <div class="text-block">
              <h3>愿景</h3>
              <p>成为国内领先、国际知名的可靠性技术创新与应用平台，为国家重大装备和关键产品提供可靠性保障。</p>
            </div>
            <div class="text-block">
              <h3>使命</h3>
              <p>通过技术创新和人才培养，提升我国可靠性技术水平，推动可靠性工程在各个领域的广泛应用。</p>
            </div>
          </div>
          <!-- 右侧视频区域 -->
          <div class="right-video-section">
            <h3>视频</h3>
            <video controls autoplay loop muted class="institute-video">
              <source src="/videos/brief.mp4" type="video/mp4">
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
      </section>
    </main>

    <!-- 引入页脚组件 -->
    <Footer />
  </div>
</template>

<script setup>
import { useConfig } from '@/services/configService.js'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

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

/* 为民院简介布局 */
.about-us-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: center;
  margin-top: 40px;
}

/* 左侧文本区域 */
.left-text-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-block {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.text-block h3 {
  color: #3b82f6;
  font-size: 1.2rem;
  margin-bottom: 12px;
  text-align: center;
}

.text-block p {
  color: #64748b;
  line-height: 1.6;
  text-align: left;
  margin: 0;
}

/* 右侧视频区域 */
.right-video-section {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right-video-section h3 {
  color: #3b82f6;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.institute-video {
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 视频容器样式 */
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  width: 100%;
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

  .about-content h3, .research-directions h3, .development-history h3, .core-advantages h3, .organizations-section h3, .council-section h3, .ecosystem-section h3, .partners-section h3 {
    font-size: 1.5rem;
  }

  .about-us-layout {
    grid-template-columns: 1fr;
  }
}
</style>