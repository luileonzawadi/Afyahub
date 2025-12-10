import { useState, useEffect } from 'react';
import { FiUser, FiAward, FiSettings } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [streak, setStreak] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState('blue');

  const themes = [
    { name: 'blue', label: 'Ocean Blue', primary: '#2563eb', secondary: '#1e40af' },
    { name: 'orange', label: 'Sunset Orange', primary: '#f97316', secondary: '#ea580c' },
    { name: 'red', label: 'Warm Red', primary: '#ef4444', secondary: '#dc2626' },
    { name: 'amber', label: 'Golden Amber', primary: '#f59e0b', secondary: '#d97706' },
    { name: 'rose', label: 'Rose Pink', primary: '#f43f5e', secondary: '#e11d48' }
  ];

  useEffect(() => {
    if (!user?.email) return;

    const savedTheme = localStorage.getItem('afyahub_theme') || 'blue';
    setSelectedTheme(savedTheme);
    const theme = themes.find(t => t.name === savedTheme);
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.primary);
      document.documentElement.style.setProperty('--secondary', theme.secondary);
    }

    const storedStreak = parseInt(localStorage.getItem(`streak_${user.email}`) || '1');
    setStreak(storedStreak);
  }, [user?.email]);

  const applyTheme = (themeName) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      document.documentElement.style.setProperty('--primary', theme.primary);
      document.documentElement.style.setProperty('--secondary', theme.secondary);
    }
  };

  const handleThemeChange = (themeName) => {
    setSelectedTheme(themeName);
    applyTheme(themeName);
    localStorage.setItem('afyahub_theme', themeName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user data in localStorage for now
      const users = JSON.parse(localStorage.getItem('afyahub_users') || '{}');
      if (users[user.email]) {
        users[user.email].name = formData.name;
        localStorage.setItem('afyahub_users', JSON.stringify(users));
      }
      alert('Profile updated successfully!');
      setEditing(false);
      window.location.reload();
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const handleStreakReset = () => {
    if (window.confirm('Are you sure you want to reset your streak?')) {
      localStorage.setItem(`streak_${user.email}`, '0');
      setStreak(0);
    }
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1>Settings</h1>
        </div>

        <div className="profile-content">
          <Card>
            <div className="profile-section">
              <div className="section-header">
                <h2><FiUser /> Personal Information</h2>
                <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                  {editing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              {editing ? (
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Button type="submit">Save Changes</Button>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{user?.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{user?.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Member Since:</span>
                    <span className="value">{new Date(user?.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="profile-section">
              <h2><FiSettings /> Settings</h2>
              
              <div className="settings-group">
                <h3><FaFire /> Your Streak</h3>
                <div className="streak-display">
                  <div className="streak-number">{streak}</div>
                  <div className="streak-label">Day{streak !== 1 ? 's' : ''} in a row!</div>
                </div>
                <p className="streak-message">Keep learning daily to maintain your streak!</p>
                <Button variant="outline" size="sm" onClick={handleStreakReset}>
                  Reset Streak
                </Button>
              </div>

              <div className="settings-group">
                <h3>Color Theme</h3>
                <p className="setting-description">Choose your preferred color theme</p>
                <div className="theme-selector">
                  {themes.map(theme => (
                    <div
                      key={theme.name}
                      className={`theme-option ${selectedTheme === theme.name ? 'active' : ''}`}
                      onClick={() => handleThemeChange(theme.name)}
                    >
                      <div className="theme-colors">
                        <div className="color-box" style={{ background: theme.primary }}></div>
                        <div className="color-box" style={{ background: theme.secondary }}></div>
                      </div>
                      <span>{theme.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="profile-section">
              <h2><FiAward /> My Certificates</h2>
              <p className="empty-message">No certificates yet. Complete courses to earn certificates!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
