import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { useCourseModules, useUpdateProgress } from '../../hooks/useQuery';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './ModuleViewer.css';

const ModuleViewer = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: modules, refetch } = useCourseModules(courseId);
  const updateProgress = useUpdateProgress();
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    refetch();
  }, [moduleId, refetch]);

  const currentIndex = modules?.findIndex(m => m.id == moduleId) || 0;
  const currentModule = modules?.[currentIndex];
  
  if (!currentModule && modules?.length > 0) {
    console.log('Module not found. ModuleId:', moduleId, 'Available modules:', modules.map(m => m.id));
  }
  const prevModule = modules?.[currentIndex - 1];
  const nextModule = modules?.[currentIndex + 1];

  const addNotification = (title, message) => {
    if (!user) return;
    const userKey = `notifications_${user.email}`;
    const notifications = JSON.parse(localStorage.getItem(userKey) || '[]');
    const newNotification = {
      id: Date.now(),
      title,
      message,
      time: new Date().toLocaleString(),
      read: false
    };
    notifications.unshift(newNotification);
    localStorage.setItem(userKey, JSON.stringify(notifications));
  };

  const handleComplete = async () => {
    if (completed || currentModule?.completed) return;
    
    try {
      await updateProgress.mutateAsync({
        moduleId,
        courseId,
        data: { completed: true }
      });
      setCompleted(true);
      
      // Add congratulations notification
      addNotification(
        '🎉 Module Completed!',
        `Congratulations! You've successfully completed "${currentModule?.title}". Keep up the great work!`
      );
      
      await refetch();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const handleNext = async () => {
    if (!completed && !currentModule?.completed) {
      try {
        await updateProgress.mutateAsync({
          moduleId,
          courseId,
          data: { completed: true }
        });
        
        // Add congratulations notification
        addNotification(
          '🎉 Module Completed!',
          `Congratulations! You've successfully completed "${currentModule?.title}". Keep up the great work!`
        );
        
        await refetch();
      } catch (error) {
        console.error('Failed to update progress:', error);
      }
    }
    
    if (nextModule) {
      setCompleted(false);
      navigate(`/courses/${courseId}/modules/${nextModule.id}`);
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <div className="module-viewer">
      <div className="container">
        <div className="module-header">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/courses/${courseId}`)}
          >
            <FiChevronLeft /> Back to Course
          </Button>
          <div className="module-progress">
            Module {currentIndex + 1} of {modules?.length}
          </div>
        </div>

        <div className="module-content">
          <Card className="module-main">
            <h1>{currentModule?.title}</h1>

            {currentModule?.videoUrl && (
              <div className="video-container">
                <video controls src={currentModule.videoUrl}>
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {currentModule?.infographic && (
              <div className="infographic-container">
                <img src={currentModule.infographic} alt="Infographic" />
              </div>
            )}

            {currentModule?.content ? (
              <div className="module-text" dangerouslySetInnerHTML={{ __html: currentModule.content }} />
            ) : (
              <div className="module-text">
                <p>No content available for this module yet.</p>
              </div>
            )}

            {currentModule?.hasQuiz && (
              <div className="quiz-section">
                <h3>Test Your Knowledge</h3>
                <p>Complete the quiz to test your understanding of this module.</p>
                <Button onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/quiz`)}>
                  Take Quiz
                </Button>
              </div>
            )}
          </Card>

          <div className="module-sidebar">
            <Card>
              <h3>Course Modules</h3>
              <div className="modules-nav">
                {modules?.map((module, idx) => (
                  <div
                    key={module.id}
                    className={`module-nav-item ${module.id == moduleId ? 'active' : ''} ${module.completed ? 'completed' : ''}`}
                    onClick={() => navigate(`/courses/${courseId}/modules/${module.id}`)}
                  >
                    <span className="module-nav-number">{idx + 1}</span>
                    <span className="module-nav-title">{module.title}</span>
                    {module.completed && <FiCheckCircle />}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card className="module-bottom">
          <div className="module-actions-bottom">
            {!completed && !currentModule?.completed ? (
              <Button 
                onClick={handleComplete}
                disabled={updateProgress.isPending}
                className="mark-read-btn"
              >
                <FiCheckCircle /> Mark as Read
              </Button>
            ) : (
              <div className="completed-badge">
                <FiCheckCircle /> Completed
              </div>
            )}
          </div>
          
          <div className="module-navigation">
            <Button
              variant="outline"
              onClick={() => navigate(`/courses/${courseId}/modules/${prevModule.id}`)}
              disabled={!prevModule}
            >
              <FiChevronLeft /> Previous
            </Button>
            <Button
              onClick={handleNext}
            >
              {nextModule ? 'Next Module' : 'Finish Course'} <FiChevronRight />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ModuleViewer;
