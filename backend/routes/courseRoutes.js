const express = require('express');
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
} = require('../controllers/courseController');

const { protect, isTeacher } = require('../middleware/authMiddleware');

// Create a new course (teacher only)
router.post('/', protect, isTeacher, createCourse);

// Get all courses (public)
router.get('/', getAllCourses);

// Get single course by ID (public)
router.get('/:id', getCourseById);

// Update a course (teacher only - their own)
router.put('/:id', protect, isTeacher, updateCourse);

// Delete a course (admin or the course creator - allowed in controller)
router.delete('/:id', protect, deleteCourse);

module.exports = router;
