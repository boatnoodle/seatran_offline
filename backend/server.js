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
const routeUser = require('./router/user')
const routeSystem = require('./router/system')
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
app.use('/api/user',routeUser)
app.use('/api/system',routeSystem)


// router.get('/',(req,res) => res.send('server is ready~!!'))

app.listen(port,()=> console.log('server is running on port 3000!'))
