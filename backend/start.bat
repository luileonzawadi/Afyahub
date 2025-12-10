@echo off
echo Starting AfyaHub Backend...
echo.

REM Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
)

REM Run seed data
echo Seeding database...
python seed_data.py
echo.

REM Start server
echo Starting FastAPI server on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
uvicorn app.main:app --reload --port 8000
