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
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getTaxiTicketByDate: (req,res,next) => {
        if(!req.body.dateTo){
            var date = new Date(req.body.dateFrom)
            var dateTo = date.setDate(date.getDate() + 1) // กรณี ไม่ส่ง ถึงวันที่เท่าไรมา ให้ ทำการ บวก 1 วัน ***รายงานประจำวัน
        }else{
            var dateTo = new Date(req.body.dateTo + 'T24:00:00')
        }
        TaxiTicket.find(
            {"created" : {$gte: new Date(req.body.dateFrom), $lt: dateTo}},
        )
        .populate('destination','nameRoute -_id')
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log('err',err.message)
            res.send(err.message)
        })
    },
    getTaxiTicketSummery(req,res,next){
        if(!req.body.dateTo){
            var dateTo = new Date(req.body.dateFrom + 'T24:00:00')
        }else{
            var dateTo = new Date(req.body.dateTo + 'T24:00:00')
        }
        TaxiTicket.aggregate([
            {
                $match: {
                    created: {$gte: new Date(req.body.dateFrom), $lt: dateTo}
                }
            },
            {
                $group: {
                    _id: {
                        destination: "$destination",
                        typeCar: "$typeCar"
                    },
                    created: {$first: '$created'},
                    totalPrice: {$sum: {$multiply: ["$price","$amount"]}},
                    totalAmount: {$sum: "$amount"}
                }
            },
            {
                $group: {
                    _id: "$_id.destination",
                    created: {$first: "$created"},
                    totalByTypeCar: {
                        $push: {
                            typeCar: "$_id.typeCar",
                            totalAmount: "$totalAmount",
                            totalPrice: "$totalPrice"
                        }
                    }
                }
            },  
            {
                $lookup: {
                    from: 'routetaxis',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'destination'
                }
            }
        ])
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log('err',err)
            res.send(err.message)
        })
    },
    getTaxiTicketLasted(req,res,next){
        TaxiTicket.find().sort({'created': -1}).limit(5)
        .populate('destination')
        .exec()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log('err',err)
            res.send(err.message) 
        })
    }
    
}