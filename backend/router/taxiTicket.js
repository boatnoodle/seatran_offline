const express = require('express')
const route = express.Router()
const taxiTicket = require('../controller/taxiTicketController')

route.get('/getLastTaxiTicket',taxiTicket.getLastTaxiTicket)
route.post('/addTaxiTicket',taxiTicket.addTaxiTicket)

module.exports = route
