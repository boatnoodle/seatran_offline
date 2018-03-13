const express = require('express')
const route = express.Router()
const tourController = require('../controller/tourController')

route.get('/getAgent',tourController.getAgent)
route.post('/addAgent',tourController.addAgent)
route.put('/updateAgent/:id',tourController.updateAgent)
route.delete('/removeAgent/:id',tourController.removeAgent)

route.get('/getTour',tourController.getTour)
route.post('/updateTour',tourController.updateTour)

module.exports = route
