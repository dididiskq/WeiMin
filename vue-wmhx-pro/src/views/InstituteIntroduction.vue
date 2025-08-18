<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 研究院简介页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">研究院简介</h2>
          <div class="section-divider"></div>
        </div>
        <div class="institute-content">
          <div class="content-block">
            <h3>关于我们</h3>
            <p>可靠性系统工程研究院（RSE TECH）成立于2015年，专注于可靠性工程技术的研究与应用，致力于推动中国制造业的质量升级和技术创新。</p>
          </div>
          <div class="content-block">
            <h3>研究方向</h3>
            <ul class="direction-list">
              <li>复杂系统可靠性设计与分析</li>
              <li>工业大数据可靠性预测与健康管理</li>
              <li>智能装备故障诊断与寿命预测</li>
              <li>可靠性测试与评价技术</li>
            </ul>
          </div>
          <div class="content-block">
            <h3>发展愿景</h3>
            <p>成为中国可靠性工程领域的领军者，打造国际一流的可靠性技术平台，为制造业转型升级提供核心技术支撑。</p>
          </div>
          <div class="content-block">
            <h3>愿景与使命</h3>
            <p>集合大学科研和专业工程师，打造可靠性共性技术公共服务平台，提升企业高可靠工程能力，支持中国制造业高质量发展。</p>
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

.institute-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.content-block {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
}

.content-block h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  border-left: 4px solid #10b981;
  padding-left: 1rem;
}

.direction-list {
  list-style-type: none;
  padding: 0;
}

.direction-list li {
  padding: 0.8rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #64748b;
  position: relative;
  padding-left: 1.5rem;
}

.direction-list li::before {
  content: '✓';
  color: #10b981;
  position: absolute;
  left: 0;
}
</style>