const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get logged-in user profile (Protected)
router.get('/profile', protect, getUserProfile);

module.exports = router;
