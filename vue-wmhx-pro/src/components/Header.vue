<template>
  <!-- 全局头部导航组件 - 在所有页面顶部显示 -->
  <!-- 包含logo、主导航菜单和用户操作按钮 -->
  <header class="tech-header">
    <div class="container">
      <nav class="tech-nav">
        <router-link to="/" class="logo-link"><img src="@/assets/logo.svg" alt="品牌logo" class="logo-img"><span class="logo-text">深圳市为民可靠性系统工程研究院</span></router-link>
        <ul class="nav-links">
          <li><router-link to="/institute-introduction" class="nav-link">研究院简介</router-link></li>
          <li><router-link to="/expert-team" class="nav-link">专家团队</router-link></li>
          <li><router-link to="/service-content" class="nav-link">服务内容</router-link></li>
          <li><router-link to="/brand-activities" class="nav-link">品牌活动</router-link></li>
          <li><router-link to="/project-case" class="nav-link">项目案例</router-link></li>
          <li><router-link to="/intellectual-property" class="nav-link">知识产权和智库</router-link></li>
          <li><router-link to="/cooperation-agencies" class="nav-link">合作机构</router-link></li>
          <li><router-link to="/contact-us" class="nav-link cta-button">联系我们</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
  // 头部导航组件逻辑
  // 处理导航交互和响应式行为
</script>

<style scoped>
  /* 头部导航样式 - 半透明背景、模糊效果 */
  /* 固定定位在页面顶部，随滚动保持可见 */
.tech-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #2aaa84;
  backdrop-filter: blur(10px);
  padding: 1rem 5%;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo-link {
  text-decoration: none;
}

.logo-img {
  height: 22px;
  width: auto;
  transition: transform 0.3s ease;
  vertical-align: middle;
}

.logo-text {
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 10px;
  vertical-align: middle;
}

.logo-img:hover {
  transform: scale(1.05);
}

.logo:hover {
  color: #dcfce7;
}

.highlight {
  color: #3b82f6;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #fafbfc;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
}

.cta-button {
  background: #3b82f6;
  color: white !important;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>