# 🏥 AfyaHub - HIV/AIDS Education Platform

> Complete Learning Management System for HIV/AIDS education with FastAPI backend and React frontend

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)
![Database](https://img.shields.io/badge/Database-SQLite-003B57)

---

## 🎯 Overview

AfyaHub is a comprehensive Learning Management System designed to deliver structured HIV/AIDS education, support community engagement, and provide access to vital resources. The platform features a modern React frontend and a high-performance FastAPI backend.

---

## ✨ Key Features

### 🎓 Learning Platform
- **Course Catalog** - Browse comprehensive HIV/AIDS courses
- **Video Lessons** - Interactive video content
- **Progress Tracking** - Monitor learning journey
- **Module Completion** - Track completed lessons
- **Certificates** - Earn certificates upon completion

### 👤 User Features
- **Authentication** - Secure JWT-based login
- **User Profiles** - Personalized user accounts
- **Learning Streaks** - Track consecutive days of learning
- **Theme Customization** - 5 warm color themes
- **Dashboard** - Personalized learning overview

### 👨‍💼 Admin Features
- **Course Management** - Create, edit, delete courses
- **Module Editor** - Add video URLs and HTML content
- **User Management** - Manage user accounts
- **Analytics Dashboard** - View platform statistics
- **Content Moderation** - Moderate forum discussions

---

## 🚀 Quick Start

### Option 1: Automated Start (Windows)
```bash
START.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 🔐 Default Credentials

### Admin Account
- **Email:** admin@afyahub.com
- **Password:** admin123

### Demo Learner
- **Email:** demo@afyahub.com
- **Password:** demo123

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **JWT** - Secure authentication
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **React Icons** - Icon library

---

## 📁 Project Structure

```
AfyaHub/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # API endpoints
│   │   │   ├── auth.py        # Authentication
│   │   │   ├── courses.py     # Course management
│   │   │   └── users.py       # User management
│   │   ├── core/              # Core functionality
│   │   │   ├── config.py      # Configuration
│   │   │   └── security.py    # Security utilities
│   │   ├── db/                # Database
│   │   │   └── database.py    # DB connection
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── user.py        # User model
│   │   │   └── course.py      # Course models
│   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── user.py        # User schemas
│   │   │   └── course.py      # Course schemas
│   │   └── main.py            # FastAPI app
│   ├── requirements.txt       # Dependencies
│   ├── seed_data.py          # Database seeding
│   └── .env                   # Environment variables
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── common/       # Button, Card, Input
│   │   │   ├── layout/       # Header, Footer
│   │   │   └── course/       # Course components
│   │   ├── pages/            # Page components
│   │   │   ├── public/       # Home, Login, Register
│   │   │   ├── learner/      # Dashboard, Courses
│   │   │   └── admin/        # Admin Dashboard
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useQuery.js
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   └── styles/           # Global styles
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Vite configuration
│
├── SETUP_GUIDE.md            # Detailed setup guide
├── START.bat                 # Quick start script
└── README.md                 # This file
```

---

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[API Documentation](http://localhost:8000/docs)** - Interactive API docs (when server is running)
- **[Frontend README](frontend/README.md)** - Frontend-specific documentation
- **[Backend README](backend/README.md)** - Backend-specific documentation

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses/{id}/enroll` - Enroll in course
- `GET /api/courses/{id}/modules` - Get course modules
- `POST /api/courses/modules/{id}/progress` - Update progress

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users/progress` - Get user progress

### Admin (Admin only)
- `POST /api/courses` - Create course
- `POST /api/courses/{id}/modules` - Create module

---

## 🎨 Features Showcase

### For Learners
✅ Browse and enroll in courses  
✅ Watch video lessons  
✅ Track learning progress  
✅ Complete modules  
✅ Customize color themes (5 warm colors)  
✅ Track learning streaks  
✅ View certificates  
✅ Community forum access  

### For Administrators
✅ Admin dashboard with analytics  
✅ Create and manage courses  
✅ Add/edit/delete modules  
✅ User management  
✅ Content moderation  
✅ View platform statistics  

---

## 🔒 Security

- JWT token-based authentication
- Bcrypt password hashing
- Role-based access control (Admin/Learner)
- CORS configuration
- Input validation with Pydantic
- SQL injection protection with SQLAlchemy ORM

---

## 🐛 Troubleshooting

### Backend won't start
```bash
cd backend
pip install -r requirements.txt --force-reinstall
python seed_data.py
```

### Frontend won't start
```bash
cd frontend
npm install
npm run dev
```

### Can't login
- Ensure backend is running on port 8000
- Run `python seed_data.py` to create default users
- Clear browser cache and localStorage

### Blank page after login
- Hard refresh: `Ctrl + Shift + R`
- Check browser console (F12) for errors
- Verify both servers are running

---

## 📊 Database

The system uses SQLite by default. To reset the database:

```bash
cd backend
del afyahub.db  # Windows
rm afyahub.db   # Linux/Mac
python seed_data.py
```

---

## 🚀 Production Deployment

### Backend
1. Change `SECRET_KEY` in `.env`
2. Use PostgreSQL instead of SQLite
3. Use production ASGI server (Gunicorn)
4. Enable HTTPS
5. Set up proper CORS origins

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` folder
3. Configure environment variables
4. Set up SPA routing

---

## 📈 Future Enhancements

- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Video conferencing

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

Copyright © 2024 AfyaHub. All rights reserved.

---

## 🙏 Acknowledgments

Built with ❤️ for HIV/AIDS education and community support.

**AfyaHub - Empowering communities through education.**

---

## 📞 Support

For issues or questions:
1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Review API documentation at `/docs`
3. Check browser console for errors
4. Verify both servers are running

---

## 🎉 Get Started Now!

```bash
# Clone or download the project
cd AfyaHub

# Run the quick start script
START.bat

# Or follow the manual setup in SETUP_GUIDE.md
```

**Visit http://localhost:3000 and start making a difference!** 🌟
