const mysql = require('mysql');
const set = require('./set.json');
const con =  mysql.createConnection(set.mysql);

module.exports = {
    con
}   