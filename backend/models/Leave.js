const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const leaveSchema = new mongoose.Schema(
    {
        empid: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        leaveid: {
            type: String,
            required: true
        },
        
        reason:{
            type:String,
            required: true
        },
        
        type: {
            type: String,
            required: true
        },
        noOfDays: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            required: true
        }
    }
)

// leaveSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket',
//     id: 'ticketNums',
//     start_seq: 500
// })

module.exports = mongoose.model('Leave', leaveSchema)