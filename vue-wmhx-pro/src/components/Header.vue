<template>
  <!-- 全局头部导航组件 - 在所有页面顶部显示 -->
  <!-- 包含logo、主导航菜单和用户操作按钮 -->
  <header class="tech-header">
    <div class="container">
      <nav class="tech-nav">
        <router-link to="/" class="logo-link" active-class="active">
          <img src="@/assets/logo.svg" alt="品牌logo" class="logo-img">
          <span class="logo-text">深圳市为民可靠性系统工程研究院</span>
        </router-link>
        <ul class="nav-links">
          <!-- 首页 -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">首页</router-link>
          </li>
          <!-- 关于我们 -->
          <li class="nav-item">
            <router-link to="/about-us" class="nav-link" active-class="active">
              关于我们
            </router-link>
            <!-- 关于我们的下拉内容 -->
            <div class="dropdown-item">
              <ul class="sub-nav">
                <li><router-link to="/about-us#为民院简介" class="sub-nav-link">为民院简介</router-link></li>
                <li><router-link to="/about-us#专家团队" class="sub-nav-link">专家团队</router-link></li>
                <li><router-link to="/about-us#合作机构" class="sub-nav-link">合作机构</router-link></li>
              </ul>
            </div>
          </li>
          <!-- 主营业务 -->
          <li class="nav-item">
            <router-link to="/main-business" class="nav-link" active-class="active">
              主营业务
            </router-link>
            <!-- 主营业务的下拉内容 -->
            <div class="dropdown-item">
              <ul class="sub-nav">
                <li><router-link to="/main-business#主营业务" class="sub-nav-link">主营业务</router-link></li>
                <li><router-link to="/main-business#项目案例" class="sub-nav-link">项目案例</router-link></li>
                <li><router-link to="/main-business#知识产权和智库" class="sub-nav-link">知识产权和智库</router-link></li>
              </ul>
            </div>
          </li>
          <!-- 品牌活动 -->
          <li class="nav-item">
            <router-link to="/brand-activities" class="nav-link" active-class="active">
              品牌活动
            </router-link>
            <!-- 品牌活动的下拉内容 -->
            <div class="dropdown-item">
              <ul class="sub-nav">
                <li><router-link to="/brand-activities#最新资讯" class="sub-nav-link">最新资讯</router-link></li>
                <li><router-link to="/brand-activities#品牌活动" class="sub-nav-link">品牌活动</router-link></li>
              </ul>
            </div>
          </li>
          <!-- 联系我们 -->
          <li class="nav-item">
            <router-link to="/contact-us" class="nav-link cta-button" active-class="active">
              联系我们
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { watch } from 'vue';
  
  // 获取当前路由信息
  const route = useRoute();
  const router = useRouter();
  
  // 监听路由变化，确保导航正常工作
  watch(() => route.path, (newPath) => {
    console.log(`Header组件检测到路由变化: ${newPath}`);
    // 确保滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
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
  /* background: #2aaa84; */
  background: #0f7cd6;
  backdrop-filter: blur(10px);
  padding: 1rem 5%;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  display: flex;
  align-items: center;
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
  position: relative;
}

/* 主导航项样式 */
.nav-links > li {
  position: relative;
  padding: 0;
  margin: 0;
}

.nav-link {
  color: #fafbfc;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  display: block;
  padding: 0.5rem 0;
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

/* 导航项样式 */
.nav-item {
  position: relative;
  display: inline-block;
}

/* 导航项的下拉内容 */
.dropdown-item {
  position: absolute;
  top: 100%;
  left: 50%;
  /* 科技风半透明背景 */
  background: rgba(255, 255, 255, 0.95);
  /* 蓝色科技边框效果 */
  border: 1px solid rgba(15, 124, 214, 0.3);
  border-radius: 0 0 12px 12px;
  /* 科技感阴影效果 */
  box-shadow: 0 8px 24px rgba(15, 124, 214, 0.15),
              0 0 20px rgba(15, 124, 214, 0.05);
  z-index: 1001;
  margin-top: -1px;
  /* 平滑过渡效果 */
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -10px);
  transition: all 0.3s ease;
  min-width: 180px;
  /* 确保与导航标题完全对齐 */
  padding: 0;
  backdrop-filter: blur(5px);
}

/* 子导航内容居中 */
.sub-nav {
  text-align: center;
}

/* 当鼠标悬停在导航项上时显示下拉内容 */
.nav-item:hover .dropdown-item {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

/* 子导航样式 */
.sub-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 180px;
}

.sub-nav-link {
  color: #1e293b;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;
  display: block;
  white-space: nowrap;
}

.sub-nav-link:hover {
  background: #f1f5f9;
  color: #0f7cd6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>