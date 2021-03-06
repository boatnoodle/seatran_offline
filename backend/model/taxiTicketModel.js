const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taxiTicketSchema = new Schema({
    _id: {type: String, required: true},
    namePassenger: {type: String, required: true},
    destination: {type: Schema.Types.ObjectId, ref: 'RouteTaxi'},
    price: {type: Number, required: true},
    amount: {type: Number, required: true},
    amountKid: {type: Number},
    totalPassenger: {type: Number},
    total: {type: Number, requried: true},
    typeCar: {type: String, require: true},
    remark: String,
    created: {
        type: Date,
        default: Date.now
    },
    statusTicket: {
        type: Number,
        defualt: 1
    }
})

module.exports = mongoose.model('TaxiTicket',taxiTicketSchema)