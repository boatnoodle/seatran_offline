const mongoose = require('mongoose')
const TourTicket = require('../model/tourTicketModel')

module.exports = {
    addTourTicket: (req, res, next) => {
        const tourTicket = new TourTicket(req.body)
        tourTicket.save()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    addTourTicketRealTime: (req, res, next) => {
        const tourTicket = new TourTicket(req.body)
        tourTicket.save()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getLastTourTicket: (req, res, next) => {
        TourTicket.findOne({}, '_id', { sort: { '_id': -1 } })
            .exec()
            .then(tourTicket => {
                res.status(200).json(tourTicket)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getTourTicketByDate: (req, res, next) => {
        if (!req.body.dateTo) {
            var date = new Date(req.body.dateFrom)
            var dateTo = date.setDate(date.getDate() + 1) // กรณี ไม่ส่ง ถึงวันที่เท่าไรมา ให้ ทำการ บวก 1 วัน ***รายงานประจำวัน
        } else {
            var dateTo = new Date(req.body.dateTo + 'T24:00:00')
        }
        TourTicket.find(
            { "created": { $gte: new Date(req.body.dateFrom), $lt: dateTo } },
        )
            .populate('agent')
            .exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log('err', err.message)
                res.send(err.message)
            })
    },
    getTourTicketSummery(req, res, next) {
        if (!req.body.dateTo) {
            var dateTo = new Date(req.body.dateFrom + 'T24:00:00')
        } else {
            var dateTo = new Date(req.body.dateTo + 'T24:00:00')
        }
        TourTicket.aggregate([
            {
                $match: {
                    created: { $gte: new Date(req.body.dateFrom), $lt: dateTo }
                }
            },
            {
                $group: {
                    _id: {
                        agent: "$agent",
                        tour: "$tour"
                    },
                    created: { $first: '$created' },
                    totalPrice: { $sum: { $multiply: ["$price", "$amount"] } },
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $group: {
                    _id: "$_id.agent",
                    created: { $first: "$created" },
                    tour: {
                        $push: {
                            _id: "$_id.tour",
                            totalAmount: "$totalAmount",
                            totalPrice: "$totalPrice"
                        }
                    }
                }
            }
            ,
            {
                $lookup: {
                    from: 'tours',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'detailAgentTour'
                }
            }
        ])
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log('err', err)
                res.send(err.message)
            })
    },
    getTourTicketLasted(req, res, next) {
        TourTicket.find()
            .sort({ 'created': -1 })
            .exec()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                console.log('err', err)
                res.send(err.message)
            })
    }

}