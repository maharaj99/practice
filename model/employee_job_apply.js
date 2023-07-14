const mongoose = require('mongoose');
const { Schema } = mongoose;

const employee_job_detailsSchema = new Schema
({
job_post_code	: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job_post_details',
    required: true,
  },
employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true,
  },
resume: {
    type: String,
    required: true
  },
apply_datetime: {
    type: Date,
    required: true
},
message: {
    type: String,
    required: true
},
});

module.exports = mongoose.model('employee_job_details', employee_job_detailsSchema);