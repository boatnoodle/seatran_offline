const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourTicketSchema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    agent: {type: String, required: true},
    tour:{
            nameTour: {
                type: String,
                required: true
            },
            priceAdult: {
                type: Number,
                required: true
            },
            priceChild: {
                type: Number,
                required: true
            },
            netPriceAdult: {
                type: Number,
                require: true
            },
            netPriceChild: {
                type: Number,
                require: true
            }
    },
    amountAdult: {type: Number, required: true},
    amountChild: {type: Number},
    // total: {type: Number, requried: true},
    voucher: String,
    remark: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TourTicket',tourTicketSchema)