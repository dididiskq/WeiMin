<template>
  <div class="config-manager-container">
    <div class="header-actions">
      <h1>配置管理</h1>
      <button class="logout-btn" @click="logout">登出</button>
    </div>
    
    <!-- 英雄区域配置 -->
    <section class="config-section">
      <h2>英雄区域配置</h2>
      <div class="form-group">
        <label for="hero-title">标题</label>
        <input type="text" id="hero-title" v-model="config.hero.title" />
      </div>
      <div class="form-group">
        <label for="hero-subtitle">副标题</label>
        <input type="text" id="hero-subtitle" v-model="config.hero.subtitle" />
      </div>
      <div class="form-group">
        <label for="hero-logo">Logo</label>
        <input type="file" id="hero-logo" @change="handleFileUpload('hero', 'logo')" />
        <div v-if="config.hero.logo" class="preview">
          <img :src="config.hero.logo" alt="Logo预览" />
        </div>
      </div>
      <div class="form-group">
        <label for="hero-websiteImage">网站图片</label>
        <input type="file" id="hero-websiteImage" @change="handleFileUpload('hero', 'websiteImage')" />
        <div v-if="config.hero.websiteImage" class="preview">
          <img :src="config.hero.websiteImage" alt="网站图片预览" />
        </div>
      </div>
      <div class="form-group">
        <label for="hero-wechatQrcode">微信二维码</label>
        <input type="file" id="hero-wechatQrcode" @change="handleFileUpload('hero', 'wechatQrcode')" />
        <div v-if="config.hero.wechatQrcode" class="preview">
          <img :src="config.hero.wechatQrcode" alt="微信二维码预览" />
        </div>
      </div>
    </section>

    <!-- 最新资讯轮播图配置 -->
    <section class="config-section">
      <h2>最新资讯轮播图配置</h2>
      <div v-for="(news, index) in config.newsSlider" :key="index" class="array-item">
        <h3>资讯 {{ index + 1 }}</h3>
        <div class="form-group">
          <label>图片</label>
          <input type="file" @change="handleFileUpload('newsSlider', index, 'image')" />
          <div v-if="news.image" class="preview">
            <img :src="news.image" alt="资讯图片预览" />
          </div>
        </div>
        <div class="form-group">
          <label>标题</label>
          <input type="text" v-model="news.caption" />
        </div>
      </div>
    </section>

    <!-- 专家团队配置 -->
    <section class="config-section">
      <h2>专家团队配置</h2>
      <div v-for="(expert, index) in config.expertTeam" :key="index" class="array-item">
        <h3>专家 {{ index + 1 }}</h3>
        <div class="form-group">
          <label>姓名</label>
          <input type="text" v-model="expert.name" />
        </div>
        <div class="form-group">
          <label>职位</label>
          <input type="text" v-model="expert.position" />
        </div>
        <div class="form-group">
          <label>描述</label>
          <textarea v-model="expert.description"></textarea>
        </div>
        <div class="form-group">
          <label>背景颜色</label>
          <input type="color" v-model="expert.backgroundColor" />
        </div>
      </div>
    </section>

    <!-- 其他配置项可以根据需要添加 -->

    <div class="action-buttons">
      <button class="save-button" @click="saveConfig">保存配置</button>
      <button class="reset-button" @click="resetConfig">重置</button>
    </div>
    
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script>
import homeConfig from '../config/home.config.js';
import { saveConfigToStorage, loadConfigFromStorage, handleImageUpload } from '../services/configService.js';

export default {
  name: 'ConfigManager',
  data() {
    return {
      config: JSON.parse(JSON.stringify(homeConfig)), // 直接使用默认配置初始化
      message: '',
      messageType: 'success',
      uploadedImages: {}
    }
  },
  beforeMount() {
    // 检查是否已登录，使用与AdminLogin.vue一致的键名
    if (!localStorage.getItem('adminLoggedIn')) {
      this.$router.push('/admin-login');
    }
  },
  mounted() {
    // 尝试从本地存储加载配置
    const savedConfig = loadConfigFromStorage();
    
    if (savedConfig) {
      // 使用保存的配置
      this.config = JSON.parse(JSON.stringify(savedConfig));
    }
    
    // 处理URL对象转换为字符串
    this.normalizeConfigURLs();
  },
  methods: {
    // 登出功能
    logout() {
      localStorage.removeItem('adminLoggedIn');
      this.$router.push('/admin-login');
    },
    
    // 将URL对象转换为字符串
    normalizeConfigURLs() {
      // 处理英雄区域的URL
      if (this.config.hero.logo) {
        this.config.hero.logo = typeof this.config.hero.logo === 'string' ? this.config.hero.logo : this.config.hero.logo.href;
      }
      if (this.config.hero.websiteImage) {
        this.config.hero.websiteImage = typeof this.config.hero.websiteImage === 'string' ? this.config.hero.websiteImage : this.config.hero.websiteImage.href;
      }
      if (this.config.hero.wechatQrcode) {
        this.config.hero.wechatQrcode = typeof this.config.hero.wechatQrcode === 'string' ? this.config.hero.wechatQrcode : this.config.hero.wechatQrcode.href;
      }
      
      // 处理资讯轮播图的URL
      if (this.config.newsSlider && Array.isArray(this.config.newsSlider)) {
        this.config.newsSlider.forEach(item => {
          if (item.image) {
            item.image = typeof item.image === 'string' ? item.image : item.image.href;
          }
        });
      }
    },
    
    // 处理文件上传
    async handleFileUpload(section, index, field) {
      const input = event.target;
      if (input.files && input.files[0]) {
        try {
          // 使用配置服务处理图片上传
          const imageUrl = await handleImageUpload(input.files[0]);
          
          // 更新配置
          if (field) {
            this.config[section][index][field] = imageUrl;
          } else {
            this.config[section][index] = imageUrl;
          }
          
          // 存储上传的图片信息
          this.uploadedImages[`${section}-${index}-${field || ''}`] = input.files[0];
        } catch (error) {
          console.error('上传图片失败:', error);
          this.message = error.message || '上传图片失败，请重试！';
          this.messageType = 'error';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      }
    },
    
    // 保存配置
    saveConfig() {
      try {
        // 使用配置服务保存配置到本地存储
        const success = saveConfigToStorage(this.config);
        
        if (success) {
          // 显示成功消息
          this.message = '配置保存成功！';
          this.messageType = 'success';
        } else {
          throw new Error('保存到本地存储失败');
        }
        
        // 3秒后隐藏消息
        setTimeout(() => {
          this.message = '';
        }, 3000);
      } catch (error) {
        console.error('保存配置失败:', error);
        this.message = '保存配置失败，请重试！';
        this.messageType = 'error';
      }
    },
    
    // 重置配置
    resetConfig() {
      this.config = JSON.parse(JSON.stringify(homeConfig));
      this.normalizeConfigURLs();
      this.uploadedImages = {};
      this.message = '配置已重置！';
      this.messageType = 'info';
      
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.config-manager-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.logout-btn:hover {
  background-color: #c82333;
}

.config-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.config-section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3b82f6;
}

.config-section h3 {
  color: #555;
  margin: 1rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input[type="file"] {
  margin-bottom: 1rem;
}

.preview {
  margin-top: 0.5rem;
}

.preview img {
  max-width: 200px;
  max-height: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.array-item {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #2563eb;
}

.reset-button {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #4b5563;
}

.message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.success {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.info {
  background-color: #dbeafe;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}
</style>