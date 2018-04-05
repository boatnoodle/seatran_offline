const mongoose = require('mongoose')
const TaxiTicket = require('../model/taxiTicketModel')
module.exports = {
    addTaxiTicket: (req,res,next) => {
        const taxiTicket = new TaxiTicket(req.body)
        taxiTicket.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
    },
    addTaxiTicketRealTime: (req,res,next) => {
        TaxiTicket.findById(req.body._id)
        // TaxiTicket.findOne({},'_id',{sort: {'created': -1}})
        .exec()
        .then((result) => {
            if(result != null){
                var _id = req.body._id
                let font = _id.substr(0,8)
                let back = '000'+ (parseInt(_id.substr(-4)) + 1)
                _id = font + back.substr(-4)
            }else{
                var _id = req.body._id
            }
            
            const data = {
                _id: _id,
                namePassenger: req.body.namePassenger,
                destination: req.body.destination,
                price: req.body.price,
                amount: req.body.amount,
                total: req.body.total,
                typeCar: req.body.typeCar,
                remark: req.body.remark
            }
            const taxiTicket = new TaxiTicket(data)
            taxiTicket.save()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err)
            })
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
    },
    cancelTaxiTicket(req,res,next){
        TaxiTicket.update({_id: req.params.id}, { $set : {remark: req.body.remark, statusTicket: 99}})
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    
}