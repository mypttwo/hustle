'use strict'

const jwt = require('jsonwebtoken');

const secret = require('./config').secret;
const logg = require('./log');

const generateAuthToken = (userDbId) => {
    return jwt.sign({userDbId},secret,{
        expiresIn: 24 * 60 * 60
    });
}

const verifyAuthToken = (req, res, next) => {
    let authToken = req.headers['x-access-token'];
    if(!authToken){
        logg.error('authToken is not avilable in request');
        return res.status(403).send('authToken is not avilable in request');
    }

    jwt.verify(authToken, secret, (error, data) => {
        if(error){
            logg.error('authToken is not valid');
            return res.status(403).send('authToken is not valid');
        }
        logg.info(`authToken verified for token ${authToken}`);
        if(req.query.id != data.userDbId){
            logg.error(`req user ${req.query.id} authToken is for a different user ${data.userDbId}`);
            return res.status(403).send('authToken is not valid');
        }
        next();
    })
}

module.exports = {
    generateAuthToken,
    verifyAuthToken
}