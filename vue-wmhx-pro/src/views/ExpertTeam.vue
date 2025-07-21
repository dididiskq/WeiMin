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
          <!-- 专家1 -->
          <div class="team-card">
            <div class="team-photo" style="background-color: #dcfce7;"></div>
            <h3 class="team-name">张明</h3>
            <p class="team-position">可靠性工程专家</p>
            <p class="team-desc">15年工业可靠性研究经验，曾主导多项国家级可靠性项目，发表学术论文30余篇。</p>
          </div>
          <!-- 专家2 -->
          <div class="team-card">
            <div class="team-photo" style="background-color: #dcfce7;"></div>
            <h3 class="team-name">李华</h3>
            <p class="team-position">系统工程师</p>
            <p class="team-desc">专注于复杂系统可靠性分析，参与制定多项行业标准，拥有10项相关专利。</p>
          </div>
          <!-- 专家3 -->
          <div class="team-card">
            <div class="team-photo" style="background-color: #dcfce7;"></div>
            <h3 class="team-name">王芳</h3>
            <p class="team-position">数据分析师</p>
            <p class="team-desc">擅长可靠性数据建模与分析，开发多项预测算法，曾服务于多家世界500强企业。</p>
          </div>
          <!-- 专家4 -->
          <div class="team-card">
            <div class="team-photo" style="background-color: #dcfce7;"></div>
            <h3 class="team-name">赵强</h3>
            <p class="team-position">机械工程专家</p>
            <p class="team-desc">专注于机械系统故障诊断与寿命预测技术研究，出版专著2部，行业培训讲师。</p>
          </div>
          <!-- 专家5 -->
          <div class="team-card">
            <div class="team-photo" style="background-color: #dcfce7;"></div>
            <h3 class="team-name">陈静</h3>
            <p class="team-position">软件可靠性工程师</p>
            <p class="team-desc">负责软件系统可靠性测试与验证方法研究，参与开发多款可靠性分析软件工具。</p>
          </div>
          <!-- 专家6 -->
          <div class="team-card">
            <div class="team-photo" style="background-color: #dcfce7;"></div>
            <h3 class="team-name">刘杰</h3>
            <p class="team-position">质量管理专家</p>
            <p class="team-desc">ISO可靠性管理体系认证专家，多家企业顾问，帮助企业建立可靠性管理体系。</p>
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