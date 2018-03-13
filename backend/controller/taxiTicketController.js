const mongoose = require('mongoose')
const TaxiTicket = require('../model/taxiTicketModel')

module.exports = {
    addTaxiTicket: (req,res,next) => {
        const route = new TaxiTicket(req.body)
        route.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getTaxiTicket: (req,res,next) => {
        TaxiTicket.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getLastTaxiTicket: (req,res,next) => {
        TaxiTicket.findOne({},'_id',{ sort: {'_id': -1}})
        .exec()
        .then(route => {
            res.status(200).json(route)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getTaxiTicketByDate: (req,res,next) => {
        var date = new Date(req.body.dateSelect)
        var datePlus = new Date(new Date(req.body.dateSelect).setDate(date.getDate() + 1))
        TaxiTicket.find(
            {"created" : {$gte: date, $lt: datePlus}}
        )
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
    // getAllRoute: (req,res,next) => {
    //     TaxiTicket.find()
    //     .exec()
    //     .then(route => {
    //         res.status(200).json(route)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },
    // updateRoute: (req,res,next) => {
    //     TaxiTicket.findByIdAndUpdate(req.params.id,req.body,{new: true})
    //     .then((result) => {
    //         res.status(200).json(result)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // },
    // removeRoute: (req,res,next) => {
    //     TaxiTicket.findByIdAndRemove(req.params.id)
    //     .then(result => {
    //         res.status(200).json(result)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }
}