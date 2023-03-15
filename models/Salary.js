const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        basicsal: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Salary', salarySchema)