const { db } = require('../config/firebase');

// Get current streak for a category
exports.getCurrentStreak = async (userId, category = null) => {
  try {
    let query = db.collection('users').doc(userId).collection('todos');
    
    if (category) {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.orderBy('completedAt', 'desc').get();
    const todos = snapshot.docs.map(doc => doc.data()).filter(todo => todo.completed && todo.completedAt);

    if (todos.length === 0) return { current: 0, longest: 0 };

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedTodos = todos.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    for (const todo of sortedTodos) {
      const completedDate = new Date(todo.completedAt);
      completedDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - currentStreak);

      if (completedDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }

    return { current: currentStreak };
  } catch (error) {
    throw new Error(`Error calculating streak: ${error.message}`);
  }
};

// Get longest streak for a category
exports.getLongestStreak = async (userId, category = null) => {
  try {
    let query = db.collection('users').doc(userId).collection('todos');
    
    if (category) {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    const todos = snapshot.docs
      .map(doc => doc.data())
      .filter(todo => todo.completed && todo.completedAt)
      .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

    if (todos.length === 0) return 0;

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < todos.length; i++) {
      const prevDate = new Date(todos[i - 1].completedAt);
      const currDate = new Date(todos[i].completedAt);

      prevDate.setHours(0, 0, 0, 0);
      currDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));

      if (dayDiff === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (dayDiff > 1) {
        currentStreak = 1;
      }
    }

    return longestStreak;
  } catch (error) {
    throw new Error(`Error calculating longest streak: ${error.message}`);
  }
};

// Get streak data for all categories
exports.getStreaksByCategory = async (userId) => {
  try {
    const snapshot = await db.collection('users').doc(userId).collection('todos').get();
    const todos = snapshot.docs.map(doc => doc.data());

    const categories = {};
    todos.forEach(todo => {
      const cat = todo.category || 'General';
      if (!categories[cat]) {
        categories[cat] = [];
      }
      categories[cat].push(todo);
    });

    const result = {};
    for (const [category, categoryTodos] of Object.entries(categories)) {
      const currentStreak = await exports.getCurrentStreak(userId, category);
      const longestStreak = await exports.getLongestStreak(userId, category);
      result[category] = { current: currentStreak.current, longest: longestStreak };
    }

    return result;
  } catch (error) {
    throw new Error(`Error fetching category streaks: ${error.message}`);
  }
};
