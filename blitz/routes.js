const express = require('express');

const route = express.Router();

const usuarioCtr = require('./src/ctr/usuarioCtr');
const alertaCtr = require('./src/ctr/alertaCtr');

route.post('/usuario', usuarioCtr.create);
route.get('/usuario', usuarioCtr.read);
route.get('/usuario/:id', usuarioCtr.read);
route.delete('/usuario/:id', usuarioCtr.remove);
route.put('/usuario/:id', usuarioCtr.update);

route.get('/alerta', alertaCtr.read);
route.get('/alerta/:id', alertaCtr.read);
route.post('/alerta', alertaCtr.create);
route.put('/alerta/:id', alertaCtr.update);
route.delete('/alerta/:id', alertaCtr.remove);

module.exports = route;