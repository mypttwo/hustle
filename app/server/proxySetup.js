'use strict'

const proxy = require('express-http-proxy');

const proxySetup = (express) => {

    express.use('/proxybinance', proxy('https://api.binance.com'));

    express.use('/proxypoloniex', proxy('https://poloniex.com/public', {
        proxyReqPathResolver: req => {
            let parts = req.url.split('?');
            let queryString = parts[1];
            let updatedPath = 'https://poloniex.com/public';
            return updatedPath + (queryString ? '?' + queryString : '');
        }
    }));

}

module.exports = proxySetup;