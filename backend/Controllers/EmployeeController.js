const EmployeeModel = require("../Models/EmployeeModel"); 

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const qrCodeUrl = req?.file ? req?.file?.path : null;
        body.qrCodeUrl = qrCodeUrl;

        // if (!body.parentId) {
        //     return res.status(400).json({
        //         message: 'Parent ID is required',
        //         success: false
        //     });
        // }

        const emp = new EmployeeModel(body);
        await emp.save();

        res.status(201).json({
            message: 'Child Created',
            success: true
        });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};


const getAllEmployees = async (req, res) => {
    try {
        let { page, limit, search, parentId } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let searchCriteria = {};
        if (parentId) searchCriteria.parentId = parentId;

        if (search) {
            searchCriteria.name = { $regex: search, $options: 'i' };
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);
        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(200).json({
            message: 'All Childs',
            success: true,
            data: {
                employees: emps,
                pagination: {
                    totalEmployees,
                    currentPage: page,
                    totalPages,
                    pageSize: limit
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await EmployeeModel.findOne({ _id: id });
        res.status(200).json({
            message: 'Child Details',
            success: true,
            data: emp
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        await EmployeeModel.deleteOne({ _id: id });
        res.status(200).json({
            message: 'Child Deleted Successfully',
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, dob, gender, parentMobile, vaccineCount } = req.body;
        let updateData = {
            name,
            dob,
            gender,
            parentMobile,
            vaccineCount,
            updatedAt: new Date()
        };

        if (req.file) {
            updateData.qrCodeUrl = req.file.path;
        }

        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Child not found' });
        }

        res.status(200).json({
            message: 'Child Updated Successfully',
            success: true,
            data: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
};
