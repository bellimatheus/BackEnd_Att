const mysql = require('mysql');
const settings = require('./setting.json');
const con = mysql.createConnection(settings.mysql);
module.exports = {
    con
}
