@echo off
echo ========================================
echo   VIPEN ONLINE 部署到 Vercel
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] 安装 Vercel CLI...
call npm install -g vercel

echo.
echo [2/2] 部署到 Vercel...
call vercel --prod

echo.
echo 部署完成！
pause
