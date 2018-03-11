const express = require('express')
const route = express.Router()
const tourTicket = require('../controller/tourTicketController')

route.get('/getLastTourTicket',tourTicket.getLastTourTicket)
route.post('/addTourTicket',tourTicket.addTourTicket)

module.exports = route
