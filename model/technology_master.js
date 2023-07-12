const mongoose = require('mongoose');
const { Schema } = mongoose;

const techSchema = new Schema({
  tech_name: {
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

module.exports = mongoose.model('technology', techSchema);