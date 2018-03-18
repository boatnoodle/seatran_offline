const mongoose = require('mongoose')
const Schema = mongoose.Schema

const routeTaxiSchema = new Schema({
    nameRoute: {type: String, required: true},
    priceTaxi: {type: Number, required: true},
    priceVan: {type: Number},
})

module.exports = mongoose.model('RouteTaxi',routeTaxiSchema)