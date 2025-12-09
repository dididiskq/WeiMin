// 配置服务 - 处理配置的加载
import { ref } from 'vue';

// 只导入site_config.json配置文件
import siteConfig from '../config/site_config.json';

// 响应式配置对象 - 用于动态更新UI
export const config = ref(siteConfig);

/**
 * 配置服务主hook
 * @returns {Object} 配置服务对象
 */
export const useConfig = () => {
  return {
    config
  };
};

// 更新配置的函数 - 供外部调用
export const updateConfig = (newConfig) => {
  if (newConfig) {
    Object.keys(newConfig).forEach(key => {
      config.value[key] = newConfig[key];
    });
  }
};

// 导出清理函数（为空实现，保持兼容性）
export const cleanup = () => {
  // 暂无清理逻辑
};