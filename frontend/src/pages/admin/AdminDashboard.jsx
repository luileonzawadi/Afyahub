import { useNavigate } from 'react-router-dom';
import { FiUsers, FiBook, FiMessageSquare, FiBarChart2, FiSettings, FiShield } from 'react-icons/fi';
import { useAdminStats } from '../../hooks/useQuery';
import Card from '../../components/common/Card';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: stats } = useAdminStats();

  const sections = [
    { icon: FiBook, title: 'Course Management', description: 'Create and manage courses', path: '/admin/courses', color: '#2563eb' },
    { icon: FiUsers, title: 'User Management', description: 'Manage users and roles', path: '/admin/users', color: '#10b981' },
    { icon: FiMessageSquare, title: 'Forum Moderation', description: 'Moderate discussions', path: '/admin/forum', color: '#f59e0b' },
    { icon: FiBarChart2, title: 'Analytics', description: 'View platform statistics', path: '/admin/analytics', color: '#8b5cf6' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage AfyaHub platform</p>
        </div>

        <div className="admin-stats">
          <Card>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <FiUsers />
              </div>
              <div className="admin-stat-info">
                <h3>{stats?.totalUsers || 0}</h3>
                <p>Total Users</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <FiBook />
              </div>
              <div className="admin-stat-info">
                <h3>{stats?.totalCourses || 0}</h3>
                <p>Total Courses</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <FiMessageSquare />
              </div>
              <div className="admin-stat-info">
                <h3>{stats?.forumReports || 0}</h3>
                <p>Forum Reports</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <FiBarChart2 />
              </div>
              <div className="admin-stat-info">
                <h3>{stats?.activeUsers || 0}</h3>
                <p>Active Users</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="admin-sections">
          {sections.map((section, idx) => (
            <Card key={idx} hover onClick={() => navigate(section.path)}>
              <div className="admin-section-card">
                <div className="admin-section-icon" style={{ backgroundColor: section.color + '15', color: section.color }}>
                  <section.icon />
                </div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
