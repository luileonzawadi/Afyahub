import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  modules: number;
  difficulty: string;
  category: string;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  completed: boolean;
  completedAt?: Date;
}

export const databaseService = {
  // Courses
  async getCourses(): Promise<Course[]> {
    const snapshot = await getDocs(collection(db, 'courses'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  },

  async getCourse(id: string): Promise<Course | null> {
    const docRef = doc(db, 'courses', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Course : null;
  },

  // Achievements
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    const q = query(collection(db, 'achievements'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Achievement));
  },

  async updateAchievement(achievementId: string, data: Partial<Achievement>): Promise<void> {
    const docRef = doc(db, 'achievements', achievementId);
    await updateDoc(docRef, data);
  },

  // User Progress
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const q = query(collection(db, 'userProgress'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProgress));
  },

  async updateProgress(userId: string, courseId: string, moduleId: string): Promise<void> {
    await addDoc(collection(db, 'userProgress'), {
      userId,
      courseId,
      moduleId,
      completed: true,
      completedAt: new Date()
    });
  }
};