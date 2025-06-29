const Course = require('../models/Course');
const User = require('../models/User');

// Enroll in a course (Student)
const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.enrolled.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolled.push(req.user._id);
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Enrollment failed' });
  }
};

// Get all enrolled courses
const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({ enrolled: req.user._id }).populate('C_educator', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrolled courses' });
  }
};

// Mark a section as completed
const completeSection = async (req, res) => {
  const { courseId, sectionIndex } = req.body;

  if (!courseId || sectionIndex === undefined) {
    return res.status(400).json({ message: 'Course ID and section index required' });
  }

  try {
    const user = await User.findById(req.user._id);

    const alreadyCompleted = user.completedSections.find(
      (entry) =>
        entry.courseId.toString() === courseId &&
        entry.sectionIndex === sectionIndex
    );

    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Section already marked as completed' });
    }

    user.completedSections.push({ courseId, sectionIndex });
    await user.save();

    res.status(200).json({ message: 'Section marked as completed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update completed section' });
  }
};

// Get completed section indexes for a specific course
const getCompletedSections = async (req, res) => {
  const { courseId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const completed = user.completedSections
      .filter((item) => item.courseId.toString() === courseId)
      .map((item) => item.sectionIndex);

    res.status(200).json(completed);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch completed sections' });
  }
};

// Unenroll from a course
const unenrollFromCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Remove student from enrolled list
    course.enrolled = course.enrolled.filter(
      (studentId) => studentId.toString() !== req.user._id.toString()
    );
    await course.save();

    // Remove completedSections for that course
    const user = await User.findById(req.user._id);
    user.completedSections = user.completedSections.filter(
      (item) => item.courseId.toString() !== courseId
    );
    await user.save();

    res.status(200).json({ message: 'Successfully unenrolled from the course' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unenroll from course' });
  }
};


module.exports = {
  enrollInCourse,
  getEnrolledCourses,
  completeSection,
  getCompletedSections,
  unenrollFromCourse,
};
