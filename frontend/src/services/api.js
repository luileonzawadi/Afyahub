import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  getModules: (courseId) => api.get(`/courses/${courseId}/modules`),
  enrollCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),
  updateProgress: (moduleId, data) => api.post(`/courses/modules/${moduleId}/progress`, data)
};

export const quizAPI = {
  getQuiz: (moduleId) => api.get(`/modules/${moduleId}/quiz`),
  submitQuiz: (quizId, answers) => api.post(`/quizzes/${quizId}/submit`, { answers })
};

export const forumAPI = {
  getTopics: (params) => api.get('/forum/topics', { params }),
  getTopic: (id) => api.get(`/forum/topics/${id}`),
  createTopic: (data) => api.post('/forum/topics', data),
  deleteTopic: (id) => api.delete(`/forum/topics/${id}`),
  createComment: (topicId, data) => api.post(`/forum/topics/${topicId}/comments`, data),
  voteTopic: (topicId) => api.post(`/forum/topics/${topicId}/vote`)
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getProgress: () => api.get('/users/progress'),
  getCertificates: () => api.get('/users/certificates')
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  createCourse: (data) => api.post('/admin/courses', data),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
  getReports: () => api.get('/admin/reports'),
  moderateContent: (id, action) => api.post(`/admin/moderate/${id}`, { action })
};

export const resourceAPI = {
  getAll: (type) => api.get('/resources', { params: type ? { type } : {} }),
  getById: (id) => api.get(`/resources/${id}`)
};

export default api;
