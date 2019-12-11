'use strict'

require('dotenv').config();

const port = process.env.PORT;
const dbConnStr = process.env.DBCONNSTR;
const secret = process.env.SECRET;

module.exports = {
    port,
    dbConnStr,
    secret
}