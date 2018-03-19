const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userShchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String
    },
    status:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('User',userShchema)