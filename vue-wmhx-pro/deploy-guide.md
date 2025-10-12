# 部署说明

## 配置文件管理

本项目使用外部配置文件机制，实现了前后端配置同步更新：

1. **配置文件位置**: `dist/config/home.config.js`
2. **工作原理**: 
   - Vue应用在运行时通过HTTP请求直接读取此配置文件
   - Flask后端可以修改此配置文件内容
   - Vue应用会定期刷新配置，实现动态更新

## 部署步骤

1. 确保`dist/config/home.config.js`文件存在于服务器上
2. 配置Nginx将`/config/`请求正确路由到`dist/config/`目录
3. 启动Flask服务，确保它可以读写`dist/config/home.config.js`文件

## 注意事项

- 确保Flask服务对`dist/config/home.config.js`文件有写入权限
- Vue应用会自动检测配置变化并更新UI
- 配置更改后无需重新构建Vue应用
