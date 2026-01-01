# Firebase Integration Setup

## 1. Install Dependencies
```bash
cd mobile
npm install firebase
```

## 2. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Add a web app to your project
4. Copy the configuration object

## 3. Update Firebase Config
Replace the placeholder values in `config/firebase.ts` with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## 4. Enable Firebase Services
In Firebase Console:
- **Authentication**: Enable Email/Password provider
- **Firestore**: Create database in production mode
- **Security Rules**: Update rules for your app

## 5. Firestore Collections Structure

### users
```
users/{userId}
{
  id: string,
  email: string,
  name: string,
  role: string,
  phone?: string,
  bio?: string,
  createdAt: Date
}
```

### courses
```
courses/{courseId}
{
  id: string,
  title: string,
  description: string,
  thumbnail: string,
  duration: string,
  modules: number,
  difficulty: string,
  category: string,
  createdAt: Date
}
```

### achievements
```
achievements/{achievementId}
{
  id: string,
  userId: string,
  title: string,
  description: string,
  icon: string,
  unlocked: boolean,
  unlockedDate?: Date,
  progress?: number,
  maxProgress?: number
}
```

### userProgress
```
userProgress/{progressId}
{
  id: string,
  userId: string,
  courseId: string,
  moduleId: string,
  completed: boolean,
  completedAt?: Date
}
```

## 6. Security Rules Example
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /achievements/{achievementId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    match /userProgress/{progressId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 7. Updated Services
- `authService.ts` - Firebase Authentication
- `databaseService.ts` - Firestore operations
- `AuthContext.tsx` - Firebase auth state management

## 8. Migration Notes
- User IDs are now Firebase UIDs (strings)
- Dates are Firebase Timestamp objects
- All data operations are async with Firebase
- Authentication state is managed by Firebase