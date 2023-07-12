const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
  experience: {
    type:Number,
    required:true
  },
  details: {
    type: String,
    required: true
  },
  active: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('experience', experienceSchema);