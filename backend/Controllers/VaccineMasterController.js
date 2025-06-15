const VaccineMasterModel = require("../Models/VaccineMasterModel");

const createVaccineMaster = async (req, res) => {
    try {
        const body = req.body;
        const vaccine = new VaccineMasterModel(body);
        await vaccine.save();

        res.status(201).json({
            message: 'Vaccine Created Successfully',
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

const getAllVaccineMasters = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let searchCriteria = {};
        if (search) {
            searchCriteria.name = { $regex: search, $options: 'i' };
        }

        const totalVaccines = await VaccineMasterModel.countDocuments(searchCriteria);
        const vaccines = await VaccineMasterModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        const totalPages = Math.ceil(totalVaccines / limit);

        res.status(200).json({
            message: 'All Vaccines',
            success: true,
            data: {
                vaccines,
                pagination: {
                    totalVaccines,
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

const getVaccineMasterById = async (req, res) => {
    try {
        const id = req.params.id;
        const vaccine = await VaccineMasterModel.findOne({ _id: id });
        res.status(200).json({
            message: 'Vaccine Details',
            success: true,
            data: vaccine
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

const deleteVaccineMasterById = async (req, res) => {
    try {
        const id = req.params.id;
        await VaccineMasterModel.deleteOne({ _id: id });
        res.status(200).json({
            message: 'Vaccine Deleted Successfully',
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

const updateVaccineMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, recommended_age, description } = req.body;
        const updateData = {
            name,
            recommended_age,
            description,
            updatedAt: new Date()
        };

        const updatedVaccine = await VaccineMasterModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedVaccine) {
            return res.status(404).json({ message: 'Vaccine not found' });
        }

        res.status(200).json({
            message: 'Vaccine Updated Successfully',
            success: true,
            data: updatedVaccine
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVaccineMaster,
    getAllVaccineMasters,
    getVaccineMasterById,
    deleteVaccineMasterById,
    updateVaccineMasterById
}; 