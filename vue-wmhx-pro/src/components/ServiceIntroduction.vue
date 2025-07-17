<template>
  <div class="service-intro">
    <router-link to="/" class="logo-link">
      <div class="logo">RSE<span class="highlight">TECH</span></div>
    </router-link>
    <div class="section-header">
      <h2 class="section-title">我们的服务</h2>
      <div class="section-divider"></div>
    </div>

    <div class="services-container">
      <div class="service-item hover-lift">
        <div class="service-icon">
          <span>01</span>
        </div>
        <h3>技术咨询服务</h3>
        <p>提供专业的可靠性工程技术咨询，帮助企业解决产品设计、测试和生产过程中的可靠性问题。</p>
      </div>

      <div class="service-item hover-lift">
        <div class="service-icon">
          <span>02</span>
        </div>
        <h3>工程师培训</h3>
        <p>定制化可靠性工程师培训课程，涵盖理论知识与实战技能，提升团队专业能力。</p>
      </div>

      <div class="service-item hover-lift">
        <div class="service-icon">
          <span>03</span>
        </div>
        <h3>系统集成方案</h3>
        <p>为企业提供可靠性测试系统集成方案，包括硬件选型、软件定制和数据分析平台搭建。</p>
      </div>

      <div class="service-item hover-lift">
        <div class="service-icon">
          <span>04</span>
        </div>
        <h3>定制开发服务</h3>
        <p>根据企业特定需求，开发可靠性分析工具和测试平台，提升研发效率和产品质量。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 服务介绍组件
 * 展示公司核心服务内容，包括技术咨询、工程师培训、系统集成方案和定制开发服务
 * 特性：响应式布局、卡片悬停动画、顶部logo导航
 */
// 服务介绍组件，展示公司提供的核心服务内容
</script>

<style scoped>
/* 服务介绍主容器 - 居中布局，限制最大宽度 */
.service-intro {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-link {
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2rem;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
}

.logo .highlight {
  color: #3b82f6;
}

.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

/* 服务卡片 - 半透明背景，悬停时上浮并显示边框动画 */
.service-item {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 8px;
  padding: 2.5rem 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #818cf8);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.service-item:hover::before {
  transform: scaleX(1);
}

/* 服务图标容器 - 圆形背景，突出显示服务序号 */
.service-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.service-icon span {
  color: #3b82f6;
  font-size: 1.5rem;
  font-weight: bold;
}

.service-item h3 {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.service-item p {
  color: #94a3b8;
  line-height: 1.6;
  text-align: center;
  font-size: 0.95rem;
}

/* 响应式适配 - 在移动设备上堆叠显示服务卡片 */
@media (max-width: 768px) {
  .services-container {
    grid-template-columns: 1fr;
  }
}
</style>