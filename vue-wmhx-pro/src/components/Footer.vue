<template>
  <!-- 全局页脚组件 - 在所有页面底部显示 -->
  <!-- 包含公司信息、导航链接和版权声明 -->
  <footer class="tech-footer">
    <div class="footer-container">
      <div class="footer-columns">
        <div class="footer-column">
          <h3 class="footer-title">关于我们</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">公司简介</a></li>
            <li><a href="#" class="footer-link">团队介绍</a></li>
            <li><a href="#" class="footer-link">新闻动态</a></li>
            <li><a href="#" class="footer-link">加入我们</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3 class="footer-title">服务内容</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">工程师培训</a></li>
            <li><a href="#" class="footer-link">技术咨询</a></li>
            <li><a href="#" class="footer-link">系统集成</a></li>
            <li><a href="#" class="footer-link">定制开发</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3 class="footer-title">资源中心</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">技术文档</a></li>
            <li><a href="#" class="footer-link">案例研究</a></li>
            <li><a href="#" class="footer-link">行业报告</a></li>
            <li><a href="#" class="footer-link">常见问题</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3 class="footer-title">联系我们</h3>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">联系方式</a></li>
            <li><a href="#" class="footer-link">在线留言</a></li>
            <li><a href="#" class="footer-link">意见反馈</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-logo">RSE<span class="highlight">TECH</span></div>
        <div class="footer-copyright">© 2025 RSETECH. 保留所有权利</div>
        <div class="footer-social">
          <a href="#" class="social-icon">微信</a>
          <a href="#" class="social-icon">微博</a>
          <a href="#" class="social-icon">知乎</a>
          <a href="#" class="social-icon">B站</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  /* 页脚容器样式 - 深色背景、白色文字 */
  /* 固定在页面底部，确保内容始终可见 */
.tech-footer {
  background-color: #2aaa84;
  color: #fff;
  padding: 4rem 0 0;
  margin-top: 5rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  left: 0;
  right: 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 0;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

.footer-title {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  color: #c1c4c9;
  text-decoration: none;
  margin-bottom: 0.8rem;
  display: block;
  transition: color 0.3s ease, transform 0.3s;
}

.footer-link:hover {
  color: #fff;
  transform: translateX(3px);
}

.footer-link:hover {
  color: #3b82f6;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 0;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 300;
  color: #fff;
}

.footer-copyright {
  font-size: 0.9rem;
}

.footer-social {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.social-icon {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #3b82f6;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>