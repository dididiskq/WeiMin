<script setup>
import { onMounted, ref } from 'vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';

/**
 * 首页组件 - 包含粒子背景、导航栏、英雄区域和主要内容区块
 * 实现粒子动画效果和滚动触发动画
 */

const particles = ref([]);
const sections = ref([]);

/**
 * 生成粒子背景效果
 * 创建随机大小、位置和动画的粒子元素，实现科技感背景
 */
const generateParticles = () => {
  const container = document.getElementById('particle-container');
  if (!container) return;

  particles.value = [];
  container.innerHTML = '';

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(particle);
    particles.value.push(particle);
  }
};

/**
 * 处理滚动事件，检测元素是否进入视口
 * 当元素顶部距离视口底部小于视口高度的75%时，添加可见类
 */
const handleScroll = () => {
  sections.value.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      section.classList.add('visible');
    }
  });
};

onMounted(() => {
  generateParticles();
  sections.value = document.querySelectorAll('.section');
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初始检查

  // 窗口调整时重新生成粒子
  window.addEventListener('resize', generateParticles);
});
</script>

<template>
  <div class="app-container">
    <!-- 粒子背景容器 -->
    <div id="particle-container" class="particle-container"></div>

    <Header />

    <!-- 英雄区域 -->
    <header class="hero-section">
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="/videos/background.mp4" type="video/mp4">
        您的浏览器不支持视频播放
      </video>
      
      <div class="hero-gradient"></div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 视频下方内容区 -->
      <section class="section fade-in">
        <div class="hero-content-moved">
          <h1 class="hero-title">服务创新科技 · 普惠中国智造</h1>
          <p class="hero-subtitle">推动可靠性理论应用，赋能百万工程师</p>
          <div class="hero-buttons">
            <router-link to="/services" class="primary-btn">了解服务</router-link>
            <button class="secondary-btn">查看案例</button>
          </div>
        </div>
      </section>

      <!-- 愿景使命 -->
      <section id="vision" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">愿景与使命</h2>
          <div class="section-divider"></div>
        </div>
        <div class="section-content">
          <p>打造可靠性知识共享平台，提升企业系统能力，服务中国制造转型升级。</p>
        </div>
      </section>

      <!-- 核心服务 -->
      <section id="services" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">核心服务</h2>
          <div class="section-divider"></div>
        </div>
        <div class="services-grid">
          <div class="service-card hover-lift">
            <div class="card-icon"><span>01</span></div>
            <h3>工程师培训</h3>
          </div>
          <div class="service-card hover-lift">
            <div class="card-icon"><span>02</span></div>
            <h3>企业系统诊断</h3>
          </div>
          <div class="service-card hover-lift">
            <div class="card-icon"><span>03</span></div>
            <h3>技术咨询示范</h3>
          </div>
          <div class="service-card hover-lift">
            <div class="card-icon"><span>04</span></div>
            <h3>标准体系建设</h3>
          </div>
          <div class="service-card hover-lift">
            <div class="card-icon"><span>05</span></div>
            <h3>可靠性平台搭建</h3>
          </div>
        </div>
      </section>
    </main>

   
  </div>
   <!-- 引入页脚组件 -->
  <Footer />
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
}

/* 粒子背景 */
/* 粒子背景容器 - 固定定位覆盖整个视口 */
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  background: rgba(156, 163, 175, 0.3);
  border-radius: 50%;
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

/* 英雄区域 */
/* 英雄区域 - 全屏视频背景+渐变叠加层，居中展示主标题 */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.hero-content-moved {
  max-width: 800px;
  margin: 4rem auto;
  text-align: center;
  padding: 2rem;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #475569;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  margin-left: calc(-50vw + 50%);
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(248, 250, 252, 0.2), rgba(248, 250, 252, 0.8) 70%);
  z-index: 1;
}

/* 按钮样式 */
.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.primary-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.primary-btn:hover {
  background: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
}

.secondary-btn {
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-3px);
}

/* 主要内容区域 */
.main-content {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
}

/* 通用区块样式 */
/* 通用区块样式 - 初始隐藏，滚动到视图中时显示动画 */
.section {
  max-width: 1200px;
  margin: 0 auto 8rem;
  padding: 0 2rem;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1s ease, transform 1s ease;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.1s;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  color: #070000;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: #3b82f6;
}

.section-divider {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  margin: 1rem auto 0;
}

/* 愿景使命 */
.section-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  color: #94a3b8;
  font-size: 1.1rem;
  line-height: 1.8;
}

/* 服务卡片 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.card-icon span {
  color: #3b82f6;
  font-size: 1.2rem;
  font-weight: bold;
}

.service-card h3 {
  color: #1e293b;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .nav-links {
    display: none;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>