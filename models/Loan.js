const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const loanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        loantype: {
            type: String,
            required: true
        },
        fullloan: {
            type: Number,
            required: true
        },
        interest: {
            type: Number,
            required: true
        }
    }
)

loanSchema.plugin(AutoIncrement, {
    inc_field: 'lid',
    id: 'lidNums',
    start_seq: 2000
})

module.exports = mongoose.model('Loan', loanSchema)