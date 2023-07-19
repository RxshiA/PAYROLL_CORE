const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userTaxSchema = new mongoose.Schema(
    {
        empid: {
            type: String,
            required: true
        },

        taxtype: {
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


        date:{
            type: Date,

        },


        taxAmount:{
            type: Number,
        }
    }
)

module.exports = mongoose.model('UserTax', userTaxSchema)