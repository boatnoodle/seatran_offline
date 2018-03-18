const express = require('express')
const route = express.Router()
const taxiTicket = require('../controller/taxiTicketController')

route.get('/getLastTaxiTicket',taxiTicket.getLastTaxiTicket)
route.get('/getTaxiTicket',taxiTicket.getTaxiTicket)

route.post('/getTaxiTicketByDate',taxiTicket.getTaxiTicketByDate)
route.post('/getTaxiTicketSummery',taxiTicket.getTaxiTicketSummery)

route.post('/addTaxiTicket',taxiTicket.addTaxiTicket)

module.exports = route
