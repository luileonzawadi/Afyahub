import { Link } from 'react-router-dom';
import { FiBook, FiUsers, FiAward, FiArrowRight } from 'react-icons/fi';
import { useCourses } from '../../hooks/useQuery';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import './Home.css';

const Home = () => {
  const { data: courses, isLoading } = useCourses();

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Empowering Communities Through HIV/AIDS Education</h1>
            <p>Join AfyaHub to access comprehensive, evidence-based learning resources and connect with a supportive community.</p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Join Now <FiArrowRight />
              </Link>
              <Link to="/courses" className="btn btn-outline btn-lg">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>What AfyaHub Offers</h2>
          <p>Comprehensive HIV/AIDS education and support for everyone</p>
          <div className="features-grid">
            <Card>
              <FiBook className="feature-icon" />
              <h3>Structured Learning</h3>
              <p>Access comprehensive courses on HIV/AIDS prevention, treatment, and living positively.</p>
            </Card>
            <Card>
              <FiUsers className="feature-icon" />
              <h3>Community Support</h3>
              <p>Connect with others, share experiences, and get support in a safe, moderated environment.</p>
            </Card>
            <Card>
              <FiAward className="feature-icon" />
              <h3>Earn Certificates</h3>
              <p>Complete courses and earn certificates to demonstrate your knowledge and commitment.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="featured-courses">
        <div className="container">
          <h2>Featured Courses</h2>
          <p>Start your learning journey with our most popular courses</p>
          {isLoading ? (
            <div className="courses-grid">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <Skeleton height="150px" />
                  <Skeleton height="24px" width="80%" />
                  <Skeleton height="16px" />
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
                    <Link to={`/courses/${course.id}`} className="btn btn-primary">
                      Learn More
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link to="/courses" className="btn btn-outline">
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
