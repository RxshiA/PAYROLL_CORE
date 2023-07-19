const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const allowanceSchema = new mongoose.Schema(
    {
        empid: {
            type: String,
            required: true,
            unique: true
        },
        fullname: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        allowancepay: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Allowance', allowanceSchema)