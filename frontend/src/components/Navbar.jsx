import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left: App Name */}
      <div className="text-2xl font-bold">
        LearnHub
      </div>

      {/* Right: Button Links */}
      <div className="flex gap-3">
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
            Home
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
