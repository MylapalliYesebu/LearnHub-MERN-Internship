import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bgImage from '../assets/bg.jpg';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    if (!user) {
      navigate('/login');
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.C_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.C_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        className="min-h-[80vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10">
          <Navbar />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center min-h-[80vh]">
          <h1 className="text-4xl font-extrabold text-sky-200 mb-4">
            Welcome to LearnHub 🎓
          </h1>
          <p className="text-lg text-orange-300 mb-8">
            Your center for skill enhancement
          </p>

          <div className="space-x-4">
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow">
                Register
              </button>
            </Link>
          </div>

          <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded text-yellow-800">
            🧑‍🏫 Want to create courses?{' '}
            <Link to="/login" className="underline font-semibold text-yellow-900">
              Login as Teacher
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Explore Courses
        </h2>

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
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-5 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-green-700 mb-1">
                  {course.C_title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Educator:</strong> {course.C_educator?.name || 'Unknown'}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Category:</strong> {course.C_category}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Price:</strong> ₹{course.C_price}
                </p>

                <button
                  onClick={() => handleEnroll(course._id)}
                  className="w-full px-4 py-2 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
