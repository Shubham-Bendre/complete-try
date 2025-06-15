import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import EmployeeManagementApp from './Elements/EmployeeManagementApp';
import EmployeeDetails from './Elements/EmployeeDetails';
import VaccineMasterManagementApp from './Elements/VaccineMasterManagementApp';

import LandingPage from './pages/LandingPage';
import ParentLogin from './pages/ParentLogin';
import ParentSignup from './pages/ParentSignup';
import DoctorAuth from './pages/DoctorAuth';
import DoctorDashboard from './pages/DoctorDashboard';

// In a real app, you'd replace this with auth logic
const isAuthenticated = true; // mock value

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/parent-signup" element={<ParentSignup />} />
          <Route path="/doctor-auth" element={<DoctorAuth />} />

          {/* Doctor Dashboard */}
          <Route
            path="/doctor-dashboard"
            element={isAuthenticated ? <DoctorDashboard /> : <Navigate to="/doctor-auth" />}
          />

          {/* Protected Routes for Parent */}
          <Route
            path="/employee"
            element={isAuthenticated ? <EmployeeManagementApp /> : <Navigate to="/parent-login" />}
          />
          <Route
            path="/employee/:id"
            element={isAuthenticated ? <EmployeeDetails /> : <Navigate to="/parent-login" />}
          />

          <Route path="/vaccine-masters" 
          element={isAuthenticated ? <VaccineMasterManagementApp /> : <Navigate to="/parent-login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
