'use strict'

const http = require('http');
const express = require('express')();
const cors = require('cors')();


const logg = require('./log');

express.use(cors);

express.use((req, res, next) => {
    logg.info(`Request : ${req.method} ${req.path}`);
    next();
})

const server = http.createServer(express);

module.exports = server;
