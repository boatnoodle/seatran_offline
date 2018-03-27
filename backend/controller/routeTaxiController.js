const mongoose = require('mongoose')
const RouteTaxi = require('../model/routeTaxiModel')

module.exports = {
    addRoute: (req,res,next) => {
        const route = new RouteTaxi(req.body)
        route.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getAllRoute: (req,res,next) => {
        RouteTaxi.find()
        .sort('nameRoute') // sort by name route
        .exec()
        .then(route => {
            res.status(200).json(route)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updateRoute: (req,res,next) => {
        RouteTaxi.findByIdAndUpdate(req.params.id,req.body,{new: true})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    removeRoute: (req,res,next) => {
        RouteTaxi.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}