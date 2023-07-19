const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const ratingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        ratingsRate: {
            type: Number,
            required: true
        },
        remark: {
            type: String
        }
    }
)

ratingSchema.plugin(AutoIncrement, {
    inc_field: 'rid',
    id: 'ridNums',
    start_seq: 2500
})

module.exports = mongoose.model('Rating', ratingSchema)