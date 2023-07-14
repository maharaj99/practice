const mongoose = require('mongoose');
const { Schema } = mongoose;

const trainingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  trainings_poster : {
    type: String,
    required:true
  },
  active: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model('Training',trainingSchema);