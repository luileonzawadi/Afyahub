import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseAPI, quizAPI, forumAPI, userAPI, adminAPI } from '../services/api';
import { mockCourses, mockProgress, mockForumTopics, mockAdminStats } from '../services/mockData';
import { storage } from '../utils/storage';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      try {
        return await courseAPI.getAll().then(res => res.data);
      } catch (error) {
        const stored = storage.getCourses();
        if (stored) return stored;
        storage.setCourses(mockCourses);
        return mockCourses;
      }
    }
  });
};

export const useCourse = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      try {
        return await courseAPI.getById(id).then(res => res.data);
      } catch (error) {
        const courses = storage.getCourses() || mockCourses;
        return courses.find(c => c.id === parseInt(id));
      }
    },
    enabled: !!id
  });
};

export const useCourseModules = (courseId) => {
  return useQuery({
    queryKey: ['modules', courseId],
    queryFn: async () => {
      try {
        return await courseAPI.getModules(courseId).then(res => res.data);
      } catch (error) {
        const courses = storage.getCourses() || mockCourses;
        const course = courses.find(c => c.id === parseInt(courseId));
        return course?.modules || [];
      }
    },
    enabled: !!courseId
  });
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseId) => {
      return await courseAPI.enrollCourse(courseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
      queryClient.invalidateQueries(['userProgress']);
    }
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ moduleId, data }) => {
      return await courseAPI.updateProgress(moduleId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userProgress']);
      queryClient.invalidateQueries(['courses']);
      queryClient.invalidateQueries(['modules']);
    }
  });
};

export const useQuiz = (moduleId) => {
  return useQuery({
    queryKey: ['quiz', moduleId],
    queryFn: () => quizAPI.getQuiz(moduleId).then(res => res.data),
    enabled: !!moduleId
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ quizId, answers }) => quizAPI.submitQuiz(quizId, answers)
  });
};

export const useForumTopics = (params) => {
  return useQuery({
    queryKey: ['forumTopics', params],
    queryFn: async () => {
      try {
        return await forumAPI.getTopics(params).then(res => res.data);
      } catch (error) {
        return mockForumTopics;
      }
    }
  });
};

export const useForumTopic = (id) => {
  return useQuery({
    queryKey: ['forumTopic', id],
    queryFn: () => forumAPI.getTopic(id).then(res => res.data),
    enabled: !!id
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => forumAPI.createTopic(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['forumTopics']);
    }
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userAPI.getProfile().then(res => res.data)
  });
};

export const useUserProgress = () => {
  return useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      try {
        return await userAPI.getProgress().then(res => res.data);
      } catch (error) {
        const currentUser = localStorage.getItem('current_user');
        if (currentUser) {
          const userProgress = storage.getUserProgress(currentUser);
          if (userProgress) return userProgress;
        }
        const stored = storage.getProgress();
        if (stored) return stored;
        storage.setProgress(mockProgress);
        return mockProgress;
      }
    }
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      try {
        return await adminAPI.getStats().then(res => res.data);
      } catch (error) {
        return mockAdminStats;
      }
    }
  });
};
