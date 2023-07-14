const mongoose = require('mongoose');
const { Schema } = mongoose;

const job_post_detailsSchema = new Schema
({

    tech_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'technology',
        required: true,
    },
    location_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location',
        required: true,
    },
    company_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company_details',
        required: true,
    },
    salary_range_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salary',
        required: true,
    },
    exp_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'experience',
        required: true,
    },
    service_area_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required: true,
    },
    targeted_employee:{
        type: String,
        required: true,
        enum: ["Fresher", "All"]

    },
    job_title:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    ph_num:{
        type: Number,
        required: true,
        unique: true,
        maxLength: 10,

    },
    status:{
        type: String,
        required: true,
        enum: ["Pending" , "Approved" , "Reject" , "Closed"]

    },
    reject_reason:{
        type: String,
        required: true,
    },
    post_datetime:{
        type:Date,
        required:true

    },
    post_employee_type:{
        type: String,
        required: true,
        enum: ["Hr", "Candidate"]

    },
    post_employee_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee_details',
        required: true,
    }
});

module.exports = mongoose.model('job_post_details',job_post_detailsSchema);
