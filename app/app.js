'use strict'

const logg = require('./log');
const server = require('./server/server');
const {port, dbConnStr} = require('./config');

const {mongoose, connectToDB} = require('./db');


connectToDB().then(() => {
    logg.info(`Connected to db ${dbConnStr}`);

    const db = mongoose.connection;
    db.on('error', (err) => {
        logg.error(`Mongo DB connection error ${err}`);
    })

    server.listen(port, (err) => {
        if(err){
            logg.error(`Shutting Down. Could not start Server on ${port}`);
            process.exit(0);
        }
        logg.info(`Started Server on ${port}`);
    })
}).catch((err) => {
    logg.error(`Shutting Down. Error connecting to ${dbConnStr} : ${err}`);
})

