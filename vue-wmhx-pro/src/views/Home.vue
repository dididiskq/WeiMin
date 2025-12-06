<script setup>
import { onMounted, ref, onUnmounted, getCurrentInstance } from 'vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import { useConfig } from "../services/configService.js";

/**
 * 首页组件 - 包含粒子背景、导航栏、英雄区域和主要内容区块
 * 实现粒子动画效果和滚动触发动画
 */

const particles = ref([]);
const sections = ref([]);
const videoVisible = ref(true);
const scrollTriggered = ref(false);
const { config } = useConfig(); // 使用新的配置服务
const activities = ref([]);
const isLoading = ref(true);
const instance = getCurrentInstance();

const handleVideoEnd = () => {
  if (!scrollTriggered.value) {
    videoVisible.value = false;
  }
};

const handleScrollTrigger = () => {
  // 只有当视频可见且滚动触发尚未发生时才执行
  if (videoVisible.value && !scrollTriggered.value) {
    // 检测是否有明显的滚动行为（滚动距离超过10px）
    if (window.scrollY > 5) {
      scrollTriggered.value = true;
      videoVisible.value = false;
    }
  }
};

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

onMounted(async () => {
  // 配置已通过全局$siteConfig自动加载
  // 设置加载状态
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
  
  // 使用全局配置中的数据
  if (instance?.proxy?.$siteConfig?.brandActivities) {
    activities.value = instance.proxy.$siteConfig.brandActivities;
  }
  
  generateParticles();
  sections.value = document.querySelectorAll('.section');
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初始检查
  
  // 延迟2秒后添加滚动触发器，确保视频有足够时间开始播放
  setTimeout(() => {
    window.addEventListener('scroll', handleScrollTrigger);
  }, 2000);

  // 窗口调整时重新生成粒子
  window.addEventListener('resize', generateParticles);
  
  // 保存监听器以便在组件卸载时移除
  onUnmounted(() => {
    // 移除所有事件监听器
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', handleScrollTrigger);
    window.removeEventListener('resize', generateParticles);
  });
  


  // 初始化滚动图片区域
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
      const sliderItems = document.querySelectorAll('.slider-item');
      const totalItems = sliderItems.length;
      const itemWidth = 530; // 包含边距的宽度 (500px宽度 + 15px*2边距)
      let currentPosition = 0;
      let currentIndex = 0; // 当前激活的索引

      // 绑定静态指示器事件
      setTimeout(() => {
        const indicators = document.querySelectorAll('.indicator');
        if (indicators.length > 0) {
          indicators.forEach((indicator, index) => {
            // 确保初始状态正确
            if (index === currentIndex) {
              indicator.classList.add('active');
            } else {
              indicator.classList.remove('active');
            }

            // 添加点击事件
            indicator.addEventListener('click', () => {
              currentIndex = index;
              updateIndicators();
              currentPosition = -index * itemWidth;
              sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
              sliderWrapper.style.transform = `translateX(${currentPosition}px)`;
            });
          });
        } else {
          console.warn('未找到指示器元素');
        }
      }, 100);

      // 更新指示器状态
      function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
          if (index === currentIndex) {
            indicator.classList.add('active');
          } else {
            indicator.classList.remove('active');
          }
        });
      }

      // 设置初始位置
      currentPosition = 0;
      sliderWrapper.style.transform = `translateX(${currentPosition}px)`;

      // 复制元素以实现无缝滚动
      sliderItems.forEach(item => {
        const clone = item.cloneNode(true);
        sliderWrapper.appendChild(clone);
      });

      function slide() {
        currentPosition -= itemWidth;
        sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
        sliderWrapper.style.transform = `translateX(${currentPosition}px)`;

        // 更新当前索引
        currentIndex = (currentIndex + 1) % totalItems;
        updateIndicators();

        // 当滚动完一轮后，重置位置
        if (Math.abs(currentPosition) >= totalItems * itemWidth) {
          setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentPosition = 0;
            sliderWrapper.style.transform = `translateX(${currentPosition}px)`;
            // 重置索引到起始位置
            currentIndex = 0;
            updateIndicators();
          }, 500);
        }
      }

      // 每5秒滚动一次
      setInterval(slide, 5000);
    }
});
</script>

