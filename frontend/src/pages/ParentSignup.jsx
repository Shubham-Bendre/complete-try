// src/pages/ParentSignup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParentSignup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Add actual signup logic here
    navigate('/employee');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <h2 className="text-2xl font-bold mb-4">Parent Signup</h2>
      <input type="text" placeholder="Full Name" className="mb-2 p-2 border rounded" />
      <input type="text" placeholder="Mobile Number" className="mb-2 p-2 border rounded" />
      <input type="password" placeholder="Password" className="mb-4 p-2 border rounded" />
      <button onClick={handleSignup} className="bg-blue-600 text-white px-4 py-2 rounded">
        Signup
      </button>
    </div>
  );
};

export default ParentSignup;
