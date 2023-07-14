const mongoose = require('mongoose');
const { Schema } = mongoose;

const employee_search_detailsSchema = new Schema
({
employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true,
  },
  tech_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'technology',
    required: true,
  },
  location_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
    required: true,
},
exp_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'experience',
    required: true,
},
search_datetime	: {
    type:Date, 
    required:true
 
}
});

module.exports = mongoose.model('employee_search_details', employee_search_detailsSchema);