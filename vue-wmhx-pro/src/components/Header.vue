<template>
  <!-- 全局头部导航组件 - 在所有页面顶部显示 -->
  <!-- 包含logo、主导航菜单和用户操作按钮 -->
  <header class="tech-header">
    <div class="container">
      <nav class="tech-nav">
        <div class="logo">RSE<span class="highlight">TECH</span></div>
        <ul class="nav-links">
          <li><a href="#vision" class="nav-link">研究院简介</a></li>
          <li><a href="#services" class="nav-link">专家团队</a></li>
          <li><a href="#projects" class="nav-link">服务内容</a></li>
          <li><a href="#experts" class="nav-link">活动咨询</a></li>
          <li><a href="#experts" class="nav-link">项目案例</a></li>
          <li><a href="#contact" class="nav-link cta-button">联系我们</a></li>
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

.logo {
  font-size: 1.5rem;
  font-weight: 300;
  color: #fff;
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