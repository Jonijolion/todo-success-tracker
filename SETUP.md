# Todo Success Tracker - Setup Guide

## 📋 Prerequisites

- Node.js 16+ and npm
- Firebase Project (free tier available at [firebase.google.com](https://firebase.google.com))
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Jonijolion/todo-success-tracker.git
cd todo-success-tracker
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Firebase Setup

#### 3a. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database

#### 3b. Get Firebase Credentials

**For Backend:**
1. Go to Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save as `backend/serviceAccountKey.json`

**For Frontend:**
1. Go to Project Settings → General
2. Copy your web app credentials
3. Create `.env` files in both directories:

**backend/.env**
```
PORT=5000
NODE_ENV=development
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_SERVICE_ACCOUNT_KEY=./serviceAccountKey.json
```

**frontend/.env.local**
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Set Up Firestore Indexes

1. Go to Firebase Console → Firestore Database
2. Create composite indexes:

**Index 1:**
- Collection: `users/{userId}/todos`
- Fields: `category` (Ascending), `createdAt` (Descending)

**Index 2:**
- Collection: `users/{userId}/todos`
- Fields: `completed` (Ascending), `dueDate` (Ascending)

**Index 3:**
- Collection: `users/{userId}/analytics`
- Fields: `period` (Ascending), `date` (Descending)

### 5. Set Firestore Security Rules

Go to Firestore → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      match /{subcollection=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
}
```

### 6. Run the Application

```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

## 📁 Project Structure

```
todo-success-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── firebase.js
│   │   │   └── initializeDb.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── todoModel.js
│   │   │   ├── analyticsModel.js
│   │   │   └── streakModel.js
│   │   ├── routes/
│   │   │   ├── todoRoutes.js
│   │   │   ├── analyticsRoutes.js
│   │   │   └── streakRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoModal.jsx
│   │   │   ├── StatCards.jsx
│   │   │   ├── Charts.jsx
│   │   │   └── Layout.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── TodoContext.jsx
│   │   ├── pages/
│   │   │   └── AuthPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── firebase-service.js
│   │   ├── config/
│   │   │   └── firebase.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── package.json
├── README.md
└── .gitignore
```

## 🔧 Available Commands

### Backend
```bash
cd backend
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📚 API Documentation

### Authentication
All endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

### Todo Endpoints
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `GET /api/todos/category/:categoryName` - Get todos by category

### Analytics Endpoints
- `GET /api/analytics/daily/:date` - Daily success rate
- `GET /api/analytics/weekly/:startDate` - Weekly success rate
- `GET /api/analytics/monthly/:year/:month` - Monthly success rate
- `GET /api/analytics/category/:categoryName` - Category success rate
- `GET /api/analytics/categories/all/stats` - All categories stats
- `GET /api/analytics/overall/rate` - Overall success rate

### Streak Endpoints
- `GET /api/streaks/current/:category` - Current streak
- `GET /api/streaks/longest/:category` - Longest streak
- `GET /api/streaks/all/categories` - All category streaks

## 🎨 Features

✅ **Todo Management**
- Create, read, update, delete todos
- Priority levels (low, medium, high)
- Due dates with overdue indicators
- Categorization and tagging

✅ **Success Tracking**
- Real-time completion percentage
- Daily, weekly, monthly analytics
- Category-specific success rates
- Historical data storage

✅ **Streak System**
- Current consecutive day streaks
- Longest streak tracking
- Per-category streaks
- Visual indicators

✅ **Analytics & Charts**
- Success rate trends (line chart)
- Category performance (bar chart)
- Task distribution (pie chart)
- Completion trends

✅ **Authentication**
- Firebase email/password auth
- Secure token management
- User sessions

## 🐛 Troubleshooting

### CORS Errors
Make sure your backend is running on `http://localhost:5000` and frontend on `http://localhost:5173`.

### Firebase Connection Issues
- Verify `.env` files have correct Firebase credentials
- Check that Firestore database is in "Native mode"
- Ensure security rules are correctly set

### Missing Indexes
Firebase will suggest creating composite indexes when needed. Check the Firebase Console for instructions.

## 📝 License

MIT License - Feel free to use this project for personal or commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Node.js, and Firebase**
