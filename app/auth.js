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
        logg.error(`AuthToken was expected but not found in header of req : ${req.method} ${req.path}`);
        return;
    }

    jwt.verify(authToken, secret, (error, data) => {
        if(error){
            logg.error(`Could not verify authToken ${authToken} due to error ${error}`);
            return;
        }
        logg.info(`AuthToken verified for token ${authToken}`);
        req.userDbId = data.userDbId;
        next();
    })
}

module.exports = {
    generateAuthToken,
    verifyAuthToken
}