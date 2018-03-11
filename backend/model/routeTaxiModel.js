const mongoose = require('mongoose')
const Schema = mongoose.Schema

const routeTaxiSchema = new Schema({
    nameRoute: {type: String, required: true},
    priceRoute: {type: Number, required: true}
})

module.exports = mongoose.model('RouteTaxi',routeTaxiSchema)