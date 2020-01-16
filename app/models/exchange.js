'use strict'

const validator = require('validator');

const mongoose = require('../db').mongoose;

const exchangeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    key : {
        type : String,
        required : true,
        unique : true
    },
    url : {
        type : String
    },
    websocketEnabled : {
        type : Boolean,
        default : true
    },
    apiEnabled : {
        type : Boolean,
        default : true
    }
})

module.exports = mongoose.model('Exchange', exchangeSchema);