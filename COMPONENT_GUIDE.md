# AfyaHub Component Guide

## 🧩 Reusable Components Library

This guide shows all available components and how to use them.

---

## 📦 Common Components

### Button
**Location**: `src/components/common/Button.jsx`

**Usage**:
```jsx
import Button from './components/common/Button';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Large Button
</Button>

// Outline button
<Button variant="outline" size="sm" icon={<FiPlus />}>
  Add Item
</Button>

// Danger button
<Button variant="danger" disabled>
  Delete
</Button>
```

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: React element
- `disabled`: boolean
- `onClick`: function
- `type`: 'button' | 'submit'

---

### Card
**Location**: `src/components/common/Card.jsx`

**Usage**:
```jsx
import Card from './components/common/Card';

<Card hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Props**:
- `hover`: boolean - Enable hover effect
- `className`: string - Additional CSS classes
- `onClick`: function - Click handler

---

### Input
**Location**: `src/components/common/Input.jsx`

**Usage**:
```jsx
import Input from './components/common/Input';

<Input
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  placeholder="your@email.com"
  required
  error={errors.email}
/>
```

**Props**:
- `label`: string - Input label
- `type`: string - Input type
- `name`: string - Input name
- `value`: string - Input value
- `onChange`: function - Change handler
- `placeholder`: string
- `error`: string - Error message
- `required`: boolean

---

### Modal
**Location**: `src/components/common/Modal.jsx`

**Usage**:
```jsx
import Modal from './components/common/Modal';

<Modal 
  isOpen={showModal} 
  onClose={() => setShowModal(false)} 
  title="Modal Title"
>
  <p>Modal content goes here</p>
  <Button onClick={handleSubmit}>Submit</Button>
</Modal>
```

**Props**:
- `isOpen`: boolean - Modal visibility
- `onClose`: function - Close handler
- `title`: string - Modal title
- `children`: React nodes - Modal content

---

### ProgressBar
**Location**: `src/components/common/ProgressBar.jsx`

**Usage**:
```jsx
import ProgressBar from './components/common/ProgressBar';

<ProgressBar progress={75} showLabel={true} />
```

**Props**:
- `progress`: number (0-100) - Progress percentage
- `showLabel`: boolean - Show percentage label

---

### Skeleton
**Location**: `src/components/common/Skeleton.jsx`

**Usage**:
```jsx
import Skeleton from './components/common/Skeleton';

// Loading placeholder
<Skeleton height="200px" width="100%" />
<Skeleton height="24px" width="80%" />
<Skeleton height="16px" />
```

**Props**:
- `width`: string - Width (default: '100%')
- `height`: string - Height (default: '20px')
- `borderRadius`: string - Border radius (default: '4px')

---

## 🏗 Layout Components

### Layout
**Location**: `src/components/layout/Layout.jsx`

**Usage**:
```jsx
import Layout from './components/layout/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

Includes Header and Footer automatically.

---

### Header
**Location**: `src/components/layout/Header.jsx`

Features:
- Logo and navigation
- User menu (when logged in)
- Login/Register buttons (when logged out)
- Mobile responsive menu
- Admin link (for admin users)

---

### Footer
**Location**: `src/components/layout/Footer.jsx`

Features:
- Quick links
- Social media icons
- Resource links
- Copyright notice

---

## 📚 Course Components

### Quiz
**Location**: `src/components/course/Quiz.jsx`

Features:
- Multiple choice questions
- Answer selection
- Submit functionality
- Results display with explanations
- Score calculation
- Retry option

**Usage**:
```jsx
import Quiz from './components/course/Quiz';

// Used in route
<Route path="/courses/:courseId/modules/:moduleId/quiz" element={<Quiz />} />
```

---

## 🎨 Styling Guide

### Using CSS Classes

**Global Classes** (available everywhere):
```jsx
// Container
<div className="container">
  {/* Max-width 1200px, centered */}
</div>

// Buttons
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline">Outline</button>

// Cards
<div className="card">
  {/* Styled card with shadow */}
</div>

// Text alignment
<div className="text-center">Centered text</div>
```

---

## 🎯 Custom Hooks

### useAuth
**Location**: `src/context/AuthContext.jsx`

**Usage**:
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

**Returns**:
- `user`: object | null - Current user
- `login`: function(email, password) - Login user
- `register`: function(userData) - Register user
- `logout`: function() - Logout user
- `loading`: boolean - Auth loading state

---

### useTheme
**Location**: `src/context/ThemeContext.jsx`

