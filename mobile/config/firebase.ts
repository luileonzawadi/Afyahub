import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDiCQd9PEwQjDR2ZyKzDEXYLnlE-pLLbH0",
  authDomain: "afyahub-7b00f.firebaseapp.com",
  projectId: "afyahub-7b00f",
  storageBucket: "afyahub-7b00f.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:79254357820:android:2ebb0412e8e34a9df8c039"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;