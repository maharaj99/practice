const mongoose = require('mongoose');
const { Schema } = mongoose;

const settingsSchema = new Schema
({
job_post_auto_approve:{
    type: String,
    required: true,
    enum: ["Yes", "No"]
  },
})
module.exports = mongoose.model('settings', settingsSchema);