import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import registerBg from '../assets/bg.jpg';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    type: 'student',
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/register', form);
      login(res.data);

      if (res.data.type === 'admin') navigate('/admin/dashboard');
      else if (res.data.type === 'teacher') navigate('/teacher/dashboard');
      else navigate('/student/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            name="type"
            onChange={handleChange}
            value={form.type}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
