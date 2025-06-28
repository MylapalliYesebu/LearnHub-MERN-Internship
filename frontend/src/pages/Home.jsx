import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bgImage from '../assets/bg.jpg'; 

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 🔹 Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔹 Navbar stays on top */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* 🔹 Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center min-h-screen">
        <h1 className="text-4xl font-extrabold text-white mb-4">Welcome to LearnHub 🎓</h1>
        <p className="text-lg text-gray-200 mb-8">Your center for skill enhancement</p>

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
      </div>
    </div>
  );
};

export default Home;
