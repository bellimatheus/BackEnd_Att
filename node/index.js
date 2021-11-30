const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());


const mysql = require('mysql');
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "irrf",
})

app.get('/api', (req, res) => {
    let string = 'select * from funcionarios';
    con.query(string, (err, result) => {
        res.json(result);
    })

})

app.listen(3000, () => {
    console.log('listening on port 3000')
})