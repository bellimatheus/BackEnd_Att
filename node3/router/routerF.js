const express = require('express');
const rotas = express.Router();
const ctr = require('../ctr/ctrF.js');

rotas.get('/api/get', ctr.lendo);
rotas.post('/api/post', ctr.criando);
rotas.put('/api/put', ctr.alterando);
rotas.delete('/api/del/:idPrest', ctr.deletando);

module.exports = rotas;