# 🚀 AfyaHub Complete Setup Guide

Complete guide to set up and run the AfyaHub HIV/AIDS Education Platform.

---

## 📋 Prerequisites

- **Node.js** 16+ (for frontend)
- **Python** 3.8+ (for backend)
- **Git** (optional)

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Seed Database
```bash
python seed_data.py
```

This creates:
- Admin user: `admin@afyahub.com` / `admin123`
- Demo user: `demo@afyahub.com` / `demo123`
- Sample courses with modules

### 6. Start Backend Server
```bash
uvicorn app.main:app --reload --port 8000
```

**Backend will run on:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/docs`

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

**Frontend will run on:** `http://localhost:3000`

---

## 🎯 Quick Start (Both Servers)

### Terminal 1 - Backend
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

---

## 🔐 Default Login Credentials

### Admin Account
- **Email:** admin@afyahub.com
- **Password:** admin123
- **Access:** Full admin dashboard, course management, user management

### Demo Learner Account
- **Email:** demo@afyahub.com
- **Password:** demo123
- **Access:** Learner dashboard, courses, progress tracking

---

## ✨ Features

### For Learners
- ✅ Browse and enroll in courses
- ✅ Watch video lessons
- ✅ Track learning progress
- ✅ Complete modules
- ✅ View certificates
- ✅ Customize color themes
- ✅ Track learning streaks
- ✅ Community forum access

### For Administrators
- ✅ Admin dashboard with analytics
- ✅ Create and manage courses
- ✅ Add/edit/delete modules
- ✅ User management
- ✅ Content moderation
- ✅ View platform statistics

---

## 🗄️ Database

The backend uses **SQLite** by default. The database file `afyahub.db` is created automatically.

### To Reset Database
```bash
cd backend
del afyahub.db  # Windows
rm afyahub.db   # Linux/Mac
python seed_data.py
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses/{id}/enroll` - Enroll in course
- `GET /api/courses/{id}/modules` - Get course modules
- `POST /api/courses/modules/{id}/progress` - Update module progress

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/progress` - Get user progress stats

### Admin (Admin only)
- `POST /api/courses` - Create course
- `POST /api/courses/{id}/modules` - Create module

---

## 🎨 Customization

### Change Color Theme
1. Login as a learner
2. Go to Profile page
3. Scroll to Settings section
4. Choose from 5 warm color themes:
   - Ocean Blue
   - Sunset Orange
   - Warm Red
   - Golden Amber
   - Rose Pink

### Add New Courses
1. Login as admin (`admin@afyahub.com`)
2. Go to Admin Dashboard
3. Click "Manage Courses"
4. Click "Add New Course"
5. Fill in course details
6. Add modules with content

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Change port in command
uvicorn app.main:app --reload --port 8001
```

**Database errors:**
```bash
# Delete and recreate database
del afyahub.db
python seed_data.py
```

**Import errors:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend Issues

**Port 3000 already in use:**
Edit `vite.config.js` and change port:
```javascript
server: { port: 3001 }
```

**API connection errors:**
- Ensure backend is running on port 8000
- Check `vite.config.js` proxy configuration
- Clear browser cache

**Blank page after login:**
- Hard refresh: `Ctrl + Shift + R`
- Clear localStorage: Open console (F12) and run `localStorage.clear()`
- Check browser console for errors

---

## 📱 Testing

### Test User Registration
1. Go to `http://localhost:3000/register`
2. Fill in registration form
3. Submit and verify auto-login

### Test Course Enrollment
1. Login as learner
2. Browse courses
3. Click "Enroll Now"
4. Verify enrollment in dashboard

### Test Progress Tracking
1. Enroll in a course
2. Open a module
3. Click "Mark as Complete"
4. Check dashboard for updated stats

### Test Admin Features
1. Login as admin
2. Access admin dashboard
3. Create a new course
4. Add modules to course

---

## 🚀 Production Deployment

### Backend
1. Change `SECRET_KEY` in `.env`
2. Use PostgreSQL instead of SQLite
3. Set environment variables
4. Use production ASGI server:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
1. Build for production:
```bash
npm run build
```
2. Deploy `dist/` folder to hosting service
3. Configure environment variables
4. Set up proper routing for SPA

---

## 📊 Project Structure

```
AfyaHub/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── db/             # Database
│   │   ├── models/         # SQLAlchemy models
│   │   └── schemas/        # Pydantic schemas
│   ├── requirements.txt    # Python dependencies
│   └── seed_data.py        # Database seeding
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context
│   │   ├── hooks/         # Custom hooks
│   │   └── services/      # API services
│   └── package.json       # Node dependencies
│
└── SETUP_GUIDE.md         # This file
```

---

## 🔒 Security Notes

- Change `SECRET_KEY` in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Enable CORS only for trusted origins
- Use environment variables for sensitive data

---

## 📞 Support

For issues or questions:
1. Check this guide
2. Review API documentation at `/docs`
3. Check browser console for errors
4. Verify both servers are running

---

## 🎉 Success!

If both servers are running and you can login, you're all set! 

**Start exploring AfyaHub and making a difference in HIV/AIDS education!** 🌟

---

**Built with ❤️ for HIV/AIDS education and community support.**
