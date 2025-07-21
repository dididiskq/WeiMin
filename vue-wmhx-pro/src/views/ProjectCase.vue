<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 项目案例页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">项目案例</h2>
          <div class="section-divider"></div>
        </div>
        <div class="cases-container">
          <!-- 案例筛选 -->
          <div class="case-filters">
            <button class="filter-btn active">全部案例</button>
            <button class="filter-btn">制造业</button>
            <button class="filter-btn">能源行业</button>
            <button class="filter-btn">电子设备</button>
          </div>

          <!-- 案例列表 -->
          <div class="case-grid">
            <!-- 案例1 -->
            <div class="case-card">
              <div class="case-image">
                <div class="image-placeholder"></div>
              </div>
              <div class="case-info">
                <h3 class="case-title">汽车零部件可靠性提升项目</h3>
                <p class="case-category">制造业</p>
                <p class="case-desc">为某汽车零部件企业提供可靠性分析服务，通过FMEA和加速寿命测试，将产品故障率降低35%。</p>
                <button class="view-details">查看详情</button>
              </div>
            </div>

            <!-- 案例2 -->
            <div class="case-card">
              <div class="case-image">
                <div class="image-placeholder"></div>
              </div>
              <div class="case-info">
                <h3 class="case-title">风力发电设备健康管理系统</h3>
                <p class="case-category">能源行业</p>
                <p class="case-desc">开发基于物联网的风力发电设备健康监测系统，实现故障预警准确率92%，减少停机时间40%。</p>
                <button class="view-details">查看详情</button>
              </div>
            </div>

            <!-- 案例3 -->
            <div class="case-card">
              <div class="case-image">
                <div class="image-placeholder"></div>
              </div>
              <div class="case-info">
                <h3 class="case-title">智能家电可靠性验证平台</h3>
                <p class="case-category">电子设备</p>
                <p class="case-desc">为家电企业构建可靠性验证平台，实现自动化测试流程，测试效率提升60%，产品上市周期缩短25%。</p>
                <button class="view-details">查看详情</button>
              </div>
            </div>

            <!-- 案例4 -->
            <div class="case-card">
              <div class="case-image">
                <div class="image-placeholder"></div>
              </div>
              <div class="case-info">
                <h3 class="case-title">轨道交通信号系统可靠性分析</h3>
                <p class="case-category">制造业</p>
                <p class="case-desc">对轨道交通信号系统进行全面可靠性分析，提出改进方案，将系统MTBF提升至行业领先水平。</p>
                <button class="view-details">查看详情</button>
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

.cases-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 筛选按钮样式 */
.case-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active,
.filter-btn:hover {
  background-color: #10b981;
  color: #ffffff;
  border-color: #10b981;
}

/* 案例网格样式 */
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
  transition: transform 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
}

.case-image {
  height: 180px;
  background-color: #f1f5f9;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  font-size: 2rem;
}

.case-info {
  padding: 1.5rem;
}

.case-title {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.case-category {
  color: #10b981;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.case-desc {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.view-details {
  display: inline-block;
  color: #10b981;
  font-size: 0.9rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.view-details:hover {
  text-decoration: underline;
}
</style>