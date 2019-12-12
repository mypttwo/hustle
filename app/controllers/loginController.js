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
        return res.status(405).send('email');
    }
    if(!req.body.password){
        return res.status(405).send('password');
    }

    User.findOne({email : req.body.email}).then((data) => {
        if(bcrypt.compareSync(req.body.password, data.password)){
            const authToken = generateAuthToken(data._id);
            res.status(200).send({auth : true, authToken, userDbId : data._id});
        }
        return res.status(403).send({auth : false, message : 'Bad password'});
    }).catch((err) => {
        return res.status(500).send({auth : false, message : 'Internal Error'});
    })

})

module.exports = router;

