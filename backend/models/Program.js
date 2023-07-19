const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const programSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        programName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        startingDate: {
            type: Date,
            required: true
        },
        closingDate: {
            type: Date,
            required: true
        }
    }
)

programSchema.plugin(AutoIncrement, {
    inc_field: 'pid',
    id: 'pidNums',
    start_seq: 3000
})

module.exports = mongoose.model('Program', programSchema)