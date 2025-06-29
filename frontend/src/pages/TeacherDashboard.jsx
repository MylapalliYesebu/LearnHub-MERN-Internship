import { Link } from 'react-router-dom';
import TeacherNavbar from '../components/TeacherNavbar';

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <TeacherNavbar />

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Teacher Dashboard </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/teacher/add-course"
            className="block bg-white border border-green-200 hover:border-green-500 shadow-md rounded-lg p-6 text-center transition"
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2">Add Course</h3>
            <p className="text-gray-600 text-sm">Create and publish a new course</p>
          </Link>

          <Link
            to="/teacher/courses"
            className="block bg-white border border-blue-200 hover:border-blue-500 shadow-md rounded-lg p-6 text-center transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">My Courses</h3>
            <p className="text-gray-600 text-sm">View and manage your courses</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
