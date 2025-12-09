<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 合作机构页面内容 -->
    <main class="page-content">
      <!-- 合作机构部分 -->
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">合作机构</h2>
          <div class="section-divider"></div>
        </div>
        <div class="section-content">
          <p>携手共进，共建可靠性技术创新与应用生态系统</p>
          
          <!-- 发起单位 -->
          <div class="organizations-section">
            <h3>发起单位</h3>
            <p>联合行业领军企业共同发起成立，推动可靠性技术标准化与产业化应用。发起单位涵盖制造业、信息技术、科研机构等多个领域，共同致力于提升我国可靠性技术水平。</p>
            <div class="organizations-grid">
              <div class="organization-item hover-lift">
                <div class="organization-icon"><span>01</span></div>
                <h4>行业龙头企业</h4>
                <p>来自电子、机械、汽车等行业的领军企业，具有丰富的可靠性实践经验</p>
              </div>
              <div class="organization-item hover-lift">
                <div class="organization-icon"><span>02</span></div>
                <h4>科研院所</h4>
                <p>国内知名科研机构与高校，提供强大的技术支撑与理论研究</p>
              </div>
              <div class="organization-item hover-lift">
                <div class="organization-icon"><span>03</span></div>
                <h4>行业协会</h4>
                <p>相关行业协会与标准化组织，推动可靠性技术标准的制定与推广</p>
              </div>
            </div>
          </div>

          <!-- 理事会 -->
          <div class="council-section">
            <h3>理事会</h3>
            <p>由学术界、产业界专家组成的决策机构，指导平台发展方向与战略规划。理事会成员具有深厚的学术造诣和丰富的实践经验，为平台发展提供智力支持。</p>
            <div class="council-grid">
              <div class="council-member hover-lift">
                <div class="member-photo"></div>
                <h4>张教授</h4>
                <p class="member-title">理事会主席</p>
                <p class="member-affiliation">清华大学可靠性工程研究所</p>
              </div>
              <div class="council-member hover-lift">
                <div class="member-photo"></div>
                <h4>李总工程师</h4>
                <p class="member-title">理事会副主席</p>
                <p class="member-affiliation">华为技术有限公司</p>
              </div>
              <div class="council-member hover-lift">
                <div class="member-photo"></div>
                <h4>王博士</h4>
                <p class="member-title">理事</p>
                <p class="member-affiliation">中国科学院力学研究所</p>
              </div>
              <div class="council-member hover-lift">
                <div class="member-photo"></div>
                <h4>赵总监</h4>
                <p class="member-title">理事</p>
                <p class="member-affiliation">上海汽车集团股份有限公司</p>
              </div>
            </div>
          </div>

          <!-- 为民生态圈 -->
          <div class="ecosystem-section">
            <h3>为民生态圈</h3>
            <p>构建产学研用一体化生态系统，促进资源共享与协同创新。为民生态圈连接产业链各环节，打造可靠性技术创新与应用的良好生态环境。</p>
            <div class="ecosystem-grid">
              <div class="ecosystem-element hover-lift">
                <div class="ecosystem-icon"><span>01</span></div>
                <h4>技术创新平台</h4>
                <p>联合高校、科研机构与企业，开展可靠性前沿技术研究</p>
              </div>
              <div class="ecosystem-element hover-lift">
                <div class="ecosystem-icon"><span>02</span></div>
                <h4>成果转化中心</h4>
                <p>促进可靠性技术成果的产业化应用与推广</p>
              </div>
              <div class="ecosystem-element hover-lift">
                <div class="ecosystem-icon"><span>03</span></div>
                <h4>人才培养基地</h4>
                <p>培养可靠性领域专业人才，提升行业整体水平</p>
              </div>
            </div>
          </div>

          <!-- 合作企业 -->
          <div class="partners-section">
            <h3>合作企业</h3>
            <div class="partner-image-container">
              <img src="/static/partner.png" alt="合作机构" class="partner-image">
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
import { ref } from 'vue'
import { useConfig } from '@/services/configService.js'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// 合作机构相关数据
const { config } = useConfig()
</script>

<style scoped>
/* 页面头部样式 */
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

/* 主要内容区域样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 20px;
}

/* 区块头部样式 */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #1e293b;
  position: relative;
  display: inline-block;
}

.section-divider {
  width: 80px;
  height: 3px;
  background: #3b82f6;
  margin: 0 auto;
}

/* 合作机构样式 */
.section-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-content p:first-of-type {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 60px;
}

.organizations-section,
.council-section,
.ecosystem-section,
.partners-section {
  margin-bottom: 60px;
}

.organizations-section h3,
.council-section h3,
.ecosystem-section h3,
.partners-section h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.organizations-section p,
.council-section p,
.ecosystem-section p,
.partner-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 20px 0;
}

.partner-image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

/* 组织、生态系统元素样式 */
.organizations-grid,
.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.organization-item,
.ecosystem-element {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.organization-icon,
.ecosystem-icon {
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

.organization-item h4,
.ecosystem-element h4 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: #1e293b;
}

.organization-item p,
.ecosystem-element p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: left;
  margin: 0;
}

/* 理事会成员样式 */
.council-grid,
.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.council-member {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.member-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #dbeafe;
  margin: 0 auto 20px;
}

.council-member h4 {
  font-size: 1.2rem;
  margin-bottom: 6px;
  color: #1e293b;
}

.member-title {
  color: #3b82f6;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 0.95rem;
}

.member-affiliation {
  color: #64748b;
  font-size: 0.9rem;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-content {
    padding: 6rem 0 3rem;
  }

  .section {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .organizations-section h3,
  .council-section h3,
  .ecosystem-section h3,
  .partners-section h3 {
    font-size: 1.5rem;
  }

  .organizations-grid,
  .ecosystem-grid,
  .council-grid {
    grid-template-columns: 1fr;
  }
}
</style>