const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: [{
        type: String
    }],
    answer: {
        type: String
    },
    preinterview: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Question', questionSchema)