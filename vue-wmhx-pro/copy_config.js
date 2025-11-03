import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源配置文件路径
const sourceConfigPath = path.join(__dirname, 'src', 'config', 'site_config.json');

// 目标配置文件路径 - 在dist目录下创建config文件夹
const distConfigPath = path.join(__dirname, 'dist', 'config', 'site_config.json');

// 确保dist/config目录存在
const ensureDirectoryExists = (dirPath) => {
  const dir = path.dirname(dirPath);
  if (!fs.existsSync(dir)) {
    console.log(`创建目录: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 复制配置文件的函数
const copyConfigFile = () => {
  try {
    // 检查源文件是否存在
    if (!fs.existsSync(sourceConfigPath)) {
      console.error(`错误: 源配置文件不存在 - ${sourceConfigPath}`);
      process.exit(1);
    }

    // 确保目标目录存在
    ensureDirectoryExists(distConfigPath);

    // 复制文件
    fs.copyFileSync(sourceConfigPath, distConfigPath);
    console.log(`site_config.json配置文件已成功复制到: ${distConfigPath}`);
  } catch (error) {
    console.error('复制配置文件时出错:', error.message);
    process.exit(1);
  }
};

// 执行复制
copyConfigFile();