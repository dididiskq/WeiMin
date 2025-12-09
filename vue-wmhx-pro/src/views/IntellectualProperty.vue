<template>
  <div class="page-container">
    <!-- 头部组件 -->
    <Header />
    <!-- 主要内容区域 -->
    <main class="page-content">
      <!-- 知识产权和智库区域 -->
      <section class="container">
        <div class="section-header">
          <h2 class="section-title">知识产权和智库</h2>
        </div>

        <!-- 可靠性标准部分 -->
        <div class="section-content">
          <h3 class="subsection-title">可靠性标准</h3>
          <p>为民院团队参与制定多项可靠性工程领域的国家标准和行业标准，推动行业技术进步和规范化发展。</p>
          <div class="standards-grid">
            <div class="standard-item">
              <div class="standard-icon">GB</div>
              <h3>产品可靠性通用要求</h3>
              <p>本标准规定了产品可靠性的通用术语、定义、要求和评价方法，适用于各类产品的可靠性设计、生产和使用过程。</p>
            </div>
            <div class="standard-item">
              <div class="standard-icon">GB</div>
              <h3>可靠性试验方法</h3>
              <p>本标准规定了产品可靠性试验的基本原则、试验方法和程序，为产品可靠性验证提供科学依据。</p>
            </div>
            <div class="standard-item">
              <div class="standard-icon">GB</div>
              <h3>失效模式与影响分析</h3>
              <p>本标准规定了失效模式与影响分析(FMEA)的应用方法和要求，帮助企业识别和预防潜在失效风险。</p>
            </div>
          </div>
        </div>

        <!-- 专著部分 -->
        <div class="section-content">
          <h3 class="subsection-title">专著</h3>
          <p>为民院专家团队撰写多部可靠性工程领域的专著，分享实践经验和前沿技术研究成果。</p>
          <div class="documents-grid">
            <div class="document-item">
              <div class="document-icon">📚</div>
              <h3>现代可靠性工程</h3>
              <p>本书系统介绍了可靠性工程的基本理论、方法和应用，是可靠性工程师的必备参考书籍。</p>
            </div>
            <div class="document-item">
              <div class="document-icon">📚</div>
              <h3>失效分析技术手册</h3>
              <p>本书详细介绍了各种失效分析技术和方法，为解决产品失效问题提供实用指导。</p>
            </div>
            <div class="document-item">
              <div class="document-icon">📚</div>
              <h3>可靠性数据统计分析</h3>
              <p>本书介绍了可靠性数据的收集、整理和统计分析方法，为产品可靠性评估提供数据支持。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!-- 底部组件 -->
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

/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 章节头部样式 */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #3b82f6;
}

.section-divider {
  width: 60px;
  height: 3px;
  background-color: #3b82f6;
  margin: 0 auto;
}

/* 章节内容样式 */
.section-content {
  margin-bottom: 60px;
}

.subsection-title {
  font-size: 1.6rem;
  color: #1e293b;
  text-align: center;
  margin: 0 auto 40px;
  font-weight: 600;
}

.section-content p {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #64748b;
  line-height: 1.6;
}

/* 网格布局样式 */
.standards-grid,
.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

/* 卡片通用样式 */
.standard-item,
.document-item {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.standard-item:hover,
.document-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.standard-icon,
.document-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #dbeafe;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.standard-item h3,
.document-item h3 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: #1e293b;
}

.standard-item p,
.document-item p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: left;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .standards-grid,
  .documents-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}
</style>