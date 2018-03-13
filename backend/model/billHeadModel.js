const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billHeadSchema = new Schema({
    billHead: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('BillHead',billHeadSchema)