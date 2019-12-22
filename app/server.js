'use strict'

const http = require('http');
const express = require('express')();
const cors = require('cors')();
const proxy = require('express-http-proxy');


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

express.use('/proxybinance', proxy('https://api.binance.com'));

express.use('/proxypoloniex', proxy('https://poloniex.com/public', {
    proxyReqPathResolver: req => {
      let parts = req.url.split('?');
      let queryString = parts[1];
      let updatedPath = 'https://poloniex.com/public';
      return updatedPath + (queryString ? '?' + queryString : '');
    }
  }));

const server = http.createServer(express);

module.exports = server;
