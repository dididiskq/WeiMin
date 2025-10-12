# 配置管理后端服务

## 功能介绍

这是一个基于Flask的配置管理后端服务，用于支持Vue前端应用的配置持久化存储。主要功能包括：

- 保存网站配置到服务端文件
- 加载服务端存储的配置
- 清除服务端配置
- 健康检查接口

## 技术栈

- Python 3.6+
- Flask 3.0.0
- Flask-CORS 4.0.0

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 启动服务

Windows用户可以直接运行批处理文件：

```bash
start_server.bat
```

或者手动启动：

```bash
python app.py
```

服务将在 `http://localhost:5000` 启动。

## API接口

### 获取配置

- **URL**: `/api/config`
- **方法**: `GET`
- **响应**: 返回JSON格式的配置对象

### 保存配置

- **URL**: `/api/config`
- **方法**: `POST`
- **请求体**: JSON格式的配置对象
- **响应**: `{"success": true, "message": "配置保存成功"}` 或错误信息

### 清除配置

- **URL**: `/api/config`
- **方法**: `DELETE`
- **响应**: `{"success": true, "message": "配置已清除"}` 或错误信息

### 健康检查

- **URL**: `/api/health`
- **方法**: `GET`
- **响应**: `{"status": "healthy", "service": "config-api"}`

## 配置持久化

配置数据将以JSON格式存储在服务端的 `site_config.json` 文件中，确保数据持久化保存。

## 生产环境部署建议

1. 使用 Gunicorn 或 uWSGI 作为WSGI服务器
2. 配置 Nginx 作为反向代理
3. 设置适当的安全措施，如HTTPS、访问控制等
4. 考虑使用更可靠的数据库存储（如SQLite、PostgreSQL）替代文件存储
5. 添加日志记录和错误监控