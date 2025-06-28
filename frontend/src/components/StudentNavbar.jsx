import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const StudentNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ step 1

  return (
    <nav className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Left: App Title */}
      <div className="text-xl font-bold">
        LearnHub - Student
      </div>

      {/* Right: Dashboard Button + Logout */}
      <div className="flex gap-4 items-center">
        <span>Hello, {user.name}</span>

        {/* ✅ Dashboard button acts like a Link */}
        <button
          onClick={() => navigate("/student/dashboard")} // ✅ step 3
          className={`px-3 py-1 rounded ${
            location.pathname === "/student/dashboard"
              ? "bg-white text-purple-700 font-semibold"
              : "hover:bg-purple-600"
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

export default StudentNavbar;
