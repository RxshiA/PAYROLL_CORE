const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    empid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    gender:{
        type: String
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
    }
})

module.exports = mongoose.model('User', userSchema)