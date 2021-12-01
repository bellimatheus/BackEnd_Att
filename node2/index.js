const cors = require('cors');
const express = require('express');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const funRotas = require('./rotas/funRota.js');
app.use(funRotas);''

app.use('/', router);
app.listen(3000, () => {
    console.log('listening on 3000')
})