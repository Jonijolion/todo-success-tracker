# Todo Success Tracker

A full-stack application that helps users track their to-do completion rates and build streaks. Features real-time analytics, success tracking across projects/categories, and historical data visualization.

## Features

- 📝 **Todo Management**: Create, update, complete, and delete todos
- 📊 **Success Rate Tracking**: Track completion percentage overall and per category
- 📈 **Time-based Analytics**: Daily, weekly, and monthly success rates
- 🔥 **Streak Tracking**: Current streak and longest streak per category
- 📉 **Historical Data**: Complete history of all tasks and completions
- 📊 **Charts & Visualizations**: Visual representation of success rates over time
- 🏷️ **Categories/Projects**: Organize todos by project with separate analytics
- ⏰ **Timestamps**: Track when tasks were created and completed

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: Firebase (Firestore + Authentication)
- **Charts**: Chart.js or Recharts
- **Styling**: Tailwind CSS

## Project Structure

```
todo-success-tracker/
├── backend/                 # Node.js/Express server
│   ├── src/
│   │   ├── config/         # Firebase & environment config
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Data models/schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & error handling
│   │   └── index.js        # Entry point
│   ├── package.json
│   └── .env.example
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API & Firebase services
│   │   ├── context/        # Context providers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase project setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```
PORT=5000
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

3. Start server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file with your Firebase config:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get specific todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Analytics
- `GET /api/analytics/daily` - Daily success rates
- `GET /api/analytics/weekly` - Weekly success rates
- `GET /api/analytics/monthly` - Monthly success rates
- `GET /api/analytics/category/:categoryId` - Category-specific analytics

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
