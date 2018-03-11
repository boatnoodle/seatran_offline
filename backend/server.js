const env = process.env.NODE_ENV || 'development'

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 3000
const router = express.Router()
//get config depend on env variable
const config = require('./config/config')(env)
const routeTaxi = require('./router/routeTaxi')
const routeTour = require('./router/tour')
const routeTaxiTicket = require('./router/taxiTicket')
const routeTourTicket = require('./router/tourTicket')
// connect database
require('./config/mongodb')(config.MONGO_URI)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('combined'))

//route ที่ขึ้นต้นด้วย /api
app.use('/api/routeTaxi',routeTaxi)
app.use('/api/tour',routeTour)
app.use('/api/taxiTicket', routeTaxiTicket)
app.use('/api/tourTicket', routeTourTicket)

const BillHead = require('./model/billHeadModel')

app.post('/api/billHead',(req,res,next) => {
    const billHead = new BillHead({
        billHead: req.body.billHead
    })
    billHead.save()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
    })
})
app.put('/api/billHead',(req,res,next) => {
    BillHead.update({ _id: "5aa5255aeb94e430c44803d9"}, { $set: { billHead: req.body.billHead }})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/api/billHead',(req,res,next)=> {
    BillHead.find()
    .exec()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
    })
})
// router.get('/',(req,res) => res.send('server is ready~!!'))

app.listen(port,()=> console.log('server is running on port 3000!'))
