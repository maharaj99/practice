const mongoose = require('mongoose');
const { Schema } = mongoose;

const walking_job_detailsSchema = new Schema
({
    location_code	: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
    required: true,
  },
  service_area_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  walking_date: {
    type: Date,
    required: true
},
post_employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true,
},
});

module.exports = mongoose.model('walking_job_details', walking_job_detailsSchema);