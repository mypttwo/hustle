'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const logg = require('../log');
const Exchange = require('../models/exchange');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

router.get('', (req, res) => {
    Exchange.find((err, data) => {
        if(err){
            logg.error(`Could not load exchanges : ${err}`);
            return res.status(500).send('')
        }
        return res.status(200).send(data);
    })
})

module.exports = router;
