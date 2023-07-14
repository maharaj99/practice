const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetailsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Training_Details',DetailsSchema);