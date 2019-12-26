'use strict'

const validator = require('validator');

const mongoose = require('../db').mongoose;

const trackedExchangeSchema = new mongoose.Schema({
    exchangeKey : {
        type : String
    }
})

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        validate : (value) => validator.isEmail(value)
    },
    password : {
        type : String,
        required : true,
        validate : (value) => {
            //password policy here
        }
    },
    trackedExchanges : [trackedExchangeSchema]
})

module.exports = mongoose.model('User', userSchema);