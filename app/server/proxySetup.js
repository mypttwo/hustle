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

    express.use('/proxyp2pb2b', proxy('https://api.p2pb2b.io/')); 

    express.use('/proxycointiger', proxy('https://www.cointiger.com/'));

    express.use('/proxybibox', proxy('https://api.bibox.com/v1/mdata',{
        proxyReqPathResolver: req => {
            console.log(req.url);
            
            let parts = req.url.split('?');
            let queryString = parts[1];
            let updatedPath = 'https://api.bibox.com/v1/mdata';
            return updatedPath + (queryString ? '?' + queryString : '');
        }        
    }));

}

module.exports = proxySetup;