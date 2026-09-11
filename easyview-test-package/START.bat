@echo off
cd /d "%~dp0dist"
echo.
echo ========================================
echo   easyview - SYSCOHADA Accounting App
echo ========================================
echo.
echo Starting local server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
python -m http.server 8000
