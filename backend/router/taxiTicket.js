const express = require('express')
const route = express.Router()
const taxiTicket = require('../controller/taxiTicketController')

route.get('/getTaxiTicket',taxiTicket.getTaxiTicket)
route.get('/getLastTaxiTicket',taxiTicket.getLastTaxiTicket)
route.get('/getTaxiTicketLasted',taxiTicket.getTaxiTicketLasted)

route.post('/getTaxiTicketByDate',taxiTicket.getTaxiTicketByDate)
route.post('/getTaxiTicketSummery',taxiTicket.getTaxiTicketSummery)

route.post('/addTaxiTicket',taxiTicket.addTaxiTicket)

module.exports = route
