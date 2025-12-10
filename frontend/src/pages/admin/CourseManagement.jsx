import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useCourses } from '../../hooks/useQuery';
import { adminAPI } from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './CourseManagement.css';

const CourseManagement = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useCourses();
  const [showModal, setShowModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: ''
  });
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    hasQuiz: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await adminAPI.updateCourse(editingCourse.id, formData);
      } else {
        await adminAPI.createCourse(formData);
      }
      setShowModal(false);
      setEditingCourse(null);
      setFormData({ title: '', description: '', category: '', thumbnail: '' });
      window.location.reload();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.detail || 'Failed to save course'));
    }
  };

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    // API call to add module
    alert('Module added successfully!');
    setShowModuleModal(false);
    setModuleData({ title: '', description: '', content: '', videoUrl: '', hasQuiz: false });
  };

  const handleManageModules = (course) => {
    navigate(`/admin/courses/${course.id}/modules`);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await adminAPI.deleteCourse(id);
        window.location.reload();
      } catch (error) {
        alert('Error deleting course');
      }
    }
  };

  return (
    <div className="course-management">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Course Management</h1>
            <p>Create and manage learning content</p>
          </div>
          <Button onClick={() => setShowModal(true)} size="lg">
            <FiPlus /> New Course
          </Button>
        </div>

        <div className="courses-table">
          {courses?.map(course => (
            <Card key={course.id} className="course-row">
              <div className="course-info">
                <img src={course.thumbnail || '/placeholder.jpg'} alt={course.title} />
                <div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <span className="course-badge">{course.category}</span>
                </div>
              </div>
              <div className="course-actions">
                <Button variant="outline" size="sm" onClick={() => handleManageModules(course)}>
                  <FiPlus /> Modules
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                  <FiEdit /> Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>
                  <FiTrash2 /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Modal 
          isOpen={showModal} 
          onClose={() => {
            setShowModal(false);
            setEditingCourse(null);
          }} 
          title={editingCourse ? 'Edit Course' : 'Create New Course'}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Course Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea
                className="input"
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <Input
              label="Thumbnail URL"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />
            <Button type="submit">
              {editingCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </form>
        </Modal>

        <Modal 
          isOpen={showModuleModal} 
          onClose={() => setShowModuleModal(false)} 
          title={`Add Module to ${selectedCourse?.title}`}
        >
          <form onSubmit={handleModuleSubmit}>
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
                rows="6"
                value={moduleData.content}
                onChange={(e) => setModuleData({ ...moduleData, content: e.target.value })}
                placeholder="Enter module content with HTML tags..."
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
              Add Module
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CourseManagement;
