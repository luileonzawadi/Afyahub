# Firebase Integration Setup

## 1. Firestore Initialization
```typescript
// config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your config here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

## 2. Basic Firestore Operations
```typescript
// services/databaseService.ts
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const addUser = async (userData: any) => {
  return await addDoc(collection(db, 'users'), userData);
};

export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateUser = async (id: string, data: any) => {
  return await updateDoc(doc(db, 'users', id), data);
};

export const deleteUser = async (id: string) => {
  return await deleteDoc(doc(db, 'users', id));
};
```

## 3. Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /courses/{courseId} {
      allow read: if request.auth != null;
    }
  }
}
```