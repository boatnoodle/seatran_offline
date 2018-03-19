const mongoose = require('mongoose')
const User = require('../model/userModel')

module.exports = {
    addUser: (req,res,next) => {
        const user = new User(req.body)
        user.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getUser: (req,res,next) => {
        User.find()
        .exec()
        .then(route => {
            res.status(200).json(route)
        })
        .catch(err => {
            console.log(err)
        })
    },
    checkLoginUser: (req,res,next) => {
        User.findOne({'username': req.body.username, 'password': req.body.password})
        .exec()
        .then(route => {
            res.status(200).json(route)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updateUser: (req,res,next) => {
        User.findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    removeUser: (req,res,next) => {
        User.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}