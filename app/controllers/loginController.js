'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const generateAuthToken = require('../auth').generateAuthToken;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

router.post('',(req, res) => {
    if(!req.body.email){
        return res.status(405).send('You need an email to login!');
    }
    if(!req.body.password){
        return res.status(405).send('You need a password to login!');
    }

    User.findOne({email : req.body.email}).then((data) => {
        if(bcrypt.compareSync(req.body.password, data.password)){
            const authToken = generateAuthToken(data._id);
            return res.status(200).send({authToken, userDbId : data._id});
        }
        return res.status(403).send('Bad password');
    }).catch((err) => {
        return res.status(500).send('Internal Error');
    })    
})

module.exports = router;

