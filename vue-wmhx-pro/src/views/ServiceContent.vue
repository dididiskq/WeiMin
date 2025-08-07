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
            <h3 class="category-title">核心技术服务</h3>
            <div class="service-cards">
              <div class="service-card hover-lift">
                <div class="card-icon"><span>01</span></div>
                <h4>可靠性工程师培训</h4>
                <p>提供全面的可靠性工程师培训课程，涵盖基础理论、工具应用与实战案例分析，提升工程师专业技能。</p>
              </div>
              <div class="service-card hover-lift">
                <div class="card-icon"><span>02</span></div>
                <h4>企业可靠性诊断</h4>
                <p>对企业现有产品和流程进行全面可靠性诊断，识别潜在风险点，提供改进建议和优化方案。</p>
              </div>
              <div class="service-card hover-lift">
                <div class="card-icon"><span>03</span></div>
                <h4>技术项目咨询</h4>
                <p>为企业提供可靠性相关技术项目咨询服务，包括项目规划、实施指导和成果评估等。</p>
              </div>
              <div class="service-card hover-lift">
                <div class="card-icon"><span>04</span></div>
                <h4>工程师驻场服务</h4>
                <p>派遣资深可靠性工程师到企业驻场，提供一对一技术支持和问题解决，确保项目顺利实施。</p>
              </div>
            </div>
          </div>

          <!-- 服务类别2 -->
          <div class="service-category">
            <h3 class="category-title">高级解决方案</h3>
            <div class="service-cards">
              <div class="service-card hover-lift">
                <div class="card-icon"><span>05</span></div>
                <h4>供应链可靠性</h4>
                <p>提供供应链可靠性管理解决方案，帮助企业评估和提升供应链各环节的可靠性水平。</p>
              </div>
              <div class="service-card hover-lift">
                <div class="card-icon"><span>06</span></div>
                <h4>可靠性正向设计</h4>
                <p>从产品设计阶段开始，融入可靠性理念和方法，确保产品从源头就具备高可靠性特性。</p>
              </div>
              <div class="service-card hover-lift">
                <div class="card-icon"><span>07</span></div>
                <h4>标准和认证</h4>
                <p>提供可靠性相关标准咨询和认证服务，帮助企业满足行业标准要求，提升产品竞争力。</p>
              </div>
              <div class="service-card hover-lift">
                <div class="card-icon"><span>08</span></div>
                <h4>企业高可靠平台建设</h4>
                <p>协助企业构建高可靠性管理平台，整合数据、工具和流程，实现可靠性管理的系统化和数字化。</p>
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
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