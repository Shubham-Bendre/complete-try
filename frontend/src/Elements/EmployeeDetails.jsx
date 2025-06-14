import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployeeDetailsById } from '../api';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [schedule, setSchedule] = useState([]);

    const fetchEmployeeDetails = async () => {
        try {
            const data = await GetEmployeeDetailsById(id);
            setEmployee(data);
            generateVaccineSchedule(data.dob, data.vaccineCount);
        } catch (err) {
            alert('Error fetching child details');
        }
    };

    const generateVaccineSchedule = (dobString, vaccinesTaken) => {
        const dob = new Date(dobString);
        const scheduleData = [
            { name: 'BCG', dueInDays: 0 },
            { name: 'Hepatitis B-1', dueInDays: 0 },
            { name: 'OPV-1', dueInDays: 42 },
            { name: 'DPT-1', dueInDays: 42 },
            { name: 'Hepatitis B-2', dueInDays: 42 },
            { name: 'OPV-2', dueInDays: 70 },
            { name: 'DPT-2', dueInDays: 70 },
            { name: 'Hepatitis B-3', dueInDays: 98 },
            { name: 'MMR', dueInDays: 270 },
        ];

        const fullSchedule = scheduleData.map((vaccine, index) => {
            const dueDate = new Date(dob);
            dueDate.setDate(dob.getDate() + vaccine.dueInDays);
            return {
                ...vaccine,
                dueDate: dueDate.toDateString(),
                isTaken: index < vaccinesTaken,
            };
        });

        setSchedule(fullSchedule);
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [id]);

    if (!employee) {
        return <div className="text-center mt-10 text-gray-600">Child not found</div>;
    }

    return (
        <div className="container mx-auto mt-10">
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
                        <h4 className="text-lg font-semibold mb-2">Vaccine Progress</h4>
                        <div className="w-full bg-gray-300 h-4 rounded mb-4">
                            <div
                                className="bg-green-500 h-4 rounded"
                                style={{ width: `${(employee.vaccineCount / schedule.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="space-y-2">
                            {schedule.map((vaccine, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 border rounded bg-white">
                                    <span>{vaccine.name}</span>
                                    <span className="text-sm text-gray-500">Due: {vaccine.dueDate}</span>
                                    <span
                                        className={`px-2 py-1 text-xs rounded font-semibold ${
                                            vaccine.isTaken ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                        }`}
                                    >
                                        {vaccine.isTaken ? 'Taken' : 'Pending'}
                                    </span>
                                </div>
                            ))}
                        </div>
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
