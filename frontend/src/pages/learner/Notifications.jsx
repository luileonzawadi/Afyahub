import { useState, useEffect } from 'react';
import { FiBell, FiCheck, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './Notifications.css';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;
    const userKey = `notifications_${user.email}`;
    const saved = JSON.parse(localStorage.getItem(userKey) || '[]');
    setNotifications(saved);
  }, [user]);

  const markAsRead = (id) => {
    if (!user) return;
    const userKey = `notifications_${user.email}`;
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem(userKey, JSON.stringify(updated));
  };

  const deleteNotification = (id) => {
    if (!user) return;
    const userKey = `notifications_${user.email}`;
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem(userKey, JSON.stringify(updated));
  };

  const clearAll = () => {
    if (!user) return;
    const userKey = `notifications_${user.email}`;
    setNotifications([]);
    localStorage.setItem(userKey, JSON.stringify([]));
  };

  return (
    <div className="notifications-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1><FiBell /> Notifications</h1>
            <p>Stay updated with your learning progress</p>
          </div>
          {notifications.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="notifications-list">
            {notifications.map(notification => (
              <Card key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                <div className="notification-content">
                  <div className="notification-icon">
                    <FiBell />
                  </div>
                  <div className="notification-text">
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button onClick={() => markAsRead(notification.id)} className="icon-btn">
                      <FiCheck />
                    </button>
                  )}
                  <button onClick={() => deleteNotification(notification.id)} className="icon-btn">
                    <FiX />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="empty-state">
              <FiBell size={48} />
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
