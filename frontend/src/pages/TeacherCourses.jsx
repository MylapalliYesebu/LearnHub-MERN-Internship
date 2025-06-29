import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import TeacherNavbar from '../components/TeacherNavbar';

const TeacherCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      const teacherCourses = res.data.filter(
        (course) => course.C_educator._id === user._id
      );
      setCourses(teacherCourses);
    } catch (err) {
      alert('Failed to load courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user._id]);

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    setDeleting(courseId);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      alert('Course deleted successfully');
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TeacherNavbar />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Courses </h2>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-5 hover:shadow-lg transition relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(course._id)}
                  disabled={deleting === course._id}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-900 font-semibold"
                >
                  {deleting === course._id ? 'Deleting...' : 'Delete'}
                </button>

                <h3 className="text-xl font-semibold text-blue-700 mb-2">{course.C_title}</h3>
                <p className="text-gray-600 mb-1"><strong>Category:</strong> {course.C_category}</p>
                <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{course.C_price}</p>
                <p className="text-gray-600 mb-10"><strong>Enrolled:</strong> {course.enrolled.length}</p>

                {/* Action Buttons: Preview + Edit */}
                <div className="absolute bottom-3 right-3 flex gap-3">
                  <button
                    onClick={() => navigate(`/teacher/course/${course._id}`)}
                    className="text-green-600 hover:text-green-900 font-semibold"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => navigate(`/teacher/edit/${course._id}`)}
                    className="text-blue-600 hover:text-blue-900 font-semibold"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;
