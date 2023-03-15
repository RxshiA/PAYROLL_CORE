const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    empid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    joinedDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)