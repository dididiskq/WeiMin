#!/bin/bash

# 生产环境启动脚本 - Linux部署版本

# 设置环境变量，指向正确的配置文件路径
CONFIG_FILE_PATH="/home/www/FlaskAndVuePro/dist/config/home.config.js"
export CONFIG_FILE_PATH

echo "========================================"
echo "深圳市为民可靠性系统工程研究院 - 后端服务启动脚本"
echo "========================================"
echo "使用配置文件路径: $CONFIG_FILE_PATH"
echo ""

# 检查配置文件目录是否存在
CONFIG_DIR=$(dirname "$CONFIG_FILE_PATH")
if [ ! -d "$CONFIG_DIR" ]; then
    echo "创建配置文件目录: $CONFIG_DIR"
    mkdir -p "$CONFIG_DIR"
    
    # 创建默认配置文件内容
    cat > "$CONFIG_FILE_PATH" << 'EOF'
export default {
  "hero": {
    "title": "深圳市为民可靠性系统工程研究院",
    "subtitle": "专注于可靠性工程领域的研究与应用",
    "background": "url('./assets/bg.jpg')"
  },
  "newsSlider": [],
  "expertTeam": [],
  "services": []
}
EOF
    
    echo "已创建默认配置文件"
fi

# 检查Python环境
echo "检查Python环境..."
python3 --version

# 安装依赖（如果需要）
if [ -f "requirements.txt" ]; then
    echo ""
    echo "安装项目依赖..."
    pip3 install -r requirements.txt
fi

# 启动Flask服务
echo ""
echo "启动Flask服务..."
echo "服务地址: http://0.0.0.0:5000"
echo "API文档: http://0.0.0.0:5000/api/health"
echo "========================================"
echo "按 Ctrl+C 停止服务"
echo "========================================"

# 使用环境变量启动Flask
CONFIG_FILE_PATH="$CONFIG_FILE_PATH" python3 -m flask run --host=0.0.0.0 --port=5000