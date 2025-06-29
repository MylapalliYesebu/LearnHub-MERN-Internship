import { useEffect, useState, useContext } from 'react';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import StudentNavbar from '../components/StudentNavbar';

const StudentCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolling, setEnrolling] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allCoursesRes, enrolledRes] = await Promise.all([
          axios.get('/api/courses'),
          axios.get('/api/student/courses'),
        ]);
        setCourses(allCoursesRes.data);
        setEnrolledCourses(enrolledRes.data.map((c) => c._id));
      } catch (err) {
        alert('Failed to load course data');
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await axios.post(`/api/student/enroll/${courseId}`);
      setEnrolledCourses((prev) => [...prev, courseId]);
      alert('Enrolled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(null);
    }
  };

  // Filter courses based on search
  const filteredCourses = courses.filter((course) =>
    course.C_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.C_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Browse Available Courses
        </h2>

        {/* 🔍 Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-600">No matching courses found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course._id);
              return (
                <div
                  key={course._id}
                  className="bg-white border border-gray-200 shadow-md rounded-lg p-5 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-1">{course.C_title}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <strong>Educator:</strong> {course.C_educator?.name || 'Unknown'}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Category:</strong> {course.C_category}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    <strong>Price:</strong> ₹{course.C_price}
                  </p>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    disabled={isEnrolled || enrolling === course._id}
                    className={`w-full px-4 py-2 rounded font-semibold ${
                      isEnrolled
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : enrolling === course._id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isEnrolled
                      ? 'Already Enrolled'
                      : enrolling === course._id
                      ? 'Enrolling...'
                      : 'Enroll'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
