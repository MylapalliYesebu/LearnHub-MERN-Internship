import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const TeacherNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Import navigate hook

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Left: App Title */}
      <div className="text-xl font-bold">
        LearnHub - Teacher
      </div>

      {/* Right: Dashboard Button + Logout */}
      <div className="flex gap-4 items-center">
        <span>Hi, {user.name}</span>

        {/* ✅ Dashboard Button Navigation */}
        <button
          onClick={() => navigate("/teacher/dashboard")}
          className={`px-3 py-1 rounded ${
            location.pathname === "/teacher/dashboard"
              ? "bg-white text-green-700 font-semibold"
              : "hover:bg-green-600"
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

export default TeacherNavbar;
