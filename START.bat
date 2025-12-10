@echo off
echo ========================================
echo    AfyaHub - Starting Application
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Login Credentials:
echo Admin: admin@afyahub.com / admin123
echo Demo:  demo@afyahub.com / demo123
echo ========================================
