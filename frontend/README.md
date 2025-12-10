# AfyaHub Frontend

Modern, responsive frontend for AfyaHub - HIV/AIDS Education Learning Management System.

## 🚀 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **TanStack Query** - Server state management
- **Context API** - Authentication & theme
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Framer Motion** - Animations

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── course/          # Course-specific components
│   │   ├── forum/           # Forum components
│   │   └── admin/           # Admin components
│   ├── pages/
│   │   ├── public/          # Public pages (Home, Login, Register)
│   │   ├── learner/         # Learner pages (Dashboard, Courses)
│   │   └── admin/           # Admin pages
│   ├── context/             # React Context (Auth, Theme)
│   ├── hooks/               # Custom hooks (TanStack Query)
│   ├── services/            # API services
│   ├── styles/              # Global styles
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── index.html              # HTML entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: #00BFA5 (Teal)
- **Secondary**: #1A237E (Deep Blue)
- **Background**: #F5F7FA (Light Gray-Blue)
- **Accent**: #FF6B6B (Coral)
- **Header Text**: #0D47A1 (Navy Blue)
- **Body Text**: #424242 (Charcoal Gray)

### Typography
- **Font Family**: Inter
- **Spacing Scale**: 8px grid (8, 16, 24, 32, 48, 64)
- **Border Radius**: 6-8px

## 🛠 Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Key Features

### Public Pages
- Landing page with hero section
- Course catalog with search/filter
- Login/Register with validation
- Resources directory

### Learner Dashboard
- Personalized progress tracking
- Enrolled courses overview
- Course modules with video/content
- Interactive quizzes with feedback
- Community forum
- Certificate management

### Admin Dashboard
- User management
- Course creation/editing
- Forum moderation
- Analytics overview

## 🔌 API Integration

The frontend connects to the backend API at `/api`. Configure the proxy in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

## 📱 Responsive Design

All pages are fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

## 🎯 State Management

- **TanStack Query**: Server state (courses, progress, forum)
- **Context API**: Client state (auth, theme)
- **Local Storage**: Token persistence

## 🔐 Authentication

Protected routes require authentication. The `ProtectedRoute` component handles:
- User authentication check
- Role-based access (admin routes)
- Redirect to login if unauthenticated

## 🚦 Getting Started

1. Ensure backend API is running
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open browser to `http://localhost:3000`

## 📝 Environment Variables

Create `.env` file if needed:
```
VITE_API_URL=http://localhost:8000
```

## 🤝 Contributing

1. Follow the existing code structure
2. Use the design system colors and spacing
3. Ensure responsive design
4. Test on multiple screen sizes

## 📄 License

Copyright © 2024 AfyaHub. All rights reserved.
