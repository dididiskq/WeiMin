<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 主营业务页面内容 -->
    <main class="page-content">
      <!-- 服务内容部分 -->
      <section id="服务内容" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">服务内容</h2>
          <div class="section-divider"></div>
        </div>
        <div class="services-container">
          <!-- 服务类别1 -->
          <div class="service-category">
            <h3 class="category-title">核心技术服务</h3>
            <div class="service-cards">
              <div v-for="service in coreServices" :key="service.id" class="service-card hover-lift">
                <div class="card-icon"><span>{{ service.id }}</span></div>
                <h4>{{ service.title || service.name }}</h4>
                <p v-if="service.description && service.description.trim()" class="service-description">
                  {{ service.description }}
                </p>
                <p v-else class="service-description placeholder">
                  {{ getDefaultDescription(service.id) || '暂无描述信息' }}
                </p>
              </div>
            </div>
          </div>

          <!-- 服务类别2 -->
          <div class="service-category">
            <h3 class="category-title">高级解决方案</h3>
            <div class="service-cards">
              <div v-for="service in advancedServices" :key="service.id" class="service-card hover-lift">
                <div class="card-icon"><span>{{ service.id }}</span></div>
                <h4>{{ service.title || service.name }}</h4>
                <p v-if="service.description && service.description.trim()" class="service-description">
                  {{ service.description }}
                </p>
                <p v-else class="service-description placeholder">
                  {{ getDefaultDescription(service.id) || '暂无描述信息' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目案例部分 -->
      <section id="项目案例" class="section fade-in bg-white">
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

      <!-- 知识产权和智库部分 -->
      <section id="知识产权和智库" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">知识产权和智库</h2>
          <div class="section-divider"></div>
        </div>
        <div class="container">
          <!-- 技术标准 -->
          <div class="section-content">
            <p>制定行业可靠性测试标准与评估体系，涵盖电子、机械、软件等多领域。我们的标准体系基于国际先进经验，结合国内实际需求，为企业提供科学、规范的可靠性技术指导。</p>
            <div class="standards-grid">
              <div class="standard-item hover-lift">
                <div class="standard-icon"><span>01</span></div>
                <h3>电子可靠性标准</h3>
                <p>涵盖电子元器件、电路板、电子设备的可靠性测试与评估方法</p>
              </div>
              <div class="standard-item hover-lift">
                <div class="standard-icon"><span>02</span></div>
                <h3>机械可靠性标准</h3>
                <p>针对机械结构、传动系统、材料疲劳等方面的可靠性测试规范</p>
              </div>
              <div class="standard-item hover-lift">
                <div class="standard-icon"><span>03</span></div>
                <h3>软件可靠性标准</h3>
                <p>软件缺陷管理、可靠性建模、测试方法与质量评估标准</p>
              </div>
            </div>
          </div>

          <!-- 规范文件 -->
          <div class="section-content">
            <p>提供可靠性工程实施指南、流程规范及质量控制文件模板，帮助企业建立完善的可靠性管理体系，提升产品质量与竞争力。</p>
            <div class="documents-grid">
              <div class="document-item hover-lift">
                <div class="document-icon"><span>01</span></div>
                <h3>可靠性工程实施指南</h3>
                <p>详细介绍可靠性工程的基本概念、方法流程与实施步骤</p>
              </div>
              <div class="document-item hover-lift">
                <div class="document-icon"><span>02</span></div>
                <h3>可靠性测试流程规范</h3>
                <p>规范可靠性测试的策划、执行、数据分析与报告编制流程</p>
              </div>
              <div class="document-item hover-lift">
                <div class="document-icon"><span>03</span></div>
                <h3>质量控制文件模板</h3>
                <p>提供各类可靠性相关质量控制文件的标准模板与填写指南</p>
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
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import defaultConfig from '../config/home.config';
import { useConfig } from "../services/configService";

// 使用配置服务
const { config } = useConfig();

// 计算属性：核心技术服务（前4个）
const coreServices = ref([]);

// 计算属性：高级解决方案（后4个）
const advancedServices = ref([]);

// 更新服务数据的函数
const updateServicesData = () => {
  try {
    // 获取服务列表（优先从配置中获取，如果没有则使用默认配置）
    const services = config.value?.services || defaultConfig.services || [];
    
    // 确保按照ID排序
    const sortedServices = [...services].sort((a, b) => {
      if (!a.id || !b.id) return 0;
      return a.id.localeCompare(b.id);
    });
    
    // 分配服务到不同类别
    coreServices.value = sortedServices.slice(0, 4);
    advancedServices.value = sortedServices.slice(4, 8);
  } catch (error) {
    console.error('Error updating services data:', error);
    coreServices.value = [];
    advancedServices.value = [];
  }
};

// 监听配置更新事件
const handleConfigUpdated = (event) => {
  try {
    if (event?.detail?.config) {
      config.value = event.detail.config;
      updateServicesData();
    }
  } catch (error) {
    console.error('Error handling config update:', error);
  }
};

// 获取默认描述信息
const getDefaultDescription = (serviceId) => {
  try {
    if (!defaultConfig.services || !Array.isArray(defaultConfig.services)) {
      return '';
    }
    const defaultService = defaultConfig.services.find(s => s.id === serviceId);
    return defaultService?.description || '';
  } catch (error) {
    console.error('Error getting default description:', error);
    return '';
  }
};

// 组件挂载时初始化
onMounted(() => {
  window.addEventListener('config-updated', handleConfigUpdated);
  updateServicesData();
});

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('config-updated', handleConfigUpdated);
});
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

/* 服务内容样式 */
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
  border-left: 4px solid #3b82f6;
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
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  min-height: 80px;
  padding: 0.5rem 0;
}

.service-description {
  display: block;
  word-break: break-word;
}

.service-description.placeholder {
  color: #94a3b8;
  font-style: italic;
}

/* 项目案例样式 */
.cases-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section.bg-white {
  background-color: #ffffff;
  margin: 2rem 0;
  padding: 4rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* 筛选按钮样式 */
.case-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
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
  background-color: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
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
  color: #3b82f6;
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
  color: #3b82f6;
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
  color: #3b82f6;
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

/* 知识产权样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

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

.section-content {
  margin-bottom: 60px;
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
  .service-cards,
  .case-grid,
  .standards-grid,
  .documents-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .case-filters {
    justify-content: center;
  }
}
</style>