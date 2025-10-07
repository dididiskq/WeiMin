// 配置服务 - 处理配置的保存和加载

/**
 * 保存配置到本地存储
 * @param {Object} config 配置对象
 */
export const saveConfigToStorage = (config) => {
  try {
    localStorage.setItem('siteConfig', JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('保存配置失败:', error);
    return false;
  }
};

/**
 * 从本地存储加载配置
 * @returns {Object|null} 配置对象或null
 */
export const loadConfigFromStorage = () => {
  try {
    const config = localStorage.getItem('siteConfig');
    return config ? JSON.parse(config) : null;
  } catch (error) {
    console.error('加载配置失败:', error);
    return null;
  }
};

/**
 * 清除本地存储中的配置
 */
export const clearConfigStorage = () => {
  try {
    localStorage.removeItem('siteConfig');
    return true;
  } catch (error) {
    console.error('清除配置失败:', error);
    return false;
  }
};

/**
 * 处理图片上传（前端模拟）
 * @param {File} file 图片文件
 * @returns {Promise<string>} 图片的Data URL
 */
export const handleImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('没有选择文件'));
      return;
    }

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      reject(new Error('请选择有效的图片文件'));
      return;
    }

    // 检查文件大小（限制为5MB）
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      reject(new Error('文件大小不能超过5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // 在实际项目中，这里应该上传到服务器
      // 这里仅返回Data URL作为模拟
      resolve(e.target.result);
    };
    reader.onerror = () => {
      reject(new Error('读取文件失败'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 合并默认配置和自定义配置
 * @param {Object} defaultConfig 默认配置
 * @returns {Object} 合并后的配置
 */
export const getMergedConfig = (defaultConfig) => {
  const savedConfig = loadConfigFromStorage();
  if (!savedConfig) {
    return defaultConfig;
  }
  
  // 深度合并配置
  return deepMerge(defaultConfig, savedConfig);
};

/**
 * 深度合并两个对象
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @returns {Object} 合并后的对象
 */
function deepMerge(target, source) {
  const output = { ...target };
  
  if (typeof target === 'object' && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      if (source[key] !== null && typeof source[key] === 'object') {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}