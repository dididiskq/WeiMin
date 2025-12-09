<template>
  <div class="about-us-page">
    <!-- 页面头部区域 -->
    <div class="page-header">
      <div class="container">
        <h1>关于我们</h1>
        <p>可靠性技术创新与应用平台</p>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <main class="container">
      <!-- 研究院简介部分 -->
      <section id="研究院简介" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">为民院简介</h2>
          <div class="section-divider"></div>
        </div>
        <div class="about-us-layout">
          <!-- 左侧文本区域 -->
          <div class="left-text-section">
            <div class="text-block">
              <h3>关于我们介绍</h3>
              <p>为民院致力于可靠性技术创新与应用，是专注于可靠性工程的研究机构。我们拥有一支高水平的专家团队，在可靠性设计、分析、试验与评价等领域具有丰富的经验。</p>
            </div>
            <div class="text-block">
              <h3>愿景</h3>
              <p>成为国内领先、国际知名的可靠性技术创新与应用平台，为国家重大装备和关键产品提供可靠性保障。</p>
            </div>
            <div class="text-block">
              <h3>使命</h3>
              <p>通过技术创新和人才培养，提升我国可靠性技术水平，推动可靠性工程在各个领域的广泛应用。</p>
            </div>
          </div>
          <!-- 右侧视频区域 -->
          <div class="right-video-section">
            <h3>视频</h3>
            <video controls autoplay loop muted class="institute-video">
              <source src="/videos/brief.mp4" type="video/mp4">
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
      </section>

      <!-- 专家团队部分 -->
      <section id="专家团队" class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">专家团队</h2>
          <div class="section-divider"></div>
        </div>
        <div class="section-content">
          <!-- 北京航天航空大学 -->
          <div class="subsection">
            <h3 class="subsection-title">北京航天航空大学</h3>
            <div class="cooperation-image-container">
              <img src="/static/hezuo.png" alt="合作图片" class="cooperation-image">
            </div>
          </div>
          
          <!-- 工程技术专家 -->
          <div class="subsection">
            <h3 class="subsection-title">工程技术</h3>
            <div v-for="(expert, index) in expertTeam.slice(3)" :key="index" class="engineering-expert">
              <div class="expert-photo-section">
                <div class="expert-photo-container" :style="{ backgroundColor: expert.backgroundColor }">
                  <div class="expert-photo"></div>
                </div>
                <h3 class="expert-name">{{ expert.name }}</h3>
              </div>
              <div class="expert-details">
                <p class="expert-position">{{ expert.position }}</p>
                <p class="expert-description">{{ expert.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 合作机构部分 -->
      <section id="合作机构" class="section fade-in">
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
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useConfig } from '@/services/configService.js'

export default {
  name: 'AboutUs',
  components: {
    Header,
    Footer
  },
  setup() {
    const { config } = useConfig()
    return {
      config,
      expertTeam: config.value.expertTeam || []
    }
  }
}
</script>

<style scoped>
/* 页面基础样式 */
.about-us-page {
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  background-color: #f8fafc;
  padding-top: 80px;
}

/* 页面头部样式 */
.page-header {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.page-header p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

/* 主要内容区域样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: 80px 0;
  border-bottom: 1px solid #e2e8f0;
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

.section-content p {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #64748b;
  line-height: 1.6;
}

/* 研究院简介样式 */
.about-us-section {
  margin-bottom: 60px;
}

.about-content h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #1e293b;
  text-align: center;
}

.about-content p {
  text-align: left;
  margin-bottom: 16px;
  line-height: 1.8;
}

/* 研究方向样式 */
.research-directions {
  margin-bottom: 60px;
}

.research-directions h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

.directions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.direction-item {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.direction-item h4 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #3b82f6;
}

.direction-item p {
  text-align: left;
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

/* 发展历程样式 */
.development-history {
  margin-bottom: 60px;
}

.development-history h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 2px;
  background: #3b82f6;
}

.timeline-item {
  margin-bottom: 40px;
  position: relative;
  padding-left: 100px;
}

.timeline-date {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 30px;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 4px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 44px;
  top: 15px;
  width: 14px;
  height: 14px;
  background: white;
  border: 3px solid #3b82f6;
  border-radius: 50%;
}

.timeline-content h4 {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.timeline-content p {
  text-align: left;
  margin: 0;
  color: #64748b;
}

/* 核心优势样式 */
.core-advantages h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.advantage-item {
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.advantage-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #dbeafe;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 20px;
}

.advantage-item h4 {
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.advantage-item p {
  text-align: center;
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

/* 子模块样式 */
.subsection {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 合作图片样式 */
.cooperation-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.cooperation-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.subsection-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
  text-align: center;
  position: relative;
}

.subsection-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background-color: #3b82f6;
}

/* 专家团队样式 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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

.team-card-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.team-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.team-name {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1e293b;
}

.team-position {
  font-size: 0.9rem;
  margin-bottom: 0;
  color: #64748b;
}

.team-description {
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.85;
}

/* 工程技术专家样式 */
.engineering-expert {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 40px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 左侧照片和姓名区域 */
.expert-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.expert-photo-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.expert-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}

.expert-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  text-align: center;
}

/* 右侧详情区域 */
.expert-details {
  flex: 1;
  padding-top: 10px;
}

.expert-position {
  font-size: 1rem;
  margin-bottom: 12px;
  color: #64748b;
  font-weight: 500;
}

.expert-description {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 0;
}

/* 合作机构样式 */
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

/* 为民院简介布局 */
.about-us-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: center;
  margin-top: 40px;
}

/* 左侧文本区域 */
.left-text-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-block {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.text-block h3 {
  color: #3b82f6;
  font-size: 1.2rem;
  margin-bottom: 12px;
  text-align: center;
}

.text-block p {
  color: #64748b;
  line-height: 1.6;
  text-align: left;
  margin: 0;
}

/* 右侧视频区域 */
.right-video-section {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right-video-section h3 {
  color: #3b82f6;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.institute-video {
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 视频容器样式 */
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  width: 100%;
}

/* 合作图片样式 */
.cooperation-image-container {
  width: 100%;
  height: auto;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cooperation-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 合作企业样式 */
.partner-item {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.partner-logo {
  width: 120px;
  height: 60px;
  background-color: #dbeafe;
  margin: 0 auto 20px;
  border-radius: 4px;
}

.partner-item h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #1e293b;
}

.partner-item p {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section {
    padding: 60px 0;
  }

  .about-content h3,
  .research-directions h3,
  .development-history h3,
  .core-advantages h3,
  .organizations-section h3,
  .council-section h3,
  .ecosystem-section h3,
  .partners-section h3 {
    font-size: 1.5rem;
  }

  .timeline::before {
    left: 25px;
  }

  .timeline-item {
    padding-left: 70px;
  }

  .timeline-date {
    width: 50px;
    height: 25px;
    font-size: 0.9rem;
  }

  .timeline-item::before {
    left: 19px;
    top: 13px;
    width: 10px;
    height: 10px;
  }

  .directions-grid,
  .advantages-grid,
  .team-grid,
  .organizations-grid,
  .ecosystem-grid,
  .council-grid,
  .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>