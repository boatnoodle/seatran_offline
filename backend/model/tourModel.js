const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourSchema = new Schema({
    _id: { 
        type: Schema.Types.ObjectId 
    },
    nameAgent: {
        type: String,
        required: true
    },
    detailTitleBill: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    tour: [
        {
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
        }
    ]
})

module.exports = mongoose.model('Tour',tourSchema)