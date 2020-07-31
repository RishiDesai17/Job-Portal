const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    answers: [{
        question: {
            // type: mongoose.Schema.Types.ObjectId,
            required: true,
            // ref: 'Question'
            type: String
        },
        answer: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('Submission', submissionSchema)