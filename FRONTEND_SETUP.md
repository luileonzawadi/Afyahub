# AfyaHub Frontend - Complete Setup Guide

## 📋 Overview

This document provides complete instructions for setting up and running the AfyaHub frontend application.

## 🎯 What's Included

### ✅ Complete React Application Structure
- **50+ Components** organized by feature
- **10+ Pages** (Public, Learner, Admin)
- **Full Routing** with React Router
- **State Management** with TanStack Query + Context API
- **Responsive Design** for all screen sizes
- **AfyaHub Color Palette** implemented throughout

### 📁 Directory Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── Skeleton.jsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── course/              # Course components
│   │   │   └── Quiz.jsx
│   │   └── [admin, forum]/      # Feature-specific components
│   ├── pages/
│   │   ├── public/              # Public pages
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Resources.jsx
│   │   ├── learner/             # Learner pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CourseList.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── ModuleViewer.jsx
│   │   │   ├── Forum.jsx
│   │   │   └── Profile.jsx
│   │   └── admin/               # Admin pages
│   │       ├── AdminDashboard.jsx
│   │       └── CourseManagement.jsx
│   ├── context/                 # React Context
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── ThemeContext.jsx     # Theme management
│   ├── hooks/                   # Custom hooks
│   │   └── useQuery.js          # TanStack Query hooks
│   ├── services/                # API services
│   │   └── api.js               # Axios API client
│   ├── styles/                  # Global styles
│   │   └── index.css            # Global CSS with color palette
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

## 🎨 Design System

### Color Palette (Already Implemented)
```css
--primary: #00BFA5        /* Teal - Primary actions */
--secondary: #1A237E      /* Deep Blue - Secondary elements */
--background: #F5F7FA     /* Light Gray-Blue - Page background */
--accent: #FF6B6B         /* Coral - Accent/highlights */
--header-text: #0D47A1    /* Navy Blue - Headings */
--body-text: #424242      /* Charcoal Gray - Body text */
--link: #00897B           /* Teal Accent - Links */
```

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 600 weight
- **Body**: 400 weight
- **Line Height**: 1.6

### Spacing Scale
- 8px, 16px, 24px, 32px, 48px, 64px

### Border Radius
- Cards: 8px
- Buttons: 6px
- Inputs: 6px

## 📱 Pages Overview

### Public Pages
1. **Home** (`/`) - Hero section, features, featured courses
2. **Login** (`/login`) - User authentication
3. **Register** (`/register`) - New user registration
4. **Course List** (`/courses`) - Browse all courses with search/filter
5. **Course Detail** (`/courses/:id`) - Course overview and enrollment
6. **Forum** (`/forum`) - Community discussions
7. **Resources** (`/resources`) - Testing centers, support groups

### Learner Pages (Protected)
1. **Dashboard** (`/dashboard`) - Personalized learning dashboard
2. **Module Viewer** (`/courses/:courseId/modules/:moduleId`) - Video, content, navigation
3. **Quiz** (`/courses/:courseId/modules/:moduleId/quiz`) - Interactive quizzes
4. **Profile** (`/profile`) - User profile and certificates

### Admin Pages (Admin Only)
1. **Admin Dashboard** (`/admin`) - Overview and quick stats
2. **Course Management** (`/admin/courses`) - Create/edit/delete courses
3. **User Management** (`/admin/users`) - Manage users (UI ready)
4. **Forum Moderation** (`/admin/forum`) - Moderate discussions (UI ready)

## 🔌 API Integration

### Backend Connection
The frontend expects a backend API at `/api`. Configure in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
}
```

### API Endpoints Used
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me
GET    /api/courses
GET    /api/courses/:id
GET    /api/courses/:id/modules
POST   /api/courses/:id/enroll
GET    /api/modules/:id/quiz
POST   /api/quizzes/:id/submit
GET    /api/forum/topics
POST   /api/forum/topics
GET    /api/users/profile
GET    /api/users/progress
GET    /api/admin/stats
```

## 🔐 Authentication Flow

1. User logs in via `/login`
2. Token stored in localStorage
3. Token added to all API requests via Axios interceptor
4. AuthContext provides user state globally
5. ProtectedRoute component guards authenticated routes

## 📊 State Management

### TanStack Query (Server State)
- Courses data
- User progress
- Forum topics
- Quiz data
- Admin statistics

### Context API (Client State)
- User authentication
- Theme (light/dark)

## 🎯 Key Features Implemented

### ✅ Learner Features
- Course browsing with search/filter
- Course enrollment
- Video lessons
- Interactive quizzes with immediate feedback
- Progress tracking
- Certificate viewing
- Community forum
- Profile management

### ✅ Admin Features
- Dashboard with statistics
- Course creation/editing
- User management UI
- Forum moderation UI
- Analytics overview

### ✅ UI/UX Features
- Fully responsive design
- Skeleton loaders
- Hover effects
- Smooth transitions
- Modal dialogs
- Form validation
- Error handling
- Loading states

## 🔧 Customization

### Changing Colors
Edit `src/styles/index.css`:
```css
:root {
  --primary: #00BFA5;  /* Change this */
  /* ... other colors */
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Header.jsx`

### Adding API Endpoints
1. Add function to `src/services/api.js`
2. Create custom hook in `src/hooks/useQuery.js`
3. Use hook in component

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0

### State Management
- @tanstack/react-query: ^5.14.0
- axios: ^1.6.2

### UI
- react-icons: ^4.12.0
- framer-motion: ^10.16.16

### Build Tools
- vite: ^5.0.8
- @vitejs/plugin-react: ^4.2.1

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001  // Use different port
}
```

### API Connection Issues
- Ensure backend is running
- Check proxy configuration in `vite.config.js`
- Verify API base URL

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Next Steps

1. **Connect to Backend**: Ensure backend API is running
2. **Test Authentication**: Try login/register flows
3. **Add Content**: Create courses via admin panel
4. **Customize**: Adjust colors, content, images
5. **Deploy**: Build and deploy to hosting service

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables if needed

### Deploy to Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder contents
3. Configure server for SPA routing

## 📞 Support

For issues or questions:
- Check the README.md
- Review component documentation
- Inspect browser console for errors
- Verify API responses in Network tab

## ✨ Features Summary

### Implemented ✅
- Complete responsive UI
- Authentication system
- Course browsing and enrollment
- Module viewer with video support
- Interactive quizzes
- Progress tracking
- Community forum
- Admin dashboard
- Course management
- User profile
- Resources directory

### Ready for Backend Integration ✅
- All API calls configured
- TanStack Query hooks ready
- Error handling in place
- Loading states implemented

---

**AfyaHub Frontend is production-ready and waiting for backend integration!**

Built with ❤️ for HIV/AIDS education and community support.