<template>
  <div class="app-container">
    <!-- 粒子背景容器 -->
    <div id="particle-container" class="particle-container"></div>

    <Header />

    <!-- 英雄区域 -->
    <header class="hero-section">
      <!-- 配置加载占位内容 -->
      <div v-if="isLoading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 100;">
        <h2>欢迎访问深圳市为民可靠性系统工程研究院</h2>
        <p>系统正在加载配置，请稍候...</p>
      </div>
      <div class="hero-video-container" :class="{ hidden: !videoVisible }">
  <video class="hero-video" autoplay muted playsinline @ended="handleVideoEnd">
    <source :src="$siteConfig?.hero?.video || '/static/videos/hero.mp4'" type="video/mp4">
    您的浏览器不支持视频播放
  </video>
</div>
<div class="video-logo-container" :class="{ visible: !videoVisible }">
  <img :src="$siteConfig?.hero?.logo || '/static/images/logo.png'" alt="品牌logo" class="animated-logo">
  <div class="hero-content-below-logo">
    <h1 class="hero-title">{{ $siteConfig?.hero?.title || '网站标题' }}</h1>
    <p class="hero-subtitle">{{ $siteConfig?.hero?.subtitle || '网站副标题' }}</p>
    <div class="hero-buttons-with-extras">
      <div class="website-section">
         <a href="https://www.charmingclass.com/" target="_blank" class="website-link-container">
           <img :src="$siteConfig?.hero?.websiteImage || '/static/images/website.png'" alt="场鸣职业课" class="website-image">
         </a>
       </div>
      <router-link to="/institute-introduction" class="primary-btn">认识为民可靠性研究院</router-link>
      <router-link to="/project-case" class="secondary-btn">了解产品可靠性</router-link>
      <div class="wechat-qrcode">
        <img :src="$siteConfig?.hero?.wechatQrcode || '/static/images/qrcode.png'" alt="微信公众号二维码" class="qrcode-image">
      </div>
    </div>
  </div>
</div>

      
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">

      <!-- 滚动图片展示区 -->
      <section id="image-slider" class="section fade-in" style="background-color: white;">
        <div class="section-header">
          <h2 class="section-title">最新资讯</h2>
          <div class="section-divider"></div>
        </div>
        <div class="slider-container">
          <div class="slider-wrapper">
            <div class="slider-item" v-for="(item, index) in $siteConfig?.newsSlider || []" :key="index">
              <div class="image-container">
                <img :src="item.image" :alt="item.caption" class="slider-image">
              </div>
              <p class="image-caption">{{ item.caption }}</p>
            </div>
          </div>
          <div class="slider-indicators">
            <div class="indicator active" data-index="0"></div>
            <div class="indicator" data-index="1"></div>
            <div class="indicator" data-index="2"></div>
            <div class="indicator" data-index="3"></div>
            <div class="indicator" data-index="4"></div>
          </div>
        </div>
      </section>

      <!-- 专家团队 -->
      <section id="team" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">专家团队</h2>
          <div class="section-divider"></div>
        </div>
        <div class="team-grid-wrapper">
          <div class="team-grid">
            <router-link to="/expert-team" class="team-card-link" v-for="(expert, index) in ($siteConfig?.expertTeam || []).slice(0, 5)" :key="index">
              <div class="team-card">
                <div class="team-photo" :style="{ backgroundColor: expert.backgroundColor || '#dcfce7' }"></div>
                <h3 class="team-name">{{ expert.name || '未知专家' }}</h3>
                <p class="team-position">{{ expert.position || '未知职位' }}</p>
              </div>
            </router-link>
          </div>
          <!-- 更多专家按钮 -->
          <router-link to="/expert-team" class="team-card-link more-team-link small-more-button">
            <div class="team-card more-team-card">
              <div class="more-team-content">
                <span class="more-team-text">更多</span>
                <span class="more-team-icon">→</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 核心服务 -->
      <section id="services" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">主营业务</h2>
          <div class="section-divider"></div>
        </div>
        <div class="services-grid">
          <router-link to="/service-content" class="service-card-link" v-for="(service, index) in $siteConfig?.services || []" :key="index">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>{{ service.id }}</span></div>
              <h3>{{ service.title }}</h3>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 知识产权和智库 -->
      <section id="intellectual-property" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">知识产权和智库</h2>
          <div class="section-divider"></div>
        </div>
        <div class="cases-grid">
          <div class="case-card" v-for="(item, index) in $siteConfig?.intellectualProperty || []" :key="index">
            <div class="case-image" :style="{ backgroundColor: item.backgroundColor }"></div>
            <h3 class="case-title">{{ item.title }}</h3>
            <p class="case-desc">{{ item.description }}</p>
            <router-link to="/intellectual-property" class="case-link">查看详情 →</router-link>
          </div>
        </div>
      </section>

      <!-- 品牌活动 -->
      <section id="activities" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">品牌活动</h2>
          <div class="section-divider"></div>
        </div>
        <div class="activities-container">
          <router-link to="/brand-activities" class="activity-card-link" v-for="(activity, index) in activities" :key="index">
            <div class="activity-card">
              <div class="activity-date">{{ activity.date }}</div>
              <h3 class="activity-title">{{ activity.title }}</h3>
              <p class="activity-desc">{{ activity.description }}</p>
              <div class="activity-tag">{{ activity.tag }}</div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 项目案例 -->
      <section id="cases" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">项目案例</h2>
          <div class="section-divider"></div>
        </div>
        <div class="cases-grid">
          <router-link to="/project-case" class="case-card-link" v-for="(project, index) in $siteConfig?.projectCases || []" :key="index">
            <div class="case-card">
              <div class="case-image" :style="{ backgroundColor: project.backgroundColor }"></div>
              <h3 class="case-title">{{ project.title }}</h3>
              <p class="case-desc">{{ project.description }}</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 合作机构 -->
      <section id="cooperation-agencies" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">合作机构</h2>
          <div class="section-divider"></div>
        </div>
        <div class="partner-image-container">
          <img src="/static/partner.png" alt="合作机构" class="partner-image">
        </div>
      </section>

      <!-- 重要链接 -->
      <section id="cooperation" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">重要链接</h2>
          <div class="section-divider"></div>
        </div>
        <div class="companies-grid">
          <div class="company-card" v-for="(company, index) in $siteConfig?.importantLinks || []" :key="index">
            <div class="company-logo" :style="{ backgroundColor: company.backgroundColor }">{{ company.name }}</div>
          </div>
        </div>
      </section>
      
    </main>


  </div>
  <!-- 引入页脚组件 -->
  <Footer />
