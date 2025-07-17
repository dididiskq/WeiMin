# Vue 3 + Vite

## 项目部署与本地运行

### 打包项目
在根目录 src 下创建文件 vue.config.js
文件中插入以下代码：
module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
};
1. 安装依赖: `npm install`
2. 执行打包: `npm run build`
3. 打包产物将生成在 `dist` 文件夹中

### 本地运行
需要开启服务运行 
使用http-server 运行（如没有安装http-server的，使用node 全局安装 http-server 即可，cnpm install http-server -g）

cd dist 
http-server 
