const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      parentMobile: {
        type: String,
        required: true,
      },
      vaccineCount: {
        type: Number,
        default: 0, // increment after each scan
      },
      qrCodeUrl: {
        type: String, // stored in Cloudinary
    },
    parentId: {
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

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;


