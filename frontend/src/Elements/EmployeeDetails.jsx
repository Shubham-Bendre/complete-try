import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployeeDetailsById, GetAllVaccineMasters } from '../api';
import Logout from '../components/Logout'; // Import the Logout component

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [vaccinesList, setVaccinesList] = useState([]);
    const [completedVaccines, setCompletedVaccines] = useState([]);
    const [nextVaccine, setNextVaccine] = useState(null);

    const fetchEmployeeDetails = async () => {
        try {
            const data = await GetEmployeeDetailsById(id);
            setEmployee(data);
            calculateVaccineSchedule(data.dob);
        } catch (err) {
            alert('Error fetching child details');
        }
    };

    async function getVaccinesList() {
        try {
            const data = await GetAllVaccineMasters();
            setVaccinesList(data.vaccines);
        } catch (err) {
            console.error('Error fetching vaccines:', err);
        }
    }

    const calculateVaccineSchedule = (dobString) => {
        const dob = new Date(dobString);
        const today = new Date();
        
        // Calculate age in months
        const ageInMonths = (today.getFullYear() - dob.getFullYear()) * 12 + 
            (today.getMonth() - dob.getMonth());

        // Sort vaccines by recommended age
        const sortedVaccines = [...vaccinesList].sort((a, b) => a.recommended_age - b.recommended_age);
        
        // Convert recommended_age from years to months for comparison
        const completed = sortedVaccines.filter(vaccine => (vaccine.recommended_age * 12) <= ageInMonths);
        setCompletedVaccines(completed);

        // Find next vaccine (first vaccine where recommended age > current age)
        const next = sortedVaccines.find(vaccine => (vaccine.recommended_age * 12) > ageInMonths);
        setNextVaccine(next);
    };

    const handleLogout = () => {
        // Clear any user data from storage if needed
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        // Redirect to home page
        navigate('/');
    };

    useEffect(() => {
        fetchEmployeeDetails();
        getVaccinesList();
    }, [id]);

    useEffect(() => {
        if (employee && vaccinesList.length > 0) {
            calculateVaccineSchedule(employee.dob);
        }
    }, [employee, vaccinesList]);

    if (!employee) {
        return <div className="text-center mt-10 text-gray-600">Child not found</div>;
    }

    const ageInMonths = employee.dob ? 
        (new Date().getFullYear() - new Date(employee.dob).getFullYear()) * 12 + 
        (new Date().getMonth() - new Date(employee.dob).getMonth()) : 0;

    return (
        <div className="container mx-auto mt-10">
		<div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Child Vaccination Details</h1>
                {/* <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
                >
                    Logout
                </button> */}
                <div className="absolute top-4 right-4">
                    <Logout />
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white px-6 py-4">
                    <h2 className="text-2xl font-bold">Child Details</h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                        <div className="w-full md:w-1/3 mb-4 md:mb-0">
                            <img
                                src={employee.profileImage}
                                alt={employee.name}
                                className="w-full rounded-lg object-cover"
                            />
                        </div>
                        <div className="w-full md:w-2/3 md:pl-6">
                            <h4 className="text-xl font-semibold mb-2">{employee.name}</h4>
                            <p className="mb-2"><strong>Date of Birth:</strong> {new Date(employee.dob).toDateString()}</p>
                            <p className="mb-2"><strong>Age:</strong> {Math.floor(ageInMonths/12)} years</p>
                            <p className="mb-2"><strong>Gender:</strong> {employee.gender}</p>
                            <p className="mb-2"><strong>Parent Mobile:</strong> {employee.parentMobile}</p>
                            <p className="mb-2"><strong>Vaccines Taken:</strong> {employee.vaccineCount}</p>

                            {employee.qrCodeUrl && (
                                <div className="mt-4">
                                    <strong>QR Code:</strong>
                                    <div className="mt-2">
                                        <img
                                            src={employee.qrCodeUrl}
                                            alt="QR Code"
                                            className="w-32 h-32 object-contain border border-gray-300 p-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-4">Vaccine Progress</h4>
                        
                        {/* Completed Vaccines */}
                        <div className="mb-6">
                            <h5 className="text-md font-semibold mb-2 text-green-600">Previous Vaccines</h5>
                            <div className="space-y-2">
                                {completedVaccines.map((vaccine, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 border rounded bg-green-50">
                                        <div>
                                            <span className="font-medium">{vaccine.name}</span>
                                            <p className="text-sm text-gray-600">{vaccine.description}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Due at {vaccine.recommended_age} years</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Upcoming Vaccine */}
                        {nextVaccine && (
                            <div>
                                <h5 className="text-md font-semibold mb-2 text-blue-600">Next Upcoming Vaccine</h5>
                                <div className="p-3 border rounded bg-blue-50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="font-medium">{nextVaccine.name}</span>
                                            <p className="text-sm text-gray-600">{nextVaccine.description}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Due at {nextVaccine.recommended_age} years</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => navigate('/employee')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
