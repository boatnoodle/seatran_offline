const mongoose = require('mongoose')
const TourTicket = require('../model/tourTicketModel')

module.exports = {
    addTourTicket: (req,res,next) => {
        const tourTicket = new TourTicket(req.body)
        tourTicket.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getLastTourTicket: (req,res,next) => {
        TourTicket.findOne({},'_id',{ sort: {'_id': -1}})
        .exec()
        .then(tourTicket => {
            res.status(200).json(tourTicket)
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