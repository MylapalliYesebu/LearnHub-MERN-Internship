import { Link } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Student Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/student/courses"
            className="block bg-white border border-blue-200 hover:border-blue-500 shadow-md rounded-lg p-6 text-center transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Browse Courses</h3>
            <p className="text-gray-600 text-sm">View all available courses to enroll</p>
          </Link>

          <Link
            to="/student/enrolled"
            className="block bg-white border border-green-200 hover:border-green-500 shadow-md rounded-lg p-6 text-center transition"
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2">My Enrolled Courses</h3>
            <p className="text-gray-600 text-sm">Access the courses you've enrolled in</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
