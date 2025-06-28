import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ required for button navigation

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Left: App Title */}
      <div className="text-xl font-bold">
        LearnHub - Admin
      </div>

      {/* Right: Dashboard Button + Logout */}
      <div className="flex gap-4 items-center">
        <span>Welcome, {user.name}</span>

        {/* ✅ Dashboard Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className={`px-3 py-1 rounded ${
            location.pathname === "/admin/dashboard"
              ? "bg-white text-blue-800 font-semibold"
              : "hover:bg-blue-700"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
