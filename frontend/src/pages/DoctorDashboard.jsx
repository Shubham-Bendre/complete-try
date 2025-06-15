// src/pages/DoctorDashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = ({ setStats }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employee/stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, [setStats]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/employee')}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            View All Children
                        </button>
                        <button
                            onClick={() => navigate('/vaccine-masters')}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Manage Vaccines
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;