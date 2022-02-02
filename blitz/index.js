require('dotenv').config();
const Express = require('express');
const Cors = require('cors')

const Connection = require('./src/database/Connection.js');
// console.log(Connection)
const route = require('./routes');


const app = Express();

app.use(Cors());
app.use(Express.json())
app.use(route);

app.listen(process.env.APP_PORT, () => {
    console.log("Servidor ON na porta", process.env.APP_PORT);
    Connection.sync();
})
