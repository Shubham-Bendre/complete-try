import React, { useEffect, useState } from 'react';
import VaccineMasterTable from './VaccineMasterTable';
import AddVaccineMaster from './AddVaccineMaster';
import { GetAllVaccineMasters } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import { Button } from "@/components/ui/button";

const VaccineMasterManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [vaccineObj, setVaccineObj] = useState(null);
    const [vaccinesData, setVaccinesData] = useState({
        vaccines: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalVaccines: 0,
            totalPages: 0
        }
    });

    const fetchVaccines = async (search = '', page = 1, limit = 5) => {
        try {
            const data = await GetAllVaccineMasters(search, page, limit);
            setVaccinesData(data);
        } catch (err) {
            notify('Error fetching data', 'error');
        }
    };

    useEffect(() => {
        fetchVaccines();
    }, []);

    const handleSearch = (e) => {
        fetchVaccines(e.target.value);
    };

    const handleUpdateVaccine = (vaccine) => {
        setVaccineObj(vaccine);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Vaccine Management System</h1>
            <div className="w-full flex justify-center">
                <div className="w-4/5 border bg-gray-100 p-6 rounded shadow">
                    <div className="flex justify-between mb-4">
                        <Button variant="default" onClick={() => setShowModal(true)}>
                            Add Vaccine
                        </Button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by name..."
                            className="form-control w-1/2 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <VaccineMasterTable
                        vaccines={vaccinesData.vaccines}
                        pagination={vaccinesData.pagination}
                        fetchVaccines={fetchVaccines}
                        handleUpdateVaccine={handleUpdateVaccine}
                    />
                    <AddVaccineMaster
                        fetchVaccines={fetchVaccines}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        vaccineObj={vaccineObj}
                    />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default VaccineMasterManagementApp; 