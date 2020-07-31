const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    resumes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume'
    }],
    jobsApplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    jobsShortlisted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    jobsSelected: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)