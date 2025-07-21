<template>
  <div class="page-container">
    <!-- 引入头部导航组件 -->
    <Header />

    <!-- 活动咨询页面内容 -->
    <main class="page-content">
      <section class="section fade-in">
        <div class="section-header">
          <h2 class="section-title">活动咨询</h2>
          <div class="section-divider"></div>
        </div>
        <div class="activities-container">
          <!-- 即将举办的活动 -->
          <div class="upcoming-activities">
            <h3 class="section-subtitle">即将举办</h3>
            <div class="activity-list">
              <div class="activity-card">
                <div class="activity-date">
                  <span class="month">6月</span>
                  <span class="day">15日</span>
                </div>
                <div class="activity-details">
                  <h4 class="activity-title">2023可靠性工程国际研讨会</h4>
                  <p class="activity-desc">汇聚国内外可靠性领域专家，探讨最新技术与应用案例。</p>
                  <div class="activity-meta">
                    <span class="location">📍 上海国际会议中心</span>
                    <button class="register-btn">立即报名</button>
                  </div>
                </div>
              </div>
              <div class="activity-card">
                <div class="activity-date">
                  <span class="month">7月</span>
                  <span class="day">22日</span>
                </div>
                <div class="activity-details">
                  <h4 class="activity-title">可靠性工程师高级研修班</h4>
                  <p class="activity-desc">为期三天的实战培训，掌握可靠性设计与分析核心技能。</p>
                  <div class="activity-meta">
                    <span class="location">📍 北京科技大厦</span>
                    <button class="register-btn">立即报名</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 活动咨询表单 -->
          <div class="consultation-form">
            <h3 class="section-subtitle">活动咨询</h3>
            <form class="contact-form">
              <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" id="name" placeholder="请输入您的姓名">
              </div>
              <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" placeholder="请输入您的邮箱">
              </div>
              <div class="form-group">
                <label for="phone">电话</label>
                <input type="tel" id="phone" placeholder="请输入您的电话">
              </div>
              <div class="form-group">
                <label for="interest">感兴趣的活动</label>
                <select id="interest">
                  <option value="">请选择活动类型</option>
                  <option value="seminar">技术研讨会</option>
                  <option value="training">培训课程</option>
                  <option value="exhibition">行业展会</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">咨询内容</label>
                <textarea id="message" rows="4" placeholder="请输入您的咨询内容"></textarea>
              </div>
              <button type="submit" class="submit-btn">提交咨询</button>
            </form>
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

.activities-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.section-subtitle {
  color: #1e293b;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  border-left: 4px solid #10b981;
  padding-left: 1rem;
}

/* 活动列表样式 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
}

.activity-date {
  background-color: #dcfce7;
  color: #10b981;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.month {
  font-size: 0.9rem;
  font-weight: 500;
}

.day {
  font-size: 1.5rem;
  font-weight: bold;
}

.activity-details {
  flex: 1;
}

.activity-title {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.activity-desc {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location {
  color: #64748b;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 表单样式 */
.consultation-form {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(167, 243, 208, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #1e293b;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(167, 243, 208, 0.3);
}

textarea {
  resize: vertical;
}

.register-btn, .submit-btn {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover, .submit-btn:hover {
  background-color: #059669;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .activities-container {
    grid-template-columns: 1fr;
  }
}
</style>