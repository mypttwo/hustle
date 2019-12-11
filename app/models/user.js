'use strict'

const validator = require('validator');

const mongoose = require('../db').mongoose;


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
    } 
})

module.exports = mongoose.model('User', userSchema);