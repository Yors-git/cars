const mongoose = require('mongoose')

const Schema = mongoose.Schema

const carSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    scheduledDate: {
        type: Date, 
        required: true
    },
    kilometers: {
        type: Number,
        required: true
    },
    inService: {
        type: Boolean,
        default: false
    },
    personInCharge: {
        type: String,
        default: ''
    },
    estimateDate: {
        type: Date,
        default: ''
    }
})

module.exports = mongoose.model('Car', carSchema)