import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DoctorAuth() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/doctor-login', form);
      alert('Doctor login successful');
      navigate('/doctor-dashboard');
    } catch {
      alert('Invalid Doctor Credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Doctor Login</h2>
        <input className="w-full border p-2 rounded" placeholder="Doctor Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Login</button>
      </form>
    </div>
  );
}
