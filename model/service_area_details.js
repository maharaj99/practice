const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  service_area: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  active: {
    type: String,
    required: true
},
});

module.exports = mongoose.model('service', serviceSchema);