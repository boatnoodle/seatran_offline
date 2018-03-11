const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourTicketSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    agent: {type: Schema.Types.ObjectId, ref: 'Tour'},
    tour: {type: Schema.Types.ObjectId, ref: 'Tour'},
    price: {type: Number, required: true},
    amount: {type: Number, required: true},
    total: {type: Number, requried: true},
    voucher: String,
    nameHotel: String,
    room: String,
    remark: String
})

module.exports = mongoose.model('TourTicket',tourTicketSchema)