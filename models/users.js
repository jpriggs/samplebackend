const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)
