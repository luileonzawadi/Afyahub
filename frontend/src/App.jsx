import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Resources from './pages/public/Resources';

// Learner Pages
import Dashboard from './pages/learner/Dashboard';
import CourseList from './pages/learner/CourseList';
import CourseDetail from './pages/learner/CourseDetail';
import ModuleViewer from './pages/learner/ModuleViewer';
import Forum from './pages/learner/Forum';
import ForumTopic from './pages/learner/ForumTopic';
import Bookmarks from './pages/learner/Bookmarks';
import Notifications from './pages/learner/Notifications';
import Profile from './pages/learner/Profile';
import Quiz from './components/course/Quiz';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/admin/CourseManagement';
import UserManagement from './pages/admin/UserManagement';
import ForumModeration from './pages/admin/ForumModeration';
import Analytics from './pages/admin/Analytics';
import ModuleEditor from './pages/admin/ModuleEditor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000
    }
  }
});

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  if (!adminOnly && user.role === 'admin') return <Navigate to="/admin" />;

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/:id" element={<ForumTopic />} />
                <Route path="/resources" element={<Resources />} />

                {/* Protected Learner Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/courses/:courseId/modules/:moduleId" element={
                  <ProtectedRoute>
                    <ModuleViewer />
                  </ProtectedRoute>
                } />
                <Route path="/courses/:courseId/modules/:moduleId/quiz" element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                } />
                <Route path="/bookmarks" element={
                  <ProtectedRoute>
                    <Bookmarks />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/courses" element={
                  <ProtectedRoute adminOnly>
                    <CourseManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute adminOnly>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="/admin/forum" element={
                  <ProtectedRoute adminOnly>
                    <ForumModeration />
                  </ProtectedRoute>
                } />
                <Route path="/admin/analytics" element={
                  <ProtectedRoute adminOnly>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/admin/courses/:courseId/modules" element={
                  <ProtectedRoute adminOnly>
                    <ModuleEditor />
                  </ProtectedRoute>
                } />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
