const Course = require('../models/Course');

// ✅ Create a new course (Teacher)
const createCourse = async (req, res) => {
  const { C_category, C_title, C_description, C_price, sections } = req.body;

  try {
    const course = await Course.create({
      C_educator: req.user._id,
      C_category,
      C_title,
      C_description,
      C_price,
      sections,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course' });
  }
};

// ✅ Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('C_educator', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

// ✅ Get single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('C_educator', 'name email').populate('enrolled', 'name email');;
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course details' });
  }
};

// ✅ Delete a course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const isAdmin = req.user.type === 'admin';
    const isOwner = course.C_educator.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

// ✅ Update a course (Teacher Only – Own Course)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.C_educator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const { C_category, C_title, C_description, C_price, sections } = req.body;

    // Update fields if provided
    if (C_category !== undefined) course.C_category = C_category;
    if (C_title !== undefined) course.C_title = C_title;
    if (C_description !== undefined) course.C_description = C_description;
    if (C_price !== undefined) course.C_price = C_price;
    if (sections !== undefined) course.sections = sections;

    await course.save();

    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourse, 
};
