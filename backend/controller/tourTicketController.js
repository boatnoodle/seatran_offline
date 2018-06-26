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
        TourTicket.find({ "created": { $gte: new Date(req.body.dateFrom), $lt: dateTo } })
            .populate('agent')
            .sort([['_id', -1]])
            .exec()
            .then(result => {
                var obj = []
                result.forEach(data => {
                    if(data.statusTicket == 99){
                        var data = {
                            _id: data._id,
                            agent: data.agent,
                            amountChild: 0,
                            amountAdult: 0,
                            tour: {
                                nameTour: data.tour.nameTour,
                                priceAdult: 0,
                                priceChild: 0,
                                netPriceAdult: 0,
                                netPriceChild: 0
                            },
                            voucher: data.voucher,
                            remark: data.remark,
                            statusTicket: data.statusTicket
                        }
                    }else{
                        var data = data
                    }
                    obj.push(data)
                });
                res.status(200).json(obj)
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
                        created: { $gte: new Date(req.body.dateFrom), $lt: dateTo },
                        statusTicket: {
                            $ne: 99
                        }
                    },
                    
                },
                {
                    $group: {
                        _id: {
                            agent: "$agent",
                            // tour: "$tour"
                        },
                        created: { $first: '$created' },
                        totalAmountAdult: { $sum: "$amountAdult" },
                        totalAmountChild: { $sum: "$amountChild" },
                        totalPriceAdult: { $sum: { $multiply: ["$tour.priceAdult", "$amountAdult"] } },
                        totalPriceChild: { $sum: { $multiply: ["$tour.priceChild", "$amountChild"] } },
                        totalNetPriceAdult: { $sum: { $multiply: ["$tour.netPriceAdult", "$amountAdult"] } },
                        totalNetPriceChild: { $sum: { $multiply: ["$tour.netPriceChild", "$amountChild"] } }
                    }
                },
                {
                    $lookup: {
                        from: 'tours',
                        localField: '_id.agent',
                        foreignField: '_id',
                        as: 'detailAgent'
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
    },
    cancelTourTicket(req,res,next){
        TourTicket.update({_id: req.params.id}, { $set : {remark: req.body.remark, statusTicket: 99}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

}