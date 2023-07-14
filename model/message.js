const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageschema = new Schema({
from_employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true
  },
to_employee_code: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_details',
    required: true
},
mssg:{
    type: String,
    required: true
  },
mssg_datetime:{
    type: Date,
    required: true
  },
seen:{
    type: String,
    required: true,
    enum: ["Yes", "No"]
  },


});

module.exports = mongoose.model('message', messageSchema);