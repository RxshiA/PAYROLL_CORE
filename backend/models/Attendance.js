const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
    {
        empid: {
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
        
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        }
    }
)

module.exports = mongoose.model('Attendance', attendanceSchema)