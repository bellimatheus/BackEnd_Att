const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const rotasF = require('./router/routerF.js');
app.use(rotasF);

app.use('/', router);
app.listen(5000, () => {
    console.log('listening on 5000')
})