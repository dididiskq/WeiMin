<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 专家团队页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">专家团队</h2>
          <div class="section-divider"></div>
        </div>
        <div class="team-grid">
          <!-- 动态渲染专家团队 -->
          <div v-for="(expert, index) in config.expertTeam || []" :key="index" class="team-card">
            <div v-if="expert.imageUrl" class="team-photo">
              <img :src="expert.imageUrl" :alt="expert.name">
            </div>
            <div v-else class="team-photo" :style="{ backgroundColor: expert.backgroundColor || '#dcfce7' }"></div>
            <h3 class="team-name">{{ expert.name }}</h3>
            <p class="team-position">{{ expert.position }}</p>
            <p class="team-desc">{{ expert.description }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 引入页脚组件 -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import homeConfig from '../config/home.config.js';
import { useConfig } from "../services/configService.js";

// 使用新的配置服务
const { config } = useConfig();

onMounted(() => {
  // 配置已通过useConfig自动加载
  console.log('专家团队页面已加载');
});

// 组件卸载时不需要特殊清理
onUnmounted(() => {
  console.log('专家团队页面已卸载');
});</script>

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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.team-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(167, 243, 208, 0.2);
}

.team-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.team-photo::after {
  content: '👤';
  font-size: 3rem;
}

.team-name {
  color: #1e293b;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.team-position {
  color: #10b981;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.team-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>