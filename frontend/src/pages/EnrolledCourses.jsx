import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import StudentNavbar from '../components/StudentNavbar';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const navigate = useNavigate();

  const fetchEnrolledCourses = async () => {
    try {
      const res = await axios.get('/api/student/courses');
      setCourses(res.data);
    } catch (err) {
      alert('Failed to load enrolled courses');
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const handleUnenroll = async (courseId) => {
    if (!window.confirm('Are you sure you want to unenroll from this course?')) return;

    setLoadingCourseId(courseId);
    try {
      await axios.delete(`/api/student/unenroll/${courseId}`);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      alert('Unenrolled successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unenroll');
    } finally {
      setLoadingCourseId(null);
    }
  };

  const handlePurchaseClick = () => {
    alert('This purchase option will be available soon.');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Enrolled Courses </h2>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">You haven’t enrolled in any courses yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{course.C_title}</h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Educator:</strong> {course.C_educator?.name || 'Unknown'}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Category:</strong> {course.C_category}
                  </p>
                  <p className="text-gray-600 mb-3">
                    <strong>Price:</strong> ₹{course.C_price}
                  </p>
                </div>

                <div className="flex justify-between mt-4">
                  {course.C_price === 0 ? (
                    <button
                      onClick={() => navigate(`/student/learn/${course._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-semibold"
                    >
                      Start Learning →
                    </button>
                  ) : (
                    <button
                      onClick={handlePurchaseClick}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded text-sm font-semibold"
                    >
                      Purchase Course
                    </button>
                  )}

                  <button
                    onClick={() => handleUnenroll(course._id)}
                    disabled={loadingCourseId === course._id}
                    className={`bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm font-semibold ${
                      loadingCourseId === course._id ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {loadingCourseId === course._id ? 'Removing...' : 'Unenroll'}
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

export default EnrolledCourses;
