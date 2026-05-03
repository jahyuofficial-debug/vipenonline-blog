@echo off
echo ========================================
echo   VIPEN ONLINE 博客启动器
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] 安装依赖...
call npm install
if errorlevel 1 (
    echo 安装失败！请确保已安装 Node.js
    pause
    exit /b 1
)

echo.
echo [2/3] 启动本地服务器...
echo 访问 http://localhost:4000 查看博客
echo 按 Ctrl+C 停止服务器
echo.

call npm run dev
