const mongoose = require('mongoose')
const Schema = mongoose.Schema

const systemSchema = new Schema({
    _id: {
        type: String,
        default: 'seatran_offline'
    },
    billHead: {
        type: String
    },
    billFoot: {
        type: String
    },
    percentTaxi: {
        type: Number
    },
    percentTour: {
        type: Number
    },
    statusPrint: {
        type: Boolean,
        default: true
    },
    amountPrint: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('System',systemSchema)