'use strict'

require('dotenv').config();

const port = process.env.PORT;
const dbConnStr = process.env.DBCONNSTR;

module.exports = {
    port,
    dbConnStr
}