'use strict'

const http = require('http');
const express = require('express')();
const cors = require('cors')();


const logg = require('./log');
const loginController = require('./controllers/loginController');
const userRegistrationController = require('./controllers/userRegistrationController');

express.use(cors);

express.use((req, res, next) => {
    logg.info(`Request : ${req.method} ${req.path}`);
    next();
})

express.get('/', (req, res) => res.send('You need a drink!'));
express.use('/login', loginController);
express.use('/register', userRegistrationController);

const server = http.createServer(express);

module.exports = server;
