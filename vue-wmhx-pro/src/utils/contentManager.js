// 内容管理器 - 用于管理最新资讯页面的数据

// 模拟新闻数据
const mockNewsData = [
  {
    id: 1,
    title: '研究院举办2024年度可靠性工程技术研讨会',
    date: '2024-12-15',
    category: '行业动态',
    summary: '深圳市为民可靠性系统工程研究院成功举办2024年度可靠性工程技术研讨会，邀请了国内外知名专家学者参与。',
    content: '本次研讨会旨在促进可靠性工程领域的技术交流与合作，探讨行业最新发展趋势和应用前景。\n\n来自全国各地的200余名专业人士参加了此次盛会，共同分享了可靠性工程领域的最新研究成果和实践经验。',
    image: '/src/assets/image1.jpg'
  },
  {
    id: 2,
    title: '我院获得国家重点实验室认证',
    date: '2024-11-20',
    category: '机构动态',
    summary: '深圳市为民可靠性系统工程研究院近日获得国家重点实验室认证，成为国内可靠性工程领域的重要研究基地。',
    content: '此次认证标志着我院在可靠性工程研究方面取得了重要突破，将进一步提升我院的科研能力和影响力。\n\n未来，我院将继续加强与国内外科研机构的合作，推动可靠性工程技术的创新发展。',
    image: '/src/assets/image2.jpg'
  },
  {
    id: 3,
    title: '可靠性工程技术在新能源领域的应用研讨会成功召开',
    date: '2024-10-10',
    category: '学术交流',
    summary: '我院联合多家企业举办可靠性工程技术在新能源领域的应用研讨会，探讨技术创新与产业发展。',
    content: '研讨会围绕新能源设备的可靠性设计、测试与评估等主题展开深入讨论，为行业发展提供了新思路。\n\n与会专家一致认为，提高新能源设备的可靠性对于推动行业健康发展具有重要意义。',
    image: '/src/assets/image3.jpg'
  }
];

// 存储内容变化监听器
const contentChangeListeners = [];

// 内容管理器对象
const contentManager = {
  // 获取新闻内容
  getNewsContent() {
    // 在实际应用中，这里可能会从API或其他数据源获取数据
    // 目前返回模拟数据
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