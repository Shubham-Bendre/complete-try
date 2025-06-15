import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Logout = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className={`hover:bg-red-600 ${className}`}
    >
      Logout
    </Button>
  );
};

export default Logout;