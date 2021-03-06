const mongoose = require('mongoose')
// const Company = require('../model/companyModel')
const Tour = require('../model/tourModel')
module.exports = {
    addAgent: (req,res,next) => {
        const agent = new Tour({
            _id: mongoose.Types.ObjectId(),
            nameAgent: req.body.nameAgent,
            detailTitleBill : req.body.detailTitleBill,
            logo: req.body.logo
        })
        agent.save()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getAgent: (req,res,next) => {
        Tour.find({})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    updateAgent: (req,res,next) => {
        console.log(req.body.detailTitleBill)
        Tour.update({_id: req.params.id},{$set: {nameAgent: req.body.nameAgent, detailTitleBill: req.body.detailTitleBill, logo: req.body.logo}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    removeAgent: (req,res,next) => {
        Tour.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getTour: (req,res,next) => {
        Tour.find()
        .sort([['tour.nameTour', -1]])
        .exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                massage: err
            })
        })
    },
    updateTour: (req,res,next) => {
        Tour.update({_id: req.body.id},{$set: {tour: req.body.tour}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}