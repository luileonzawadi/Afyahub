@echo off
echo ========================================
echo AfyaHub Frontend Installation
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Installation complete!
echo.

echo [3/3] Starting development server...
echo.
echo Your browser will open at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
