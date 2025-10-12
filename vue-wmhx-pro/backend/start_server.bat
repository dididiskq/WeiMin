@echo off

rem 设置环境变量
set FLASK_APP=app.py
set FLASK_ENV=production

rem 检查Python是否安装
python --version >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到Python环境，请先安装Python 3.6+
    pause
    exit /b 1
)

rem 检查并安装依赖
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo 警告: 安装依赖失败，请手动安装requirements.txt中的包
)

rem 创建日志目录
mkdir logs >nul 2>nul

rem 启动Flask应用
echo 启动配置管理服务...
echo 服务地址: http://localhost:5000
python app.py

pause