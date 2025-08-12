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
const videoVisible = ref(true);
const scrollTriggered = ref(false);

const handleVideoEnd = () => {
  if (!scrollTriggered.value) {
    videoVisible.value = false;
  }
};

const handleScrollTrigger = () => {
  // 只有当视频可见且滚动触发尚未发生时才执行
  if (videoVisible.value && !scrollTriggered.value) {
    // 检测是否有滚动行为（滚动距离超过10px）
    if (window.scrollY > 10) {
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

onMounted(() => {
  generateParticles();
  sections.value = document.querySelectorAll('.section');
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleScrollTrigger);
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
      <div class="hero-video-container" v-if="videoVisible">
  <video class="hero-video" autoplay muted playsinline @ended="handleVideoEnd">
    <source src="/videos/background.mp4" type="video/mp4">
    您的浏览器不支持视频播放
  </video>
</div>
<div class="video-logo-container" v-else>
  <img src="@/assets/logo.svg" alt="品牌logo" class="animated-logo">
  <div class="hero-content-below-logo">
    <h1 class="hero-title">深圳市为民可靠性系统工程研究院</h1>
    <p class="hero-subtitle">确性可靠性 · 赋能中国制造企业 · 服务创新科技 · 普惠中国智造</p>
    <div class="hero-buttons-with-extras">
      <div class="website-section">
         <a href="https://www.charmingclass.com/" target="_blank" class="website-link-container">
           <div class="website-image-placeholder">场鸣职业课</div>
         </a>
       </div>
      <router-link to="/institute-introduction" class="primary-btn">认识为民可靠性研究院</router-link>
      <router-link to="/project-case" class="secondary-btn">了解产品可靠性</router-link>
      <div class="wechat-qrcode">
        <img src="@/assets/gzh.png" alt="微信公众号二维码" class="qrcode-image">
      </div>
    </div>
  </div>
</div>

      
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 愿景使命 -->

      <!-- 愿景使命 -->
      <section id="vision" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">愿景与使命</h2>
          <div class="section-divider"></div>
        </div>
        <div class="section-content">
          <p>集合大学科研和专业工程师，打造可靠性共性技术公共服务平台，提升企业高可靠工程能力，支持中国制造业高质量发展。</p>
        </div>
      </section>

      <!-- 专家团队 -->
      <section id="team" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">专家团队</h2>
          <div class="section-divider"></div>
        </div>
        <div class="team-grid">
          <!-- 团队成员1 -->
          <router-link to="/expert-team" class="team-card-link">
            <div class="team-card">
              <div class="team-photo" style="background-color: #dcfce7;"></div>
              <h3 class="team-name">张明</h3>
              <p class="team-position">可靠性工程专家</p>
              <p class="team-desc">15年工业可靠性研究经验，曾主导多项国家级可靠性项目。</p>
            </div>
          </router-link>
          <!-- 团队成员2 -->
          <router-link to="/expert-team" class="team-card-link">
            <div class="team-card">
              <div class="team-photo" style="background-color: #dcfce7;"></div>
              <h3 class="team-name">李华</h3>
              <p class="team-position">系统工程师</p>
              <p class="team-desc">专注于复杂系统可靠性分析，发表学术论文20余篇。</p>
            </div>
          </router-link>
          <!-- 团队成员3 -->
          <router-link to="/expert-team" class="team-card-link">
            <div class="team-card">
              <div class="team-photo" style="background-color: #dcfce7;"></div>
              <h3 class="team-name">王芳</h3>
              <p class="team-position">数据分析师</p>
              <p class="team-desc">擅长可靠性数据建模与分析，开发多项预测算法。</p>
            </div>
          </router-link>
          <!-- 团队成员4 -->
          <router-link to="/expert-team" class="team-card-link">
            <div class="team-card">
              <div class="team-photo" style="background-color: #dcfce7;"></div>
              <h3 class="team-name">赵强</h3>
              <p class="team-position">机械工程专家</p>
              <p class="team-desc">专注于机械系统故障诊断与寿命预测技术研究。</p>
            </div>
          </router-link>
          <!-- 团队成员5 -->
          <router-link to="/expert-team" class="team-card-link">
            <div class="team-card">
              <div class="team-photo" style="background-color: #dcfce7;"></div>
              <h3 class="team-name">陈静</h3>
              <p class="team-position">软件可靠性工程师</p>
              <p class="team-desc">负责软件系统可靠性测试与验证方法研究。</p>
            </div>
          </router-link>
          <!-- 团队成员6 -->
          <router-link to="/expert-team" class="team-card-link">
            <div class="team-card">
              <div class="team-photo" style="background-color: #dcfce7;"></div>
              <h3 class="team-name">刘杰</h3>
              <p class="team-position">质量管理专家</p>
              <p class="team-desc">ISO可靠性管理体系认证专家，多家企业顾问。</p>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 核心服务 -->
      <section id="services" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">技术服务</h2>
          <div class="section-divider"></div>
        </div>
        <div class="services-grid">
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>01</span></div>
              <h3>可靠性工程师培训</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>02</span></div>
              <h3>企业可靠性诊断</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>03</span></div>
              <h3>技术项目咨询</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>04</span></div>
              <h3>工程师驻场服务</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>05</span></div>
              <h3>供应链可靠性</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>06</span></div>
              <h3>可靠性正向设计</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>07</span></div>
              <h3>标准和认证</h3>
            </div>
          </router-link>
          <router-link to="/service-content" class="service-card-link">
            <div class="service-card hover-lift">
              <div class="card-icon"><span>08</span></div>
              <h3>企业高可靠平台建设</h3>
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
          <div class="case-card">
            <div class="case-image" style="background-color: #dbeafe;"></div>
            <h3 class="case-title">技术标准</h3>
            <p class="case-desc">制定行业可靠性测试标准与评估体系，涵盖电子、机械、软件等多领域</p>
            <router-link to="/intellectual-property" class="case-link">查看详情 →</router-link>
          </div>
          <div class="case-card">
            <div class="case-image" style="background-color: #dbeafe;"></div>
            <h3 class="case-title">规范文件</h3>
            <p class="case-desc">提供可靠性工程实施指南、流程规范及质量控制文件模板</p>
            <router-link to="/intellectual-property" class="case-link">查看详情 →</router-link>
          </div>
          <div class="case-card">
            <div class="case-image" style="background-color: #dbeafe;"></div>
            <h3 class="case-title">白皮书</h3>
            <p class="case-desc">发布可靠性技术发展趋势、行业应用案例分析及解决方案白皮书</p>
            <router-link to="/intellectual-property" class="case-link">查看详情 →</router-link>
          </div>
          <div class="case-card">
            <div class="case-image" style="background-color: #dbeafe;"></div>
            <h3 class="case-title">专业出版物</h3>
            <p class="case-desc">出版可靠性工程系列专著、期刊及技术论文集</p>
            <router-link to="/intellectual-property" class="case-link">查看详情 →</router-link>
          </div>
          <div class="case-card">
            <div class="case-image" style="background-color: #dbeafe;"></div>
            <h3 class="case-title">培训资料</h3>
            <p class="case-desc">开发专业培训课件、视频教程及实践案例分析材料</p>
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
          <router-link to="/brand-activities" class="activity-card-link">
            <div class="activity-card">
              <div class="activity-date">2023.12.15</div>
              <h3 class="activity-title">2023可靠性工程国际研讨会</h3>
              <p class="activity-desc">汇聚全球可靠性领域专家，探讨前沿技术与应用案例</p>
              <div class="activity-tag">国际会议</div>
            </div>
          </router-link>
          <router-link to="/brand-activities" class="activity-card-link">
            <div class="activity-card">
              <div class="activity-date">2024.03.20</div>
              <h3 class="activity-title">可靠性工程师认证培训</h3>
              <p class="activity-desc">专业认证课程，提升工程师可靠性设计与分析能力</p>
              <div class="activity-tag">培训课程</div>
            </div>
          </router-link>
          <router-link to="/brand-activities" class="activity-card-link">
            <div class="activity-card">
              <div class="activity-date">2024.06.10</div>
              <h3 class="activity-title">制造业可靠性提升峰会</h3>
              <p class="activity-desc">聚焦制造业可靠性痛点，分享最佳实践与解决方案</p>
              <div class="activity-tag">行业峰会</div>
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
          <router-link to="/project-case" class="case-card-link">
            <div class="case-card">
              <div class="case-image" style="background-color: #dbeafe;"></div>
              <h3 class="case-title">汽车电子可靠性测试平台</h3>
              <p class="case-desc">为某汽车电子企业构建全生命周期可靠性测试解决方案</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
          <router-link to="/project-case" class="case-card-link">
            <div class="case-card">
              <div class="case-image" style="background-color: #dbeafe;"></div>
              <h3 class="case-title">工业设备故障预测系统</h3>
              <p class="case-desc">基于AI的设备健康管理系统，实现故障提前预警与维护</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
          <router-link to="/project-case" class="case-card-link">
            <div class="case-card">
              <div class="case-image" style="background-color: #dbeafe;"></div>
              <h3 class="case-title">消费电子可靠性优化项目</h3>
              <p class="case-desc">通过可靠性设计提升消费电子产品使用寿命与用户体验</p>
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
        <div class="agencies-grid">
          <router-link to="/cooperation-agencies" class="agency-card-link">
            <div class="agency-card">
              <div class="agency-icon" style="background-color: #3b82f6;">01</div>
              <h3 class="agency-title">发起单位</h3>
              <p class="agency-desc">联合行业领军企业共同发起成立，推动可靠性技术标准化与产业化应用</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
          <router-link to="/cooperation-agencies" class="agency-card-link">
            <div class="agency-card">
              <div class="agency-icon" style="background-color: #10b981;">02</div>
              <h3 class="agency-title">理事会</h3>
              <p class="agency-desc">由学术界、产业界专家组成的决策机构，指导平台发展方向与战略规划</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
          <router-link to="/cooperation-agencies" class="agency-card-link">
            <div class="agency-card">
              <div class="agency-icon" style="background-color: #8b5cf6;">03</div>
              <h3 class="agency-title">为民生态圈</h3>
              <p class="agency-desc">构建产学研用一体化生态系统，促进资源共享与协同创新</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
          <router-link to="/cooperation-agencies" class="agency-card-link">
            <div class="agency-card">
              <div class="agency-icon" style="background-color: #f59e0b;">04</div>
              <h3 class="agency-title">合作企业</h3>
              <p class="agency-desc">汇聚国内外知名企业，共建可靠性技术创新与应用合作网络</p>
              <span class="case-link">查看详情 →</span>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 重要链接 -->
      <section id="cooperation" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">重要链接</h2>
          <div class="section-divider"></div>
        </div>
        <div class="companies-grid">
          <div class="company-card">
            <div class="company-logo" style="background-color: #dbeafe;">NVIDIA</div>
          </div>
          <div class="company-card">
            <div class="company-logo" style="background-color: #dbeafe;">Qualcomm</div>
          </div>
          <div class="company-card">
            <div class="company-logo" style="background-color: #dbeafe;">Texas Instruments</div>
          </div>
          <div class="company-card">
            <div class="company-logo" style="background-color: #dbeafe;">APTIV</div>
          </div>
          <div class="company-card">
            <div class="company-logo" style="background-color: #dbeafe;">Neusoft</div>
          </div>
          <div class="company-card">
            <div class="company-logo" style="background-color: #dbeafe;">ThunderSoft</div>
          </div>
        </div>
      </section>
      
    </main>


  </div>
  <!-- 引入页脚组件 -->
  <Footer />
</template>

<style scoped>
  /* 调整按钮区域样式 */
  .hero-buttons-with-extras {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 60px;
  }

  .hero-content-below-logo {
    margin-top: 40px;
  }

  .website-section {
    display: flex;
    align-items: center;
  }

  .wechat-qrcode {
    display: flex;
    align-items: center;
  }

  .qrcode-image {
    width: 120px;
    height: 120px;
  }

  .website-image-placeholder {
    width: 120px;
    height: 120px;
    background-color: #f5f5f5;
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
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
  overflow: hidden;
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
  background: radial-gradient(circle at center, rgba(248, 250, 252, 0.05), rgba(248, 250, 252, 0.3) 70%);
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
  padding: 0 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  width: 120px;
  height: 120px;
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
  width: 120px;
  height: 120px;
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
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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
}

.animated-logo {
  width: 200px;
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
  width: 120px;
  height: 120px;
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
.video-logo-container, .hero-content-below-logo {
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

.agencies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 40px;
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
</style>