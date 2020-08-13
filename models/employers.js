const mongoose = require('mongoose')

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    logo: {
        type: String
    },
    about: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    contact_no: {
        type: String,
        required: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Employer', employerSchema)