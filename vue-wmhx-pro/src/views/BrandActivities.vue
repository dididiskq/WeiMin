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
            <!-- 活动1 -->
            <div class="activity-card">
              <div class="activity-icon">
                <div class="icon-placeholder">📚</div>
              </div>
              <div class="activity-content">
                <h4 class="activity-title">为民客厅—可靠性茶话会</h4>
                <p class="activity-desc">在深圳、北京、西安、苏州等地，每月定期开展一次茶话会活动，便于可靠性同行技术交流、经验分享。</p>
              </div>
            </div>

            <!-- 活动2 -->
            <div class="activity-card">
              <div class="activity-icon">
                <div class="icon-placeholder">🌐</div>
              </div>
              <div class="activity-content">
                <h4 class="activity-title">可靠性技术与应用国际论坛</h4>
                <p class="activity-desc">每年联合相关单位举办可靠性国际论坛，共享可靠性技术盛宴。</p>
              </div>
            </div>

            <!-- 活动3 -->
            <div class="activity-card">
              <div class="activity-icon">
                <div class="icon-placeholder">👥</div>
              </div>
              <div class="activity-content">
                <h4 class="activity-title">中国可靠性工程师百人峰会</h4>
                <p class="activity-desc">每年高交会期间，在深圳举办中国可靠性工程师百人峰会，邀请各行业可靠性工程师参与，进行技术交流研讨与发布标准/产品等。</p>
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
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
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
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.8rem;
  display: flex;
  gap: 1.8rem;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
  align-items: flex-start;
}

.activity-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-placeholder {
  color: white;
  font-size: 1.5rem;
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

.activity-icon {
  transition: transform 0.3s ease;
}

.activity-card:hover .activity-icon {
  transform: scale(1.05);
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