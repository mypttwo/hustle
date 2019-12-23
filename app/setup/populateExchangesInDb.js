'use strict'

const fs = require('fs');

const logg = require('../log');
const {dbConnStr} = require('../config');
const {mongoose, connectToDB} = require('../db');

const Exchange = require('../models/exchange');

const exchangeJsonFileAndPath = './app/setup/exchanges.json';//Read from config file?

const readExchangeJSON = () => {
    let rawdata = fs.readFileSync(exchangeJsonFileAndPath);
    let exchangeList = JSON.parse(rawdata);
    return exchangeList;
}

connectToDB().then(async () => {
    logg.info(`Connected to db ${dbConnStr}`);

    const db = mongoose.connection;
    db.on('error', (err) => {
        logg.error(`Mongo DB connection error ${err}`);
    })

    const res = await Exchange.deleteMany();
    console.log(`removed exchanges count: ${res.deletedCount}`); // Number of documents removed

    const exchangeList = readExchangeJSON();
    await Exchange.create(exchangeList).then((res) => {
            logg.info(`Exchange saved ${res}`);

        }).catch((err) => {
            logg.error(`Could not save Exchange on ${dbConnStr} error : ${err}`);

        })

        db.close().then(() => {
            logg.info(`Mongodb connection closed on ${dbConnStr}`);
        }).catch((err) => {
            logg.error(`Could not close mongodb connection on ${dbConnStr} error : ${err}`);
        })

}).catch((err) => {
    logg.error(`Shutting Down. Error connecting to ${dbConnStr} : ${err}`);
})




