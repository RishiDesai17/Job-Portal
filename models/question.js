const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    solution: {
        type: String
    }
})

module.exports = mongoose.model('Question', questionSchema)