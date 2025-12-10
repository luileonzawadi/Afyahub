import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBookmark, FiArrowRight } from 'react-icons/fi';
import Card from '../../components/common/Card';
import './Bookmarks.css';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarked_courses') || '[]');
    setBookmarks(saved);
  }, []);

  const removeBookmark = (courseId) => {
    const updated = bookmarks.filter(c => c.id !== courseId);
    setBookmarks(updated);
    localStorage.setItem('bookmarked_courses', JSON.stringify(updated));
  };

  return (
    <div className="bookmarks">
      <div className="container">
        <div className="page-header">
          <h1><FiBookmark /> My Bookmarks</h1>
          <p>Courses you've saved for later</p>
        </div>

        {bookmarks.length > 0 ? (
          <div className="courses-grid">
            {bookmarks.map(course => (
              <Card key={course.id}>
                <img src={course.image} alt={course.title} />
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="card-actions">
                    <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                      View Course <FiArrowRight />
                    </Link>
                    <button onClick={() => removeBookmark(course.id)} className="btn btn-outline btn-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="empty-state">
              <FiBookmark size={48} />
              <h3>No bookmarks yet</h3>
              <p>Save courses to access them quickly later</p>
              <Link to="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
