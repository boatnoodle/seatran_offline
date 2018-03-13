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
    tour: [
        {
            nameTour: {
                type: String,
                required: true
            },
            priceTour: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Tour',tourSchema)