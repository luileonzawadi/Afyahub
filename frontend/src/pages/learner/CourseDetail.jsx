import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlay, FiBook, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useCourse, useCourseModules, useEnrollCourse } from '../../hooks/useQuery';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Skeleton from '../../components/common/Skeleton';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: course, isLoading, refetch } = useCourse(id);
  const { data: modules } = useCourseModules(id);
  const enrollMutation = useEnrollCourse();
  
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await enrollMutation.mutateAsync(id);
      navigate(`/courses/${id}/modules/${modules[0]?.id}`);
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <Skeleton height="300px" />
        <Skeleton height="40px" width="60%" />
        <Skeleton height="20px" />
      </div>
    );
  }

  return (
    <div className="course-detail">
      <div className="course-hero" style={{ backgroundImage: `url(${course?.thumbnail})` }}>
        <div className="course-hero-overlay">
          <div className="container">
            <div className="course-hero-content">
              <h1>{course?.title}</h1>
              <p>{course?.description}</p>
              <div className="course-meta">
                <span><FiBook /> {modules?.length || 0} Modules</span>
                <span><FiClock /> {course?.duration || 'Self-paced'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-content">
          <div className="course-main">
            <Card>
              <h2>About This Course</h2>
              <p>{course?.longDescription || course?.description}</p>

              <h3>What You'll Learn</h3>
              <ul className="learning-objectives">
                {course?.objectives?.map((obj, idx) => (
                  <li key={idx}>
                    <FiCheckCircle /> {obj}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2>Course Modules</h2>
              <div className="modules-list">
                {modules?.map((module, idx) => (
                  <div key={module.id} className="module-item">
                    <div className="module-number">{idx + 1}</div>
                    <div className="module-info">
                      <h4>{module.title}</h4>
                      <p>{module.description}</p>
                    </div>
                    {module.completed && <FiCheckCircle className="module-completed" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="course-sidebar">
            <Card>
              {course?.enrolled ? (
                <>
                  <h3>Your Progress</h3>
                  <ProgressBar progress={course.progress || 0} />
                  <Button 
                    onClick={() => navigate(`/courses/${id}/modules/${modules[0]?.id}`)}
                    className="enroll-btn"
                  >
                    <FiPlay /> {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Button>
                </>
              ) : (
                <>
                  <h3>Ready to Start?</h3>
                  <p>Enroll now to begin your learning journey</p>
                  <Button 
                    onClick={handleEnroll}
                    disabled={enrollMutation.isPending}
                    className="enroll-btn"
                  >
                    {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
