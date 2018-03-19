const express = require('express')
const route = express.Router()
const systemController = require('../controller/systemController')

route.post('/initilalize',systemController.initilalize)

route.get('/getBillHead',systemController.getBillHead)
route.post('/updateBillHead',systemController.updateBillHead)

route.get('/getPercent',systemController.getPercent)
route.post('/updatePercent',systemController.updatePercent)

// route.delete('/removeRoute/:id',routeTaxiController.removeRoute)

module.exports = route
