require('dotenv').config();
const { Sequelize } = require('sequelize');

const Usuario = require('../model/Usuario');
const Alerta = require ('../model/Alerta');
const Local = require ('../model/Localizacao');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, '', {
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});

const sync = () => {
    Usuario.init(sequelize);
    Alerta.init(sequelize);
    Local.init(sequelize);

    Usuario.associate(sequelize.models);
    Alerta.associate(sequelize.models);
    Local.associate(sequelize.models);
    
    sequelize.sync({ force: false });
}

module.exports = {
    sequelize,
    sync
}