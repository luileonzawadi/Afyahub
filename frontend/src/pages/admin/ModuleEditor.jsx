import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiArrowLeft, FiVideo, FiFileText } from 'react-icons/fi';
import { useCourse, useCourseModules } from '../../hooks/useQuery';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './ModuleEditor.css';

const ModuleEditor = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data: course } = useCourse(courseId);
  const { data: modules } = useCourseModules(courseId);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    hasQuiz: false
  });

  const handleEdit = (module) => {
    setEditingModule(module);
    setModuleData({
      title: module.title,
      description: module.description,
      content: module.content,
      videoUrl: module.videoUrl || '',
      hasQuiz: module.hasQuiz
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(editingModule ? 'Module updated!' : 'Module added!');
    setShowModal(false);
    setEditingModule(null);
    setModuleData({ title: '', description: '', content: '', videoUrl: '', hasQuiz: false });
  };

  const handleDelete = (moduleId) => {
    if (window.confirm('Delete this module?')) {
      alert('Module deleted!');
    }
  };

  return (
    <div className="module-editor">
      <div className="container">
        <div className="editor-header">
          <Button variant="outline" onClick={() => navigate('/admin/courses')}>
            <FiArrowLeft /> Back to Courses
          </Button>
          <div>
            <h1>{course?.title}</h1>
            <p>Manage course modules and content</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <FiPlus /> Add Module
          </Button>
        </div>

        <div className="modules-list">
          {modules?.map((module, idx) => (
            <Card key={module.id} className="module-card">
              <div className="module-header-row">
                <div className="module-number">{idx + 1}</div>
                <div className="module-info">
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <div className="module-meta">
                    {module.videoUrl && (
                      <span className="meta-badge">
                        <FiVideo /> Has Video
                      </span>
                    )}
                    {module.hasQuiz && (
                      <span className="meta-badge">
                        <FiFileText /> Has Quiz
                      </span>
                    )}
                  </div>
                </div>
                <div className="module-actions">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(module)}>
                    <FiEdit /> Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(module.id)}>
                    <FiTrash2 /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal 
          isOpen={showModal} 
          onClose={() => {
            setShowModal(false);
            setEditingModule(null);
          }} 
          title={editingModule ? 'Edit Module' : 'Add New Module'}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Module Title"
              value={moduleData.title}
              onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
              required
            />
            <Input
              label="Description"
              value={moduleData.description}
              onChange={(e) => setModuleData({ ...moduleData, description: e.target.value })}
              required
            />
            <div className="input-group">
              <label className="input-label">Content (HTML supported)</label>
              <textarea
                className="input"
                rows="8"
                value={moduleData.content}
                onChange={(e) => setModuleData({ ...moduleData, content: e.target.value })}
                placeholder="<h2>Module Title</h2><p>Content here...</p>"
                required
              />
            </div>
            <Input
              label="Video URL (optional)"
              value={moduleData.videoUrl}
              onChange={(e) => setModuleData({ ...moduleData, videoUrl: e.target.value })}
              placeholder="https://example.com/video.mp4"
            />
            <div className="input-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={moduleData.hasQuiz}
                  onChange={(e) => setModuleData({ ...moduleData, hasQuiz: e.target.checked })}
                />
                <span>This module has a quiz</span>
              </label>
            </div>
            <Button type="submit">
              {editingModule ? 'Update Module' : 'Add Module'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ModuleEditor;
