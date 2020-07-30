const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)