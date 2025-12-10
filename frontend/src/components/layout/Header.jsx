import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserProgress } from '../../hooks/useQuery';
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart, FiBook, FiAward, FiTrendingUp, FiBookmark, FiBell, FiSettings } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { data: progress } = useUserProgress();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateNotificationCount = () => {
      if (!user) {
        setNotificationCount(0);
        return;
      }
      const userKey = `notifications_${user.email}`;
      const notifications = JSON.parse(localStorage.getItem(userKey) || '[]');
      const unreadCount = notifications.filter(n => !n.read).length;
      setNotificationCount(unreadCount);
    };

    updateNotificationCount();
    const interval = setInterval(updateNotificationCount, 1000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FiHeart className="logo-icon" />
            <span className="logo-text">AfyaHub</span>
          </Link>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
            <Link to="/forum" onClick={() => setMenuOpen(false)}>Community</Link>
            <Link to="/resources" onClick={() => setMenuOpen(false)}>Resources</Link>
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
                )}
                <div className="user-menu" ref={dropdownRef}>
                  <button className="user-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <FiUser />
                    <span>{user.name}</span>
                    {notificationCount > 0 && (
                      <span className="notification-badge">{notificationCount}</span>
                    )}
                  </button>
                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <div className="dropdown-header">
                        <div className="user-avatar-large">
                          <FiUser size={32} />
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                      {user.role !== 'admin' && (
                        <div className="dropdown-stats">
                          <div className="stat-item">
                            <FiBook />
                            <div>
                              <div className="stat-value">{progress?.enrolledCourses || 0}</div>
                              <div className="stat-label">Courses</div>
                            </div>
                          </div>
                          <div className="stat-item">
                            <FiTrendingUp />
                            <div>
                              <div className="stat-value">{progress?.completedModules || 0}</div>
                              <div className="stat-label">Completed</div>
                            </div>
                          </div>
                          <div className="stat-item">
                            <FiAward />
                            <div>
                              <div className="stat-value">{progress?.certificates || 0}</div>
                              <div className="stat-label">Certificates</div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="dropdown-links">
                        {user.role !== 'admin' && (
                          <>
                            <Link to="/dashboard" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                              <FiBook /> My Dashboard
                            </Link>
                            <Link to="/bookmarks" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                              <FiBookmark /> Bookmarks
                            </Link>
                            <Link to="/notifications" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                              <FiBell /> Notifications
                            </Link>
                          </>
                        )}
                        {user.role === 'admin' && (
                          <Link to="/admin" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                            <FiBook /> Admin Dashboard
                          </Link>
                        )}
                        <Link to="/profile" onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}>
                          <FiSettings /> Settings
                        </Link>
                      </div>
                      <div className="dropdown-footer">
                        <button onClick={() => { handleLogout(); setDropdownOpen(false); }} className="logout-btn-dropdown">
                          <FiLogOut /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
                  Join Now
                </Link>
              </>
            )}
          </nav>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
