const mongoose = require('mongoose');
const { Schema } = mongoose;

const sample_resumeSchema = new Schema({
resume_file:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model('message_room', sample_resumeSchema);