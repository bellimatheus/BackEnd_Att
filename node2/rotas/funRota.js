const express = require('express');
const rotas = express.Router();
const controle = require('../controle/funControl.js');

rotas.get('/api', controle.pegar);
rotas.get('/api/:matricula', controle.selectID);
rotas.post('/api/post', controle.enviar);
rotas.put('/api/put', controle.atualizar);
rotas.delete('/api/del/:matricula', controle.ap);

module.exports = rotas;



