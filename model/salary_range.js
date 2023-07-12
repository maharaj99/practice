const mongoose = require('mongoose');
const { Schema } = mongoose;

const salarySchema = new Schema({
  salary_range: {
    from: { type: Number, required: true },
    to: { type: Number, required: true }
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

module.exports = mongoose.model('salary',salarySchema);
