const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccineMasterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    recommended_age: {
        type: Number,  // Age in months
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
});

const VaccineMasterModel = mongoose.model('vaccine_masters', VaccineMasterSchema);
module.exports = VaccineMasterModel; 