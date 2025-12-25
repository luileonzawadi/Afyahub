import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiMessageCircle } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} AfyaHub. All rights reserved.</p>
        </div>
      </footer>
      
      <nav className="mobile-nav">
        <Link to="/" className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <FiHome />
          <span>Home</span>
        </Link>
        <Link to="/courses" className={`mobile-nav-item ${location.pathname === '/courses' ? 'active' : ''}`}>
          <FiBook />
          <span>Courses</span>
        </Link>
        <Link to="/forum" className={`mobile-nav-item ${location.pathname === '/forum' ? 'active' : ''}`}>
          <FiMessageCircle />
          <span>Forum</span>
        </Link>
      </nav>
    </>
  );
};

export default Footer;
