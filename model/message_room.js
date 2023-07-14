const mongoose = require('mongoose');
const { Schema } = mongoose;

const message_roomSchema = new Schema({
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
last_mssg_code:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model('message_room', message_roomSchema);