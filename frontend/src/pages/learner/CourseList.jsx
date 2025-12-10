import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useCourses } from '../../hooks/useQuery';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import './CourseList.css';

const CourseList = () => {
  const { data: courses, isLoading } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'prevention', 'treatment', 'living-positive', 'stigma'];

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="course-list-page">
      <div className="container">
        <div className="page-header">
          <h1>All Courses</h1>
          <p>Explore our comprehensive HIV/AIDS education courses</p>
        </div>

        <div className="filters">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            <FiFilter />
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="courses-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i}>
                <Skeleton height="200px" />
                <Skeleton height="24px" width="80%" />
                <Skeleton height="16px" />
                <Skeleton height="16px" width="60%" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="courses-grid">
            {filteredCourses?.map(course => (
              <Card key={course.id} hover>
                <img src={course.thumbnail || '/placeholder.jpg'} alt={course.title} />
                <div className="course-badge">{course.category}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span>{course.modules?.length || 0} modules</span>
                  <span>{course.duration || 'Self-paced'}</span>
                </div>
                <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                  View Course
                </Link>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredCourses?.length === 0 && (
          <Card>
            <div className="empty-state">
              <h3>No courses found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseList;
