const mongoose = require('mongoose');
const { Schema } = mongoose;

const company_detailsSchema = new Schema({
  company_name: {
    type: String,
    required: true
  },
  ph_num: {
    type: Number,
    required: true,
    unique: true,
    maxLength: 10,
},
  logo:{
    type:String,
    required:true
  },
  banner:{
    type:String,
    required:true
  },
  active: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('company_details', company_detailsSchema);