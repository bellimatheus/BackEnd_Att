const express = require('express');

const route = express.Router();

const usuarioCtr = require('./src/ctr/usuarioCtr');
const alertaCtr = require('./src/ctr/alertaCtr');
const localCtr = require('./src/ctr/localCtr');

route.post('/usuario', usuarioCtr.create);
route.get('/usuario', usuarioCtr.read);
route.get('/usuario/:id', usuarioCtr.read);
route.delete('/usuario/:id', usuarioCtr.remove);
route.put('/usuario/:id', usuarioCtr.update);

route.post('/login', usuarioCtr.login);

route.post('/alerta', alertaCtr.create);
route.get('/alerta', alertaCtr.read);
route.get('/alerta/:id', alertaCtr.read);
route.put('/alerta/:id', alertaCtr.update);
route.delete('/alerta/:id', alertaCtr.remove);

route.post('/local', localCtr.create);
route.get('/local', localCtr.read);
route.get('/local/:id', localCtr.read);
route.put('/local/:id', localCtr.update);
route.delete('/local/:id', localCtr.remove);



module.exports = route;