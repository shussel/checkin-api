const { Schema, model } = require('mongoose')

const CheckinSchema = new Schema({
    checkinTime: {
        type: Date,
        required: true,
    },
    location: {
        type: [Number],
        default: [0, 0],
        required: true,
    },
    checkinMessage: {
        type: String,
        default: 'OK',
    },    
})

const CallSchema = new Schema({    
    checkins: {
        type: [CheckinSchema],
        required: true,
    },
})

const Call = model('call', CallSchema)

module.exports = Call