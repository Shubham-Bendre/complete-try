import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';

function EmployeeTable({
    employees = [],
    pagination = { currentPage: 1, totalPages: 1 },
    fetchEmployees,
    handleUpdateEmployee,
}) {
    const { currentPage, totalPages } = pagination;

    const handlePagination = (page) => {
        if (fetchEmployees) {
            fetchEmployees('', page, 5);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            notify(message, success ? 'success' : 'error');
            if (fetchEmployees) fetchEmployees();
        } catch (err) {
            console.error(err);
            notify('Failed to delete child', 'error');
        }
    };

    const Card = ({ employee }) => (
        <Link to={`/employee/${employee._id}`} className="block">
            <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-blue-800">{employee.name}</h2>
                    <div className="flex space-x-3">
                        {handleUpdateEmployee && (
                            <button
                                className="text-yellow-600 hover:text-yellow-700 text-xl"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateEmployee(employee);
                                }}
                            >
                                ✏️
                            </button>
                        )}
                        <button
                            className="text-red-600 hover:text-red-700 text-xl"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteEmployee(employee._id);
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                </div>
                <div className="text-gray-700 text-sm">
                    <p><strong>DOB:</strong> {new Date(employee.dob).toDateString()}</p>
                    <p><strong>Gender:</strong> {employee.gender}</p>
                    <p><strong>Parent Mobile:</strong> {employee.parentMobile}</p>
                    <p><strong>Vaccines Taken:</strong> {employee.vaccineCount}</p>
                </div>
            </div>
        </Link>
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employees.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">Data Not Found</p>
                ) : (
                    employees.map((emp) => <Card employee={emp} key={emp._id} />)
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-3 py-1 border rounded text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => handlePagination(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                className={`px-3 py-1 border rounded ${
                                    currentPage === page
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-500 hover:bg-gray-200'
                                }`}
                                onClick={() => handlePagination(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="px-3 py-1 border rounded text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => handlePagination(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default EmployeeTable;
