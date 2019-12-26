'use strict'

const express = require('express');
const cors = require('cors')();
express().use(cors);
const router = express.Router();

const bodyParser = require('body-parser');

const logg = require('../log');
const verifyAuthToken = require('../auth').verifyAuthToken;
const User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

router.post('/trackedexchanges', verifyAuthToken,(req, res) => {
    User.findById(req.query.id, (err, user) => {
        if(err){
            logg.error(`Could not find user by id : ${req.query.id}`);
            return res.status(404).send();
        }
        user.trackedExchanges = [];
        req.body.map((exchange) => {
            user.trackedExchanges.push({exchangeKey : exchange});
        })
        user.save().then((data) => {
            logg.info(`${data}`);
            return res.status(200).send();
        }).catch((err) => {
            logg.error(`${err}`)
            return res.status(500).send();
        });

    })


    
})
router.get('/trackedexchanges', verifyAuthToken,(req, res) => {
    User.findById(req.query.id, (err, user) => {
        if(err){
            logg.error(`Could not find user by id : ${req.query.id}`);
            return res.status(404).send();
        }
        return res.status(200).send(user.trackedExchanges);

    })


    
})

module.exports = router;

