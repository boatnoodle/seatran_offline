const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')

route.get('/getUser',userController.getUser)
route.post('/addUser',userController.addUser)
route.put('/updateUser/:id',userController.updateUser)
route.delete('/removeUser/:id',userController.removeUser)

route.post('/checkLoginUser', userController.checkLoginUser)

module.exports = route
