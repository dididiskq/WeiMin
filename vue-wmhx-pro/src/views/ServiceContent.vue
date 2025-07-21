<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 服务内容页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">服务内容</h2>
          <div class="section-divider"></div>
        </div>
        <div class="services-container">
          <!-- 服务类别1 -->
          <div class="service-category">
            <h3 class="category-title">工程师培训</h3>
            <div class="service-cards">
              <div class="service-card">
                <div class="card-icon">📚</div>
                <h4>可靠性基础课程</h4>
                <p>面向工程师的可靠性基础知识培训，涵盖可靠性工程原理、工具与方法。</p>
              </div>
              <div class="service-card">
                <div class="card-icon">🎯</div>
                <h4>高级应用培训</h4>
                <p>针对有经验工程师的进阶培训，深入讲解复杂系统可靠性分析技术。</p>
              </div>
            </div>
          </div>

          <!-- 服务类别2 -->
          <div class="service-category">
            <h3 class="category-title">企业系统诊断</h3>
            <div class="service-cards">
              <div class="service-card">
                <div class="card-icon">🔍</div>
                <h4>系统健康评估</h4>
                <p>对企业现有系统进行全面评估，识别潜在可靠性风险与改进机会。</p>
              </div>
              <div class="service-card">
                <div class="card-icon">📊</div>
                <h4>数据驱动诊断</h4>
                <p>基于工业大数据分析的系统故障诊断与预测，提高设备运行可靠性。</p>
              </div>
            </div>
          </div>

          <!-- 服务类别3 -->
          <div class="service-category">
            <h3 class="category-title">技术咨询示范</h3>
            <div class="service-cards">
              <div class="service-card">
                <div class="card-icon">💡</div>
                <h4>可靠性设计咨询</h4>
                <p>为新产品开发提供可靠性设计咨询，从源头提升产品质量与可靠性。</p>
              </div>
              <div class="service-card">
                <div class="card-icon">🏭</div>
                <h4>现场技术示范</h4>
                <p>在企业现场进行可靠性技术示范应用，指导工程师实际操作与应用。</p>
              </div>
            </div>
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

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.service-category {
  margin-bottom: 4rem;
}

.category-title {
  color: #1e293b;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  border-left: 4px solid #10b981;
  padding-left: 1rem;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #dcfce7;
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.service-card h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.service-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>