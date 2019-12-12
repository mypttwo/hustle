'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const logg = require('../log');
const User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));


router.post('', (req, res) => {
    if(!req.body.email){
        return res.status(405).send('You need an email to sign up!');
    }
    if(!req.body.password){
        return res.status(405).send('You need a password to sign up!');
    }
    const hashedPassword = bcrypt.hashSync(req.body.password);
    User.create({
        email : req.body.email,
        password : hashedPassword
    }).then((data) => {
        logg.info(`User Registered : ${JSON.stringify(data)}`);
        return res.status(200).send();
    }).catch((err) => {
        if(err.code == "11000"){
            return res.status(406).send(`A user with the same email ${req.body.email} already exists!`);
        }
        logg.error(`User ${req.body.email} could not be created. ${err}`)
        return res.status(500).send(`User ${req.body.email} could not be created. ${err.message}`);
    })
})

module.exports = router;




