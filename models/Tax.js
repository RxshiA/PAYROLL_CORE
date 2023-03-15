const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const taxSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        taxtype: {
            type: String,
            required: true
        },
        taxpay: {
            type: Number,
            required: true
        }
    }
)

taxSchema.plugin(AutoIncrement, {
    inc_field: 'tid',
    id: 'tidNums',
    start_seq: 2000
})

module.exports = mongoose.model('Tax', taxSchema)