**Usage**:
```jsx
import { useTheme } from './context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

---

### TanStack Query Hooks
**Location**: `src/hooks/useQuery.js`

**Available Hooks**:
```jsx
import { 
  useCourses,           // Get all courses
  useCourse,            // Get single course
  useCourseModules,     // Get course modules
  useEnrollCourse,      // Enroll in course
  useUpdateProgress,    // Update module progress
  useQuiz,              // Get quiz
  useSubmitQuiz,        // Submit quiz answers
  useForumTopics,       // Get forum topics
  useForumTopic,        // Get single topic
  useCreateTopic,       // Create forum topic
  useUserProfile,       // Get user profile
  useUserProgress,      // Get user progress
  useAdminStats         // Get admin statistics
} from './hooks/useQuery';
```

**Example**:
```jsx
function CourseList() {
  const { data: courses, isLoading, error } = useCourses();
  
  if (isLoading) return <Skeleton />;
  if (error) return <div>Error loading courses</div>;
  
  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

---

## 🎨 Color Variables

**Available in all CSS files**:
```css
var(--primary)        /* #00BFA5 - Teal */
var(--secondary)      /* #1A237E - Deep Blue */
var(--background)     /* #F5F7FA - Light Gray-Blue */
var(--accent)         /* #FF6B6B - Coral */
var(--header-text)    /* #0D47A1 - Navy Blue */
var(--body-text)      /* #424242 - Charcoal Gray */
var(--link)           /* #00897B - Teal Accent */
var(--card-bg)        /* #FFFFFF - White */
var(--border)         /* #E0E0E0 - Light Gray */
var(--shadow)         /* rgba(0, 0, 0, 0.08) */
var(--success)        /* #4CAF50 - Green */
var(--warning)        /* #FFC107 - Yellow */
var(--error)          /* #F44336 - Red */
```

**Usage**:
```css
.my-component {
  background: var(--primary);
  color: var(--card-bg);
  border: 1px solid var(--border);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  /* Mobile styles */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 968px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 969px) {
  /* Desktop styles */
}
```

---

## 🔒 Protected Routes

**Usage**:
```jsx
import { ProtectedRoute } from './App';

// Learner route (requires login)
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

// Admin route (requires admin role)
<Route path="/admin" element={
  <ProtectedRoute adminOnly>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

---

## 🎯 Common Patterns

### Loading State
```jsx
function MyComponent() {
  const { data, isLoading } = useCourses();
  
  if (isLoading) {
    return (
      <div className="courses-grid">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <Skeleton height="200px" />
            <Skeleton height="24px" />
          </Card>
        ))}
      </div>
    );
  }
  
  return <div>{/* Render data */}</div>;
}
```

### Empty State
```jsx
{data?.length === 0 && (
  <Card>
    <div className="empty-state">
      <FiBook size={48} />
      <h3>No courses found</h3>
      <p>Start by creating your first course</p>
      <Button onClick={handleCreate}>Create Course</Button>
    </div>
  </Card>
)}
```

### Form Handling
```jsx
const [formData, setFormData] = useState({ name: '', email: '' });
const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/endpoint', formData);
    // Success
  } catch (error) {
    setErrors(error.response?.data?.errors);
  }
};

return (
  <form onSubmit={handleSubmit}>
    <Input
      label="Name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      error={errors.name}
    />
    <Button type="submit">Submit</Button>
  </form>
);
```

---

## 🚀 Quick Component Creation

### Creating a New Page
1. Create file in `src/pages/[category]/MyPage.jsx`
2. Create styles in `src/pages/[category]/MyPage.css`
3. Add route in `src/App.jsx`
4. Add navigation link in `src/components/layout/Header.jsx`

### Creating a New Component
1. Create file in `src/components/[category]/MyComponent.jsx`
2. Create styles in `src/components/[category]/MyComponent.css`
3. Export from component file
4. Import where needed

---

## 📚 Example: Complete Feature

**Creating a new "Announcements" feature**:

1. **Create API function** (`src/services/api.js`):
```jsx
export const announcementAPI = {
  getAll: () => api.get('/announcements'),
  create: (data) => api.post('/announcements', data)
};
```

2. **Create hook** (`src/hooks/useQuery.js`):
```jsx
export const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: () => announcementAPI.getAll().then(res => res.data)
  });
};
```

3. **Create component** (`src/components/Announcements.jsx`):
```jsx
import { useAnnouncements } from '../hooks/useQuery';
import Card from './common/Card';

function Announcements() {
  const { data: announcements, isLoading } = useAnnouncements();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {announcements.map(item => (
        <Card key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </Card>
      ))}
    </div>
  );
}
```

4. **Add to page** - Import and use in any page component

---

**This component library gives you everything needed to build AfyaHub!** 🎉
