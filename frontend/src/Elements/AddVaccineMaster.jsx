import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateVaccineMaster, UpdateVaccineMasterById } from '../api';

function AddVaccineMaster({ showModal, setShowModal, fetchVaccines, vaccineObj }) {
    const [vaccine, setVaccine] = useState({
        name: '',
        recommended_age: '',
        description: '',
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (vaccineObj) {
            setVaccine(vaccineObj);
            setUpdateMode(true);
        }
    }, [vaccineObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaccine({ ...vaccine, [name]: value });
    };

    const resetVaccineStates = () => {
        setVaccine({
            name: '',
            recommended_age: '',
            description: '',
        });
    };

    const handleAddVaccine = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode
                ? await UpdateVaccineMasterById(vaccine, vaccine._id)
                : await CreateVaccineMaster(vaccine);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            setShowModal(false);
            resetVaccineStates();
            fetchVaccines();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create vaccine', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetVaccineStates();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
                showModal ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h5 className="text-lg font-medium">
                        {updateMode ? 'Update Vaccine' : 'Add Vaccine'}
                    </h5>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600"
                        onClick={handleModalClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <form onSubmit={handleAddVaccine}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={vaccine.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Recommended Age (months)</label>
                            <input
                                type="number"
                                name="recommended_age"
                                value={vaccine.recommended_age}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={vaccine.description}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={handleModalClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                {updateMode ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddVaccineMaster; 