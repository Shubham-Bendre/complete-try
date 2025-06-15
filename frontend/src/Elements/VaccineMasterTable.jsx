import React from 'react';
import { DeleteVaccineMasterById } from '../api';
import { notify } from '../utils';

function VaccineMasterTable({
    vaccines = [],
    pagination = { currentPage: 1, totalPages: 1 },
    fetchVaccines,
    handleUpdateVaccine,
}) {
    const { currentPage, totalPages } = pagination;

    const handlePagination = (page) => {
        if (fetchVaccines) {
            fetchVaccines('', page, 5);
        }
    };

    const handleDeleteVaccine = async (id) => {
        try {
            const { success, message } = await DeleteVaccineMasterById(id);
            notify(message, success ? 'success' : 'error');
            if (fetchVaccines) fetchVaccines();
        } catch (err) {
            console.error(err);
            notify('Failed to delete vaccine', 'error');
        }
    };

    const Card = ({ vaccine }) => (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:bg-gray-50">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-blue-800">{vaccine.name}</h2>
                <div className="flex space-x-3">
                    {handleUpdateVaccine && (
                        <button
                            className="text-yellow-600 hover:text-yellow-700 text-xl"
                            onClick={() => handleUpdateVaccine(vaccine)}
                        >
                            ✏️
                        </button>
                    )}
                    <button
                        className="text-red-600 hover:text-red-700 text-xl"
                        onClick={() => handleDeleteVaccine(vaccine._id)}
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <div className="text-gray-700 text-sm">
                <p><strong>Recommended Age:</strong> {vaccine.recommended_age} months</p>
                <p><strong>Description:</strong> {vaccine.description}</p>
            </div>
        </div>
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div>
            {vaccines.map((vaccine) => (
                <Card key={vaccine._id} vaccine={vaccine} />
            ))}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {pageNumbers.map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePagination(pageNum)}
                            className={`px-3 py-1 rounded ${
                                currentPage === pageNum
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VaccineMasterTable; 