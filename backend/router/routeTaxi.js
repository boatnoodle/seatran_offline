const express = require('express')
const route = express.Router()
const routeTaxiController = require('../controller/routeTaxiController')

route.get('/getAllRoute',routeTaxiController.getAllRoute)
route.post('/addRoute',routeTaxiController.addRoute)
route.put('/updateRoute/:id',routeTaxiController.updateRoute)
route.delete('/removeRoute/:id',routeTaxiController.removeRoute)

module.exports = route