</template>

<style scoped>
.website-image {
  width: 110px;
  height: 100px;
  object-fit: contain;
}
  /* 调整按钮区域样式 */
  .hero-buttons-with-extras {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;
    flex-wrap: wrap;
    margin-top: 60px;
  }

  .hero-content-below-logo {
    margin-top: 40px;
  }

  .website-section {
    display: flex;
    align-items: center;
    border: 1px solid #3b82f6;
    border-radius: 4px;
  }

  .wechat-qrcode {
    display: flex;
    align-items: center;
  }

  .qrcode-image {
    width: 100px;
    height: 100px;
  }

  .website-image-placeholder {
      width: 115px;
      height: 115px;
      background-color: transparent;
      border: 1px solid #ddd; 
      
      border-radius: 4px;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .hero-buttons-with-extras {
      flex-direction: column;
    }
  }
/* 链接样式 */
.activity-card-link, .service-card-link, .team-card-link, .case-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.case-card-link .case-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.case-card-link:hover .case-link {
  color: #2563eb;
}
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
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.hero-content-moved {
  max-width: 800px;
  margin: 2rem auto 4rem;
  text-align: center;
  padding: 2rem;
  transform: translateY(-20px);
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
  font-size: 3.8rem;
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

.hero-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: opacity 1s ease, transform 1s ease;
  z-index: 2;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1;
}

/* 按钮样式 */
.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.primary-btn {
  /* background: #3b82f6;
  color: white; */
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  padding: 0 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
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
  padding: 0 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
}

.secondary-btn:hover {
  background: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
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
  max-width: 1500px;
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

.section-logo {
  max-height: 80px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
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

/* 专家团队 */
.team-grid-wrapper {
  position: relative;
  margin-top: 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
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
}

/* 更多专家按钮样式 */
.more-team-link .team-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background-color: #f8fafc;
  border-style: dashed;
  cursor: pointer;
}

.more-team-link:hover .team-card {
  background-color: #f1f5f9;
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(167, 243, 208, 0.2);
}

.more-team-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.more-team-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #3b82f6;
}

.more-team-icon {
  font-size: 1.5rem;
  color: #3b82f6;
}

/* 缩小版更多按钮 */
.small-more-button {
  position: absolute;
  bottom: -2rem;
  right: 0;
  width: 80px;
  height: 80px;
  z-index: 10;
}

