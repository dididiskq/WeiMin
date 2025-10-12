import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 源配置文件路径
const sourceConfigPath = path.join(__dirname, 'src', 'config', 'home.config.js');

// 目标配置文件路径 - 在dist目录下创建config文件夹
const distConfigPath = path.join(__dirname, 'dist', 'config', 'home.config.js');

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
    console.log(`配置文件已成功复制到: ${distConfigPath}`);

    // 创建部署说明文件
    createDeployGuide();
  } catch (error) {
    console.error('复制配置文件时出错:', error.message);
    process.exit(1);
  }
};

// 创建部署说明文件
const createDeployGuide = () => {
  const deployReadmePath = path.join(__dirname, 'deploy-guide.md');
  const deployReadme = '# 部署说明\n\n## 配置文件管理\n\n本项目使用外部配置文件机制，实现了前后端配置同步更新：\n\n1. **配置文件位置**: \`dist/config/home.config.js\`\n2. **工作原理**: \n   - Vue应用在运行时通过HTTP请求直接读取此配置文件\n   - Flask后端可以修改此配置文件内容\n   - Vue应用会定期刷新配置，实现动态更新\n\n## 部署步骤\n\n1. 确保\`dist/config/home.config.js\`文件存在于服务器上\n2. 配置Nginx将\`/config/\`请求正确路由到\`dist/config/\`目录\n3. 启动Flask服务，确保它可以读写\`dist/config/home.config.js\`文件\n\n## 注意事项\n\n- 确保Flask服务对\`dist/config/home.config.js\`文件有写入权限\n- Vue应用会自动检测配置变化并更新UI\n- 配置更改后无需重新构建Vue应用\n';

  try {
    fs.writeFileSync(deployReadmePath, deployReadme, 'utf-8');
    console.log(`部署说明文件已创建: ${deployReadmePath}`);
  } catch (error) {
    console.warn('创建部署说明文件失败:', error.message);
  }
};

// 执行复制
copyConfigFile();