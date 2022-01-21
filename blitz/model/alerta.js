const {Model, DataTypes} = require('sequelize');

class Alerta extends Model{
    static init (dataCon){
        super.init(
            {
                tipo:{
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                duracao: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                descricao: {
                    type: DataTypes.STRING(150),
                    allowNull: true,
                }
            },
            {
                sequelize: dataCon,
                tableName: 'alertas',
                modelName: 'alerta',
            }
        );
    } 
}

module.exports = Alerta;