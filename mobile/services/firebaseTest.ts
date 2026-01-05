import { db } from '../config/firebase';

export const testFirebaseConnection = () => {
  try {
    console.log('Firebase initialized:', !!db);
    return true;
  } catch (error) {
    console.error('Firebase error:', error);
    return false;
  }
};