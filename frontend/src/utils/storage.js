// Local storage utilities for progress tracking
const STORAGE_KEYS = {
  COURSES: 'afyahub_courses',
  PROGRESS: 'afyahub_progress',
  USER_PROGRESS: 'afyahub_user_progress'
};

export const storage = {
  getCourses: () => {
    const data = localStorage.getItem(STORAGE_KEYS.COURSES);
    return data ? JSON.parse(data) : null;
  },
  
  setCourses: (courses) => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  },
  
  getProgress: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : null;
  },
  
  setProgress: (progress) => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
  
  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  },
  
  initializeNewUser: (userEmail) => {
    const progressKey = `${STORAGE_KEYS.PROGRESS}_${userEmail}`;
    const existingProgress = localStorage.getItem(progressKey);
    
    if (!existingProgress) {
      const initialProgress = {
        enrolledCourses: [1],
        completedModules: { '1': [1] },
        stats: {
          coursesEnrolled: 1,
          modulesCompleted: 1,
          certificatesEarned: 0
        }
      };
      localStorage.setItem(progressKey, JSON.stringify(initialProgress));
    }
  },
  
  getUserProgress: (userEmail) => {
    const progressKey = `${STORAGE_KEYS.PROGRESS}_${userEmail}`;
    const data = localStorage.getItem(progressKey);
    return data ? JSON.parse(data) : null;
  },
  
  setUserProgress: (userEmail, progress) => {
    const progressKey = `${STORAGE_KEYS.PROGRESS}_${userEmail}`;
    localStorage.setItem(progressKey, JSON.stringify(progress));
  }
};
