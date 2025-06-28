import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/admin/users"
            className="block bg-white border border-blue-200 hover:border-blue-500 shadow-md rounded-lg p-6 text-center transition"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Manage Users</h3>
            <p className="text-gray-600 text-sm">View and control all registered users</p>
          </Link>

          <Link
            to="/admin/courses"
            className="block bg-white border border-green-200 hover:border-green-500 shadow-md rounded-lg p-6 text-center transition"
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2">View All Courses</h3>
            <p className="text-gray-600 text-sm">Browse all available courses</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
