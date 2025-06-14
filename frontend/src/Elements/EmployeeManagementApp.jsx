import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import Logout from '../components/Logout'; // Import the Logout component

const EmployeeManagementApp = () => {
    const location = useLocation();
    const user = location.state?.user ? location.state.user : JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try {
            const data = await GetAllEmployees(search, page, limit, user._id);
            setEmployeesData(data);
        } catch (err) {
            notify('Error fetching data', 'error');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (e) => {
        fetchEmployees(e.target.value);
    };

    const handleUpdateEmployee = (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full p-6 relative">
            {/* Replaced with Logout component */}
            <div className="absolute top-4 right-4">
                <Logout />
            </div>

            <h1 className="text-2xl font-bold mb-4">Child Management System</h1>
            <div className="w-full flex justify-center">
                <div className="w-4/5 border bg-gray-100 p-6 rounded shadow">
                    <div className="flex justify-between mb-4">
                        <Button 
                            variant="default" 
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Add Child
                        </Button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by name..."
                            className="w-1/2 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                        />
                    </div>
                    
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />
                    
                    <AddEmployee
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeObj={employeeObj}
                        user={user}
                    />
                </div>
            </div>
            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default EmployeeManagementApp;
