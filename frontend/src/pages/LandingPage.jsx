import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 text-center p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome to Vaccine Tracker</h1>
      
      <div className="space-y-4 w-full max-w-xs">
        <Link to="/parent-login">
          <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
            👪 Parent Login
          </button>
        </Link>
        <Link to="/parent-signup">
          <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
            ✍️ Parent Signup
          </button>
        </Link>
        <Link to="/doctor-auth">
          <button className="w-full bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700">
            🩺 Doctor Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