.small-more-button .team-card {
  min-height: auto;
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 50%;
  border: 1px dashed #3b82f6;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.small-more-button:hover .team-card {
  background-color: #f8fafc;
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.small-more-button .more-team-content {
  gap: 0.25rem;
}

.small-more-button .more-team-text {
  font-size: 0.9rem;
}

.small-more-button .more-team-icon {
  font-size: 1rem;
}

/* 视频区域logo动画 */
.video-logo-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  transition: opacity 1s ease, transform 1s ease;
  opacity: 0;
  transform: scale(0.9);
  z-index: 1;
}

.animated-logo {
  width: 150px;
  height: auto;
  animation: scaleIn 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transform: scale(0);
  opacity: 0;
  margin-top: -280px;
}

.middle-connect-area {
  position: absolute;
  bottom: -2%;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  animation: floatUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards;
  transform: translateY(50px);
  opacity: 0;
  z-index: 5;
}

.website-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.website-text {
  font-size: 0.9rem;
  color: #4b5563;
}

.website-image-placeholder {
  width: 120px;
  height: 120px;
  background-color: #f3f4f6;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
}

.hero-content-below-logo {
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  text-align: center;
  animation: floatUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  transform: translateY(50px);
  opacity: 0;
  margin-top: 120px;
  z-index: 10;
}

.website-link-container {
  text-decoration: none;
}

.website-image-placeholder {
  width: 120px;
  height: 120px;
  background-color: #f3f4f6;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
}

.website-link-container:hover .website-image-placeholder {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.wechat-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.qrcode-image {
  width: 115px;
  height: 115px;
  object-fit: contain;
  background-color: #f3f4f6;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.qrcode-text {
  font-size: 0.9rem;
  color: #4b5563;
}

/* 确保动画只触发一次 */
.video-logo-container.visible {
  opacity: 1;
  transform: scale(1);
}

.hero-video-container.hidden {
  opacity: 0;
  transform: scale(1.1);
}

/* 确保动画只触发一次 */
.hero-content-below-logo {
  animation-play-state: running;
}

.hero-content-below-logo {
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 2rem;
  animation: floatUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards;
  transform: translateY(50px);
  opacity: 0;
  margin-top: 30px;
}

@keyframes floatUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
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
  color: #3b82f6;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 0.9rem;
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

/* 合作企业 */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.company-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.company-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.company-card:hover .company-logo {
  transform: scale(1.1);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
}

/* 品牌活动 */
.activities-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.activity-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
}

.activity-date {
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.activity-title {
  color: #1e293b;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.activity-desc {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.activity-tag {
  display: inline-block;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* 项目案例 */
.cases-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
}

.case-image {
  height: 180px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3b82f6;
}

.case-title {
  color: #1e293b;
  margin-bottom: 0.5rem;
  padding: 0 1.5rem;
}

.case-desc {
  color: #64748b;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
  line-height: 1.6;
}

.case-link {
  display: inline-block;
  color: #3b82f6;
  font-weight: 500;
  padding: 0 1.5rem 1.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
  margin-top: auto;
}

.case-link:hover {
  color: #2563eb;
}

/* 合作机构样式 */
#vision {
  background-color: #ffffff;
  padding: 80px 0;
  margin-top: 40px;
}

.partner-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  padding: 20px 0;
}

.partner-image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

.agency-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.agency-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.agency-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.agency-title {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 12px;
}

.agency-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

/* 主要内容区域 */.card-icon {
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
  /* 滚动图片区域样式 */
  #image-slider {
    padding: 4rem 0;
    background-color: #f8fafc;
  }

  .slider-container {
    width: 100%; /* 屏幕宽度的五分之四 */
    margin: 2rem auto;
    overflow: hidden;
    position: relative;
  }

  .slider-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
    will-change: transform;
  }

  .slider-item {
    flex: 0 0 auto;
    width: 500px;
    margin: 0 15px;
    transition: transform 0.3s ease;
  }

  .slider-item:hover {
    transform: translateY(-10px);
  }

  .image-container {
    width: 100%;
    height: 250px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 30px; /* 将图片向下移动30px */
  }

  .slider-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  /* 轮播指示器样式 */
  .slider-indicators {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap: 15px;
    z-index: 100;
    position: relative;
    padding: 10px 0;
    background-color: transparent;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #94a3b8;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .indicator.active {
    width: 16px;
    height: 16px;
    background-color: #1e40af;
    transform: scale(1.3);
    border-color: #3b82f6;
  }

  /* 已取消图片变大效果 */

  .image-caption {
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #333;
  }

  /* 已取消浮动效果 */
</style>