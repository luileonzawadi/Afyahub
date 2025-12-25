import api from './api';

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  modules_count: number;
  enrolled_count: number;
  is_enrolled?: boolean;
  progress?: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  order: number;
  is_completed?: boolean;
}

export const courseService = {
  // Get all courses
  getCourses: async (): Promise<Course[]> => {
    const response = await api.get('/courses');
    return response.data;
  },

  // Get course by ID
  getCourse: async (id: number): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Enroll in course
  enrollCourse: async (id: number): Promise<void> => {
    await api.post(`/courses/${id}/enroll`);
  },

  // Get course modules
  getCourseModules: async (courseId: number): Promise<Module[]> => {
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  },

  // Update module progress
  updateProgress: async (moduleId: number, completed: boolean): Promise<void> => {
    await api.post(`/courses/modules/${moduleId}/progress`, { completed });
  },

  // Get user's enrolled courses
  getEnrolledCourses: async (): Promise<Course[]> => {
    const response = await api.get('/courses/enrolled');
    return response.data;
  }
};