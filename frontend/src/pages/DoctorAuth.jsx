// src/pages/DoctorAuth.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAuth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login
    navigate('/doctor-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100">
      <h2 className="text-2xl font-bold mb-4">Doctor Login</h2>
      <input type="text" placeholder="Doctor ID" className="mb-2 p-2 border rounded" />
      <input type="password" placeholder="Password" className="mb-2 p-2 border rounded" />
      <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
};

export default DoctorAuth;