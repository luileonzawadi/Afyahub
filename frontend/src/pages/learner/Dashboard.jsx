import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiAward, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCourses, useUserProgress } from '../../hooks/useQuery';
import Card from '../../components/common/Card';
import ProgressBar from '../../components/common/ProgressBar';
import Skeleton from '../../components/common/Skeleton';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: courses, isLoading: coursesLoading, refetch: refetchCourses } = useCourses();
  const { data: progress, isLoading: progressLoading, refetch: refetchProgress } = useUserProgress();
  
  useEffect(() => {
    refetchCourses();
    refetchProgress();
  }, [refetchCourses, refetchProgress]);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Continue your learning journey</p>
        </div>

        <div className="stats-grid">
          <Card>
            <div className="stat-card">
              <FiBook className="stat-icon" />
              <div>
                <h3>{progress?.enrolledCourses || 0}</h3>
                <p>Enrolled Courses</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat-card">
              <FiTrendingUp className="stat-icon" />
              <div>
                <h3>{progress?.completedModules || 0}</h3>
                <p>Completed Modules</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat-card">
              <FiAward className="stat-icon" />
              <div>
                <h3>{progress?.certificates || 0}</h3>
                <p>Certificates Earned</p>
              </div>
            </div>
          </Card>
        </div>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <Link to="/courses">Browse All</Link>
          </div>

          {progressLoading ? (
            <div className="courses-grid">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <Skeleton height="150px" />
                  <Skeleton height="24px" />
                  <Skeleton height="8px" />
                </Card>
              ))}
            </div>
          ) : progress?.enrolledCoursesData?.length > 0 ? (
            <div className="courses-grid">
              {progress.enrolledCoursesData.map(course => (
                <Card key={course.id} hover>
                  <img src={course.thumbnail || '/placeholder.jpg'} alt={course.title} />
                  <div className="card-content">
                    <h3>{course.title}</h3>
                    <ProgressBar progress={course.progress || 0} />
                    <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                      {course.progress > 0 ? 'Continue' : 'Start'} <FiArrowRight />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="empty-state">
                <FiBook size={48} />
                <h3>No enrolled courses yet</h3>
                <p>Start learning by enrolling in a course</p>
                <Link to="/courses" className="btn btn-primary">
                  Browse Courses
                </Link>
              </div>
            </Card>
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recommended Courses</h2>
          </div>

          {coursesLoading ? (
            <div className="courses-grid">
              {[1, 2].map(i => (
                <Card key={i}>
                  <Skeleton height="150px" />
                  <Skeleton height="24px" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="courses-grid">
              {courses?.slice(0, 3).map(course => (
                <Card key={course.id} hover>
                  <img src={course.thumbnail || '/placeholder.jpg'} alt={course.title} />
                  <div className="card-content">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <Link to={`/courses/${course.id}`} className="btn btn-outline btn-sm">
                      Learn More
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
