# 🏥 AfyaHub - HIV/AIDS Education Platform

> Complete Learning Management System for HIV/AIDS education with FastAPI backend and React frontend

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)
![Database](https://img.shields.io/badge/Database-SQLite-003B57)

## 🎯 Overview

AfyaHub is a comprehensive Learning Management System designed to deliver structured HIV/AIDS education, support community engagement, and provide access to vital resources in Kenya. The platform features a modern React frontend and a high-performance FastAPI backend.

## ✨ Key Features

### 🎓 Learning Platform
- **Course Catalog** - Browse comprehensive HIV/AIDS courses
- **Video Lessons** - Interactive video content with YouTube integration
- **Progress Tracking** - Monitor learning journey with completion percentages
- **Module Completion** - Track completed lessons with notifications
- **Certificates** - Earn certificates upon course completion

### 👤 User Features
- **Authentication** - Secure JWT-based login system
- **User Profiles** - Personalized user accounts with settings
- **Learning Streaks** - Track consecutive days of learning
- **Theme Customization** - 5 warm color themes (Sky Blue, Ocean Blue, Sunset Orange, Warm Red, Golden Amber, Rose Pink)
- **Dashboard** - Personalized learning overview with statistics
- **Notifications** - User-specific notification system
- **Bookmarks** - Save favorite courses for quick access

### 💬 Community Features
- **Forum Discussions** - Create and participate in community discussions
- **Category Filtering** - Support & Care, Education, Community categories
- **Like & Reply System** - Interactive engagement with chat-style replies
- **Real-time Updates** - Live notification system for new posts
- **User-specific Content** - Delete own discussions and replies

### 🏥 Resource Directory
- **Testing Centers** - Find HIV testing locations across Kenya
- **Support Services** - Access to counseling and support organizations
- **Contact Information** - Phone numbers, addresses, and websites
- **Service Details** - Hours of operation and available services
- **Location-based** - Resources in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret

### 👨💼 Admin Features
- **Course Management** - Create, edit, delete courses and modules
- **User Management** - View and manage user accounts
- **Forum Moderation** - Monitor and moderate community discussions
- **Analytics Dashboard** - Comprehensive platform statistics
- **Content Management** - Full CRUD operations for educational content

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Option 1: Automated Start (Windows)
```bash
START.bat
```

### Option 2: Manual Start

**Backend Setup:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload --port 8000
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## 🔐 Default Credentials

### Admin Account
- **Email:** admin@afyahub.com
- **Password:** admin123

### Demo Learner
- **Email:** demo@afyahub.com
- **Password:** demo123

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **JWT** - Secure authentication with bcrypt
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI framework with hooks
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client with interceptors
- **React Icons** - Comprehensive icon library

## 📁 Project Structure

```
AfyaHub/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # API endpoints
│   │   │   ├── auth.py        # JWT Authentication
│   │   │   ├── courses.py     # Course management
│   │   │   ├── users.py       # User management
│   │   │   ├── forum.py       # Forum discussions
│   │   │   ├── admin.py       # Admin operations
│   │   │   ├── resources.py   # Resource directory
│   │   │   └── dependencies.py # Shared dependencies
│   │   ├── core/              # Core functionality
│   │   │   ├── config.py      # Configuration
│   │   │   └── security.py    # Security utilities
│   │   ├── db/                # Database
│   │   │   └── database.py    # DB connection
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── user.py        # User model
│   │   │   ├── course.py      # Course models
│   │   │   ├── forum.py       # Forum models
│   │   │   └── resource.py    # Resource model
│   │   ├── schemas/           # Pydantic schemas
│   │   └── main.py            # FastAPI app
│   ├── requirements.txt       # Python dependencies
│   ├── seed_data.py          # Database seeding
│   └── .env                   # Environment variables
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── common/       # Button, Card, Input, Modal
│   │   │   ├── layout/       # Header, Footer, Layout
│   │   │   └── course/       # Course-specific components
│   │   ├── pages/            # Page components
│   │   │   ├── public/       # Home, Login, Register, Resources
│   │   │   ├── learner/      # Dashboard, Courses, Forum, Profile
│   │   │   └── admin/        # Admin Dashboard, Management
│   │   ├── context/          # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useQuery.js
│   │   ├── services/         # API services
│   │   │   ├── api.js
│   │   │   └── mockData.js
│   │   ├── utils/            # Utilities
│   │   │   ├── storage.js
│   │   │   └── theme.js
│   │   └── styles/           # Global styles
│   ├── package.json          # Dependencies
│   └── vite.config.js        # Vite configuration
│
├── .gitignore                # Git ignore rules
├── README.md                 # This file
└── START.bat                 # Quick start script
```

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

### Forum
- `GET /api/forum/topics` - Get all forum topics
- `GET /api/forum/topics/{id}` - Get specific topic
- `POST /api/forum/topics` - Create new topic
- `DELETE /api/forum/topics/{id}` - Delete topic (author/admin only)

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources?type={type}` - Filter by resource type
- `GET /api/resources/{id}` - Get specific resource

### Admin (Admin only)
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/{id}` - Delete user
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/{id}` - Update course
- `DELETE /api/admin/courses/{id}` - Delete course

## 🎨 Features Showcase

### For Learners
✅ Browse and enroll in HIV/AIDS courses  
✅ Watch educational video lessons  
✅ Track learning progress with percentages  
✅ Complete modules and earn certificates  
✅ Customize interface with 5 color themes  
✅ Track learning streaks and achievements  
✅ Participate in community discussions  
✅ Access Kenya-based resource directory  
✅ Receive personalized notifications  
✅ Bookmark favorite courses  

### For Administrators
✅ Comprehensive admin dashboard with analytics  
✅ Create and manage courses with modules  
✅ User management with deletion capabilities  
✅ Forum moderation and content management  
✅ View detailed platform statistics  
✅ Monitor user engagement and progress  

## 🔒 Security Features

- JWT token-based authentication with refresh
- Bcrypt password hashing
- Role-based access control (Admin/Learner)
- CORS configuration for secure cross-origin requests
- Input validation with Pydantic schemas
- SQL injection protection with SQLAlchemy ORM
- User-specific data isolation
- Secure session management

## 🌍 Kenya-Focused Resources

The platform includes authentic Kenyan HIV/AIDS resources:
- **Kenyatta National Hospital VCT** - Nairobi
- **Kenya AIDS NGOs Consortium (KANCO)** - Nairobi
- **Mombasa Counseling Center** - Mombasa
- **Kisumu District Hospital VCT** - Kisumu
- **Family Health Options Kenya** - Nakuru
- **AMPATH Center** - Eldoret

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use PostgreSQL for production database
3. Configure Gunicorn for WSGI server
4. Set up SSL/HTTPS
5. Configure proper CORS origins

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy `dist/` folder to web server
3. Configure environment variables
4. Set up SPA routing for client-side navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

Copyright © 2024 AfyaHub. All rights reserved.

## 🙏 Acknowledgments

Built with ❤️ for HIV/AIDS education and community support in Kenya.

**AfyaHub - Empowering communities through education.**

---

## 📞 Support

For technical support:
1. Check the API documentation at `/docs`
2. Review the troubleshooting section
3. Check browser console for errors
4. Ensure both backend and frontend servers are running

## 🎉 Get Started

```bash
git clone https://github.com/yourusername/afyahub.git
cd afyahub
# Follow the Quick Start guide above
```

**Visit http://localhost:3000 and start making a difference!** 🌟