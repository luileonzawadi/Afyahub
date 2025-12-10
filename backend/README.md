# AfyaHub Backend API

FastAPI backend for the AfyaHub HIV/AIDS Education Platform.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Register, login, and profile management
- **Course Management**: CRUD operations for courses and modules
- **Progress Tracking**: Track user progress through modules
- **Enrollment**: Course enrollment system
- **Role-Based Access**: Admin and learner roles

## Tech Stack

- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Database (easily switchable to PostgreSQL)
- **JWT**: Secure token-based authentication
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

## Installation

1. **Create virtual environment**:
```bash
cd backend
python -m venv venv
```

2. **Activate virtual environment**:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Configure environment**:
Edit `.env` file with your settings

## Running the Server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create course (admin only)
- `POST /api/courses/{id}/enroll` - Enroll in course
- `GET /api/courses/{id}/modules` - Get course modules
- `POST /api/courses/{id}/modules` - Create module (admin only)
- `POST /api/courses/modules/{id}/progress` - Update progress
- `GET /api/courses/user/progress` - Get user progress

## Database

The application uses SQLite by default. The database file `afyahub.db` will be created automatically.

To use PostgreSQL, update `DATABASE_URL` in `.env`:
```
DATABASE_URL=postgresql://user:password@localhost/afyahub
```

## Project Structure

```
backend/
├── app/
│   ├── api/              # API endpoints
│   │   ├── auth.py       # Authentication routes
│   │   └── courses.py    # Course routes
│   ├── core/             # Core functionality
│   │   ├── config.py     # Configuration
│   │   └── security.py   # Security utilities
│   ├── db/               # Database
│   │   └── database.py   # Database connection
│   ├── models/           # SQLAlchemy models
│   │   ├── user.py       # User model
│   │   └── course.py     # Course models
│   ├── schemas/          # Pydantic schemas
│   │   ├── user.py       # User schemas
│   │   └── course.py     # Course schemas
│   └── main.py           # FastAPI application
├── .env                  # Environment variables
├── requirements.txt      # Dependencies
└── README.md            # This file
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured for frontend
- Role-based access control

## Development

The API uses automatic reload during development. Any changes to the code will restart the server automatically.

## Testing

Access the interactive API documentation at `/docs` to test all endpoints.

## Production

For production deployment:

1. Change `SECRET_KEY` in `.env`
2. Use PostgreSQL instead of SQLite
3. Set `--reload` to false
4. Use a production ASGI server like Gunicorn with Uvicorn workers

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```
