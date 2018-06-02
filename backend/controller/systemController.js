const mongoose = require('mongoose')
const System = require('../model/systemModel')

module.exports = {
    initilalize: (req,res,next) => {
        const system = new System({
            billHead: req.body.billHead,
            billFoot: req.body.billFoot,
            percentTaxi: req.body.percentTaxi,
            percentTour: req.body.percentTour,
            statusPrint: req.body.statusPrint,
            amountPrint: req.body.amountPrint
        })
        system.save()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updateBillHead: (req,res,next) => {
        System.update({ _id: "seatran_offline"}, { $set: { billHead: req.body.billHead , billFoot: req.body.billFoot}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getBillHead: (req,res,next)=> {
        System.findOne({_id: "seatran_offline"},'billHead billFoot')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updatePercent: (req,res,next) => {
        System.update({ _id: "seatran_offline"}, { $set: { percentTaxi: req.body.percentTaxi, percentTour: req.body.percentTour }})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getPercent: (req,res,next)=> {
        System.findOne({_id: "seatran_offline"},'percentTaxi percentTour')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updatePrintSetting: (req,res,next) => {
        System.update({ _id: "seatran_offline"}, { $set: { statusPrint: req.body.statusPrint, amountPrint: req.body.amountPrint, statusPrintTour: req.body.statusPrintTour, amountPrintTour: req.body.amountPrintTour }})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getPrintSetting: (req,res,next)=> {
        System.findOne({_id: "seatran_offline"})
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}