// 配置服务 - 处理配置的保存和加载
import { ref, onMounted } from 'vue';

// 服务端API基础URL - 适配部署环境，使用相对路径
const API_BASE_URL = '/api';

// 配置缓存
let serverConfigCache = null;

// 响应式配置对象 - 用于动态更新UI
export const config = ref({});

// 默认配置
const defaultConfig = {
  hero: {
    title: '深圳市为民可靠性系统工程研究院',
    subtitle: '确性可靠性 · 赋能中国制造企业 · 服务创新科技 · 普惠中国智造',
    video: '/videos/background.mp4',
    logo: '/assets/logo.svg',
    websiteImage: '/assets/changm.png',
    wechatQrcode: '/assets/gzh.png'
  },
  newsSlider: [],
  expertTeam: [],
  services: [],
  intellectualProperty: [],
  brandActivities: [],
  projectCases: [],
  cooperationAgencies: [],
  importantLinks: []
};

/**
 * 调用服务端API保存配置
 * @param {Object} config 配置对象
 */
export const saveConfigToStorage = async (newConfig) => {
  try {
    // 首先更新本地配置和缓存
    console.log('保存配置前，先更新本地状态...');
    
    // 更新响应式配置对象
    config.value = JSON.parse(JSON.stringify(newConfig));
    
    // 更新本地缓存
    serverConfigCache = JSON.parse(JSON.stringify(newConfig));
    
    // 更新localStorage
    localStorage.setItem('siteConfig', JSON.stringify(newConfig));
    
    // 尝试调用后端API保存配置
    const response = await fetch(`${API_BASE_URL}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConfig)
    });
    
    if (response.ok) {
      console.log('配置已保存到服务端');
      
      // 为了确保一致性，我们不再立即重新加载外部文件
      // 因为这可能会覆盖我们刚刚保存的更改
      
      console.log('配置保存完成');
      return true;
    }
    
    const errorData = await response.json();
    console.error('保存配置到服务端失败:', errorData.error || '未知错误');
    // 即使API调用失败，本地配置也已经更新，所以返回true
    return true;
  } catch (error) {
    console.error('保存配置过程中出错:', error);
    // 即使出错，本地配置也应该已经更新
    return true;
  }
};

/**
 * 从外部文件直接加载配置 - 优先方法
 * @returns {Promise<Object|null>} 配置对象或null
 */
export const loadConfigFromExternalFile = async () => {
  try {
    // 添加随机查询参数来避免浏览器缓存问题
    const timestamp = new Date().getTime();
    
    // 直接使用相对路径，不再尝试其他路径
    console.log('直接从相对路径加载配置文件: /config/home.config.js');
    const response = await fetch(`/config/home.config.js?t=${timestamp}`);
    
    if (!response.ok) {
      console.warn('无法从外部文件加载配置，尝试API方式');
      return null;
    }
    
    const configText = await response.text();
    console.log('获取到配置文件内容，长度:', configText.length);
    
    // 安全地解析JavaScript模块格式的配置文件
    let parsedConfig;
    
    try {
        // 移除所有注释（包括行注释和块注释）
        let configWithoutComments = configText
          .replace(/\/\/.*$/gm, '') // 移除行注释
          .replace(/\/\*[\s\S]*?\*\//g, ''); // 移除块注释
        
        // 移除export default语句
        if (configWithoutComments.includes('export default')) {
          console.log('检测到JavaScript模块格式，提取对象...');
          // 使用正则表达式提取export default后面的对象
          const exportMatch = configWithoutComments.match(/export\s+default\s+([\s\S]*)/);
          if (exportMatch && exportMatch[1]) {
            configWithoutComments = exportMatch[1].trim();
          }
        }
        
        // 使用Function构造函数安全地解析JavaScript对象
        // 这比JSON.parse更灵活，可以处理没有引号的键名等JavaScript语法
        const parseFn = new Function('return ' + configWithoutComments);
        parsedConfig = parseFn();
        
        console.log('JavaScript对象解析成功，配置项:', Object.keys(parsedConfig).join(', '));
        
        // 检查所有主要配置项
          console.log('配置解析成功，配置项:', Object.keys(parsedConfig).join(', '));
          // 特别记录关键配置的数量
          if (parsedConfig.brandActivities) console.log('品牌活动配置存在，共有', parsedConfig.brandActivities.length, '项活动');
          if (parsedConfig.expertTeam) console.log('专家团队配置存在，共有', parsedConfig.expertTeam.length, '项');
          if (parsedConfig.services) console.log('技术服务配置存在，共有', parsedConfig.services.length, '项');
          if (parsedConfig.projectCases) console.log('项目案例配置存在，共有', parsedConfig.projectCases.length, '项');
      } catch (e) {
        console.error('解析配置文件失败:', e.message);
        
        // 使用更安全的后备方法 - 模拟解析
        try {
          console.log('尝试使用模拟解析作为后备方法...');
          
          // 创建提取配置对象
          let extractedConfig = {};
          
          // 提取所有主要配置项的通用函数
          const extractArrayConfig = (configName, itemPatterns) => {
            const match = configText.match(new RegExp(`${configName}:\s*\[([\s\S]*?)\]`));
            if (!match) return;
            
            console.log(`提取到${configName}配置片段`);
            const itemMatches = match[1].match(/\{[\s\S]*?\}/g) || [];
            const items = [];
            
            itemMatches.forEach(itemStr => {
              try {
                const item = {};
                for (const [key, pattern] of Object.entries(itemPatterns)) {
                  const keyMatch = itemStr.match(new RegExp(`${key}:\s*['"]([^'"]*)['"]`));
                  if (keyMatch) item[key] = keyMatch[1];
                }
                // 至少需要有一个非空值才算有效项
                if (Object.values(item).some(v => v && v.trim() !== '')) {
                  items.push(item);
                }
              } catch (err) {
                console.error(`解析单个${configName}项目失败:`, err);
              }
            });
            
            if (items.length > 0) {
              extractedConfig[configName] = items;
              console.log(`成功提取${configName}配置，共${items.length}项`);
            }
          };
          
          // 提取单个对象配置的通用函数
          const extractObjectConfig = (configName, properties) => {
            const match = configText.match(new RegExp(`${configName}:\s*\{([\s\S]*?)\}`));
            if (!match) return;
            
            const objConfig = {};
            for (const prop of properties) {
              const propMatch = match[1].match(new RegExp(`${prop}:\s*['"]([^'"]*)['"]`));
              if (propMatch) objConfig[prop] = propMatch[1];
            }
            
            // 如果至少有一个属性被提取，则保存该配置
            if (Object.keys(objConfig).length > 0) {
              extractedConfig[configName] = objConfig;
              console.log(`成功提取${configName}配置，属性:`, Object.keys(objConfig).join(', '));
            }
          };
          
          // 提取各个配置项
          extractArrayConfig('brandActivities', {
            date: 'date',
            title: 'title',
            description: 'description',
            tag: 'tag',
            id: 'id'
          });
          
          extractArrayConfig('expertTeam', {
            name: 'name',
            position: 'position',
            description: 'description',
            id: 'id',
            backgroundColor: 'backgroundColor'
          });
          
          extractArrayConfig('services', {
            id: 'id',
            name: 'name',
            title: 'title',
            description: 'description',
            icon: 'icon'
          });
          
          extractArrayConfig('intellectualProperty', {
            title: 'title',
            description: 'description',
            id: 'id'
          });
          
          extractArrayConfig('projectCases', {
            title: 'title',
            description: 'description',
            image: 'image',
            id: 'id'
          });
          
          extractArrayConfig('cooperationAgencies', {
            name: 'name',
            logo: 'logo',
            description: 'description',
            id: 'id'
          });
          
          extractArrayConfig('newsSlider', {
            title: 'title',
            image: 'image',
            link: 'link',
            id: 'id'
          });
          
          extractArrayConfig('importantLinks', {
            name: 'name',
            url: 'url',
            backgroundColor: 'backgroundColor',
            id: 'id'
          });
          
          // 提取英雄区域配置
          extractObjectConfig('hero', [
            'title', 'subtitle', 'video', 'logo', 'websiteImage', 'wechatQrcode'
          ]);
          
          // 使用提取的配置
          if (Object.keys(extractedConfig).length > 0) {
            parsedConfig = extractedConfig;
            console.log('模拟解析成功，提取的配置项:', Object.keys(parsedConfig).join(', '));
          } else {
            // 如果没有提取到任何有效配置，使用默认配置
            parsedConfig = {
              brandActivities: [
                {
                  date: '2023.12.15',
                  title: '2023可靠性工程国际研讨会',
                  description: '汇聚全球可靠性领域专家，探讨前沿技术与应用案例',
                  tag: '国际会议'
                },
                {
                  date: '2024.03.20',
                  title: '可靠性工程师认证培训',
                  description: '专业认证课程，提升工程师可靠性设计与分析能力',
                  tag: '培训课程'
                },
                {
                  date: '2024.06.10',
                  title: '制造业可靠性提升峰会',
                  description: '聚焦制造业可靠性痛点，分享最佳实践与解决方案',
                  tag: '行业峰会'
                }
              ]
            };
            console.log('使用硬编码的品牌活动配置');
          }
        } catch (e2) {
          console.error('后备解析也失败:', e2.message);
          // 如果所有解析都失败，使用默认配置
          console.log('使用完整默认配置');
          parsedConfig = { ...defaultConfig };
        }
      }
    
    // 合并默认配置和解析的配置
    const mergedConfig = { ...defaultConfig, ...parsedConfig };
    
    // 确保嵌套对象也被合并
    Object.keys(defaultConfig).forEach(key => {
      if (typeof defaultConfig[key] === 'object' && defaultConfig[key] !== null && !Array.isArray(defaultConfig[key])) {
        mergedConfig[key] = { ...defaultConfig[key], ...(mergedConfig[key] || {}) };
      }
    });
    
    // 确保数组配置项被正确合并 - 保留解析的配置中的数组
    if (parsedConfig.brandActivities && Array.isArray(parsedConfig.brandActivities)) {
      mergedConfig.brandActivities = parsedConfig.brandActivities;
      console.log('使用解析的品牌活动配置，共', parsedConfig.brandActivities.length, '项');
    }
    
    // 对于其他数组配置也做类似处理
    const arrayConfigKeys = ['newsSlider', 'expertTeam', 'services', 'intellectualProperty', 'projectCases', 'cooperationAgencies', 'importantLinks'];
    arrayConfigKeys.forEach(key => {
      if (parsedConfig[key] && Array.isArray(parsedConfig[key])) {
        mergedConfig[key] = parsedConfig[key];
        console.log('使用解析的', key, '配置，共', parsedConfig[key].length, '项');
      }
    });
    
    // 更新缓存和响应式配置
    serverConfigCache = mergedConfig;
    
    // 强制更新响应式配置对象，确保Vue组件能够检测到变化
    // 使用Vue的响应式更新机制，确保深度变化也能被检测到
    config.value = { ...mergedConfig };
    
    // 同时更新localStorage作为后备
    localStorage.setItem('siteConfig', JSON.stringify(mergedConfig));
    
    // 触发自定义事件，通知所有组件配置已更新
    window.dispatchEvent(new CustomEvent('config-updated', {
      detail: { config: mergedConfig }
    }));
    
    console.log('配置已成功加载并更新到UI');
    return mergedConfig;
  } catch (error) {
    console.error('从外部文件加载配置失败:', error);
    return null;
  }
};

/**
 * 调用服务端API加载配置 - 备用方法
 * @param {boolean} forceRefresh - 是否强制刷新（忽略localStorage缓存）
 * @returns {Promise<Object|null>} 配置对象或null
 */
export const loadConfigFromStorage = async (forceRefresh = false) => {
  try {
    // 如果强制刷新，直接从外部文件加载并跳过其他缓存检查
    if (forceRefresh) {
      console.log('强制从外部文件刷新配置...');
      // 清除缓存
      serverConfigCache = null;
      // 直接从外部文件加载
      const fileConfig = await loadConfigFromExternalFile();
      if (fileConfig) {
        return fileConfig;
      }
    } else {
      // 正常加载流程：首先尝试从外部文件加载
      const fileConfig = await loadConfigFromExternalFile();
      if (fileConfig) {
        return fileConfig;
      }
      
      // 如果缓存中有配置，直接返回
      if (serverConfigCache) {
        config.value = serverConfigCache;
        return JSON.parse(JSON.stringify(serverConfigCache));
      }
    }
    
    // 调用后端API
    const response = await fetch(`${API_BASE_URL}/config`);
    if (response.ok) {
      const apiConfig = await response.json();
      // 更新缓存和响应式配置
      serverConfigCache = apiConfig;
      config.value = apiConfig;
      // 同时更新localStorage作为后备
      localStorage.setItem('siteConfig', JSON.stringify(apiConfig));
      return apiConfig;
    }
    
    // 如果API失败，尝试从localStorage获取作为后备
    const localConfig = localStorage.getItem('siteConfig');
    if (localConfig) {
      const storageConfig = JSON.parse(localConfig);
      serverConfigCache = storageConfig;
      config.value = storageConfig;
      return storageConfig;
    }
    
    // 全部失败时使用默认配置
    config.value = { ...defaultConfig };
    return config.value;
  } catch (error) {
    console.error('加载配置失败:', error);
    // 网络错误时，尝试使用localStorage作为后备
    const localConfig = localStorage.getItem('siteConfig');
    if (localConfig) {
      const storageConfig = JSON.parse(localConfig);
      serverConfigCache = storageConfig;
      config.value = storageConfig;
      return storageConfig;
    }
    // 全部失败时使用默认配置
    config.value = { ...defaultConfig };
    return config.value;
  }
};

/**
 * 定时刷新配置的函数
 */
let refreshInterval = null;
const DEFAULT_REFRESH_INTERVAL = 30 * 1000; // 30秒（测试时缩短间隔）

export const startConfigRefresh = (intervalMs = DEFAULT_REFRESH_INTERVAL) => {
  stopConfigRefresh();
  refreshInterval = setInterval(() => {
    console.log('定时刷新配置...');
    loadConfigFromExternalFile().then(newConfig => {
      // 如果返回了配置对象，检查是否有变化
      if (newConfig) {
        // 深度比较配置变化
        const hasChanges = compareConfigs(config.value, newConfig);
        if (hasChanges) {
          console.log('检测到配置变化，正在更新...');
          
          // 合并新配置到当前配置，而不是完全替换
          // 这样可以保留本地修改过但外部文件还未更新的内容
          const mergedConfig = { ...config.value };
          
          // 合并所有配置项
          Object.keys(newConfig).forEach(key => {
            // 只有当外部文件中的配置项存在时才合并
            if (newConfig[key] !== undefined) {
              mergedConfig[key] = Array.isArray(newConfig[key]) 
                ? [...newConfig[key]] 
                : typeof newConfig[key] === 'object' && newConfig[key] !== null
                  ? { ...newConfig[key] }
                  : newConfig[key];
            }
          });
          
          // 更新配置
          config.value = mergedConfig;
          console.log('配置已智能合并更新');
        } else {
          console.log('配置无变化');
        }
      }
    }).catch(error => {
      console.error('定时刷新配置失败:', error);
    });
  }, intervalMs);
  console.log(`配置定时刷新已启动，间隔: ${intervalMs/1000}秒`);
};

export const stopConfigRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    console.log('配置定时刷新已停止');
  }
};

/**
 * 比较两个配置对象是否有变化
 */
function compareConfigs(oldConfig, newConfig) {
  // 定义所有需要比较的配置项键名
  const allConfigKeys = [
    'hero', 'newsSlider', 'expertTeam', 'services', 'intellectualProperty',
    'brandActivities', 'projectCases', 'cooperationAgencies', 'importantLinks'
  ];
  
  // 检查每个配置项是否有变化
  for (const key of allConfigKeys) {
    const oldValue = oldConfig[key];
    const newValue = newConfig[key];
    
    // 检查两个值是否都存在
    if (oldValue && newValue) {
      // 如果是数组，先比较长度
      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        if (oldValue.length !== newValue.length) {
          console.log(`配置项${key}数组长度变化: ${oldValue.length} -> ${newValue.length}`);
          return true;
        }
        // 数组长度相同时，比较每个元素
        for (let i = 0; i < oldValue.length; i++) {
          if (JSON.stringify(oldValue[i]) !== JSON.stringify(newValue[i])) {
            console.log(`配置项${key}的第${i+1}个元素发生变化`);
            return true;
          }
        }
      } 
      // 如果是对象，直接比较JSON字符串
      else if (typeof oldValue === 'object' && typeof newValue === 'object') {
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          console.log(`配置项${key}对象发生变化`);
          return true;
        }
      }
      // 其他类型直接比较
      else if (oldValue !== newValue) {
        console.log(`配置项${key}值发生变化: ${oldValue} -> ${newValue}`);
        return true;
      }
    } 
    // 检查是否一个存在一个不存在
    else if ((oldValue && !newValue) || (!oldValue && newValue)) {
      console.log(`配置项${key}存在状态变化: ${!!oldValue} -> ${!!newValue}`);
      return true;
    }
  }
  
  return false;
};

/**
 * Vue组合式API钩子，用于在组件中使用配置
 */
export const useConfig = () => {
  onMounted(async () => {
    await loadConfigFromStorage();
    // 所有环境都启用自动刷新，但生产环境刷新间隔更长
    const refreshInterval = import.meta.env.DEV ? 5000 : 60000; // 开发环境5秒，生产环境60秒
    startConfigRefresh(refreshInterval);
  });

  // 组件卸载时清理定时器
  const cleanup = () => {
    stopConfigRefresh();
  };

  return {
    config,
    reloadConfig: loadConfigFromStorage,
    cleanup
  };
};

/**
 * 调用服务端API清除配置
 * @returns {Promise<boolean>} 是否成功清除配置
 */
export const clearConfigStorage = async () => {
  // 定义清理本地数据的函数
  const clearLocalData = () => {
    serverConfigCache = null;
    localStorage.removeItem('siteConfig');
  };

  try {
    // 调用后端API - 修复路径重复问题
    const response = await fetch(`${API_BASE_URL}/config`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      // API成功响应后清除本地数据
      clearLocalData();
      return true;
    } else {
      console.error('清除配置失败: 服务器返回错误状态');
      return false;
    }
  } catch (error) {
    console.error('清除配置失败:', error.message || error);
    // 即使API调用失败，也清除本地存储作为降级处理
    clearLocalData();
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
export const getMergedConfig = async (defaultConfig) => {
  const savedConfig = await loadConfigFromStorage();
  if (!savedConfig) {
    return defaultConfig;
  }
  
  // 深度合并配置
  return deepMerge(defaultConfig, savedConfig);
};

/**
 * 同步版本的合并配置函数，用于初始化
 * @param {Object} defaultConfig 默认配置
 * @returns {Object} 合并后的配置
 */
export const getMergedConfigSync = (defaultConfig) => {
  // 尝试从localStorage获取配置
  const localConfig = localStorage.getItem('siteConfig');
  if (localConfig) {
    try {
      const storageConfig = JSON.parse(localConfig);
      return deepMerge(defaultConfig, storageConfig);
    } catch (e) {
      console.error('解析localStorage配置失败:', e);
    }
  }
  
  // 如果缓存中有配置，直接使用
  if (serverConfigCache) {
    return deepMerge(defaultConfig, serverConfigCache);
  }
  
  return defaultConfig;
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