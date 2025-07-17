@echo off
chcp 65001 >nul

REM Check if dist folder exists
if not exist "dist" (
    echo Error: dist folder not found, please run "npm run build" first
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js environment not detected, trying Python server...
    goto python_server
)

REM Start server with Node.js serve module
where serve >nul 2>nul
if %errorlevel% neq 0 (
    echo serve module not installed, installing globally...
    npm install -g serve
    if %errorlevel% neq 0 (
        echo Error: Failed to install serve module, please run "npm install -g serve" manually
        pause
        exit /b 1
    )
)

cd dist
serve
pause
exit /b 0

:python_server
REM Check for Python 3 installation
where python3 >nul 2>nul
if %errorlevel% equ 0 (
    set "PYTHON_CMD=python3"
) else (
    REM Check for Python installation
    where python >nul 2>nul
    if %errorlevel% neq 0 (
        echo Error: Python environment not detected, cannot start server
        pause
        exit /b 1
    )
    set "PYTHON_CMD=python"
)

cd dist
%PYTHON_CMD% -m http.server 8000
if %errorlevel% neq 0 (
    echo Error: Python server failed to start, please ensure Python 3.x is installed
    pause
    exit /b 1
)
pause
exit /b 0