import { FiUsers, FiBook, FiMessageSquare, FiTrendingUp, FiAward, FiActivity } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { adminAPI, forumAPI } from '../../services/api';
import Card from '../../components/common/Card';
import './Analytics.css';

const Analytics = () => {
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => adminAPI.getStats().then(res => res.data)
  });

  const { data: topics } = useQuery({
    queryKey: ['forumTopics'],
    queryFn: () => forumAPI.getTopics().then(res => res.data)
  });

  const totalLikes = topics?.reduce((sum, topic) => {
    const topicData = JSON.parse(localStorage.getItem(`topic_${topic.id}`) || '{}');
    return sum + (topicData.likeCount || 0);
  }, 0) || 0;

  const totalReplies = topics?.reduce((sum, topic) => {
    const topicData = JSON.parse(localStorage.getItem(`topic_${topic.id}`) || '{}');
    return sum + (topicData.comments?.length || 0);
  }, 0) || 0;

  const analyticsData = [
    { icon: FiUsers, title: 'Total Users', value: stats?.totalUsers || 0, color: '#2563eb', change: '+12%' },
    { icon: FiBook, title: 'Total Courses', value: stats?.totalCourses || 0, color: '#10b981', change: '+5%' },
    { icon: FiActivity, title: 'Enrollments', value: stats?.totalEnrollments || 0, color: '#f59e0b', change: '+18%' },
    { icon: FiAward, title: 'Modules', value: stats?.totalModules || 0, color: '#8b5cf6', change: '+8%' },
    { icon: FiMessageSquare, title: 'Forum Topics', value: topics?.length || 0, color: '#ec4899', change: '+15%' },
    { icon: FiTrendingUp, title: 'Total Likes', value: totalLikes, color: '#06b6d4', change: '+22%' }
  ];

  return (
    <div className="analytics">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Analytics Dashboard</h1>
            <p>Platform statistics and insights</p>
          </div>
        </div>

        <div className="analytics-grid">
          {analyticsData.map((item, idx) => (
            <Card key={idx}>
              <div className="analytics-card">
                <div className="analytics-icon" style={{ backgroundColor: item.color + '15', color: item.color }}>
                  <item.icon />
                </div>
                <div className="analytics-info">
                  <p className="analytics-title">{item.title}</p>
                  <h2 className="analytics-value">{item.value}</h2>
                  <span className="analytics-change">{item.change} from last month</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="analytics-details">
          <Card>
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <FiUsers className="activity-icon" />
                <div>
                  <p><strong>{stats?.totalUsers || 0}</strong> registered users</p>
                  <span>Active learners on the platform</span>
                </div>
              </div>
              <div className="activity-item">
                <FiBook className="activity-icon" />
                <div>
                  <p><strong>{stats?.totalEnrollments || 0}</strong> course enrollments</p>
                  <span>Students actively learning</span>
                </div>
              </div>
              <div className="activity-item">
                <FiMessageSquare className="activity-icon" />
                <div>
                  <p><strong>{totalReplies}</strong> forum replies</p>
                  <span>Community engagement</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3>Platform Overview</h3>
            <div className="overview-stats">
              <div className="overview-item">
                <span>Courses</span>
                <strong>{stats?.totalCourses || 0}</strong>
              </div>
              <div className="overview-item">
                <span>Modules</span>
                <strong>{stats?.totalModules || 0}</strong>
              </div>
              <div className="overview-item">
                <span>Forum Topics</span>
                <strong>{topics?.length || 0}</strong>
              </div>
              <div className="overview-item">
                <span>Engagement Rate</span>
                <strong>78%</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
