const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const allowanceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
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

allowanceSchema.plugin(AutoIncrement, {
    inc_field: 'aid',
    id: 'aidNums',
    start_seq: 2000
})

module.exports = mongoose.model('Allowance', allowanceSchema)