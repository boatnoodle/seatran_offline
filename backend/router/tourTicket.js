const express = require('express')
const route = express.Router()
const tourTicket = require('../controller/tourTicketController')

route.get('/getLastTourTicket',tourTicket.getLastTourTicket)
route.get('/getTourTicketLasted',tourTicket.getTourTicketLasted)
route.post('/addTourTicket',tourTicket.addTourTicket)

route.post('/getTourTicketByDate',tourTicket.getTourTicketByDate)
route.post('/getTourTicketSummery',tourTicket.getTourTicketSummery)

route.put('/cancelTourTicket/:id', tourTicket.cancelTourTicket)


module.exports = route
