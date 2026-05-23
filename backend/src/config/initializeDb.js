const admin = require('firebase-admin');
const { db } = require('./firebase');

/**
 * Initialize Firestore with required collections and indexes
 * Run this once during backend setup
 */
async function initializeDatabase() {
  try {
    console.log('Initializing Firestore database...');

    // Create root collections batch
    const batch = db.batch();

    console.log('✓ Database initialization complete!');
    console.log('Note: Please create composite indexes in Firebase Console:');
    console.log('  1. Collection: todos, Fields: category (Asc), createdAt (Desc)');
    console.log('  2. Collection: todos, Fields: completed (Asc), dueDate (Asc)');
    console.log('  3. Collection: analytics, Fields: period (Asc), date (Desc)');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

/**
 * Create default categories for a new user
 */
async function createDefaultCategories(userId) {
  try {
    const defaultCategories = [
      { name: 'General', color: '#808080', icon: '📋' },
      { name: 'Work', color: '#0066cc', icon: '💼' },
      { name: 'Personal', color: '#ff6699', icon: '👤' },
      { name: 'Health', color: '#00cc66', icon: '💪' },
      { name: 'Learning', color: '#ffcc00', icon: '📚' },
    ];

    const batch = db.batch();

    defaultCategories.forEach(category => {
      const categoryRef = db
        .collection('users')
        .doc(userId)
        .collection('categories')
        .doc();

      batch.set(categoryRef, {
        id: categoryRef.id,
        name: category.name,
        description: `${category.name} tasks`,
        color: category.color,
        icon: category.icon,
        createdAt: new Date(),
        updatedAt: new Date(),
        todoCount: 0,
        completedCount: 0,
        successRate: 0,
      });
    });

    await batch.commit();
    console.log(`Created default categories for user: ${userId}`);
  } catch (error) {
    console.error('Error creating default categories:', error);
    throw error;
  }
}

/**
 * Create a new user document
 */
async function createUserDocument(userId, email, displayName) {
  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.set({
      userId,
      email,
      displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        theme: 'light',
        notifications: true,
        defaultCategory: 'General',
      },
    });

    // Create default categories for new user
    await createDefaultCategories(userId);

    console.log(`User document created: ${userId}`);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

/**
 * Initialize streak document for a category
 */
async function initializeStreak(userId, category) {
  try {
    const streakRef = db
      .collection('users')
      .doc(userId)
      .collection('streaks')
      .doc(category);

    await streakRef.set({
      id: category,
      category,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
      lastResetDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error(`Error initializing streak for ${category}:`, error);
    throw error;
  }
}

/**
 * Create daily analytics document
 */
async function createDailyAnalytics(userId, date) {
  try {
    const dateStr = date.toISOString().split('T')[0];
    const analyticsRef = db
      .collection('users')
      .doc(userId)
      .collection('analytics')
      .doc(dateStr);

    await analyticsRef.set({
      id: dateStr,
      period: 'daily',
      date: dateStr,
      totalTodos: 0,
      completedTodos: 0,
      successRate: 0,
      byCategory: {},
      categoryStats: [],
      createdAt: new Date(),
    });
  } catch (error) {
    console.error(`Error creating daily analytics for ${date}:`, error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  createDefaultCategories,
  createUserDocument,
  initializeStreak,
  createDailyAnalytics,
};
