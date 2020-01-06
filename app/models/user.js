'use strict'

const validator = require('validator');

const mongoose = require('../db').mongoose;


const currencyMarketPairSchema = new mongoose.Schema({
    currency : {
        type : String
    },
    market : {
        type : String
    }
})

const trackedExchangeSchema = new mongoose.Schema({
    exchangeKey : {
        type : String
    },
    currencyMarketPairs : [currencyMarketPairSchema]
})

const themeSchema = new mongoose.Schema({
    name : {
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
    trackedExchanges : [trackedExchangeSchema],
    theme : themeSchema
})

module.exports = mongoose.model('User', userSchema);