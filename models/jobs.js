const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employer'
    },
    positions: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    perks: [{
        type: String,
        required: true
    }],
    domain: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Domain'
    },
    skills: [{
        type: String,
        required: true
    }],
    applicationDeadline: {
        type: Date,
        required: true
    },
    preInterview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreInterview'
    },
    applicants: [{
        type: String,
        ref: 'User'
    }],
    shortlisted: [{
        type: String,
        ref: 'User'
    }],
    selected: [{
        type: String,
        ref: 'User'
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Job', jobSchema)