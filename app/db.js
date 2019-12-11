'use strict'

const mongoose = require('mongoose');

const dbConnStr = require('./config').dbConnStr;

const connectToDB = mongoose.connect(dbConnStr,{useNewUrlParser : true});


module.exports = {
    mongoose,
    connectToDB
}