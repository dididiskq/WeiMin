<template>
  <div class="contact-us-page">
    <Header />
    <main class="container">
      <div class="content">
        <div class="section-title">
          <h2>联系我们</h2>
          <div class="english-title">Contact Us</div>
        </div>
        
        <div class="contact-container">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="icon-map-marker"></i>
              </div>
              <div class="contact-details">
                <h3>公司地址</h3>
                <p>深圳市南山区科技园南区科技南十二路007号</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="icon-phone"></i>
              </div>
              <div class="contact-details">
                <h3>联系电话</h3>
                <p>0755-12345678</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="icon-envelope"></i>
              </div>
              <div class="contact-details">
                <h3>电子邮箱</h3>
                <p>contact@reliability-engineering.org</p>
              </div>
            </div>
          </div>
          
          <div class="contact-map">
            <div class="map-placeholder">
              <i class="icon-map"></i>
              <p>地图加载中...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'ContactUs',
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.contact-us-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  padding: 2rem 0;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title h2 {
  font-size: 2rem;
  color: #2a7d2e;
  margin-bottom: 0.5rem;
}

.english-title {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.contact-info {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
}

.contact-item {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background-color: #e8f4e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.contact-icon i {
  color: #2a7d2e;
  font-size: 1.2rem;
}

.contact-details h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.contact-details p {
  color: #666;
  line-height: 1.6;
}

.contact-map {
  background-color: #f9f9f9;
  border-radius: 8px;
  height: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  text-align: center;
  color: #999;
}

.map-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ccc;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
</style>