const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const taxSchema = new mongoose.Schema(
    {

        taxtype: {
            type: String,
            required: true
        },

        taxpay: {
            type: Number,
            
        }
    }
)


module.exports = mongoose.model('Tax', taxSchema)