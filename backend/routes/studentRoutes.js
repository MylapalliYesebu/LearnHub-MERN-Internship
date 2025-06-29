const express = require('express');
const router = express.Router();

const {
  enrollInCourse,
  getEnrolledCourses,
  completeSection,
  getCompletedSections,
  unenrollFromCourse,
} = require('../controllers/studentController');

const { protect, isStudent } = require('../middleware/authMiddleware');

// Enroll in a course
router.post('/enroll/:id', protect, isStudent, enrollInCourse);

// Get enrolled courses
router.get('/courses', protect, isStudent, getEnrolledCourses);

// Mark section as completed
router.post('/complete-section', protect, isStudent, completeSection);

// Get completed sections for a course
router.get('/completed/:courseId', protect, isStudent, getCompletedSections);

// Unenroll from a course
router.delete('/unenroll/:id', protect, isStudent, unenrollFromCourse);

// Export the router
module.exports = router;
