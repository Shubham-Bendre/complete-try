import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';


function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj, user }) {
  const [employee, setEmployee] = useState({
    name: '',
    dob: '',
    gender: 'Male',
    parentMobile: '',
    profileImage: null,
  });
  const [updateMode, setUpdateMode] = useState(false);
  if(user){
    employee.parentId = user._id;
  }
  useEffect(() => {
    if (employeeObj) {
      setEmployee(employeeObj);
      setUpdateMode(true);
    }
  }, [employeeObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profileImage: e.target.files[0] });
  };

  const resetEmployeeStates = () => {
    setEmployee({
      name: '',
      dob: '',
      gender: 'Male',
      parentMobile: '',
      profileImage: null,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateEmployeeById(employee, employee._id)
        : await CreateEmployee(employee);
      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
      setShowModal(false);
      resetEmployeeStates();
      fetchEmployees();
      setUpdateMode(false);
    } catch (err) {
      console.error(err);
      notify('Failed to create Employee', 'error');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUpdateMode(false);
    resetEmployeeStates();
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
            {updateMode ? 'Update Child' : 'Add Child'}
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
          <form onSubmit={handleAddEmployee}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Parent Mobile No.</label>
              <input
                type="text"
                name="parentMobile"
                value={employee.parentMobile}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                {updateMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
