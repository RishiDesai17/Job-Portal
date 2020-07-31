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
    logo: {
        type: String,
        required: true
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
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Employer', employerSchema)