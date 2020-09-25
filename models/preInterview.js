const mongoose = require('mongoose')

const preInterviewSchema = new mongoose.Schema({
    // instructions: {
    //     type: String,
    //     required: true
    // },
    deadline: {
        type: Date,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }]
})

module.exports = mongoose.model('PreInterview', preInterviewSchema)