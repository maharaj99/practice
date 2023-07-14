const mongoose = require('mongoose');
const { Schema } = mongoose;

const employee_buddieschema = new Schema({
employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true,
  },
to_employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true,
},
mode:{
    type: String,
    required: true,
    enum: ["Request", "Friend"]
  },
status:{
    type: String,
    required: true,
    enum: ["Accept", "Pending","Cancel"]
  },
request_datetime: {
    type: String,
    required: true
},
accept_datetime: {
    type: Date,
    required: true
},
cancel_datetime: {
    type: Date,
    required: true
},

});

module.exports = mongoose.model('employee_buddies', employee_buddiesSchema);