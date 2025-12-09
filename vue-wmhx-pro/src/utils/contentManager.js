// 内容管理器 - 用于管理最新资讯页面的数据

// 导入配置文件
import siteConfig from '../config/site_config.json';

// 从配置文件获取新闻数据
let mockNewsData = [...siteConfig.mockNewsData];

// 存储内容变化监听器
const contentChangeListeners = [];

// 内容管理器对象
const contentManager = {
  // 获取新闻内容
  getNewsContent() {
    // 从配置文件获取最新数据
    return mockNewsData;
  },
  
  // 监听内容变化
  onContentChange(callback) {
    if (typeof callback === 'function') {
      contentChangeListeners.push(callback);
    }
  },
  
  // 移除内容变化监听
  offContentChange(callback) {
    const index = contentChangeListeners.indexOf(callback);
    if (index > -1) {
      contentChangeListeners.splice(index, 1);
    }
  },
  
  // 触发内容变化（用于模拟数据更新）
  triggerContentChange() {
    contentChangeListeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in content change listener:', error);
      }
    });
  },
  
  // 添加新闻（模拟功能）
  addNews(news) {
    const newNews = {
      id: Date.now(), // 使用时间戳作为唯一ID
      ...news,
      date: news.date || new Date().toISOString().split('T')[0]
    };
    mockNewsData.unshift(newNews);
    this.triggerContentChange();
    return newNews;
  },
  
  // 更新新闻（模拟功能）
  updateNews(id, updates) {
    const index = mockNewsData.findIndex(news => news.id === id);
    if (index > -1) {
      mockNewsData[index] = { ...mockNewsData[index], ...updates };
      this.triggerContentChange();
      return mockNewsData[index];
    }
    return null;
  },
  
  // 删除新闻（模拟功能）
  deleteNews(id) {
    const index = mockNewsData.findIndex(news => news.id === id);
    if (index > -1) {
      const deletedNews = mockNewsData.splice(index, 1);
      this.triggerContentChange();
      return deletedNews[0];
    }
    return null;
  }
};

export default contentManager;