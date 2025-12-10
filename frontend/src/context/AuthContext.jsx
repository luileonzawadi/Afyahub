import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/me');
      setUser(data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      
      const { data: userData } = await axios.get('/api/auth/me');
      setUser(userData);
      
      // Track user for notifications
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      if (!allUsers.includes(userData.email)) {
        allUsers.push(userData.email);
        localStorage.setItem('all_users', JSON.stringify(allUsers));
      }
      
      return { user: userData, token: data.access_token };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const { data: newUser } = await axios.post('/api/auth/register', userData);
      
      // Auto login after registration
      const { data: loginData } = await axios.post('/api/auth/login', {
        email: userData.email,
        password: userData.password
      });
      
      localStorage.setItem('token', loginData.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${loginData.access_token}`;
      setUser(newUser);
      
      // Track user for notifications
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      if (!allUsers.includes(newUser.email)) {
        allUsers.push(newUser.email);
        localStorage.setItem('all_users', JSON.stringify(allUsers));
      }
      
      return { user: newUser, token: loginData.access_token };
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    localStorage.setItem('afyahub_theme', 'blue');
    document.documentElement.style.setProperty('--primary', '#2563eb');
    document.documentElement.style.setProperty('--secondary', '#1e40af');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };



  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
