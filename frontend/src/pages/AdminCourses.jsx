import { useEffect, useState } from 'react';
import axios from '../services/axios';
import AdminNavbar from '../components/AdminNavbar';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [deleting, setDeleting] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      setCourses(res.data);
    } catch (err) {
      alert('Failed to load courses');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const confirm = window.confirm('Are you sure you want to delete this course?');
    if (!confirm) return;

    setDeleting(courseId);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      alert('Course deleted');
      fetchCourses(); // refresh
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">All Courses in LearnHub</h2>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Title</th>
                  <th className="px-6 py-3 text-left font-semibold">Educator</th>
                  <th className="px-6 py-3 text-left font-semibold">Category</th>
                  <th className="px-6 py-3 text-left font-semibold">Price</th>
                  <th className="px-6 py-3 text-left font-semibold">Enrolled</th>
                  <th className="px-6 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{course.C_title}</td>
                    <td className="px-6 py-4">{course.C_educator?.name || 'Unknown'}</td>
                    <td className="px-6 py-4">{course.C_category || '—'}</td>
                    <td className="px-6 py-4">₹{course.C_price}</td>
                    <td className="px-6 py-4">{course.enrolled.length}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(course._id)}
                        disabled={deleting === course._id}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow text-sm"
                      >
                        {deleting === course._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
